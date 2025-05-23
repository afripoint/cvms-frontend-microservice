"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import type { AppDispatch, RootState } from "../../../core/store"
import { setRole } from "../redux/slices/authSlice"
import { setCurrentStep } from "../redux/slices/uiSlice"
import StepIndicator from "./StepIndicator"
import { ACCOUNT_TYPES } from "../constants/auth"
import ServiceRequestModal from "./ServiceRequestModal"
// import { ACCOUNT_TYPES } from "../../../constants/auth"

const AccountType: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { role } = useSelector((state: RootState) => state.auth)
  const { currentStep } = useSelector((state: RootState) => state.ui)
  const navigate = useNavigate()

  const handleAccountTypeSelect = (
    type: "individual account" | "agent account/freight forwarders" | "company account",
  ) => {
    dispatch(setRole(type))
  }

  const handleContinue = () => {
    if (role) {
      // If individual account is selected, redirect directly to signup
      if (role === "individual account") {
        dispatch(setCurrentStep(2)) // Update the current step in UI state
        navigate("/signup")
      } else {
        // For other account types, show the modal
        setShowModal(true)
      }
    } else {
      alert("Please select an account type")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <StepIndicator currentStep={currentStep} />

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 flex items-center justify-center">
              <img src="/images/logo.png" alt="Logo" className="h-10" />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center mb-2 text-[#2E2E32]">Select account type</h2>
          <p className="text-[#292D32] text-center mb-6">Let us personalize your experience to meet your needs</p>

          <div className="space-y-4">
            {ACCOUNT_TYPES.map((accountType) => (
              <div
                key={accountType.id}
                className={`border-2 rounded-lg p-4 flex items-center cursor-pointer hover:bg-gray-50 transition ${
                  role === accountType.value ? "bg-green-50 border-green-500" : ""
                }`}
                onClick={() => handleAccountTypeSelect(accountType.value as any)}
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img src={accountType.icon || "/placeholder.svg"} alt={accountType.id} className="h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-[#26272B]">{accountType.title}</h3>
                  <p className="text-sm text-[#929292]">{accountType.description}</p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div className="w-5 h-5 border rounded-full flex items-center justify-center">
                    {role === accountType.value && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="w-full mt-8 bg-green-500 text-[#000] py-3 rounded-md hover:bg-green-600 transition"
            onClick={handleContinue}
          >
            Continue
          </button>

          <div className="mt-4 text-center text-bold">
            <span className="text-black-500">Have an Account? </span>
            <a href="/login" className="text-green-600 hover:underline text-bold">
              Sign In
            </a>
          </div>

          <div className="mt-4 text-sm text-[#929292] text-center">
            By clicking "Continue" you agree to our{" "}
            <a href="#" className="text-[#929292]">
              terms of use
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#929292]">
              privacy policy
            </a>
          </div>
        </div>
      </div>

      {showModal && (
        <ServiceRequestModal
          onClose={() => setShowModal(false)}
          onProceed={() => {
            dispatch(setCurrentStep(2)) // Update the current step in UI state
            navigate("/signup")
          }}
        />
      )}
    </div>
  )
}

export default AccountType

