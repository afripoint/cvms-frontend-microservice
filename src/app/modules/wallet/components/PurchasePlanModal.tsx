// import React, { useState } from 'react'
// import { Plan } from '../types'
// import { PAYMENT_PLANS } from '../constants/plans'

// interface PurchasePlanModalProps {
//   onClose: () => void
//   onSelectPlan: (plan: Plan) => void
// }

// export const PurchasePlanModal: React.FC<PurchasePlanModalProps> = ({ 
//   onClose, 
//   onSelectPlan 
// }) => {
//   const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

//   const handleContinue = () => {
//     if (selectedPlan) {
//       const plan = PAYMENT_PLANS.find(p => p.name === selectedPlan)
//       if (plan) {
//         onSelectPlan(plan)
//       }
//     }
//   }

//   return (
//     <div className="fixed inset-0 z-50 mt-12 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
//       <div className="bg-white rounded-lg w-full max-w-md sm:max-w-lg shadow-lg my-8">
//         <div className="p-4 relative max-h-[80vh] overflow-y-auto">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-md font-medium">All available plans</h2>
//             <button onClick={onClose} className="text-gray-500 text-xl hover:text-gray-700">
//               ×
//             </button>
//           </div>

//           <div className="space-y-2 mb-4">
//             {PAYMENT_PLANS.map((plan) => (
//               <div
//                 key={plan.name}
//                 onClick={() => setSelectedPlan(plan.name)}
//                 className={`border rounded-lg p-3 cursor-pointer ${
//                   selectedPlan === plan.name 
//                     ? "border-2 border-[#00A229]" 
//                     : "border border-[#D1D1D1] hover:border-gray-300"
//                 }`}
//               >
//                 <div className="flex items-center justify-between mb-1">
//                   <div className="flex items-center">
//                     <input
//                       type="radio"
//                       name="plan"
//                       checked={selectedPlan === plan.name}
//                       onChange={() => setSelectedPlan(plan.name)}
//                       className="h-4 w-4 border-gray-300 focus:ring-[#00A229] accent-[#00A229]"
//                       style={{ accentColor: "#10b981" }}
//                     />
//                     <span className="ml-2 font-bold text-sm">{plan.name}</span>
//                   </div>
//                   <span className="font-bold text-sm">{plan.price}</span>
//                 </div>
//                 <div className="ml-6 text-xs text-[#000000]">
//                   <div>{plan.description}</div>
//                   <div className="text-xs text-[#8E8E93] mt-1">{plan.subText}</div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={handleContinue}
//             disabled={!selectedPlan}
//             className={`w-full py-2 text-center rounded-lg font-medium ${
//               selectedPlan
//                 ? "bg-[#00A229] text-white hover:bg-green-600"
//                 : "bg-gray-200 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }