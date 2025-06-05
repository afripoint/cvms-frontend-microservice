// import React from 'react'
// import { Wallet, CreditCard } from 'lucide-react'
// import { PaymentMethod } from '../types'
// import { formatCurrency } from '../utils/paymentUtils'


// interface PaymentMethodSelectorProps {
//   hasWallet: boolean
//   walletBalance: number
//   hasSufficientBalance: boolean
//   selectedMethod: PaymentMethod | null
//   selectedPlan: any
//   walletLoading: boolean
//   onMethodSelect: (method: PaymentMethod) => void
// }

// export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
//   hasWallet,
//   walletBalance,
//   hasSufficientBalance,
//   selectedMethod,
//   selectedPlan,
//   walletLoading,
//   onMethodSelect
// }) => {
//   return (
//     <div className="space-y-3 sm:space-y-4">
//       {/* Wallet Payment Option */}
//       {hasWallet && (
//         <div
//           className={`cursor-pointer rounded-lg p-3 border-2 flex items-center transition-all duration-200 ${
//             selectedMethod === "wallet" 
//               ? "border-green-500 bg-green-50" 
//               : "border-gray-200 hover:border-gray-300"
//           } ${!hasSufficientBalance ? "opacity-60" : ""}`}
//           onClick={() => onMethodSelect("wallet")}
//         >
//           <input
//             type="radio"
//             name="paymentMethod"
//             checked={selectedMethod === "wallet"}
//             onChange={() => onMethodSelect("wallet")}
//             className="mr-2 sm:mr-4 h-4 sm:h-5 w-4 sm:w-5 text-green-600"
//             style={{ accentColor: "#10b981" }}
//             disabled={!hasSufficientBalance}
//           />
//           <div className="flex-grow flex items-center justify-between">
//             <div className="flex items-center">
//               <Wallet className="w-5 h-5 mr-2 text-green-600" />
//               <div>
//                 <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
//                   Pay with Wallet
//                 </h3>
//                 <p className="text-xs sm:text-sm text-gray-500">
//                   Balance: {formatCurrency(walletBalance)}
//                   {!hasSufficientBalance && (
//                     <span className="text-red-500 ml-2">(Insufficient funds)</span>
//                   )}
//                 </p>
//               </div>
//             </div>
//           </div>
//           {hasSufficientBalance && (
//             <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded ml-2">
//               Available
//             </span>
//           )}
//         </div>
//       )}

//       {/* One-Time Payment Option */}
//       <div
//         className={`cursor-pointer rounded-lg p-3 border-2 flex items-center transition-all duration-200 ${
//           selectedMethod === "oneTime" 
//             ? "border-green-500 bg-green-50" 
//             : "border-gray-200 hover:border-gray-300"
//         }`}
//         onClick={() => onMethodSelect("oneTime")}
//       >
//         <input
//           type="radio"
//           name="paymentMethod"
//           checked={selectedMethod === "oneTime"}
//           onChange={() => onMethodSelect("oneTime")}
//           className="mr-2 sm:mr-4 h-4 sm:h-5 w-4 sm:w-5 text-green-600"
//           style={{ accentColor: "#10b981" }}
//         />
//         <div className="flex-grow flex items-center justify-between">
//           <div className="flex items-center">
//             <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
//             <div>
//               <h3 className="font-semibold text-gray-800 text-sm sm:text-base">One-Time Payment</h3>
//               <p className="text-xs sm:text-sm text-gray-500">
//                 {selectedPlan ? `Pay ${selectedPlan.price} for ${selectedPlan.name}` : "Pay using Remita/Paystack"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Purchase Plan Option */}
//       {!hasWallet && (
//         <div
//           className={`cursor-pointer rounded-lg p-3 border-2 flex items-center relative transition-all duration-200 ${
//             selectedMethod === "purchase" 
//               ? "border-green-500 bg-green-50" 
//               : "border-gray-200 hover:border-gray-300"
//           }`}
//           onClick={() => onMethodSelect("purchase")}
//         >
//           <input
//             type="radio"
//             name="paymentMethod"
//             checked={selectedMethod === "purchase"}
//             onChange={() => onMethodSelect("purchase")}
//             className="mr-2 sm:mr-4 h-4 sm:h-5 w-4 sm:w-5 text-green-600"
//             style={{ accentColor: "#10b981" }}
//           />
//           <div className="flex-grow flex items-center justify-between pr-16 sm:pr-20">
//             <div>
//               <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Purchase Payment Plan</h3>
//               <p className="text-xs sm:text-sm text-gray-500">
//                 {selectedPlan 
//                   ? `Selected: ${selectedPlan.name} (${selectedPlan.description})` 
//                   : "Subscribe to run multiple searches and save more cost"}
//               </p>
//             </div>
//           </div>
//           <span className="absolute right-0 mr-2 bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded">
//             Recommended
//           </span>
//         </div>
//       )}

//       {/* Loading indicator */}
//       {walletLoading && (
//         <div className="flex items-center justify-center p-4">
//           <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
//           <span className="ml-2 text-sm text-gray-600">Loading wallet...</span>
//         </div>
//       )}
//     </div>
//   )
// }