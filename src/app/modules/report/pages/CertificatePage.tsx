import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState, AppDispatch } from "../../../core/store";
import { fetchReports } from "../redux/slices/certificateSlice";
import { Footer, Header } from "../../landing/components/layout";
import { generateCertificate } from "../services/certificateService";
import LoadingErrorComponent from "../components/report/LoadingErrorComponent";
import ContactSupportModal from "../components/ContactSupportModal";


interface SearchHistory {
  user: {
    full_name: string;
  };
  vin: VinInfo | null;
  cert_num: string;
  status: string;
  qr_code_base64: string;
  slug: string;
  created_at: string;
}

interface VinInfo {
  vin: string | null;
  brand: string | null;
  vehicle_year: string | null;
  vehicle_type: string | null;
  payment_status: string | null;
  origin_country: string | null;
}

const Certificate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { reports } = useSelector((state: RootState) => state.reports);
  const { user } = useSelector((state: RootState) => state.auth);

  // State to track if certificate was generated automatically
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const [allCertData, setAllCertData] = useState<SearchHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // State for responsive view options
  const [showDetails, setShowDetails] = useState(true);
  // State for contact support modal
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  // Auto-generate certificate if coming from payment success
  useEffect(() => {
    const fromPayment = location.state?.fromPayment;
    const vinFromPayment = location.state?.vin;

    if (fromPayment && vinFromPayment && !certificateGenerated) {
      const targetReport = reports.find((r) => r.vin === vinFromPayment);
      if (targetReport) {
        handleDownloadCertificate(targetReport.vin);
        setCertificateGenerated(true);
      }
    }
  }, [reports, location, certificateGenerated]);

  const handleDownloadAll = () => {
    reports.forEach((report) => {
      if (report.downloadUrl) {
        const link = document.createElement("a");
        link.href = report.downloadUrl;
        link.setAttribute(
          "download",
          `${report.title.replace(/\s+/g, "-")}-${report.vin}.pdf`
        );
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  // Fetching all certificate data
  const certificateFetching = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const accesstoken = localStorage.getItem("access_token");
      if (!accesstoken) {
        throw new Error("No access token found");
      }

      const response = await fetch(
        "http://cvms-api.afripointdev.com/vin/search-history/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch search history: ${response.status}`);
      }

      const resData = await response.json();

      if (resData?.Search_histories) {
        // Sort the search histories by creation date in descending order (newest first)
        const sortedHistories = [...resData.Search_histories].sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA; // Descending order
        });

        setAllCertData(sortedHistories);
      } else {
        console.warn("No Search_histories found in response");
        setAllCertData([]);
      }
    } catch (error) {
      console.error(
        "Error fetching certificate data:",
        error instanceof Error ? error.message : String(error)
      );
      setError("Failed to load certificate data. Please try again later.");
      setAllCertData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    certificateFetching();
  }, [certificateFetching]);

  const handleDownloadCertificate = async (vin: string) => {
    try {
      setIsLoading(true);
      const accesstoken = localStorage.getItem("access_token");
      if (!accesstoken) {
        throw new Error("No access token found");
      }

      const response = await fetch(
        "http://cvms-api.afripointdev.com/vin/search-history/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search history");
      }

      const resData = await response.json();

      const vehicleRecord = resData.Search_histories.find(
        (record: SearchHistory) => {
          return record.vin?.vin === vin || record.slug?.includes(vin);
        }
      );

      if (!vehicleRecord) {
        throw new Error("Vehicle record not found for VIN: " + vin);
      }

      const userData = {
        fullName: vehicleRecord.user.full_name,
        address: user?.address || "",
      };

      const certificateData = {
        vin: vehicleRecord.vin?.vin || vin,
        makeModel: vehicleRecord.vin?.brand || "",
        model: vehicleRecord.vin?.make || "Ford Mustang",
        year: vehicleRecord.vin?.vehicle_year || "",
        certificateNumber: vehicleRecord.cert_num || "",
        ownerName: userData.fullName,
        ownerAddress: userData.address || "No 16B Alimini Street Ipaja",
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        qrCodeBase64: vehicleRecord.qr_code_base64 || "",
      };

      generateCertificate(certificateData);
    } catch (error) {
      console.error("Error generating certificate:", error);
      setError("Failed to generate certificate. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const dismissError = () => {
    setError(null);
  };

  // Toggle details view for responsive design
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Format date for different screen sizes
  const formatDate = (dateString: string, isMobile: boolean = false) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isMobile) {
      return date.toLocaleDateString("en-US");
    }
    return (
      date.toLocaleDateString("en-US") +
      " " +
      date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    );
  };

  // Open contact support modal
  const openContactModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsContactModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <LoadingErrorComponent
        isLoading={isLoading}
        error={error}
        onDismissError={dismissError}
      />

      {/* Contact Support Modal */}
      <ContactSupportModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />

      <main className="flex-grow container mx-auto px-4 py-4 mb-16">
        {/* Back to Home Link - Mobile */}
        <div className="md:hidden flex items-center mt-4 mb-2">
          <Link
            to="/"
            className="inline-flex items-center text-green-600 text-sm"
            aria-label="Navigate back to home page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Desktop back link and title */}
        <div className="hidden md:block mt-8 md:mt-16 mx-4 md:ml-24">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 font-medium text-sm py-2 hover:underline"
            aria-label="Navigate back to home page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Title Section - Mobile */}
        <div className="md:hidden">
          <h1 className="text-xl font-bold mb-4">Report</h1>
        </div>

        {/* Title Section - Desktop */}
        <div className="hidden md:block mx-4 md:ml-24">
          <h1 className="text-2xl font-bold mt-2 mb-6 md:mb-8">Results</h1>
        </div>

        {/* Main Content Container */}
        <div className="w-full max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-sm p-0 md:p-6">
          {/* Download All Button - Mobile */}

          <div className="md:hidden flex justify-end p-3">
            
            <button
              className="flex gap-2 bg-white items-center border border-gray-300 rounded-md px-3 py-1 text-sm"
              onClick={handleDownloadAll}
            >
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg> */}

              <img src="/icons/DownloadSimple.svg" alt="" width={15} />
              Download All
            </button>
          </div>

          {/* Download All Button - Desktop */}
          <div className="hidden md:flex justify-end mb-2 lg:mr-10">
            <button
              className="flex bg-gray-200 hover:bg-gray-300 text-gray-700 gap-2 py-1 px-2 md:py-2 md:px-4 border border-black rounded text-xs md:text-sm"
              onClick={handleDownloadAll}
            >
              <img src="/icons/DownloadSimple.svg" alt="" width={16} className="hidden sm:block" />
              Download All
            </button>
          </div>

          {/* Main Content Box */}
          <div className="w-full max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-sm">
            {/* Header Section - Mobile */}
            <div className="md:hidden flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <div className="bg-green-50 p-2 rounded-md mr-2">
                  <img
                    src="/images/fileVINSearch.svg"
                    alt="VIN Search"
                    className="w-5 h-5"
                  />
                </div>
                <div>
                  <span className="font-semibold">VIN Search</span>
                  <span className="text-sm text-gray-500 ml-1">
                    ({allCertData.length} result{allCertData.length !== 1 ? "s" : ""})
                  </span>
                </div>
              </div>
              <button
                onClick={toggleDetails}
                className="w-6 h-6 flex items-center justify-center"
              >
                {showDetails ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Header Section - Desktop */}
            <div className="hidden md:flex justify-between items-center border-b border-[#99A0AE] p-4">
              <div className="flex items-center">
                <div className="p-1 md:p-2 rounded-md mr-2 md:mr-3">
                  <img
                    src="/images/fileVINSearch.svg"
                    alt="VIN Search Certificate"
                    width={30}
                    className="w-6 md:w-8"
                  />
                </div>
                <div>
                  <span className="font-semibold text-base md:text-xl text-gray-800">
                    VIN Search
                  </span>
                  <span className="text-xs md:text-sm text-gray-500 ml-1 md:ml-2">
                    ({allCertData.length} result
                    {allCertData.length !== 1 ? "s" : ""})
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  className="text-xs text-gray-500 hover:text-gray-700"
                  onClick={toggleDetails}
                >
                  {showDetails ? "Hide details" : "Show details"}
                </button>
              </div>
            </div>

            {showDetails && (
              <div className="w-full mx-auto border-gray-100 overflow-hidden">
                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                  {/* Header Row - Desktop */}
                  <div className="grid grid-cols-12 py-3 px-4 bg-gray-50 border-b border-gray-200">
                    <div className="col-span-1"></div>
                    <div className="col-span-3 font-medium text-gray-700">
                      VIN Number
                    </div>
                    <div className="col-span-3 font-medium text-gray-700">
                      Date & Time
                    </div>
                    <div className="col-span-2 font-medium text-gray-700">
                      Status
                    </div>
                    <div className="col-span-3 font-medium text-gray-700">
                      Action
                    </div>
                  </div>

                  {allCertData.length === 0 && !isLoading ? (
                    <div className="py-6 md:py-8 text-center text-gray-600 text-sm md:text-base">
                      No results found.
                    </div>
                  ) : (
                    allCertData.map((cert, index) => (
                      <div key={index} className="grid grid-cols-12 py-3 px-4 border-b border-gray-100 hover:bg-gray-50">
                        <div className="col-span-1 flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </div>
                        <div className="col-span-3 flex items-center font-medium">
                          {cert.vin?.vin || "-"}
                        </div>
                        <div className="col-span-3 flex items-center text-gray-700">
                          {formatDate(cert.created_at)}
                        </div>
                        <div className="col-span-2 flex items-center">
                          {cert.status === "successful" ? (
                            <div className="flex items-center">
                              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              <span className="text-green-500">Successful</span>
                            </div>
                          ) : cert.status === "not found" ? (
                            <div className="flex items-center">
                              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              <span className="text-red-500">Not found</span>
                            </div>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </div>
                        <div className="col-span-3 flex items-center">
                          {cert.status === "not found" ? (
                            <button className="flex items-center text-red-500 hover:text-red-600 text-sm">
                              <svg
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              Regularize payment
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                cert.vin?.vin &&
                                handleDownloadCertificate(cert.vin.vin)
                              }
                              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                            >
                              <img src="/icons/DownloadSimple.svg" alt="" width={15} />
                              Download Certificate
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Mobile View - NEW STYLING to match the image */}
                <div className="md:hidden">
                  {allCertData.length === 0 && !isLoading ? (
                    <div className="py-6 text-center text-gray-600 text-sm">
                      No results found.
                    </div>
                  ) : (
                    allCertData.map((cert, index) => (
                      <div 
                        key={index} 
                        className="px-4 py-3 border-b border-gray-200"
                      >
                        <div className="mb-1">
                          <div className="text-sm text-gray-500 mb-1">VIN:</div>
                          <div className="font-medium">{cert.vin?.vin || "-"}</div>
                        </div>
                        
                        <div className="mb-1">
                          <div className="text-sm text-gray-500 mb-1">Status:</div>
                          <div>
                            {cert.status === "successful" ? (
                              <div className="flex items-center">
                                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                                <span className="text-green-500 text-sm">Successful</span>
                              </div>
                            ) : cert.status === "not found" ? (
                              <div className="flex items-center">
                                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                                <span className="text-red-500 text-sm">Not found</span>
                              </div>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <div className="text-sm text-gray-500 mb-1">Date & Time:</div>
                          <div className="text-sm">{formatDate(cert.created_at)}</div>
                        </div>
                        
                        <div className="mt-3">
                          {cert.status === "not found" ? (
                            <button className="w-full flex items-center justify-center bg-white border border-red-500 text-red-500 rounded-md py-2 px-4 text-sm">
                              <svg
                                className="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              Regularize payment
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                cert.vin?.vin &&
                                handleDownloadCertificate(cert.vin.vin)
                              }
                              className="w-full flex gap-2 items-center justify-center bg-white border border-[#000000] text-gray-700 rounded-md py-2 px-4 text-sm"
                            >
                              {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg> */}

                                <img src="/icons/DownloadSimple.svg" alt="" width={15} />
                              Download Certificate
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {allCertData.length > 0 && (
            <div className="flex items-start justify-start mt-4 text-xs md:text-sm text-gray-600 mx-2 md:ml-8">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 md:h-4 md:w-4 mr-1 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="flex flex-wrap gap-1 md:gap-2">
                  For any failed result, Please
                  <a href="#" onClick={openContactModal} className="text-green-600 underline">
                    contact support
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Certificate;