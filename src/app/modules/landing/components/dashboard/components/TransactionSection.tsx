// "use client"

// import type React from "react"
// import { useState } from "react"
// import type { Transaction } from "../../../types/dashboard"

// import { sampleTransactions } from "../../../constants/dashboard"
// import TimeDropdown from "../../../../shared/components/ui/TimeDropDown"

// const TransactionsSection: React.FC = () => {
//   const [transactions] = useState<Transaction[]>(sampleTransactions)

//   return (
//     <div className="max-w-3xl mx-auto bg-white rounded-lg px-4 pb-1 shadow-md">
//       <div className="flex justify-between items-center mb-4 pt-6">
//         <h2 className="text-lg font-medium">Transactions</h2>
//         <div className="flex items-center space-x-2">
//           <TimeDropdown />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200 ">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Products
//               </th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white">
//             {transactions.map((transaction) => (
//               <tr key={transaction.id}>
//                 <td className="px-4 py-2 whitespace-nowrap text-[#000000] text-sm font-medium">
//                   {transaction.products}
//                 </td>
//                 <td className="px-4 py-2 whitespace-nowrap text-sm text-[#000000]">{transaction.date}</td>
//                 <td className="px-4 py-2 whitespace-nowrap text-[#000000] text-sm">{transaction.amount}</td>
//                 <td className="px-4 py-2 whitespace-nowrap divide-y divide-gray-200">
//                   <span
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                     ${
//                       transaction.status === "completed"
//                         ? "text-[#34C759]"
//                         : transaction.status === "pending"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {transaction.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default TransactionsSection

