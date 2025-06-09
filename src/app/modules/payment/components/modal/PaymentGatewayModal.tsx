// "use client"

// import type React from "react"
// import { useState, useEffect} from "react"
// import { toast, ToastContainer } from "react-toastify"
// // import "react-toastify/dist/ReactToastify.css"
// import SuccessPaymentModal from "./SuccessPaymentModal"
// import { useSelector, useDispatch } from "react-redux"
// import type { RootState } from "../../../../core/store"
// import { clearCart } from "../../../cart/redux/slices/cartSlice"
// import axios from "axios"

// // Types
// type PaymentStatus = "idle" | "processing" | "success" | "failed" | "timeout" | "pending"
// type VerificationStatus = "pending" | "verified" | "failed"

// interface PaymentDetails {
//   transactionId: string
//   transactionDate: string
//   paymentMethod: string
//   paymentState?: string
//   amount: number
//   verificationStatus?: VerificationStatus
//   items: Array<{
//     id: string
//     name: string
//     quantity: number
//     price: number
//     type: string
//   }>
// }

// interface CheckoutResponse {
//   message: string
//   reference?: string // For Paystack
//   rrr?: string // For Remita
//   payment_gateway: string
//   order_id?: string // For Remita
//   amount: number
//   authorization_url?: string // For Paystack
//   remita_inline_url?: string // For Remita
// }

// interface PaymentGatewayModalProps {
//   onClose: () => void
//   onPay: (method: string, reference?: string, status?: string) => void
//   total: number
//   email?: string
// }

// // Extend Window interface for Remita
// declare global {
//   interface Window {
//     RmPaymentEngine: any
//   }
// }




// const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
//   onClose,
//   onPay,
//   total,
//   email = "customer@example.com",
// }) => {
//   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
//   const cartItems = useSelector((state: RootState) => state.cart.items)
//   const dispatch = useDispatch()

//   const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
//   const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle")
//   const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
//     transactionId: "",
//     transactionDate: "",
//     paymentMethod: "",
//     amount: total,
//     verificationStatus: "pending",
//     items: [],
//   })
//   const [showSuccessModal, setShowSuccessModal] = useState(false)
//   const [savedCartItems, setSavedCartItems] = useState<typeof cartItems>([])
//   const [remitaLoaded, setRemitaLoaded] = useState(false)

//   // API instance with better token handling
//   const getApiInstance = () => {
//     const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
//     return axios.create({
//       baseURL: 'https://cvms-microservice.afripointdev.com/vin',
//       headers: {
//         'Authorization': token ? `Bearer ${token}` : undefined
//       }
//     })
//   }

//   // Remita configuration
//   const REMITA_MERCHANT_ID = "27768931"

//   // Save cart items before payment
//   useEffect(() => {
//     if (cartItems && cartItems.length > 0) {
//       setSavedCartItems([...cartItems])
//     }
//   }, [cartItems])

//    const loadRemitaScript = (src: string): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     // Check if script is already loaded
//     if (document.querySelector(script[src="${src}"])) {
//       resolve();
//       return;
//     }

//     const script = document.createElement("script");
//     script.src = src;
//     script.type = "text/javascript";
//     script.onload = () => resolve();
//     script.onerror = () => reject("Failed to load Remita script.");
//     document.body.appendChild(script);
//   });
// };
//   // Load Remita script dynamically
//   // const loadRemitaScript = (scriptUrl: string): Promise<void> => {
//   //   return new Promise((resolve, reject) => {
//   //     // Check if script is already loaded
//   //     if (typeof window !== 'undefined' && window.RmPaymentEngine) {
//   //       resolve()
//   //       return
//   //     }

//   //     const script = document.createElement('script')
//   //     script.src = scriptUrl
//   //     script.async = true

//   //     script.onload = () => {
//   //       if (typeof window !== 'undefined' && window.RmPaymentEngine) {
//   //         setRemitaLoaded(true)
//   //         resolve()
//   //       } else {
//   //         reject(new Error('RmPaymentEngine not available after script load'))
//   //       }
//   //     }

//   //     script.onerror = () => {
//   //       reject(new Error('Failed to load Remita script'))
//   //     }

//   //     document.head.appendChild(script)
//   //   })
//   // }

//   // Initialize Remita script on component mount
//   // useEffect(() => {
//   //   // Load the default demo script initially
//   //   const defaultScript = document.createElement('script')
//   //   defaultScript.src = 'https://demo.remita.net/payment/v1/remita-pay-inline.bundle.js'
//   //   defaultScript.async = true

//   //   defaultScript.onload = () => {
//   //     if (typeof window !== 'undefined' && window.RmPaymentEngine) {
//   //       setRemitaLoaded(true)
//   //     }
//   //   }

//   //   defaultScript.onerror = () => {
//   //     console.error('Failed to load default Remita script')
//   //   }

//   //   document.head.appendChild(defaultScript)

//   //   return () => {
//   //     // Cleanup scripts on unmount
//   //     const scripts = document.querySelectorAll('script[src*="remita-pay-inline.bundle.js"]')
//   //     scripts.forEach(script => {
//   //       if (script.parentNode) {
//   //         script.parentNode.removeChild(script)
//   //       }
//   //     })
//   //   }
//   // }, [])

//   // Format transaction date
//   const formatTransactionDate = () => {
//     return new Date().toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     })
//   }

//   // Call checkout endpoint for one-time payment
//   // const initiateCheckout = async (gateway: PaymentMethod): Promise<CheckoutResponse> => {
//   //   try {
//   //     const api = getApiInstance()
      
//   //     const requestPayload = {
//   //       gateway: gateway
//   //     }
      
//   //     console.log('=== CHECKOUT REQUEST DEBUG ===')
//   //     console.log('Sending checkout request to:', api.defaults.baseURL + '/checkout-one-time-payment/')
//   //     console.log('Request payload:', JSON.stringify(requestPayload, null, 2))
//   //     console.log('Request headers:', {
//   //       'Content-Type': 'application/json',
//   //       'Authorization': api.defaults.headers['Authorization']
//   //     })
      
