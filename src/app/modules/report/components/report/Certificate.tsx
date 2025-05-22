import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Footer, Header } from '../../../landing/components/layout';

interface CertificateDetails {
  vin: string;
  certificateNumber: string;
  date: string;
  makeModel?: string;
  year?: string;
  ownerName?: string;
  status?: string;
}

const VerifyCertificatePage = () => {
  const [searchParams] = useSearchParams();
  const [certificateDetails, setCertificateDetails] = useState<CertificateDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'verified' | 'error' | 'pending'>('pending');

  useEffect(() => {
    const verifyDetails = async () => {
      try {
        setLoading(true);
        
        // Get parameters from URL
        const vin = searchParams.get('vin');
        const cert = searchParams.get('cert');
        const date = searchParams.get('date');
        
        if (!vin || !cert) {
          throw new Error('Missing required certificate information');
        }
        
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          throw new Error('Authentication required');
        }
        
        // Fetch certificate details from backend
        const response = await fetch('http://cvms-microservice.afripointdev.com/vin/search-history/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to verify certificate: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Find matching record
        const vehicleRecord = data.Search_histories.find((record: any) => {
          return (
            (record.vin?.vin === vin) && 
            (record.cert_num === cert)
          );
        });
        
        if (!vehicleRecord) {
          // Basic verification with URL parameters
          setCertificateDetails({
            vin: vin,
            certificateNumber: cert,
            date: date || new Date().toLocaleDateString(),
            status: 'Limited verification - database record not found'
          });
          setVerificationStatus('error');
        } else {
          // Full verification with database record
          setCertificateDetails({
            vin: vehicleRecord.vin?.vin || vin,
            certificateNumber: vehicleRecord.cert_num || cert,
            date: date || vehicleRecord.created_at || new Date().toLocaleDateString(),
            makeModel: vehicleRecord.vin?.brand || '',
            year: vehicleRecord.vin?.vehicle_year || '',
            ownerName: vehicleRecord.user?.full_name || '',
            status: 'Fully verified'
          });
          setVerificationStatus('verified');
        }
      } catch (error) {
        console.error('Verification error:', error);
        // Use URL parameters as fallback
        const vin = searchParams.get('vin');
        const cert = searchParams.get('cert');
        const date = searchParams.get('date');
        
        if (vin && cert) {
          setCertificateDetails({
            vin,
            certificateNumber: cert,
            date: date || new Date().toLocaleDateString(),
            status: 'Verification failed'
          });
        }
        setVerificationStatus('error');
      } finally {
        setLoading(false);
      }
    };
    
    verifyDetails();
  }, [searchParams]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      
      <main className="flex-grow container mx-auto px-4 py-4 mb-4 mt-12">
        <h1 className="text-2xl font-bold text-center mt-8 mb-6">Certificate Verification</h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Status Header */}
            <div className={`p-4 text-white ${
              verificationStatus === 'verified' ? 'bg-green-500' : 
              verificationStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'
            }`}>
              <div className="flex items-center">
                {verificationStatus === 'verified' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
                <h2 className="text-lg font-semibold">
                  {verificationStatus === 'verified' ? 'Certificate Verified' : 
                   verificationStatus === 'error' ? 'Verification Issue' : 'Verifying...'}
                </h2>
              </div>
              {certificateDetails?.status && (
                <p className="mt-1 text-sm opacity-90">{certificateDetails.status}</p>
              )}
            </div>
            
            {/* Certificate Details */}
            {certificateDetails && (
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    {/* <h3 className="text-sm font-medium text-gray-500">Certificate Number</h3>
                    <p className="mt-1 text-lg font-semibold">{certificateDetails.certificateNumber}</p> */}
                  </div>
                  
                  <div>
                    {/* <h3 className="text-sm font-medium text-gray-500">VIN</h3>
                    <p className="mt-1 text-lg font-semibold">{certificateDetails.vin}</p> */}
                  </div>
                  
                  {certificateDetails.makeModel && (
                    <div>
                      {/* <h3 className="text-sm font-medium text-gray-500">Make/Model</h3>
                      <p className="mt-1">{certificateDetails.makeModel}</p> */}
                    </div>
                  )}
                  
                  {certificateDetails.year && (
                    <div>
                      {/* <h3 className="text-sm font-medium text-gray-500">Year</h3>
                      <p className="mt-1">{certificateDetails.year}</p> */}
                    </div>
                  )}
                  
                  {certificateDetails.ownerName && (
                    <div>
                      {/* <h3 className="text-sm font-medium text-gray-500">Owner</h3>
                      <p className="mt-1">{certificateDetails.ownerName}</p> */}
                    </div>
                  )}
                  
                  <div>
                    {/* <h3 className="text-sm font-medium text-gray-500">Issue Date</h3>
                    <p className="mt-1">{certificateDetails.date}</p> */}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <button 
                    onClick={() => window.print()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print Certificate Details
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer/>
    </div>
  );
};

export default VerifyCertificatePage;