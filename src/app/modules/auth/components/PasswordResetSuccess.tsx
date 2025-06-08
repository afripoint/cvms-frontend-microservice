"use client"

import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { resetState } from "../redux/slices/passwordResetSlice"

const PasswordResetSuccess: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(resetState())
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <img src="/icons/seal-check.svg" alt="" className="h-8 w-8" />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">Password Changed!</h2>
        <p className="text-gray-500 mb-6">
          Your password has been reset successfully. You can now login with your new password.
        </p>

        <button
          onClick={handleLogin}
          className="w-full py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Back to Login
        </button>
      </div>
    </div>
  )
}

export default PasswordResetSuccess