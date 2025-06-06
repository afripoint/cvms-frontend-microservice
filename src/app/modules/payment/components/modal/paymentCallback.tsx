// import React, { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { clearCart } from '../../../cart/redux/slices/cartSlice';
// import { addReport } from '../../../report/redux/slices/certificateSlice';

// interface PaymentData {
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
//   timestamp: number;
// }

// const PaymentCallback: React.FC = () => {
//   const [isVerifying, setIsVerifying] = useState(true);
//   const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');
//   const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [searchParams] = useSearchParams();

//   // API instance with token handling
//   const getApiInstance = () => {
//     const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
//     return axios.create({
//       baseURL: 'https://cvms-microservice.afripointdev.com/vin',
//       headers: {
//         'Authorization': token ? `Bearer ${token}` : undefined
//       }
//     });
//   };

//   useEffect(() => {
//     handlePaymentCallback();
//   }, []);

//   const handlePaymentCallback = async () => {
//     try {
//       // Get parameters from URL
//       const reference = searchParams.get('reference');
//       const status = searchParams.get('status');

//       console.log('Payment callback received:', { reference, status });

//       if (!reference) {
//         throw new Error('No payment reference found in callback');
//       }

//       // Get stored payment data
//       const storedData = sessionStorage.getItem('pendingPaymentData');
//       if (!storedData) {
//         throw new Error('No pending payment data found');
//       }

//       const parsedPaymentData: PaymentData = JSON.parse(storedData);
//       setPaymentData(parsedPaymentData);

//       // Verify the reference matches
//       if (parsedPaymentData.reference !== reference) {
//         throw new Error('Payment reference mismatch');
//       }

//       // Check if payment was successful from Paystack
//       if (status !== 'success') {
//         setVerificationStatus('failed');
//         toast.error('Payment was not successful');
        
//         // Store failed payment data for success page
//         const failedPaymentData = {
//           ...parsedPaymentData,
//           verificationStatus: 'failed',
//           paymentState: 'FAILED'
//         };
//         sessionStorage.setItem('paymentResult', JSON.stringify(failedPaymentData));
        
//         // Redirect to success page to show failure
//         setTimeout(() => {
//           navigate('/success-payment');
//         }, 2000);
//         return;
//       }

//       // Call backend verification endpoint
//       console.log('Verifying payment with backend...');
//       const api = getApiInstance();
//       const verificationResponse = await api.get(
//         `/verify-one-time-payment/${reference}?payment_gateway=paystack`
//       );

//       console.log('Backend verification successful:', verificationResponse.data);

//       // Clear cart after successful verification
//       dispatch(clearCart());

//       // Add reports to Redux store
//       parsedPaymentData.items.forEach((item, index) => {
//         if (item.vin || item.id.includes('vin')) {
//           const vin = item.vin || `${index + 1}`;
//           dispatch(addReport({
//             id: Date.now() + index,
//             title: item.name,
//             vin,
//             action: 'download',
//             downloadUrl: `/api/reports/${reference}/download`,
//             isCertificate: true,
//           }));
//         }
//       });

//       setVerificationStatus('success');
      
//       // Store successful payment data for success page
//       const successPaymentData = {
//         ...parsedPaymentData,
//         verificationStatus: 'verified',
//         paymentState: 'SUCCESSFUL'
//       };
//       sessionStorage.setItem('paymentResult', JSON.stringify(successPaymentData));

//       // Clean up pending payment data
//       sessionStorage.removeItem('pendingPaymentData');

//       toast.success('Payment verified successfully!');

//       // Redirect to success page
//       setTimeout(() => {
//         navigate('/success-payment');
//       }, 2000);

//     } catch (error) {
//       console.error('Payment callback error:', error);
//       setVerificationStatus('failed');
      
//       // Store error information
//       if (paymentData) {
//         const errorPaymentData = {
//           ...paymentData,
//           verificationStatus: 'failed',
//           paymentState: 'VERIFICATION_FAILED'
//         };
//         sessionStorage.setItem('paymentResult', JSON.stringify(errorPaymentData));
//       }

//       toast.error('Payment verification failed. Please contact support.');
      
//       // Redirect to success page to show error
//       setTimeout(() => {
//         navigate('/success-payment');
//       }, 2000);
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   const getStatusIcon = () => {
//     switch (verificationStatus) {
//       case 'success':
//         return (
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//         );
//       case 'failed':
//         return (
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </div>
//         );
//       default:
//         return (
//           <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//           </div>
//         );
//     }
//   };

//   const getStatusMessage = () => {
//     switch (verificationStatus) {
//       case 'success':
//         return {
//           title: 'Payment Successful!',
//           message: 'Your payment has been verified successfully. Redirecting to your receipt...',
//           color: 'text-green-600'
//         };
//       case 'failed':
//         return {
//           title: 'Payment Verification Failed',
//           message: 'There was an issue verifying your payment. Please contact support. Redirecting...',
//           color: 'text-red-600'
//         };
//       default:
//         return {
//           title: 'Verifying Payment...',
//           message: 'Please wait while we verify your payment with our servers.',
//           color: 'text-blue-600'
//         };
//     }
//   };

//   const statusInfo = getStatusMessage();

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
//         {getStatusIcon()}
        
//         <h1 className={`text-2xl font-bold mb-4 ${statusInfo.color}`}>
//           {statusInfo.title}
//         </h1>
        
//         <p className="text-gray-600 mb-6 leading-relaxed">
//           {statusInfo.message}
//         </p>

//         {paymentData && (
//           <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
//             <h3 className="font-semibold text-gray-800 mb-2">Payment Details</h3>
//             <div className="space-y-1 text-sm text-gray-600">
//               <div className="flex justify-between">
//                 <span>Amount:</span>
//                 <span className="font-medium">₦{paymentData.amount.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Reference:</span>
//                 <span className="font-medium">{paymentData.reference}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Method:</span>
//                 <span className="font-medium capitalize">{paymentData.paymentMethod}</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {isVerifying && (
//           <div className="flex items-center justify-center space-x-2 text-blue-600">
//             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
//             <span className="text-sm">Processing...</span>
//           </div>
//         )}

//         <div className="mt-6">
//           <button
//             onClick={() => navigate('/')}
//             className="text-sm text-gray-500 hover:text-gray-700 underline"
//             disabled={isVerifying}
//           >
//             Return to Home
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentCallback;