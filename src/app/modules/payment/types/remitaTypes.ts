// /// <reference types="vite/client" />

// // Enhanced Remita Payment Engine Types
// interface RemitaPaymentConfig {
//   key: string; // Merchant ID
//   customerId: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   amount: number;
//   narration: string;
//   transactionId: string; // RRR code
//   onSuccess: (response: RemitaSuccessResponse) => void;
//   onError: (error: RemitaErrorResponse) => void;
//   onClose: () => void;
// }

// interface RemitaSuccessResponse {
//   status: string;
//   transactionId: string;
//   paymentReference: string;
//   amount: number;
//   channel: string;
//   // Add other properties as needed based on actual Remita response
// }

// interface RemitaErrorResponse {
//   status: string;
//   message: string;
//   transactionId?: string;
//   // Add other error properties as needed
// }

// interface RemitaPaymentEngine {
//   showPaymentWidget: (options: RemitaPaymentConfig) => void;
// }

// // Global Window interface extension
// // declare global {
// //   interface Window {
// //     RmPaymentEngine?: new () => RemitaPaymentEngine;
// //   }
// // }

// // Export types for use in other files
// export type {
//   RemitaPaymentConfig,
//   RemitaSuccessResponse,
//   RemitaErrorResponse,
//   RemitaPaymentEngine
// };