//   //     const response = await api.post('/checkout-one-time-payment/', requestPayload, {
//   //       headers: {
//   //         'Content-Type': 'application/json'
//   //       }
//   //     })
      
//   //     console.log('=== CHECKOUT RESPONSE DEBUG ===')
//   //     console.log('Response status:', response.status)
//   //     console.log('Response data:', JSON.stringify(response.data, null, 2))
//   //     console.log('Response headers:', response.headers)
      
//   //     // Validate that we got the expected gateway response
//   //     if (response.data.payment_gateway !== gateway) {
//   //       console.error(`❌ GATEWAY MISMATCH: Expected '${gateway}' but received '${response.data.payment_gateway}'`)
//   //       console.error('This indicates a backend API issue. Please check:')
//   //       console.error('1. API endpoint is correctly handling the gateway parameter')
//   //       console.error('2. Database/backend logic is processing the request correctly')
//   //       console.error('3. No middleware is overriding the gateway parameter')
//   //     }
      
//   //     return response.data
//   //   } catch (error) {
//   //     console.error('=== CHECKOUT API ERROR ===')
//   //     console.error('Checkout API error:', error)
//   //     if (axios.isAxiosError(error)) {
//   //       console.error('Request config:', error.config)
//   //       console.error('Request data sent:', error.config?.data)
//   //       console.error('Response data:', error.response?.data)
//   //       console.error('Response status:', error.response?.status)
//   //       console.error('Response headers:', error.response?.headers)
//   //     }
//   //     throw new Error('Failed to initiate checkout process')
//   //   }
//   // }

//   const initiateCheckout = async (gateway: string): Promise<CheckoutResponse> => {
//   try {
//     const api = getApiInstance();
    
//     // Validate gateway parameter
//     if (!['remita', 'paystack'].includes(gateway)) {
//       throw new Error(`Invalid payment gateway specified: ${gateway}`);
//     }

//     // Use different parameter names based on gateway
//     const requestPayload = gateway === 'remita' 
//       ? { payment_gateway: gateway }
//       : { gateway: gateway };

//     console.log('Initiating checkout for:', gateway);
//     console.log('Request payload:', JSON.stringify(requestPayload, null, 2));

//     const response = await api.post('/checkout-one-time-payment/', requestPayload, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       timeout: 15000 // 15 second timeout
//     });

//     // Validate response structure
//     if (!response.data || typeof response.data !== 'object') {
//       throw new Error('Invalid response format from server');
//     }

//     // Gateway-specific validation
//     switch (gateway) {
//       case 'paystack':
//         if (!response.data.authorization_url || !response.data.reference) {
//           throw new Error('Missing required Paystack fields in response');
//         }
//         break;
      
//       case 'remita':
//         if (!response.data.rrr || !response.data.remita_inline_url) {
//           throw new Error('Missing required Remita fields in response');
//         }
//         break;
//     }

//     // Final gateway match verification
//     if (response.data.payment_gateway !== gateway) {
//       throw new Error(`Gateway mismatch: Requested ${gateway} but received ${response.data.payment_gateway}`);
//     }

//     return {
//       ...response.data,
//       payment_gateway: gateway // Ensure correct gateway is returned
//     };

//   } catch (error) {
//     console.error('Checkout failed for gateway:', gateway);
    
//     if (axios.isAxiosError(error)) {
//       console.error('Axios error details:', {
//         config: error.config,
//         response: error.response?.data,
//         status: error.response?.status
//       });
      
//       if (error.response) {
//         // Handle specific HTTP errors
//         switch (error.response.status) {
//           case 400:
//             throw new Error('Invalid request parameters');
//           case 401:
//             throw new Error('Authentication failed');
//           case 500:
//             throw new Error('Server error during payment processing');
//           default:
//             throw new Error(`Payment request failed with status ${error.response.status}`);
//         }
//       } else if (error.request) {
//         throw new Error('No response received from server');
//       }
//     }
    
//     throw new Error(error instanceof Error ? error.message : 'Unknown error during checkout');
//   }
// };

//   // Verify payment after successful transaction
//   const verifyPayment = async (reference: string, gateway: string) => {
//     try {
//       const api = getApiInstance()
//       const response = await api.get(`/verify-one-time-payment/${reference}?payment_gateway=${gateway}`)
//       return response.data
//     } catch (error) {
//       console.error('Payment verification error:', error)
//       throw new Error('Failed to verify payment')
//     }
//   }

//   const storePaymentData = (txnId: string, method: string, state?: string) => {
//     const paymentData = {
//       transactionId: txnId,
//       transactionDate: formatTransactionDate(),
//       paymentMethod: method,
//       paymentState: state,
//       amount: total,
//       items: savedCartItems.map(item => ({...item})),
//       gateway: method
//     }
    
//     if (typeof window !== 'undefined') {
//       sessionStorage.setItem('pendingPaymentVerification', JSON.stringify(paymentData))
//     }
//   }

//   // Handle payment completion for Remita
//   // const completeRemitaPayment = async (txnId: string, method: PaymentMethod, state?: string) => {
//   //   const txnDate = formatTransactionDate()
    
//   //   // Show success modal immediately with pending verification
//   //   const preliminaryPaymentDetails: PaymentDetails = {
//   //     transactionId: txnId,
//   //     transactionDate: txnDate,
//   //     paymentMethod: method,
//   //     paymentState: state,
//   //     amount: total,
//   //     verificationStatus: "pending",
//   //     items: savedCartItems.map(item => ({...item})),
//   //   }

//   //   // Show success modal immediately
//   //   setPaymentDetails(preliminaryPaymentDetails)
//   //   setPaymentStatus("success")
//   //   setShowSuccessModal(true)
//   //   onPay(method, txnId, state)

