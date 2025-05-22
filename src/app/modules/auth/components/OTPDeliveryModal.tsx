



// OTPDeliveryModal.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { OTPDeliveryModalProps } from "../types/auth"
import { setCurrentStep } from "../redux/slices/uiSlice"
import { Link } from "react-router-dom"

const OTPDeliveryModal: React.FC<OTPDeliveryModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  email, 
  phone, 
  hasPhone,
  errorMessage,
  title = "Verify Your Account",
  description = "To complete your registration, please choose how you'd like to receive your verification code.",
  submitButtonText = "Submit",
  showLoginLink = true,
  isPasswordChange = false
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState<"email" | "sms">("email")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Store the delivery method in localStorage
      localStorage.setItem("otpDeliveryMethod", deliveryMethod)

      if (!isPasswordChange) {
        // Only store these for registration flow
        if (email && !localStorage.getItem("userEmail")) {
          localStorage.setItem("userEmail", email)
        }

        if (phone && !localStorage.getItem("userPhone")) {
          localStorage.setItem("userPhone", phone)
        }

        // Mark the signup step as completed (we're moving to step 3)
        dispatch(setCurrentStep(3))
      }
      
      await onSubmit(deliveryMethod)
    } catch (error) {
      console.error("Error submitting OTP delivery method:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-center mb-4">{title}</h2>
          <p className="text-gray-500 text-center text-sm mb-6">
            {description}
          </p>

          {errorMessage && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              <div
                className={`border rounded-lg p-4 flex items-center cursor-pointer hover:bg-gray-50 transition ${
                  deliveryMethod === "email" ? "bg-green-50 border-green-500" : ""
                }`}
                onClick={() => setDeliveryMethod("email")}
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-gray-500">{email}</p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div className="w-5 h-5 border rounded-full flex items-center justify-center">
                    {deliveryMethod === "email" && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                  </div>
                </div>
              </div>

              {hasPhone && (
                <div
                  className={`border rounded-lg p-4 flex items-center cursor-pointer hover:bg-gray-50 transition ${
                    deliveryMethod === "sms" ? "bg-green-50 border-green-500" : ""
                  }`}
                  onClick={() => setDeliveryMethod("sms")}
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Phone Number</h3>
                    <p className="text-sm text-gray-500">{phone}</p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <div className="w-5 h-5 border rounded-full flex items-center justify-center">
                      {deliveryMethod === "sms" && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 py-2 px-4 border border-gray-200 text-black rounded-md hover:bg-gray-200 transition text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition text-sm disabled:opacity-50 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  submitButtonText
                )}
              </button>
            </div>

            {showLoginLink && (
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-green-500 hover:text-green-600 font-medium">
                    Log in
                  </Link>
                </p>
              </div>
            )}
          </form>

          <p className="text-xs text-green-500 mt-4">
            Ensure you have access to the selected option to retrieve your code.
          </p>
        </div>
      </div>
    </div>
  )
}

export default OTPDeliveryModal