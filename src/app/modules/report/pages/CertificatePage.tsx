import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState} from "../../../core/store";
// import { fetchReports } from "../redux/slices/certificateSlice";
import { Footer, Header } from "../../landing/components/layout";
import { generateCertificate } from "../services/certificateService";
// import LoadingErrorComponent from "../components/report/LoadingErrorComponent";
import ContactSupportModal from "../components/ContactSupportModal";
import { vinApiService } from "../services/vinVehicleService";

// interface ApiVehicleResult {
//   vin: string;
//   make?: string;
//   model?: string;
//   vehicle_year?: string;
//   engine_type?: string;
//   vreg?: string;
//   vehicle_type?: string;
//   origin_country?: string;
//   payment_status?: string;
//   ref_number: string;
//   status: string;
// }
interface ApiVehicleResult {
  vin: string;
  make?: string;
  model?: string;
  vehicle_year?: string;
  engine_type?: string;
  vreg?: string;
  vehicle_type?: string;
  origin_country?: string;
  payment_status?: string;
  qr_code_image?: string; // Add this field
  ref_number: string;
  status: string;
}

interface ApiResponse {
  message: string;
  results: ApiVehicleResult[];
}

// interface VinItem {
//   id: string;
// }

const Certificate = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { reports } = useSelector((state: RootState) => state.reports);

  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const [allCertData, setAllCertData] = useState<ApiVehicleResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const hasFetched = useRef(false)

  // useEffect(() => {
  //   dispatch(fetchReports());
  // }, [dispatch]);

  // Auto-generate certificate if coming from payment success
  useEffect(() => {
    const fromPayment = location.state?.fromPayment;
    const vinFromPayment = location.state?.vin;
    const { items } = location.state || { items: [] };

    if (fromPayment && vinFromPayment && !certificateGenerated) {
      const targetReport = reports.find((r) => r.vin === vinFromPayment);
      if (targetReport) {
        handleDownloadCertificate(items);
        setCertificateGenerated(true);
      }
    }
  }, [reports, location, certificateGenerated]);

  // const handleDownloadAll = async () => {
  //   try {
  //     setIsLoading(true);
      
  //     // Filter only successful certificates
  //     const successfulCerts = allCertData.filter(
  //       (cert) => cert.status?.toLowerCase() === "successful"
  //     );

  //     if (successfulCerts.length === 0) {
  //       setError("No successful certificates available for download.");
  //       return;
  //     }

  //     // Get VIN list from successful certificates
  //     // const vinList = successfulCerts.map(cert => cert.vin);
      
  //     // Get detailed information for certificate generation
  //     // const detailedData = await vinApiService.getVinDetails(vinList);

  //     // Generate certificate for each successful VIN
  //     for (const cert of successfulCerts) {
  //       const vehicleRecord = cert
      

  //       // if (!vehicleRecord) {
  //       //   console.warn(`Vehicle record not found for VIN: ${cert.vin}`);
  //       //   continue;
  //       // }

  //       const certificateData = {
  //         vin: vehicleRecord.vin,
  //         makeModel: vehicleRecord.make || "Not available",
  //         model: vehicleRecord.model || "Not available",
  //         year: vehicleRecord.vehicle_year || "Not available",
  //         certificateNumber: vehicleRecord.ref_number,
  //         ownerName: "Vehicle Owner", // Replace with actual user data if available
  //         ownerAddress: "No 16B Alimini Street Ipaja",
  //         date: new Date().toLocaleDateString("en-GB", {
  //           day: "2-digit",
  //           month: "short",
  //           year: "numeric",
  //         }),
  //         qrCodeBase64: "", // Add QR code if available
  //       };

  //       // Add a small delay between downloads
  //       await new Promise(resolve => setTimeout(resolve, 500));
  //       generateCertificate(certificateData);
  //     }

  //     console.log(`Successfully initiated download for ${successfulCerts.length} certificates`);
      
  //   } catch (error) {
  //     console.error("Error downloading all certificates:", error);
  //     setError("Failed to download certificates. Please try again later.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleDownloadAll = async () => {
  try {
    setIsLoading(true);
    
    // Filter only successful certificates
    const successfulCerts = allCertData.filter(
      (cert) => cert.status?.toLowerCase() === "successful"
    );

    if (successfulCerts.length === 0) {
      setError("No successful certificates available for download.");
      return;
    }

    // Generate certificate for each successful VIN
    for (const cert of successfulCerts) {
      const vehicleRecord = cert;

      const certificateData = {
        vin: vehicleRecord.vin,
        makeModel: vehicleRecord.make || "Not available",
        model: vehicleRecord.model || "Not available",
        year: vehicleRecord.vehicle_year || "Not available",
        certificateNumber: vehicleRecord.ref_number,
        ownerName: "Vehicle Owner", // Replace with actual user data if available
        ownerAddress: "No 16B Alimini Street Ipaja",
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        qrCodeUrl: vehicleRecord.qr_code_image, // Pass the QR code URL from API
        qrCodeBase64: "", // Keep this empty to let the service fetch from URL
      };

      // Add a small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 500));
      await generateCertificate(certificateData); // Make sure to await this
    }

    console.log(`Successfully initiated download for ${successfulCerts.length} certificates`);
    
  } catch (error) {
    console.error("Error downloading all certificates:", error);
    setError("Failed to download certificates. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};

  const certificateFetching = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const resData: ApiResponse = await vinApiService.getVinCheck();
      console.log("getVinCheck", resData)

      
      if (resData?.results && Array.isArray(resData.results)) {
        setAllCertData(resData.results);
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
    if(!hasFetched.current){
      hasFetched.current = true
      certificateFetching();
    }
    
  }, []);

// const handleDownloadCertificate = async (cert: ApiVehicleResult) => {   
//    try {
//       setIsLoading(true);
      
//       // const vinList = items.map(item => item.id);
//       // const detailedData = await vinApiService.getVinDetails(vinList);
//       // console.log("getVinDetails", detailedData);
      
//         const vehicleRecord = cert
        

//         // const vehicleRecord = detailedData.results.find(
//         //   (record) => record.vin === vin
//         // );

//         // if (!vehicleRecord) {
//         //   console.warn(`Vehicle record not found for VIN: ${vin}`);
//         //   continue;
//         // }

//         const certificateData = {
//           vin: vehicleRecord.vin,
//           makeModel: vehicleRecord.make || "Not available",
//           model: vehicleRecord.model || "Not available",
//           year: vehicleRecord.vehicle_year || "Not available",
//           certificateNumber: vehicleRecord.ref_number,
//           ownerName: "Vehicle Owner", // Replace with actual user data if available
//           ownerAddress: "No 16B Alimini Street Ipaja",
//           date: new Date().toLocaleDateString("en-GB", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           }),
//           qrCodeBase64: "", // Add QR code if available
//         };

//         generateCertificate(certificateData);
//       // }
//     } catch (error) {
//       console.error("Error generating certificate:", error);
//       setError("Failed to generate certificate. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

  // const dismissError = () => {
  //   setError(null);
  // };

  const handleDownloadCertificate = async (cert: ApiVehicleResult) => {   
  try {
    setIsLoading(true);
    
    const vehicleRecord = cert;

    const certificateData = {
      vin: vehicleRecord.vin,
      makeModel: vehicleRecord.make || "Not available",
      model: vehicleRecord.model || "Not available",
      year: vehicleRecord.vehicle_year || "Not available",
      certificateNumber: vehicleRecord.ref_number,
      ownerName: "Vehicle Owner", // Replace with actual user data if available
      ownerAddress: "No 16B Alimini Street Ipaja",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      qrCodeUrl: vehicleRecord.qr_code_image, // Pass the QR code URL from API
      qrCodeBase64: "", // Keep this empty to let the service fetch from URL
    };

    await generateCertificate(certificateData); // Make sure to await this
  } catch (error) {
    console.error("Error generating certificate:", error);
    setError("Failed to generate certificate. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};
  console.log(error)

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // const formatDate = (dateString: string, isMobile: boolean = false) => {
  //   if (!dateString) return "-";
  //   const date = new Date(dateString);
  //   if (isMobile) {
  //     return date.toLocaleDateString("en-US");
  //   }
  //   return (
  //     date.toLocaleDateString("en-US") +
  //     " " +
  //     date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  //   );
  // };

  const openContactModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsContactModalOpen(true);
  };

  const getSuccessfulCertificatesCount = () => {
    return allCertData.filter(
      (cert) => cert.status?.toLowerCase() === "successful"
    ).length;
  };

  const successfulCount = getSuccessfulCertificatesCount();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      {/* <LoadingErrorComponent
        isLoading={isLoading}
        error={error}
        onDismissError={dismissError}
      /> */}

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
              className={`flex gap-2 items-center border rounded-md px-3 py-1 text-sm ${
                successfulCount > 0 && !isLoading
                  ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              onClick={handleDownloadAll}
              disabled={successfulCount === 0 || isLoading}
            >
              <img src="/icons/DownloadSimple.svg" alt="" width={15} />
              Download All ({successfulCount})
            </button>
          </div>

          {/* Download All Button - Desktop */}
          <div className="hidden md:flex justify-end mb-2 lg:mr-10">
            <button
              className={`flex gap-2 py-1 px-2 md:py-2 md:px-4 border rounded text-xs md:text-sm ${
                successfulCount > 0 && !isLoading
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-700 border-black"
                  : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
              }`}
              onClick={handleDownloadAll}
              disabled={successfulCount === 0 || isLoading}
            >
              <img
                src="/icons/DownloadSimple.svg"
                alt=""
                width={16}
                className="hidden sm:block"
              />
              Download All ({successfulCount})
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
                    ({allCertData.length} result
                    {allCertData.length !== 1 ? "s" : ""})
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
                      Reference Number
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
                      <div
                        key={index}
                        className="grid grid-cols-12 py-3 px-4 border-b border-gray-100 hover:bg-gray-50"
                      >
                        <div className="col-span-1 flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </div>
                        <div className="col-span-3 flex items-center font-medium">
                          {cert.vin || "-"}
                        </div>
                        <div className="col-span-3 flex items-center text-gray-700">
                          {cert.ref_number || "-"}
                        </div>
                        <div className="col-span-2 flex items-center">
                          {cert.status?.toLowerCase() === "successful" ? (
                            <div className="flex items-center">
                              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              <span className="text-green-500">Successful</span>
                            </div>
                          ) : cert.status === "Not found" ? (
                            <div className="flex items-center">
                              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              <span className="text-red-500">Not found</span>
                            </div>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </div>
                        <div className="col-span-3 flex items-center">
                          {cert.status?.toLowerCase() !== "successful" ? (
                            <Link 
                              to="https://bodogwu.customs.gov.ng/"
                              className="flex items-center space-x-2 text-red-500 hover:text-red-600 text-sm"
                            >
                              <img
                                src="/icons/DownloadSimple.svg"
                                alt=""
                                width={15}
                              />
                              <span>Regularize payment</span>
                            </Link>
                          ) : (
                            <button
                              onClick={() =>
                                handleDownloadCertificate(cert)
                              }
                              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                            >
                              <img
                                src="/icons/DownloadSimple.svg"
                                alt=""
                                width={15}
                              />
                              Download Certificate
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Mobile View */}
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
                          <div className="font-medium">
                            {cert.vin || "-"}
                          </div>
                        </div>

                        <div className="mb-1">
                          <div className="text-sm text-gray-500 mb-1">
                            Reference:
                          </div>
                          <div className="text-sm">
                            {cert.ref_number || "-"}
                          </div>
                        </div>

                        <div className="mb-1">
                          <div className="text-sm text-gray-500 mb-1">
                            Status:
                          </div>
                          <div>
                            {cert.status?.toLowerCase() === "successful" ? (
                              <div className="flex items-center">
                                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                                <span className="text-green-500 text-sm">
                                  Successful
                                </span>
                              </div>
                            ) : cert.status === "Not found" ? (
                              <div className="flex items-center">
                                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                                <span className="text-red-500 text-sm">
                                  Not found
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </div>
                        </div>

                        <div className="mt-3">
                          {cert.status?.toLowerCase() !== "successful" ? (
                            <Link 
                              to="https://bodogwu.customs.gov.ng/"
                              className="w-full flex items-center justify-center space-x-2 bg-white border border-red-500 text-red-500 rounded-md py-2 px-4 text-sm"
                            >
                              <img
                                src="/icons/DownloadSimple.svg"
                                alt=""
                                width={15}
                              />
                              <span>Regularize payment</span>
                            </Link>
                          ) : (
                            <button
                              onClick={() =>
                                handleDownloadCertificate(cert)
                              }
                              className="w-full flex gap-2 items-center justify-center bg-white border border-[#000000] text-gray-700 rounded-md py-2 px-4 text-sm"
                            >
                              <img
                                src="/icons/DownloadSimple.svg"
                                alt=""
                                width={15}
                              />
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
                  <a
                    href="#"
                    onClick={openContactModal}
                    className="text-green-600 underline"
                  >
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