//   //   dispatch(clearCart())

//   //   // Backend verification for Remita
//   //   try {
//   //     console.log('Starting payment verification...')
//   //     await verifyPayment(txnId, method)
      
//   //     // Verification successful - update status
//   //     setPaymentDetails(prev => ({
//   //       ...prev,
//   //       verificationStatus: "verified"
//   //     }))
      
//   //     console.log('Payment verification completed successfully')
      
//   //   } catch (error) {
//   //     console.error('Payment verification error:', error)
      
//   //     // Verification failed - update status
//   //     setPaymentDetails(prev => ({
//   //       ...prev,
//   //       verificationStatus: "failed"
//   //     }))
      
//   //     toast.warn('Payment received but verification pending. Please contact support if needed.')
//   //   }
//   // }

//   // Handle modal close
//   const handleModalClose = () => {
//     setShowSuccessModal(false)
//     onClose()
//   }

//   // Handle Paystack payment
//   const handlePaystackPayment = async () => {
//     try {
//       setPaymentStatus("processing")
      
//       const checkoutResponse = await initiateCheckout("paystack")
      
//       // Validate that we got a Paystack response
//       if (checkoutResponse.payment_gateway !== "paystack") {
//         throw new Error(`Expected Paystack response but got ${checkoutResponse.payment_gateway}`)
//       }
      
//       if (!checkoutResponse.reference) {
//         throw new Error('Missing reference in Paystack API response')
//       }
      
//       if (!checkoutResponse.authorization_url) {
//         throw new Error('Missing authorization_url in Paystack API response')
//       }
      
//       // Store payment data before redirecting
//       storePaymentData(checkoutResponse.reference, "paystack", "PENDING")
      
//       // Redirect to Paystack authorization URL
//       window.location.href = checkoutResponse.authorization_url
      
//       dispatch(clearCart())
//     } catch (error) {
//       console.error("Paystack payment error:", error)
//       toast.error(`Failed to initiate Paystack payment: ${error instanceof Error ? error.message : 'Unknown error'}`)
//       setPaymentStatus("failed")
//     }
//   }

//   // Handle Remita payment


// const handleRemitaPayment = async () => {
//   try {
//     const checkoutResponse = await initiateCheckout("remita");
    
//     // Strict validation
//     if (checkoutResponse.payment_gateway !== "remita") {
//       throw new Error(`Backend returned ${checkoutResponse.payment_gateway} instead of remita`);
//     }

//     if (!checkoutResponse.rrr || !checkoutResponse.remita_inline_url) {
//       throw new Error("Missing required Remita fields in response");
//     }

//     // Proceed with Remita payment processing
//   } catch (error) {
//     console.error("Remita payment failed:", error);
//     toast.error("Remita service is currently unavailable. Please try Paystack.");
//     setPaymentStatus("failed");
//   }
// };
  

//   // Handle payment method selection
//   const handlePayment = () => {
//     console.log('handlePayment called with:', { 
//       selectedMethod, 
//       isAuthenticated, 
//       user,
//       paymentStatus 
//     })

//     if (!selectedMethod) {
//       console.log('No payment method selected')
//       return
//     }

//     // Process payment based on selected method
//     if (selectedMethod === "paystack") {
//       handlePaystackPayment()
//     } else if (selectedMethod === "remita") {
//       handleRemitaPayment()
//     }
//   }

//   return (
//     <>
//       <ToastContainer position="bottom-right" autoClose={5000} />

//       <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//         <div className="bg-white rounded-lg shadow-xl w-96 p-6">
//           <h2 className="text-xl text-[#34C759] font-bold mb-4 text-left">Confirm Payment</h2>
//           <p className="text-left text-[#000000] mb-4">Select your preferred payment option</p>

//           <div className="flex mb-6 justify-around">
//             <div
//               className={`flex items-center p-3 cursor-pointer border rounded-lg mr-4 relative ${
//                 selectedMethod === "remita" ? "border-green-500 bg-green-50" : "border-gray-200"
//               } `}
//               onClick={() => setSelectedMethod("remita")}
//             >
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 checked={selectedMethod === "remita"}
//                 onChange={() =>  setSelectedMethod("remita")}
//                 // disabled={!remitaLoaded}
//                 className="mr-3 h-5 w-5 text-green-600"
//               />
//               <img src="/icons/remita.svg" alt="Remita" className="h-8 w-16" />
              
//                 <span className="text-xs text-red-500 absolute -bottom-6 left-0 whitespace-nowrap">Loading service...</span>
              
//             </div>

//             <div
//               className={`flex items-center p-3 cursor-pointer border rounded-lg ${
//                 selectedMethod === "paystack" ? "border-green-500 bg-green-50" : "border-gray-200"
//               }`}
//               onClick={() => setSelectedMethod("paystack")}
//             >
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 checked={selectedMethod === "paystack"}
//                 onChange={() => setSelectedMethod("paystack")}
//                 className="mr-3 h-5 w-5 text-green-600"
//               />
//               <img src="/icons/Paystack.svg" alt="Paystack" className="h-8 w-30" />
//             </div>
//           </div>

//           <button
//             onClick={handlePayment}
//             disabled={!selectedMethod || paymentStatus === "processing"}
//             className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center ${
//               selectedMethod && paymentStatus !== "processing" 
//                 ? "bg-green-600 text-white hover:bg-green-700"
//                 : "bg-gray-200 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             {paymentStatus === "processing" ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Processing Payment...
//               </>
//             ) : (
//               `Pay ₦${total.toLocaleString()}`
//             )}
//           </button>

//           <div className="mt-4 text-center">
//             <button
//               onClick={onClose}
//               className="text-sm text-gray-600 hover:text-gray-800 underline"
//               disabled={paymentStatus === "processing"}
//             >
//               Cancel Payment
//             </button>
//           </div>
//         </div>
//       </div>

