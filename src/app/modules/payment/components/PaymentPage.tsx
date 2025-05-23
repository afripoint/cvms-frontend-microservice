// import React, { useState } from 'react';
// import RemitaPayment from './modal/RemitaPayment';

// const PaymentPage: React.FC = () => {
//   const [paymentAmount, setPaymentAmount] = useState<string>('1000');
//   const [customerName, setCustomerName] = useState<string>('');
//   const [customerEmail, setCustomerEmail] = useState<string>('');
//   const [paymentStatus, setPaymentStatus] = useState<string>('');
//   const [statusColor, setStatusColor] = useState<string>('text-gray-500');

//   // Generate a unique transaction ID
//   const generateTransactionId = () => {
//     return `TXN-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
//   };

//   const handlePaymentSuccess = (response: any) => {
//     console.log('Payment successful:', response);
//     setPaymentStatus('Payment completed successfully!');
//     setStatusColor('text-green-600');
//     // You would typically store the transaction details or update your UI
//   };

//   const handlePaymentError = (error: any) => {
//     console.error('Payment failed:', error);
//     setPaymentStatus('Payment failed. Please try again.');
//     setStatusColor('text-red-600');
//   };

//   const handlePaymentClose = () => {
//     setPaymentStatus('Payment window closed.');
//     setStatusColor('text-gray-600');
//   };

//   const remitaConfig = {
//     key: "QzAwMDAxOTUwNjl8MTEwNjE4NjF8OWZjOWYwNmMyZDk3MDRhYWM3YThiOThlNTNjZTE0ZWM4ZDY5ZGU5ZTc4NmRiMjYxYWFkNGMxNzc4YWNkYmMwYWRhOGI3ZmY0YTJlNTQ1ZTBmMGRlY2RhZjljYjdlYWZiMGM1ODhiMGE5ZDFiOTgyNjZhZTkxYzc=", // Replace with your actual public key
//     customerId: customerEmail,
//     firstName: customerName.split(' ')[0] || 'John',
//     lastName: customerName.split(' ')[1] || 'Doe',
//     email: customerEmail || 'customer@example.com',
//     amount: parseFloat(paymentAmount) || 1000,
//     narration: "Payment for services",
//     transactionId: generateTransactionId(),
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Complete Your Payment</h1>
      
//       <div className="space-y-4 mb-6">
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//           <input
//             type="text"
//             id="name"
//             value={customerName}
//             onChange={(e) => setCustomerName(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             placeholder="John Doe"
//           />
//         </div>
        
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//           <input
//             type="email"
//             id="email"
//             value={customerEmail}
//             onChange={(e) => setCustomerEmail(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             placeholder="john@example.com"
//           />
//         </div>
        
//         <div>
//           <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount (NGN)</label>
//           <input
//             type="number"
//             id="amount"
//             value={paymentAmount}
//             onChange={(e) => setPaymentAmount(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             placeholder="1000"
//             min="100"
//           />
//         </div>
//       </div>
      
//       <div className="mt-6">
//         <RemitaPayment
//           config={remitaConfig}
//           onSuccess={handlePaymentSuccess}
//           onError={handlePaymentError}
//           onClose={handlePaymentClose}
//           buttonText="Complete Payment"
//           className="w-full py-3"
//         />
//       </div>
      
//       {paymentStatus && (
//         <div className={`mt-4 p-3 rounded-md bg-gray-50 ${statusColor}`}>
//           {paymentStatus}
//         </div>
//       )}
      
//       <div className="mt-6 text-center text-xs text-gray-500">
//         <p>Secured by Remita Payment Services</p>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;