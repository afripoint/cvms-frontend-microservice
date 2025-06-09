"use client"

import type React from "react"

import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../../core/store"
import { MainLayout } from "../../modules/landing/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../modules/shared/components/ui"
import { ChevronDown, ChevronLeft, ChevronUp } from "lucide-react"
import PaymentGatewayModal from "../../modules/payment/components/modal/PaymentGatewayModal"
//import SuccessPaymentModal from "../../modules/payment/components/modal/SuccessPaymentModal"

// Define types for cart items
interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
  type: string
}

// Define type for plan
interface Plan {
  name: string
  description: string
  price: string
  numericPrice: number
  subText: string
}

// Purchase Plan Modal Component
const PurchasePlanModal: React.FC<{
  onClose: () => void
  onSelectPlan: (plan: Plan) => void
}> = ({ onClose, onSelectPlan }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const plans: Plan[] = [
    {
      name: "Starter Plan",
      description: "1 VIN Allocation",
      price: "N7,500",
      numericPrice: 7500,
      subText: "Best for one-off VIN lookups. Ideal for personal imports or occasional users.",
    },
    {
      name: "Solo Bundle",
      description: "2 VIN Allocations",
      price: "N14,500",
      numericPrice: 14500,
      subText: "For light users – check up to 2 cars quickly.",
    },
    {
      name: "Trader Bundle",
      description: "5 VIN Allocations",
      price: "N36,000",
      numericPrice: 36000,
      subText: "Perfect for dealers, clearing agents, or SMEs running 5 VIN checks.",
    },
    {
      name: "Business Bundle",
      description: "10 VIN Allocations",
      price: "N73,000",
      numericPrice: 73000,
      subText: "Mid-tier option for growing car businesses or agents.",
    },
    {
      name: "Enterprise Plan",
      description: "65 VIN Allocations",
      price: "N500,000",
      numericPrice: 500000,
      subText: "Built for large-scale operators running frequent VIN checks.",
    },
  ]

  const handleContinue = () => {
    if (selectedPlan) {
      const plan = plans.find(p => p.name === selectedPlan)
      if (plan) {
        onSelectPlan(plan)
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-md sm:max-w-lg shadow-lg my-8">
        <div className="p-4 sm:p-6 relative max-h-[85vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold">All available plans</h2>
            <button onClick={onClose} className="text-gray-500 text-xl hover:text-gray-700 p-1">
              ×
            </button>
          </div>

          <div className="space-y-3 mb-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                onClick={() => setSelectedPlan(plan.name)}
                className={`border rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
                  selectedPlan === plan.name ? "border-2 border-[#00A229] bg-green-50" : "border border-[#D1D1D1] hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="plan"
                      checked={selectedPlan === plan.name}
                      onChange={() => setSelectedPlan(plan.name)}
                      className="h-4 w-4 border-gray-300 focus:ring-[#00A229] accent-[#00A229]"
                      style={{ accentColor: "#10b981" }}
                    />
                    <span className="ml-3 font-semibold text-sm sm:text-base">{plan.name}</span>
                  </div>
                  <span className="font-bold text-sm sm:text-base">{plan.price}</span>
                </div>
                <div className="ml-7 text-xs sm:text-sm text-[#000000]">
                  <div className="font-medium">{plan.description}</div>
                  <div className="text-xs text-[#8E8E93] mt-1">{plan.subText}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedPlan}
            className={`w-full py-3 text-center rounded-lg font-semibold transition-colors ${
              selectedPlan
                ? "bg-[#00A229] text-white hover:bg-green-600"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

const PaymentMethodPage: React.FC = () => {
  const {
    items = [],
    totalPrice = 0,
    //promoCode = null,
    discount = 0,
  } = useSelector((state: RootState) => {
    return state.cart && typeof state.cart === "object"
      ? (state.cart as {
          items: Array<CartItem>
          totalPrice: number
          promoCode: string | null
          discount: number
        })
      : { items: [], totalPrice: 0, promoCode: null, discount: 0 }
  })

  const [selectedMethod, setSelectedMethod] = useState<"oneTime" | "purchase" | null>(null)
  const [showPurchasePlanModal, setShowPurchasePlanModal] = useState(false)
  const [showPaymentGatewayModal, setShowPaymentGatewayModal] = useState(false)
  //const [showSuccessPaymentModal, setShowSuccessPaymentModal] = useState(false)
  const [_selectedPaymentMethod, setSelectedPaymentMethod] = useState<"remita" | "paystack">("paystack")
  const [isItemsExpanded, setIsItemsExpanded] = useState(false)
  const [_paymentDetails, setPaymentDetails] = useState({
    transactionId: "",
    transactionDate: "",
  })
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const navigate = useNavigate()

  // Calculate order total based on selected plan or cart total
  const orderTotal = selectedPlan ? selectedPlan.numericPrice : (totalPrice - discount)

  const handleMethodSelect = (method: "oneTime" | "purchase") => {
    setSelectedMethod(method)
  }

  const handleContinue = () => {
    if (selectedMethod === "oneTime") {
      setShowPaymentGatewayModal(true)
    } else if (selectedMethod === "purchase") {
      setShowPurchasePlanModal(true)
    }
  }

  // Handle plan selection from modal
  const handlePlanSelect = (plan: Plan) => {
    console.log(`Selected plan: ${plan.name} - ${plan.price}`)
    setSelectedPlan(plan)
    setShowPurchasePlanModal(false)
    setShowPaymentGatewayModal(true)
  }

  // Handle payment completion from payment gateway
  const handlePayment = (method: "remita" | "paystack", reference?: string) => {
    setSelectedPaymentMethod(method)

    // Generate transaction details
    const txnId = reference || generateTransactionId()
    const txnDate = getCurrentDate()

    // Save payment details for the success modal
    setPaymentDetails({
      transactionId: txnId,
      transactionDate: txnDate,
    })

    // No need to close the payment gateway modal here as it's handled in the PaymentGatewayModal component
    // for Paystack payments, and here for Remita payments
    if (method === "remita") {
      setShowPaymentGatewayModal(false)
    }

    const paymentInfo = {
      method,
      reference: txnId,
      amount: orderTotal,
      date: txnDate,
    }

    console.log("Payment completed:", paymentInfo)

    // Show success modal
    // setShowSuccessPaymentModal(true)
  }

  const handleGoBack = () => {
    // You can customize this to go to the previous page or a specific route
    navigate(-1)
  }

  // Generate a random transaction ID
  const generateTransactionId = () => {
    return Math.floor(1000000 + Math.random() * 9000000).toString()
  }

  // Format current date
  const getCurrentDate = () => {
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" }
    return date.toLocaleDateString("en-GB", options)
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-4 sm:py-6 max-w-7xl">
        {/* Back Link */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft size={20} />
            <span className="text-sm text-green-600 font-medium ml-1">Back</span>
          </button>
        </div>

        {/* Payment Method Title */}
        <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-start">Payment Method</h1>

        <div className="flex flex-col xl:flex-row gap-8 xl:gap-32 justify-center xl:justify-start">
          {/* Payment Method Column */}
          <div className="w-full xl:w-auto xl:flex-1 max-w-xl mx-auto xl:mx-0">
            <Card className="w-full">
              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                <div
                  className={`cursor-pointer rounded-lg p-4 border-2 transition-all duration-200 ${
                    selectedMethod === "oneTime" 
                      ? "border-green-500 bg-green-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleMethodSelect("oneTime")}
                >
                  <div className="flex items-start sm:items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedMethod === "oneTime"}
                      onChange={() => handleMethodSelect("oneTime")}
                      className="mt-1 sm:mt-0 mr-3 sm:mr-4 h-4 sm:h-5 w-4 sm:w-5 text-green-600 flex-shrink-0"
                      style={{ accentColor: "#10b981" }}
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-1">One-Time Payment</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {selectedPlan 
                          ? `Pay ${selectedPlan.price} for ${selectedPlan.name}` 
                          : "You pay using either Remita/Paystack once"
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Commented out Purchase Payment Plan option */}
                {/* <div
                  className={`cursor-pointer rounded-lg p-4 border-2 relative transition-all duration-200 ${
                    selectedMethod === "purchase" 
                      ? "border-green-500 bg-green-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleMethodSelect("purchase")}
                >
                  <div className="flex items-start sm:items-center pr-16 sm:pr-20">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedMethod === "purchase"}
                      onChange={() => handleMethodSelect("purchase")}
                      className="mt-1 sm:mt-0 mr-3 sm:mr-4 h-4 sm:h-5 w-4 sm:w-5 text-green-600 flex-shrink-0"
                      style={{ accentColor: "#10b981" }}
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-1">Purchase Payment Plan</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {selectedPlan 
                          ? `Selected: ${selectedPlan.name} (${selectedPlan.description})` 
                          : "Subscribe to run multiple searches and save more cost"
                        }
                      </p>
                    </div>
                  </div>
                  <span className="absolute top-2 right-2 bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">
                    Recommended
                  </span>
                </div> */}

                <button
                  className={`w-full py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors ${
                    selectedMethod
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-[#C0EECC] text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={handleContinue}
                  disabled={!selectedMethod}
                >
                  Continue
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary and Items Column */}
          <div className="w-full xl:w-96 xl:flex-shrink-0 space-y-4">
            {/* Order Summary */}
            <Card className="shadow-md bg-[#F2F2F7] p-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg sm:text-xl font-bold">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {selectedPlan ? (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">{selectedPlan.name}</span>
                      <span className="font-bold text-sm sm:text-base">₦{selectedPlan.numericPrice.toLocaleString()}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Subtotal</span>
                      <span className="font-bold text-sm sm:text-base">₦{totalPrice.toLocaleString()}</span>
                    </div>
                  )}
                  
                  {!selectedPlan && discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Promo Discount</span>
                      <span className="text-green-600 text-sm sm:text-base">-₦{discount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="border-t-2 pt-3 flex justify-between font-bold text-base sm:text-lg">
                    <span>Est. Total</span>
                    <span>₦{orderTotal.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Items Section */}
            <Card className="bg-gray-50">
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setIsItemsExpanded(!isItemsExpanded)}
              >
                <h4 className="text-sm sm:text-base font-semibold">
                  {selectedPlan ? `Selected Plan: ${selectedPlan.name}` : `Your Items (${items.length})`}
                </h4>
                <span className="text-gray-500">
                  {isItemsExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </div>

              {isItemsExpanded && (
                <div className="border-t bg-white">
                  <div className="p-4 space-y-3">
                    {selectedPlan ? (
                      <div className="space-y-2">
                        <p className="text-sm sm:text-base font-semibold">{selectedPlan.name}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{selectedPlan.description}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{selectedPlan.subText}</p>
                      </div>
                    ) : (
                      items.length > 0 ? (
                        items.map((item, index) => (
                          <div key={index} className="space-y-1">
                            <p className="text-sm sm:text-base font-semibold">{item.name}</p>
                            <p className="text-xs sm:text-sm text-gray-500 break-all">{item.id}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-2">No items in cart</p>
                      )
                    )}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showPurchasePlanModal && (
        <PurchasePlanModal onClose={() => setShowPurchasePlanModal(false)} onSelectPlan={handlePlanSelect} />
      )}

      {showPaymentGatewayModal && (
        <PaymentGatewayModal
          onClose={() => setShowPaymentGatewayModal(false)}
          onPay={handlePayment}
          total={orderTotal}
          email="customer@example.com" // You should get this from your user state/context
        />
      )}
    </MainLayout>
  )
}

export default PaymentMethodPage