//       {showSuccessModal && paymentDetails.transactionId && (
//         <SuccessPaymentModal
//           isOpen={showSuccessModal}
//           onClose={handleModalClose}
//           amount={paymentDetails.amount}
//           transactionId={paymentDetails.transactionId}
//           transactionDate={paymentDetails.transactionDate}
//           paymentMethod={paymentDetails.paymentMethod === "paystack" ? "Paystack" : "Remita"}
//           items={paymentDetails.items}
//           verificationStatus={paymentDetails.verificationStatus}
//         />
//       )}
//     </>
//   )
// }

// export default PaymentGatewayModal




// "use client"

// import type React from "react"
// import { useState, useEffect} from "react"
// import { toast, ToastContainer } from "react-toastify"
// import SuccessPaymentModal from "./SuccessPaymentModal"
// import { useSelector, useDispatch } from "react-redux"
// import type { RootState } from "../../../../core/store"
// import { clearCart } from "../../../cart/redux/slices/cartSlice"
// import axios from "axios"

// // Global type declaration - MUST be at top level
// declare global {
//   interface Window {
//     RmPaymentEngine: any
//   }
// }

// // Types
// type PaymentStatus = "idle" | "processing" | "success" | "failed" | "timeout" | "pending"
// type VerificationStatus = "pending" | "verified" | "failed"

// interface PaymentDetails {
//   transactionId: string
//   transactionDate: string
//   paymentMethod: string
//   paymentState?: string
//   amount: number
//   verificationStatus?: VerificationStatus
//   items: Array<{
//     id: string
//     name: string
//     quantity: number
//     price: number
//     type: string
//   }>
// }

// interface CheckoutResponse {
//   message: string
//   reference?: string // For Paystack
//   rrr?: string // For Remita
//   payment_gateway: string
//   order_id?: string // For Remita
//   amount: number
//   authorization_url?: string // For Paystack
//   remita_inline_url?: string // For Remita
// }

// interface PaymentGatewayModalProps {
//   onClose: () => void
//   onPay: (method: string, reference?: string, status?: string) => void
//   total: number
//   email?: string
// }

// const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
//   onClose,
//   onPay,
//   total,
//   email = "customer@example.com",
// }) => {
//   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
//   const cartItems = useSelector((state: RootState) => state.cart.items)
//   const dispatch = useDispatch()

//   const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
//   const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle")
//   const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
//     transactionId: "",
//     transactionDate: "",
//     paymentMethod: "",
//     amount: total,
//     verificationStatus: "pending",
//     items: [],
//   })
//   const [showSuccessModal, setShowSuccessModal] = useState(false)
//   const [savedCartItems, setSavedCartItems] = useState<typeof cartItems>([])

//   // API instance with better token handling
//   const getApiInstance = () => {
//     const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
//     return axios.create({
//       baseURL: 'https://cvms-microservice.afripointdev.com/vin',
//       headers: {
//         'Authorization': token ? `Bearer ${token}` : undefined
//       }
//     })
//   }

//   // Save cart items before payment
//   useEffect(() => {
//     if (cartItems && cartItems.length > 0) {
//       setSavedCartItems([...cartItems])
//     }
//   }, [cartItems])

//   // Format transaction date
//   const formatTransactionDate = () => {
//     return new Date().toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     })
//   }

//   // Helper function to load the Remita script
//   const loadRemitaScript = (src: string): Promise<void> => {
//     return new Promise((resolve, reject) => {
//       // Check if script is already loaded
//       if (document.querySelector(`script[src="${src}"]`)) {
//         resolve()
//         return
//       }

//       const script = document.createElement("script")
//       script.src = src
//       script.type = "text/javascript"
//       script.async = true
//       script.onload = () => {
//         // Wait for RmPaymentEngine to be available
//         const checkEngine = () => {
//           if (window.RmPaymentEngine) {
//             resolve()
//           } else {
//             setTimeout(checkEngine, 100)
//           }
//         }
//         checkEngine()
//       }
//       script.onerror = () => reject(new Error("Failed to load Remita script"))
//       document.head.appendChild(script)
//     })
//   }

//   // Call checkout endpoint for one-time payment
//   const initiateCheckout = async (gateway: string): Promise<CheckoutResponse> => {
//     try {
//       const api = getApiInstance();
      
//       // Validate gateway parameter
//       if (!['remita', 'paystack'].includes(gateway)) {
//         throw new Error(`Invalid payment gateway specified: ${gateway}`);
//       }

//       // Use different parameter names based on gateway
//       const requestPayload = gateway === 'remita' 
//         ? { payment_gateway: gateway }
//         : { gateway: gateway };

//       console.log('Initiating checkout for:', gateway);
//       console.log('Request payload:', JSON.stringify(requestPayload, null, 2));

//       const response = await api.post('/checkout-one-time-payment/', requestPayload, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         timeout: 15000 // 15 second timeout
//       });

//       // Validate response structure
//       if (!response.data || typeof response.data !== 'object') {
//         throw new Error('Invalid response format from server');
//       }

//       // Gateway-specific validation
//       switch (gateway) {
//         case 'paystack':
//           if (!response.data.authorization_url || !response.data.reference) {
//             throw new Error('Missing required Paystack fields in response');
//           }
//           break;
        
//         case 'remita':
//           if (!response.data.rrr || !response.data.remita_inline_url) {
//             throw new Error('Missing required Remita fields in response');
//           }
//           break;
//       }

//       // Final gateway match verification
//       if (response.data.payment_gateway !== gateway) {
//         throw new Error(`Gateway mismatch: Requested ${gateway} but received ${response.data.payment_gateway}`);
//       }

//       return {
//         ...response.data,
//         payment_gateway: gateway // Ensure correct gateway is returned
//       };

//     } catch (error) {
//       console.error('Checkout failed for gateway:', gateway);
      
//       if (axios.isAxiosError(error)) {
//         console.error('Axios error details:', {
//           config: error.config,
//           response: error.response?.data,
//           status: error.response?.status
//         });
        
