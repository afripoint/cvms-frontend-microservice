// import React from 'react'
// import { Plan } from '../types'
// import { Card, CardContent, CardHeader, CardTitle } from '../../shared/components/ui'
// import { formatCurrency } from '../utils/paymentUtils'


// interface OrderSummaryProps {
//   selectedPlan: Plan | null
//   totalPrice: number
//   discount: number
//   orderTotal: number
//   hasWallet: boolean
//   walletBalance: number
//   hasSufficientBalance: boolean
//   selectedMethod: string | null
// }

// export const OrderSummary: React.FC<OrderSummaryProps> = ({
//   selectedPlan,
//   totalPrice,
//   discount,
//   orderTotal,
//   hasWallet,
//   walletBalance,
//   hasSufficientBalance,
//   selectedMethod
// }) => {
//   return (
//     <Card className="w-full lg:w-[400px] shadow-md p-4 bg-[#F2F2F7]">
//       <CardHeader className="px-0 py-2">
//         <CardTitle className="text-md font-bold">Order Summary</CardTitle>
//       </CardHeader>
//       <CardContent className="px-0 py-2">
//         <div className="space-y-2">
//           {selectedPlan ? (
//             <div className="flex justify-between">
//               <span className="text-gray-600">{selectedPlan.name}</span>
//               <span className="font-bold">{formatCurrency(selectedPlan.numericPrice)}</span>
//             </div>
//           ) : (
//             <div className="flex justify-between">
//               <span className="text-gray-600">Subtotal</span>
//               <span className="font-bold">{formatCurrency(totalPrice)}</span>
//             </div>
//           )}
          
//           {!selectedPlan && discount > 0 && (
//             <div className="flex justify-between">
//               <span className="text-gray-600">Promo Discount</span>
//               <span className="text-black">-{formatCurrency(discount)}</span>
//             </div>
//           )}
          
//           <div className="border-t-2 pt-3 flex justify-between font-bold text-base sm:text-lg">
//             <span>Est. Total</span>
//             <span>{formatCurrency(orderTotal)}</span>
//           </div>

//           {/* Show wallet balance if available */}
//           {hasWallet && (
//             <div className="border-t pt-2 mt-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Wallet Balance</span>
//                 <span className={`font-semibold ${hasSufficientBalance ? 'text-green-600' : 'text-red-600'}`}>
//                   {formatCurrency(walletBalance)}
//                 </span>
//               </div>
//               {selectedMethod === "wallet" && hasSufficientBalance && (
//                 <div className="flex justify-between text-sm mt-1">
//                   <span className="text-gray-600">After Payment</span>
//                   <span className="font-semibold text-blue-600">
//                     {formatCurrency(walletBalance - orderTotal)}
//                   </span>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
