// import { useState } from 'react'
// import { GatewayMethod, PaymentMethod, Plan } from '../types'


// export const usePaymentMethods = () => {
//   const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
//   const [selectedGateway, setSelectedGateway] = useState<GatewayMethod>("paystack")
//   const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

//   const selectMethod = (method: PaymentMethod) => {
//     setSelectedMethod(method)
//   }

//   const selectPlan = (plan: Plan) => {
//     setSelectedPlan(plan)
//   }

//   const reset = () => {
//     setSelectedMethod(null)
//     setSelectedPlan(null)
//   }

//   return {
//     selectedMethod,
//     selectedGateway,
//     selectedPlan,
//     selectMethod,
//     selectPlan,
//     setSelectedGateway,
//     reset
//   }
// }