//         if (error.response) {
//           // Handle specific HTTP errors
//           switch (error.response.status) {
//             case 400:
//               throw new Error('Invalid request parameters');
//             case 401:
//               throw new Error('Authentication failed');
//             case 500:
//               throw new Error('Server error during payment processing');
//             default:
//               throw new Error(`Payment request failed with status ${error.response.status}`);
//           }
//         } else if (error.request) {
//           throw new Error('No response received from server');
//         }
//       }
      
//       throw new Error(error instanceof Error ? error.message : 'Unknown error during checkout');
//     }
//   };

//   // Verify payment after successful transaction
//   const verifyPayment = async (reference: string, gateway: string) => {
//     try {
//       const api = getApiInstance()
//       const response = await api.get(`/verify-one-time-payment/${reference}?payment_gateway=${gateway}`)
//       return response.data
//     } catch (error) {
//       console.error('Payment verification error:', error)
//       throw new Error('Failed to verify payment')
//     }
//   }

//   const storePaymentData = (txnId: string, method: string, state?: string) => {
//     const paymentData = {
//       transactionId: txnId,
//       transactionDate: formatTransactionDate(),
//       paymentMethod: method,
//       paymentState: state,
//       amount: total,
//       items: savedCartItems.map(item => ({...item})),
//       gateway: method
//     }
    
//     if (typeof window !== 'undefined') {
//       sessionStorage.setItem('pendingPaymentVerification', JSON.stringify(paymentData))
//     }
//   }

//   // Handle modal close
//   const handleModalClose = () => {
//     setShowSuccessModal(false)
//     onClose()
//   }

//   // Handle Paystack payment
//   const handlePaystackPayment = async () => {
//     try {
//       setPaymentStatus("processing")
      
//       const checkoutResponse = await initiateCheckout("paystack")
      
//       // Validate that we got a Paystack response
//       if (checkoutResponse.payment_gateway !== "paystack") {
//         throw new Error(`Expected Paystack response but got ${checkoutResponse.payment_gateway}`)
//       }
      
//       if (!checkoutResponse.reference) {
//         throw new Error('Missing reference in Paystack API response')
//       }
      
//       if (!checkoutResponse.authorization_url) {
//         throw new Error('Missing authorization_url in Paystack API response')
//       }
      
//       // Store payment data before redirecting
//       storePaymentData(checkoutResponse.reference, "paystack", "PENDING")
      
//       // Redirect to Paystack authorization URL
//       window.location.href = checkoutResponse.authorization_url
      
//       dispatch(clearCart())
//     } catch (error) {
//       console.error("Paystack payment error:", error)
//       toast.error(`Failed to initiate Paystack payment: ${error instanceof Error ? error.message : 'Unknown error'}`)
//       setPaymentStatus("failed")
//     }
//   }

//   // Handle Remita payment using the inline widget approach
//   const handleRemitaPayment = async () => {
//     try {
//       setPaymentStatus("processing")
      
//       // Get payment details from your backend
//       const checkoutResponse = await initiateCheckout("remita")
      
//       if (checkoutResponse.payment_gateway !== "remita") {
//         throw new Error(`Expected Remita response but got ${checkoutResponse.payment_gateway}`)
//       }
      
//       if (!checkoutResponse.rrr || !checkoutResponse.remita_inline_url) {
//         throw new Error('Missing RRR or script URL in Remita API response')
//       }

//       // Load the Remita script from the URL provided by your backend
//       await loadRemitaScript(checkoutResponse.remita_inline_url)
      
//       // Wait a bit for the script to fully initialize
//       await new Promise(resolve => setTimeout(resolve, 500))
      
//       // Check if RmPaymentEngine is available
//       if (!window.RmPaymentEngine) {
//         throw new Error('Remita Payment Engine not loaded')
//       }
      
//       // Initialize Remita Payment Engine with the RRR from backend
//       const paymentEngine = window.RmPaymentEngine.init({
//         key: 'QzAwMDAyNzEyNTl8MTEwNjE4NjF8OWZjOWYwNmMyZDk3MDRhYWM3YThiOThlNTNjZTE3ZjYxOTY5NDdmZWE1YzU3NDc0ZjE2ZDZjNTg1YWYxNWY3NWM4ZjMzNzZhNjNhZWZlOWQwNmJhNTFkMjIxYTRiMjYzZDkzNGQ3NTUxNDIxYWNlOGY4ZWEyODY3ZjlhNGUwYTY=', // Demo key - replace with your actual key
//         transactionId: checkoutResponse.rrr, // Use the RRR from backend
//         customerId: user?.id || 'guest',
//         firstName: user?.firstName || 'Guest',
//         lastName: user?.lastName || 'User', 
//         email: user?.email || email,
//         amount: checkoutResponse.amount, // Use amount from backend response
//         narration: `Payment for ${savedCartItems.length} items`,
//         onSuccess: function (response: any) {
//           console.log('Remita Payment Successful:', response)
          
//           // Handle successful payment
//           const paymentDetails: PaymentDetails = {
//             transactionId: response.transactionId || checkoutResponse.rrr,
//             transactionDate: formatTransactionDate(),
//             paymentMethod: "remita",
//             paymentState: "SUCCESS",
//             amount: total,
//             verificationStatus: "pending", // Will verify with backend
//             items: savedCartItems.map(item => ({...item})),
//           }
          
//           setPaymentDetails(paymentDetails)
//           setPaymentStatus("success")
//           setShowSuccessModal(true)
//           onPay("remita", response.transactionId || checkoutResponse.rrr, "SUCCESS")
//           dispatch(clearCart())
          
