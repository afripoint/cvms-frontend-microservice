"use client"

import type React from "react"
import { useState, useEffect} from "react"
import { usePaystackPayment } from "react-paystack"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SuccessPaymentModal from "./SuccessPaymentModal"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../../../core/store"
import { clearCart } from "../../../cart/redux/slices/cartSlice"
// import NINVerificationModal from "../../../nin/components/NINVerificationModal"

// Types
type PaymentMethod = "remita" | "paystack"
type PaymentStatus = "idle" | "processing" | "success" | "failed" | "timeout" | "pending"

interface PaymentDetails {
  transactionId: string
  transactionDate: string
  paymentMethod: PaymentMethod
  paymentState?: string
  amount: number
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
    type: string
  }>
}

interface PaymentGatewayModalProps {
  onClose: () => void
  onPay: (method: PaymentMethod, reference?: string, status?: string) => void
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
  // const [showNINModal, setShowNINModal] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle")
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    transactionId: "",
    transactionDate: "",
    paymentMethod: "paystack",
    amount: total,
    items: [],
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [savedCartItems, setSavedCartItems] = useState<typeof cartItems>([])
  const [remitaLoaded, setRemitaLoaded] = useState(false)

  // Remita configuration - using the invoice generation credentials
  const REMITA_MERCHANT_ID = "27768931"
  // const REMITA_SERVICE_TYPE_ID = "35126630"
  // const REMITA_API_KEY = "Q1dHREVNTzEyMzR8Q1dHREVNTw=="
  // const REMITA_BASE_URL = "https://remitademo.net" // Using demo URL for testing

  // Save cart items before payment
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setSavedCartItems([...cartItems])
    }
  }, [cartItems])

  // Load Remita script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://remitademo.net/payment/v1/remita-pay-inline.bundle.js'
    script.async = true

    script.onload = () => {
      if (typeof window !== 'undefined' && window.RmPaymentEngine) {
        setRemitaLoaded(true)
      }
    }

    script.onerror = () => {
      console.error('Failed to load Remita script')
      toast.error('Failed to load Remita payment service. Please try Paystack instead.')
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Generate transaction ID
  const generateTransactionId = () => `TXN_${Date.now()}`

  // Format transaction date
  const formatTransactionDate = () => {
    return new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  // Handle payment completion
  const completePayment = (txnId: string, method: PaymentMethod, state?: string) => {
    const txnDate = formatTransactionDate()
    
    const newPaymentDetails = {
      transactionId: txnId,
      transactionDate: txnDate,
      paymentMethod: method,
      paymentState: state,
      amount: total,
      items: savedCartItems.map(item => ({...item})),
    }

    setPaymentDetails(newPaymentDetails)
    dispatch(clearCart())
    setPaymentStatus("success")
    setShowSuccessModal(true)
    onPay(method, txnId, state)
  }

  // Handle modal close
  const handleModalClose = () => {
    setShowSuccessModal(false)
    onClose()
  }

  // Paystack configuration
  const paystackConfig = {
    reference: generateTransactionId(),
    email: email,
    amount: total * 100, // Paystack expects amount in kobo
    publicKey: "pk_test_f9b4e7a7d6a574d5c8894efbe6969ef10450aedd",
    currency: "NGN",
  }

  const initializePaystack = usePaystackPayment(paystackConfig)

  // Handle Remita payment
  const handleRemitaPayment = () => {
    setPaymentStatus("processing")
    const transactionId = generateTransactionId()

    // Generate hash for Remita
    // const hashString = `${REMITA_SERVICE_TYPE_ID}${transactionId}${total}${REMITA_API_KEY}`
    // const hash = CryptoJS.SHA512(hashString).toString()

    try {
      if (typeof window !== 'undefined' && window.RmPaymentEngine) {
        const paymentEngine = new window.RmPaymentEngine()
        
        paymentEngine.showPaymentWidget({
          key: REMITA_MERCHANT_ID,
          customerId: email,
          firstName: "Customer",
          lastName: "User",
          email: email,
          amount: total,
          narration: "CVMS Payment",
          transactionId: transactionId,
          onSuccess: (response: any) => {
            console.log("Remita payment success:", response)
            completePayment(transactionId, "remita", "SUCCESSFUL")
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
        })
      } else {
        throw new Error("Remita payment engine not available")
      }
    } catch (error) {
      console.error("Remita initialization error:", error)
      toast.error("Failed to initialize Remita payment. Please try Paystack instead.")
      setPaymentStatus("failed")
    }
  }

  // Handle payment method selection
  const handlePayment = () => {
    if (!selectedMethod) return

    if (isAuthenticated && user && !user.NINVerified) {
      // setShowNINModal(true);
      return;
    }

    setPaymentStatus("processing")

    if (selectedMethod === "paystack") {
      initializePaystack({
        ...paystackConfig,
        onSuccess: (response: any) => {
          completePayment(response.reference, "paystack", "SUCCESSFUL")
        },
        onClose: () => setPaymentStatus("idle"),
      })
    } else {
      handleRemitaPayment()
    }
  }

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={5000} />

      {/* NIN Verification Modal */}
      {/* {showNINModal && (
        <NINVerificationModal
          isOpen={showNINModal}
          onClose={() => setShowNINModal(false)}
          onSuccess={() => {
            setShowNINModal(false);
            // After successful verification, proceed with payment
            handlePayment();
          }}
        />
      )} */}

      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl w-96 p-6">
          <h2 className="text-xl text-[#34C759] font-bold mb-4 text-left">Confirm Payment</h2>
          <p className="text-left text-[#000000] mb-4">Select your preferred payment option</p>

          <div className="flex mb-6 justify-around">
            <div
              className={`flex items-center p-3 cursor-pointer border rounded-lg mr-4 ${
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
                <span className="text-xs text-red-500 absolute -bottom-5 left-0">Loading service...</span>
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
        />
      )}
    </>
  )
}

export default PaymentGatewayModal