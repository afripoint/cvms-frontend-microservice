// import { useMemo } from 'react'
// import { Plan } from '../types'


// export const usePaymentCalculations = (
//   selectedPlan: Plan | null,
//   totalPrice: number,
//   discount: number,
//   walletBalance: number
// ) => {
//   return useMemo(() => {
//     const orderTotal = selectedPlan ? selectedPlan.numericPrice : (totalPrice - discount)
//     const hasSufficientBalance = walletBalance >= orderTotal
    
//     return {
//       orderTotal,
//       hasSufficientBalance,
//       remainingBalance: walletBalance - orderTotal
//     }
//   }, [selectedPlan, totalPrice, discount, walletBalance])
// }