//           // Verify payment with backend
//           verifyPayment(response.transactionId || checkoutResponse.rrr, "remita")
//             .then(() => {
//               setPaymentDetails(prev => ({...prev, verificationStatus: "verified"}))
//             })
//             .catch(() => {
//               setPaymentDetails(prev => ({...prev, verificationStatus: "failed"}))
//             })
//         },
//         onError: function (response: any) {
//           console.log('Remita Payment Error:', response)
//           toast.error('Payment failed. Please try again.')
//           setPaymentStatus("failed")
//         },
//         onClose: function () {
//           console.log("Remita widget closed")
//           setPaymentStatus("idle")
//         }
//       })
      
//       // Show the payment widget
//       paymentEngine.showPaymentWidget()
      
//     } catch (error) {
//       console.error("Remita payment error:", error)
//       toast.error(`Failed to initiate Remita payment: ${error instanceof Error ? error.message : 'Unknown error'}`)
//       setPaymentStatus("failed")
//     }
//   }

//   // Handle payment method selection
//   const handlePayment = () => {
//     console.log('handlePayment called with:', { 
//       selectedMethod, 
//       isAuthenticated, 
//       user,
//       paymentStatus 
//     })

//     if (!selectedMethod) {
//       console.log('No payment method selected')
//       return
//     }

//     // Process payment based on selected method
//     if (selectedMethod === "paystack") {
//       handlePaystackPayment()
//     } else if (selectedMethod === "remita") {
//       handleRemitaPayment()
//     }
//   }

//   return (
//     <>
//       <ToastContainer position="bottom-right" autoClose={5000} />

//       <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//         <div className="bg-white rounded-lg shadow-xl w-96 p-6">
//           <h2 className="text-xl text-[#34C759] font-bold mb-4 text-left">Confirm Payment</h2>
//           <p className="text-left text-[#000000] mb-4">Select your preferred payment option</p>

//           <div className="flex mb-6 justify-around">
//             <div
//               className={`flex items-center p-3 cursor-pointer border rounded-lg mr-4 ${
//                 selectedMethod === "remita" ? "border-green-500 bg-green-50" : "border-gray-200"
//               }`}
//               onClick={() => setSelectedMethod("remita")}
//             >
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 checked={selectedMethod === "remita"}
//                 onChange={() => setSelectedMethod("remita")}
//                 className="mr-3 h-5 w-5 text-green-600"
//               />
//               <img src="/icons/remita.svg" alt="Remita" className="h-8 w-16" />
//             </div>

//             <div
//               className={`flex items-center p-3 cursor-pointer border rounded-lg ${
//                 selectedMethod === "paystack" ? "border-green-500 bg-green-50" : "border-gray-200"
//               }`}
//               onClick={() => setSelectedMethod("paystack")}
//             >
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 checked={selectedMethod === "paystack"}
//                 onChange={() => setSelectedMethod("paystack")}
//                 className="mr-3 h-5 w-5 text-green-600"
//               />
//               <img src="/icons/Paystack.svg" alt="Paystack" className="h-8 w-30" />
//             </div>
//           </div>

//           <button
//             onClick={handlePayment}
//             disabled={!selectedMethod || paymentStatus === "processing"}
//             className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center ${
//               selectedMethod && paymentStatus !== "processing" 
//                 ? "bg-green-600 text-white hover:bg-green-700"
//                 : "bg-gray-200 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             {paymentStatus === "processing" ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Processing Payment...
//               </>
//             ) : (
//               `Pay ₦${total.toLocaleString()}`
//             )}
//           </button>

//           <div className="mt-4 text-center">
//             <button
//               onClick={onClose}
//               className="text-sm text-gray-600 hover:text-gray-800 underline"
//               disabled={paymentStatus === "processing"}
//             >
//               Cancel Payment
//             </button>
//           </div>
//         </div>
//       </div>

//       {showSuccessModal && paymentDetails.transactionId && (
//         <SuccessPaymentModal
//           isOpen={showSuccessModal}
//           onClose={handleModalClose}
//           amount={paymentDetails.amount}
//           transactionId={paymentDetails.transactionId}
//           transactionDate={paymentDetails.transactionDate}
//           paymentMethod={paymentDetails.paymentMethod === "paystack" ? "Paystack" : "Remita"}
//           items={paymentDetails.items}
//           verificationStatus={paymentDetails.verificationStatus}
//         />
//       )}
//     </>
//   )
// }

// export default PaymentGatewayModal




"use client"

import type React from "react"
import { useState, useEffect} from "react"
import { toast, ToastContainer } from "react-toastify"
import SuccessPaymentModal from "./SuccessPaymentModal"
import { useSelector} from "react-redux"
import type { RootState } from "../../../../core/store"
// import { clearCart } from "../../../cart/redux/slices/cartSlice"
import axios from "axios"
import { useNavigate } from "react-router-dom"


// Global type declaration - MUST be at top level
declare global {
  interface Window {
    RmPaymentEngine: any
  }
}

// Types
type PaymentStatus = "idle" | "processing" | "success" | "failed" | "timeout" | "pending"
type VerificationStatus = "pending" | "verified" | "failed"

interface PaymentDetails {
  transactionId: string
  transactionDate: string
  paymentMethod: string
  paymentState?: string
  amount: number
  verificationStatus?: VerificationStatus
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
    type: string
  }>
}

interface CheckoutResponse {
  message: string
  reference?: string // For Paystack
  rrr?: string // For Remita
  payment_gateway: string
  order_id?: string // For Remita
  amount: number
  authorization_url?: string // For Paystack
  remita_inline_url?: string // For Remita
}

interface PaymentGatewayModalProps {
  onClose: () => void
  onPay: (method: "remita" | "paystack", reference?: string, status?: string) => void
  total: number
  email?: string
}

