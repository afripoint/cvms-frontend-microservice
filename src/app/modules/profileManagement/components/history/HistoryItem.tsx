

// import { HistoryItem as HistoryItemType } from '../../types/index';

// interface HistoryItemProps {
//   item: HistoryItemType;
// }

// const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
//   return (
//     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 border-b bg-gray-50 rounded-lg">
//       <div className="mb-2 sm:mb-0">
//         <h4 className="font-medium">{item.vin}</h4>
//         <h4 className="font-medium">{item.make}</h4>

//         <div className="text-gray-500 text-xs sm:text-sm">
//           {item.amount} • {item.date}
//         </div>
//       </div>
//       <div className="self-start sm:self-auto">
//         {item.status === 'Successful' ? (
//           <span className="bg-green-100 text-green-600 text-xs px-2 sm:px-3 py-1 rounded-full">
//             • Successful
//           </span>
//         ) : (
//           <span className="bg-red-100 text-red-600 text-xs px-2 sm:px-3 py-1 rounded-full">
//             • Failed
//           </span>
//         )}
//       </div>

//       <div>
//         <button>
//           Download Certificate
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HistoryItem;




import React from 'react';
import { HistoryItem as HistoryItemType } from '../../types/index';
import { generateCertificate } from '../../../report/services/certificateService';

interface HistoryItemProps {
  item: HistoryItemType;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  
  const handleDownloadCertificate = async () => {
    try {
      // Get auth token from localStorage
      const getAuthToken = (): string | null => {
        const directToken = localStorage.getItem("authToken")
        if (directToken) {
          try {
            return JSON.parse(directToken)
          } catch (e) {
            return directToken
          }
        }

        const tokenDataStr = localStorage.getItem('token_data')
        if (tokenDataStr) {
          try {
            const tokenData = JSON.parse(tokenDataStr)
            return tokenData?.access_token || null
          } catch (e) {
            console.error("Error parsing token data:", e)
            return null
          }
        }
        return null
      }

      const token = getAuthToken();
      if (!token) {
        alert('Authentication token not found. Please log in again.');
        return;
      }

      // Fetch detailed certificate data for this VIN
      const response = await fetch('https://cvms-microservice.afripointdev.com/vin/vin-search-history/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch certificate data');
      }

      const data = await response.json();
      
      // Find the specific record for this VIN and date
      const certificateData = data.vin_searches_history.find((record: any) => 
        record.vin === item.vin && record.created_at === item.created_at
      );

      if (!certificateData) {
        alert('Certificate data not found for this record.');
        return;
      }

      // Prepare certificate data in the format expected by certificateService
      const certificatePayload = {
        vin: certificateData.vin,
        makeModel: certificateData.make || 'N/A',
        model: certificateData.model || 'N/A',
        year: certificateData.vehicle_year || 'N/A',
        certificateNumber: certificateData.ref_number || generateCertificateNumber(),
        ownerName: certificateData.owner_name || 'Vehicle Owner', // Add if available in API
        ownerAddress: certificateData.owner_address || 'Address not provided', // Add if available in API
        date: new Date(certificateData.created_at).toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        qrCodeBase64: certificateData.qr_code_base64 // Use existing QR code if available
      };

      // Use the certificate service to generate the PDF
      await generateCertificate(certificatePayload);
      
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Failed to generate certificate. Please try again.');
    }
  };

  // Helper function to generate certificate number if not available
  const generateCertificateNumber = (): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `CERT-${timestamp}-${random}`;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 border-b bg-gray-50 rounded-lg">
      <div className="mb-2 sm:mb-0">
        <div className="flex space-x-2">
              {/* <div className="bg-green-50 p-2 rounded-md mr-2"> */}
                  <img
                    src="/images/fileVINSearch.svg"
                    alt="VIN Search"
                    className="w-10 h-10"
                  />
                {/* </div> */}
                <h4 className="font-medium">{item.vin}</h4>
          </div>
        
        {/* <h4 className="font-medium">{item.make}</h4> */}

        <div className="text-gray-500 text-xs sm:text-sm ml-12">
          {item.amount} • {item.date}
        </div>
      </div>
      <div className="self-start sm:self-auto">
        {item.status === 'Successful' ? (
          <span className="bg-green-100 text-green-600 text-xs px-2 sm:px-3 py-1 rounded-full">
            • Successful
          </span>
        ) : (
          <span className="bg-red-100 text-red-600 text-xs px-2 sm:px-3 py-1 rounded-full">
            • Failed
          </span>
        )}
      </div>

      <div>
        <button
          onClick={handleDownloadCertificate}
          className="bg-green-600  text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={item.status !== 'Successful'}
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default HistoryItem;