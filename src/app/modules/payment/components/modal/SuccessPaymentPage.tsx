// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SuccessPaymentModal from './SuccessPaymentModal';

// interface PaymentResult {
//   reference: string;
//   transactionId: string;
//   transactionDate: string;
//   paymentMethod: string;
//   amount: number;
//   items: Array<{
//     id: string;
//     name: string;
//     quantity: number;
//     price: number;
//     type: string;
//     vin?: string;
//   }>;
//   gateway: string;
//   verificationStatus: 'pending' | 'verified' | 'failed';
//   paymentState: string;
// }

// const SuccessPaymentPage: React.FC = () => {
//   const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Get payment result from sessionStorage
//     const storedResult = sessionStorage.getItem('paymentResult');
    
//     if (storedResult) {
//       try {
//         const parsedResult: PaymentResult = JSON.parse(storedResult);
//         setPaymentResult(parsedResult);
//         setShowModal(true);
        
//         // Clean up the stored data
//         sessionStorage.removeItem('paymentResult');
//       } catch (error) {
//         console.error('Error parsing payment result:', error);
//         navigate('/');
//       }
//     } else {
//       // No payment result found, redirect to home
//       console.log('No payment result found, redirecting to home');
//       navigate('/');
//     }
//   }, [navigate]);

//   const handleModalClose = () => {
//     setShowModal(false);
//     navigate('/'); // or wherever you want to redirect after closing
//   };

//   if (!paymentResult) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {showModal && (
//         <SuccessPaymentModal
//           isOpen={showModal}
//           onClose={handleModalClose}
//           amount={paymentResult.amount}
//           transactionId={paymentResult.transactionId}
//           transactionDate={paymentResult.transactionDate}
//           paymentMethod={paymentResult.paymentMethod}
//           items={paymentResult.items}
//           verificationStatus={paymentResult.verificationStatus}
//         />
//       )}
//     </div>
//   );
// };

// export default SuccessPaymentPage;