const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  onClose,
  onPay,
  total,
  email = "customer@example.com",
}) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items)
  // const dispatch = useDispatch()
  const navigate = useNavigate()

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle")
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    transactionId: "",
    transactionDate: "",
    paymentMethod: "",
    amount: total,
    verificationStatus: "pending",
    items: [],
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [savedCartItems, setSavedCartItems] = useState<typeof cartItems>([])
  const [_remitaCheckoutResponse, setRemitaCheckoutResponse] = useState<CheckoutResponse | null>(null)

  // API instance with better token handling
  const getApiInstance = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    return axios.create({
      baseURL: 'https://cvms-microservice.afripointdev.com/vin',
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined
      }
    })
  }

  // Save cart items before payment
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setSavedCartItems([...cartItems])
    }
  }, [cartItems])

  // Format transaction date
  const formatTransactionDate = () => {
    return new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  // Helper function to load the Remita script
  const loadRemitaScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve()
        return
      }

      const script = document.createElement("script")
      script.src = src
      script.type = "text/javascript"
      script.async = true
      script.onload = () => {
        // Wait for RmPaymentEngine to be available
        const checkEngine = () => {
          if (window.RmPaymentEngine) {
            resolve()
          } else {
            setTimeout(checkEngine, 100)
          }
        }
        checkEngine()
      }
      script.onerror = () => reject(new Error("Failed to load Remita script"))
      document.head.appendChild(script)
    })
  }

  // Call checkout endpoint for one-time payment
  const initiateCheckout = async (gateway: string): Promise<CheckoutResponse> => {
    try {
      const api = getApiInstance();
      
      // Validate gateway parameter
      if (!['remita', 'paystack'].includes(gateway)) {
        throw new Error(`Invalid payment gateway specified: ${gateway}`);
      }

      // Use different parameter names based on gateway
      const requestPayload = gateway === 'remita' 
        ? { payment_gateway: gateway }
        : { gateway: gateway };

      console.log('Initiating checkout for:', gateway);
      console.log('Request payload:', JSON.stringify(requestPayload, null, 2));

      const response = await api.post('/checkout-one-time-payment/', requestPayload, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000 // 15 second timeout
      });

      // Validate response structure
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid response format from server');
      }

      // Gateway-specific validation
      switch (gateway) {
        case 'paystack':
          if (!response.data.authorization_url || !response.data.reference) {
            throw new Error('Missing required Paystack fields in response');
          }
          break;
        
        case 'remita':
          if (!response.data.rrr || !response.data.remita_inline_url) {
            throw new Error('Missing required Remita fields in response');
          }
          break;
      }

      // Final gateway match verification
      if (response.data.payment_gateway !== gateway) {
        throw new Error(`Gateway mismatch: Requested ${gateway} but received ${response.data.payment_gateway}`);
      }

      return {
        ...response.data,
        payment_gateway: gateway // Ensure correct gateway is returned
      };

    } catch (error) {
      console.error('Checkout failed for gateway:', gateway);
      
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          config: error.config,
          response: error.response?.data,
          status: error.response?.status
        });
        
        if (error.response) {
          // Handle specific HTTP errors
          switch (error.response.status) {
            case 400:
              throw new Error('Invalid request parameters');
            case 401:
              throw new Error('Authentication failed');
            case 500:
              throw new Error('Server error during payment processing');
            default:
              throw new Error(`Payment request failed with status ${error.response.status}`);
          }
        } else if (error.request) {
          throw new Error('No response received from server');
        }
      }
      
      throw new Error(error instanceof Error ? error.message : 'Unknown error during checkout');
    }
  };

  // Verify payment after successful transaction
  // const verifyPayment = async (reference: string, gateway: string) => {
  //   try {
  //     const api = getApiInstance()
  //     const response = await api.get(`/verify-one-time-payment/${reference}?payment_gateway=${gateway}`)
  //     return response.data
  //   } catch (error) {
  //     console.error('Payment verification error:', error)
  //     throw new Error('Failed to verify payment')
  //   }
  // }

  const storePaymentData = (txnId: string, method: string, state?: string, checkoutResponse?: CheckoutResponse) => {
    const paymentData = {
      transactionId: txnId,
      transactionDate: formatTransactionDate(),
      paymentMethod: method,
      paymentState: state,
      amount: total,
      items: savedCartItems.map(item => ({...item})),
      gateway: method,
      // Store checkout response for Remita
      ...(method === 'remita' && checkoutResponse && { checkoutResponse })
    }
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pendingPaymentVerification', JSON.stringify(paymentData))
    }
  }

  // Handle modal close
  const handleModalClose = () => {
    setShowSuccessModal(false)
    onClose()
  }

  // Handle Paystack payment (unchanged)
  const handlePaystackPayment = async () => {
    try {
      setPaymentStatus("processing")
      
      const checkoutResponse = await initiateCheckout("paystack")
      
      // Validate that we got a Paystack response
      if (checkoutResponse.payment_gateway !== "paystack") {
        throw new Error(`Expected Paystack response but got ${checkoutResponse.payment_gateway}`)
      }
      
      if (!checkoutResponse.reference) {
        throw new Error('Missing reference in Paystack API response')
      }
      
      if (!checkoutResponse.authorization_url) {
        throw new Error('Missing authorization_url in Paystack API response')
      }
      
      // Store payment data before redirecting
      storePaymentData(checkoutResponse.reference, "paystack", "PENDING")
      
      // Redirect to Paystack authorization URL
      window.location.href = checkoutResponse.authorization_url
      
      // dispatch(clearCart())
    } catch (error) {
      console.error("Paystack payment error:", error)
      toast.error(`Failed to initiate Paystack payment: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setPaymentStatus("failed")
    }
  }

  // Handle Remita payment using the inline widget approach
  const handleRemitaPayment = async () => {
    try {
      setPaymentStatus("processing")
      
      // Get payment details from your backend
      const checkoutResponse = await initiateCheckout("remita")
      
      if (checkoutResponse.payment_gateway !== "remita") {
        throw new Error(`Expected Remita response but got ${checkoutResponse.payment_gateway}`)
      }
      
      if (!checkoutResponse.rrr || !checkoutResponse.remita_inline_url) {
        throw new Error('Missing RRR or script URL in Remita API response')
      }

      // Store the Remita checkout response
      setRemitaCheckoutResponse(checkoutResponse)

      // Load the Remita script from the URL provided by your backend
      await loadRemitaScript(checkoutResponse.remita_inline_url)
      
      // Wait a bit for the script to fully initialize
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Check if RmPaymentEngine is available
      if (!window.RmPaymentEngine) {
        throw new Error('Remita Payment Engine not loaded')
      }
      
      // Initialize Remita Payment Engine with the RRR from backend
      const paymentEngine = window.RmPaymentEngine.init({
        key: 'QzAwMDAyNzEyNTl8MTEwNjE4NjF8OWZjOWYwNmMyZDk3MDRhYWM3YThiOThlNTNjZTE3ZjYxOTY5NDdmZWE1YzU3NDc0ZjE2ZDZjNTg1YWYxNWY3NWM4ZjMzNzZhNjNhZWZlOWQwNmJhNTFkMjIxYTRiMjYzZDkzNGQ3NTUxNDIxYWNlOGY4ZWEyODY3ZjlhNGUwYTY=', // Demo key - replace with your actual key
        transactionId: checkoutResponse.rrr, // Use the RRR from backend
        customerId: user?.id || 'guest',
        firstName: user?.firstName || 'Guest',
        lastName: user?.lastName || 'User', 
        email: user?.email || email,
        amount: checkoutResponse.amount, // Use amount from backend response
        narration: `Payment for ${savedCartItems.length} items`,
        onSuccess: function (response: any) {
          console.log('Remita Payment Successful:', response)
          
          // Store payment data with checkout response for Remita
          storePaymentData(
            response.transactionId || checkoutResponse.rrr, 
            "remita", 
            "SUCCESS",
            checkoutResponse // Pass the stored checkout response
          )
          
          // Clear cart
          // dispatch(clearCart())
          
          // Call the onPay callback
          onPay("remita", response.transactionId || checkoutResponse.rrr, "SUCCESS")
          
          // Show success modal briefly
          const paymentDetails: PaymentDetails = {
            transactionId: response.transactionId || checkoutResponse.rrr,
            transactionDate: formatTransactionDate(),
            paymentMethod: "remita",
            paymentState: "SUCCESS",
            amount: total,
            verificationStatus: "pending",
            items: savedCartItems.map(item => ({...item})),
          }
          
          setPaymentDetails(paymentDetails)
          setPaymentStatus("success")
          setShowSuccessModal(true)
          
          // Redirect to verify payment page after a short delay
          setTimeout(() => {
            setShowSuccessModal(false)
            navigate('/verifypayment')
          }, 2000) // Show success modal for 2 seconds before redirecting
        },
        onError: function (response: any) {
          console.log('Remita Payment Error:', response)
          toast.error('Payment failed. Please try again.')
          setPaymentStatus("failed")
        },
        onClose: function () {
          console.log("Remita widget closed")
          setPaymentStatus("idle")
        }
      })
      
      // Show the payment widget
      paymentEngine.showPaymentWidget()
      
    } catch (error) {
      console.error("Remita payment error:", error)
      toast.error(`Failed to initiate Remita payment: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setPaymentStatus("failed")
    }
  }

  // Handle payment method selection
  const handlePayment = () => {
    console.log('handlePayment called with:', { 
      selectedMethod, 
      isAuthenticated, 
      user,
      paymentStatus 
    })

    if (!selectedMethod) {
      console.log('No payment method selected')
      return
    }

    // Process payment based on selected method
    if (selectedMethod === "paystack") {
      handlePaystackPayment()
    } else if (selectedMethod === "remita") {
      handleRemitaPayment()
    }
  }

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={5000} />

      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl w-96 p-6">
          <h2 className="text-xl text-[#34C759] font-bold mb-4 text-left">Confirm Payment</h2>
          <p className="text-left text-[#000000] mb-4">Select your preferred payment option</p>

          <div className="flex mb-6 justify-around">
            <div
              className={`flex items-center p-3 cursor-pointer border rounded-lg mr-4 ${
                selectedMethod === "remita" ? "border-green-500 bg-green-50" : "border-gray-200"
              }`}
              onClick={() => setSelectedMethod("remita")}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === "remita"}
                onChange={() => setSelectedMethod("remita")}
                className="mr-3 h-5 w-5 text-green-600"
              />
              <img src="/icons/remita.svg" alt="Remita" className="h-8 w-16" />
            </div>

            <div
              className={`flex items-center p-3 cursor-pointer border rounded-lg ${
                selectedMethod === "paystack" ? "border-green-500 bg-green-50" : "border-gray-200"
              }`}
              onClick={() => setSelectedMethod("paystack")}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === "paystack"}
                onChange={() => setSelectedMethod("paystack")}
                className="mr-3 h-5 w-5 text-green-600"
              />
              <img src="/icons/Paystack.svg" alt="Paystack" className="h-8 w-30" />
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={!selectedMethod || paymentStatus === "processing"}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center ${
              selectedMethod && paymentStatus !== "processing" 
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {paymentStatus === "processing" ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing Payment...
              </>
            ) : (
              `Pay ₦${total.toLocaleString()}`
            )}
          </button>

          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
              disabled={paymentStatus === "processing"}
            >
              Cancel Payment
            </button>
          </div>
        </div>
      </div>

      {showSuccessModal && paymentDetails.transactionId && (
        <SuccessPaymentModal
          isOpen={showSuccessModal}
          onClose={handleModalClose}
          amount={paymentDetails.amount}
          transactionId={paymentDetails.transactionId}
          transactionDate={paymentDetails.transactionDate}
          paymentMethod={paymentDetails.paymentMethod === "paystack" ? "Paystack" : "Remita"}
          items={paymentDetails.items}
          verificationStatus={paymentDetails.verificationStatus}
        />
      )}
    </>
  )
}

export default PaymentGatewayModal