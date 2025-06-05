// import { PaymentDetails } from "../types"


// export class PaymentService {
//   static async processWalletPayment(paymentDetails: PaymentDetails): Promise<boolean> {
//     try {
//       // API call to process wallet payment
//       const response = await fetch('/api/payments/wallet', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(paymentDetails),
//       })
      
//       return response.ok
//     } catch (error) {
//       console.error('Wallet payment failed:', error)
//       return false
//     }
//   }

//   static async processGatewayPayment(
//     method: 'remita' | 'paystack',
//     amount: number,
//     reference: string
//   ): Promise<boolean> {
//     try {
//       // API call to process gateway payment
//       const response = await fetch('/api/payments/gateway', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ method, amount, reference }),
//       })
      
//       return response.ok
//     } catch (error) {
//       console.error('Gateway payment failed:', error)
//       return false
//     }
//   }
// }