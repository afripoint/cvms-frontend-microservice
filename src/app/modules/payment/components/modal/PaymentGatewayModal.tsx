"use client"

import type React from "react"
import { useState, useEffect} from "react"
import { toast, ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
import SuccessPaymentModal from "./SuccessPaymentModal"
import { useSelector } from "react-redux"
import type { RootState } from "../../../../core/store"
// import { clearCart } from "../../../cart/redux/slices/cartSlice"
import axios from "axios"
// import { useNavigate } from "react-router-dom"

// Types
type PaymentMethod = "remita" | "paystack"
type PaymentStatus = "idle" | "processing" | "success" | "failed" | "timeout" | "pending"
type VerificationStatus = "pending" | "verified" | "failed"

interface PaymentDetails {
  transactionId: string
  transactionDate: string
  paymentMethod: PaymentMethod
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
  onPay: (method: PaymentMethod, reference?: string, status?: string) => void
  total: number
  email?: string
}

// Extend Window interface for Remita
declare global {
  interface Window {
    RmPaymentEngine: any
  }
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
  // const navigate = useNavigate()

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle")
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    transactionId: "",
    transactionDate: "",
    paymentMethod: "paystack",
    amount: total,
    verificationStatus: "pending",
    items: [],
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [savedCartItems, setSavedCartItems] = useState<typeof cartItems>([])
  const [remitaLoaded, setRemitaLoaded] = useState(false)

  // API instance with better token handling
  const getApiInstance = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    return axios.create({
      baseURL: 'https://cvms-staging.afripointdev.com/vin',
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined
      }
    })
  }

  // Remita configuration
  const REMITA_MERCHANT_ID = "27768931"

  // Save cart items before payment
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setSavedCartItems([...cartItems])
    }
  }, [cartItems])

  // Load Remita script dynamically
  const loadRemitaScript = (scriptUrl: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (typeof window !== 'undefined' && window.RmPaymentEngine) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = scriptUrl
      script.async = true

      script.onload = () => {
        if (typeof window !== 'undefined' && window.RmPaymentEngine) {
          setRemitaLoaded(true)
          resolve()
        } else {
          reject(new Error('RmPaymentEngine not available after script load'))
        }
      }

      script.onerror = () => {
        reject(new Error('Failed to load Remita script'))
      }

      document.head.appendChild(script)
    })
  }

  // Initialize Remita script on component mount
  useEffect(() => {
    // Load the default demo script initially
    const defaultScript = document.createElement('script')
    defaultScript.src = 'https://demo.remita.net/payment/v1/remita-pay-inline.bundle.js'
    defaultScript.async = true

    defaultScript.onload = () => {
      if (typeof window !== 'undefined' && window.RmPaymentEngine) {
        setRemitaLoaded(true)
      }
    }

    defaultScript.onerror = () => {
      console.error('Failed to load default Remita script')
    }

    document.head.appendChild(defaultScript)

    return () => {
      // Cleanup scripts on unmount
      const scripts = document.querySelectorAll('script[src*="remita-pay-inline.bundle.js"]')
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      })
    }
  }, [])

  // Format transaction date
  const formatTransactionDate = () => {
    return new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  // Call checkout endpoint for one-time payment
  const initiateCheckout = async (gateway: PaymentMethod): Promise<CheckoutResponse> => {
    try {
      const api = getApiInstance()
      
      const requestPayload = {
        gateway: gateway
      }
      
      console.log('=== CHECKOUT REQUEST DEBUG ===')
      console.log('Sending checkout request to:', api.defaults.baseURL + '/checkout-one-time-payment/')
      console.log('Request payload:', JSON.stringify(requestPayload, null, 2))
      console.log('Request headers:', {
        'Content-Type': 'application/json',
        'Authorization': api.defaults.headers['Authorization']
      })
      
      const response = await api.post('/checkout-one-time-payment/', requestPayload, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('=== CHECKOUT RESPONSE DEBUG ===')
      console.log('Response status:', response.status)
      console.log('Response data:', JSON.stringify(response.data, null, 2))
      console.log('Response headers:', response.headers)
      
      // Validate that we got the expected gateway response
      if (response.data.payment_gateway !== gateway) {
        console.error(`❌ GATEWAY MISMATCH: Expected '${gateway}' but received '${response.data.payment_gateway}'`)
        console.error('This indicates a backend API issue. Please check:')
        console.error('1. API endpoint is correctly handling the gateway parameter')
        console.error('2. Database/backend logic is processing the request correctly')
        console.error('3. No middleware is overriding the gateway parameter')
      }
      
      return response.data
    } catch (error) {
      console.error('=== CHECKOUT API ERROR ===')
      console.error('Checkout API error:', error)
      if (axios.isAxiosError(error)) {
        console.error('Request config:', error.config)
        console.error('Request data sent:', error.config?.data)
        console.error('Response data:', error.response?.data)
        console.error('Response status:', error.response?.status)
        console.error('Response headers:', error.response?.headers)
      }
      throw new Error('Failed to initiate checkout process')
    }
  }

  // Verify payment after successful transaction
  const verifyPayment = async (reference: string, gateway: string) => {
    try {
      const api = getApiInstance()
      const response = await api.get(`/verify-one-time-payment/${reference}?payment_gateway=${gateway}`)
      return response.data
    } catch (error) {
      console.error('Payment verification error:', error)
      throw new Error('Failed to verify payment')
    }
  }

  const storePaymentData = (txnId: string, method: PaymentMethod, state?: string) => {
    const paymentData = {
      transactionId: txnId,
      transactionDate: formatTransactionDate(),
      paymentMethod: method,
      paymentState: state,
      amount: total,
      items: savedCartItems.map(item => ({...item})),
      gateway: method
    }
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pendingPaymentVerification', JSON.stringify(paymentData))
    }
  }

  // Handle payment completion for Remita
  const completeRemitaPayment = async (txnId: string, method: PaymentMethod, state?: string) => {
    const txnDate = formatTransactionDate()
    
    // Show success modal immediately with pending verification
    const preliminaryPaymentDetails: PaymentDetails = {
      transactionId: txnId,
      transactionDate: txnDate,
      paymentMethod: method,
      paymentState: state,
      amount: total,
      verificationStatus: "pending",
      items: savedCartItems.map(item => ({...item})),
    }

    // Show success modal immediately
    setPaymentDetails(preliminaryPaymentDetails)
    setPaymentStatus("success")
    setShowSuccessModal(true)
    onPay(method, txnId, state)

    // dispatch(clearCart())

    // Backend verification for Remita
    try {
      console.log('Starting payment verification...')
      await verifyPayment(txnId, method)
      
      // Verification successful - update status
      setPaymentDetails(prev => ({
        ...prev,
        verificationStatus: "verified"
      }))
      
      console.log('Payment verification completed successfully')
      
    } catch (error) {
      console.error('Payment verification error:', error)
      
      // Verification failed - update status
      setPaymentDetails(prev => ({
        ...prev,
        verificationStatus: "failed"
      }))
      
      toast.warn('Payment received but verification pending. Please contact support if needed.')
    }
  }

  // Handle modal close
  const handleModalClose = () => {
    setShowSuccessModal(false)
    onClose()
  }

  // Handle Paystack payment
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

  // Handle Remita payment
  const handleRemitaPayment = async () => {
    console.log('Starting Remita payment process...')
    setPaymentStatus("processing")

    try {
      // Call the checkout endpoint for Remita
      const checkoutResponse = await initiateCheckout("remita")
      console.log('Remita checkout response received:', checkoutResponse)

      // TEMPORARY WORKAROUND: If backend returns Paystack instead of Remita
      // This allows you to test Remita frontend integration while backend is being fixed
      if (checkoutResponse.payment_gateway !== "remita") {
        console.warn(`⚠️ TEMPORARY WORKAROUND: Backend returned ${checkoutResponse.payment_gateway} instead of remita`)
        console.warn('Using mock Remita data for frontend testing...')
        
        // Create mock Remita response for testing
        const mockRemitaResponse = {
          message: "Checkout process initiated (MOCK)",
          rrr: checkoutResponse.reference || `RRR${Date.now()}`, // Use existing reference or generate one
          payment_gateway: "remita",
          order_id: `order_${Date.now()}`,
          amount: checkoutResponse.amount,
          remita_inline_url: "https://demo.remita.net/payment/v1/remita-pay-inline.bundle.js"
        }
        
        console.log('Using mock Remita response:', mockRemitaResponse)
        
        // Continue with mock data
        await processRemitaPayment(mockRemitaResponse)
        return
      }

      // Normal flow when backend correctly returns Remita response
      await processRemitaPayment(checkoutResponse)
      
    } catch (error) {
      console.error("Remita initialization error:", error)
      toast.error(`Failed to initialize Remita payment: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setPaymentStatus("failed")
    }
  }

  // Extracted Remita payment processing logic
  const processRemitaPayment = async (checkoutResponse: any) => {
    // Validate required Remita fields
    if (!checkoutResponse.rrr) {
      throw new Error('Missing RRR (Remita Retrieval Reference) in API response')
    }

    if (!checkoutResponse.remita_inline_url) {
      console.warn('No remita_inline_url provided, using default script')
    }

    // If the API returns a custom remita_inline_url, load it
    if (checkoutResponse.remita_inline_url) {
      try {
        await loadRemitaScript(checkoutResponse.remita_inline_url)
      } catch (scriptError) {
        console.warn('Failed to load custom Remita script, using default:', scriptError)
        // Continue with the default script if custom one fails
      }
    }

    // Ensure Remita payment engine is available
    if (typeof window !== 'undefined' && window.RmPaymentEngine) {
      const paymentEngine = new window.RmPaymentEngine()
      
      const paymentConfig = {
        key: REMITA_MERCHANT_ID,
        customerId: email,
        firstName: user?.first_name || "Customer",
        lastName: user?.last_name || "User", 
        email: email,
        amount: total,
        narration: "CVMS Payment",
        transactionId: checkoutResponse.rrr, // Use RRR from Remita API response
        onSuccess: (response: any) => {
          console.log("Remita payment success:", response)
          // Use the RRR for transaction tracking
          completeRemitaPayment(checkoutResponse.rrr!, "remita", "SUCCESSFUL")
        },
        onError: (error: any) => {
          console.error("Remita payment error:", error)
          toast.error("Payment failed. Please try again or use Paystack.")
          setPaymentStatus("failed")
        },
        onClose: () => {
          console.log("Remita payment window closed")
          if (paymentStatus !== "success") {
            setPaymentStatus("idle")
          }
        },
      }

      console.log('Initializing Remita payment with config:', paymentConfig)
      paymentEngine.showPaymentWidget(paymentConfig)
      
    } else {
      throw new Error("Remita payment engine not available")
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
              className={`flex items-center p-3 cursor-pointer border rounded-lg mr-4 relative ${
                selectedMethod === "remita" ? "border-green-500 bg-green-50" : "border-gray-200"
              } ${!remitaLoaded ? "opacity-50" : ""}`}
              onClick={() => remitaLoaded && setSelectedMethod("remita")}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === "remita"}
                onChange={() => remitaLoaded && setSelectedMethod("remita")}
                disabled={!remitaLoaded}
                className="mr-3 h-5 w-5 text-green-600"
              />
              <img src="/icons/remita.svg" alt="Remita" className="h-8 w-16" />
              {!remitaLoaded && (
                <span className="text-xs text-red-500 absolute -bottom-6 left-0 whitespace-nowrap">Loading service...</span>
              )}
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
            disabled={!selectedMethod || paymentStatus === "processing" || (selectedMethod === "remita" && !remitaLoaded)}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center ${
              selectedMethod && paymentStatus !== "processing" && !(selectedMethod === "remita" && !remitaLoaded)
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