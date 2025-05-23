"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import type { AppDispatch } from "../../../core/store"
import { forgotPassword } from "../redux/slices/authSlice"
import { setEmail, setStep } from "../redux/slices/passwordResetSlice"
import { PasswordResetStep } from "../types/auth"

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [emailInput, setEmailInput] = useState("")
  const [emailError, setEmailError] = useState("")

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = re.test(email)
    if (!isValid) {
      setEmailError("Please enter a valid email address")
    } else {
      setEmailError("")
    }
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(emailInput)) {
      return
    }

    try {
      await dispatch(forgotPassword(emailInput)).unwrap()
      dispatch(setEmail(emailInput))
      dispatch(setStep(PasswordResetStep.EMAIL_SENT))
      navigate("/reset-password-email-sent")
    } catch (error) {
      console.error("Failed to send password reset email:", error)
    }
  }

  const handleBackToLogin = () => {
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 flex items-center justify-center">
            <img src="/images/logo.png" alt="Logo" className="h-10" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center mb-2">Forgot Password</h2>
        <p className="text-gray-500 text-center mb-6">Enter your email address to reset your password</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address*
              </label>
              <input
                id="email"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="hello@example.com"
                required
              />
              {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">Remember your password? </span>
          <button onClick={handleBackToLogin} className="text-green-600 hover:underline">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword

