"use client"
import type React from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../../core/store"
import { useNavigate } from "react-router-dom"
import { removeFromCart, applyPromoCode } from "../redux/slices/cartSlice"
import { useState } from "react"

const Cart: React.FC = () => {
  const {
    items = [],
    promoCode = null,
    discount = 0,
    totalPrice = 0,
  } = useSelector((state: RootState) => {
    return state.cart && typeof state.cart === "object"
      ? (state.cart as {
          items: Array<{ id: string; name: string; quantity: number; price: number; type: string }>
          promoCode: string | null
          discount: number
          totalPrice: number
        })
      : { items: [], promoCode: null, discount: 0, totalPrice: 0 }
  })

  const [termsAgreed, setTermsAgreed] = useState(false)
  const [showPromoInput, setShowPromoInput] = useState(false)
  const [promoInput, setPromoInput] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orderTotal = totalPrice - discount

  const handleCheckout = () => {
    navigate("/payment-method")
  }

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      dispatch(applyPromoCode(promoInput))
      setShowPromoInput(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4 sm:p-6 bg-white min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6 text-center">Add some items to your cart to get started.</p>
        <button
          onClick={() => navigate("/vin")}
          className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
        >
          Search VINs
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-xl font-bold mb-2">Your Cart</h1>
      <div className="flex flex-col lg:flex-row lg:space-x-8 xl:space-x-32 space-y-6 lg:space-y-0">
        {/* Left Column - Cart Items */}
        <div className="w-full lg:w-1/2 lg:flex-grow">
          <div className="bg-white border rounded-lg shadow-sm">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h2 className="font-bold">VIN Search ({items.length})</h2>
              </div>
              <div className="text-right">
                <span className="font-bold">₦{totalPrice.toLocaleString()}.00</span>
              </div>
            </div>
            <div className="divide-y max-h-[400px] overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="p-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
                  <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto mb-2 sm:mb-0">
                    <div className="bg-[#0C3215] text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm whitespace-nowrap">VIN CHECK</div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold truncate">VIN {item.id.substring(0, 5)}</p>
                      <p className="text-gray-500 text-xs sm:text-sm truncate">{item.id.length > 5 ? item.id.substring(5) : ""}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 hover:bg-red-50 p-2 rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-[#F2F2F7] border rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-lg sm:text-xl font-bold">Order Summary</h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">₦{totalPrice.toLocaleString()}.00</span>
                </div>

                {promoCode && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Promo Discount</span>
                    <span className="font-bold text-green-600">-₦{discount.toLocaleString()}.00</span>
                  </div>
                )}

                {!showPromoInput ? (
                  <div className="text-center mt-2">
                    <button onClick={() => setShowPromoInput(true)} className="text-black underline text-sm">
                      Have a promo code?
                    </button>
                  </div>
                ) : (
                  <div className="mt-2 flex flex-wrap sm:flex-nowrap gap-2">
                    <input
                      type="text"
                      placeholder="Enter a promo code"
                      className="flex-grow w-full sm:w-auto border rounded-lg sm:rounded-r-none px-2 py-1 text-sm"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                    />
                    <div className="flex w-full sm:w-auto">
                      <button className="flex-grow bg-black text-white px-4 py-1 rounded-lg sm:rounded-l-none" onClick={handleApplyPromo}>
                        Apply
                      </button>
                      <button
                        className="ml-2 text-gray-500"
                        onClick={() => {
                          setShowPromoInput(false)
                          setPromoInput("")
                        }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}

                <div className="border-t pt-3 flex justify-between font-bold text-base sm:text-lg">
                  <span>Order Total</span>
                  <span>₦{orderTotal.toLocaleString()}.00</span>
                </div>
              </div>

              {!showPromoInput && (
                <div className="mt-4 flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 mr-2"
                    checked={termsAgreed}
                    onChange={() => setTermsAgreed(!termsAgreed)}
                  />
                  <label htmlFor="terms" className="text-xs text-gray-600">
                    By clicking this, I agree to CVMS's{" "}
                    <a href="/terms" className="text-green-500 hover:underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-green-500 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              )}

              <button
                className={`w-full py-2 px-4 rounded flex items-center justify-center mt-4 ${termsAgreed ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                disabled={!termsAgreed}
                onClick={handleCheckout}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Checkout
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate("/vin")}
              className="w-full border border-green-500 text-green-500 py-3 rounded-lg hover:bg-green-50 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart