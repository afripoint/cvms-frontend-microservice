// "use client"

// import type React from "react"
// import { useSelector, useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import type { RootState } from "../../../core/store"

// import type { AppDispatch } from "../../../core/store"
// import { resetPasswordTokenCheck } from "../redux/slices/authSlice"
// import { setStep, setToken } from "../redux/slices/passwordResetSlice"
// import { PasswordResetStep } from "../types/auth"

// const EmailSent: React.FC = () => {
//   const { email } = useSelector((state: RootState) => state.passwordReset)
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()

//   const handleSimulateResetLink = async () => {
//     try {
//       const token = Math.random().toString(36).substring(2, 15)
//       await dispatch(resetPasswordTokenCheck(token)).unwrap()
//       dispatch(setToken(token))
//       dispatch(setStep(PasswordResetStep.RESET_FORM))
//       navigate("/reset-password")
//     } catch (error) {
//       console.error("Invalid or expired token:", error)
//     }
//   }

//   const handleBackToLogin = () => {
//     navigate("/login")
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
//         <div className="flex justify-center mb-6">
//           <img src="/icons/email-state.svg" alt="" className="w-20 h-15" />
//         </div>

//         <h2 className="text-xl font-semibold mb-2">Email Sent!</h2>
//         <p className="text-gray-500 mb-6">
//           We've sent a password reset link to <strong>{email}</strong>. Please check your email and follow the
//           instructions to reset your password.
//         </p>

//         <div className="space-y-4">
//           <button
//             onClick={handleSimulateResetLink}
//             className="w-full py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//           >
//             Continue
//           </button>

//           <p className="text-sm text-gray-500">
//             Don't have an account? <span className="text-[#34C759]">Sign up for free</span>
//             <button onClick={() => navigate("/signup")} className="text-green-600 hover:underline ml-1"></button>
//           </p>
//         </div>

//         <div className="mt-6 text-center text-sm">
//           <button onClick={handleBackToLogin} className="text-green-600 hover:underline">
//             Back to Login
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EmailSent



// Updated EmailSent.tsx component
"use client"

import type React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../../../core/store"

import type { AppDispatch } from "../../../core/store"
import { resetPasswordTokenCheck } from "../redux/slices/authSlice"
import { setStep, setToken, setUidb64, } from "../redux/slices/passwordResetSlice"
import { PasswordResetStep } from "../types/auth"

const EmailSent: React.FC = () => {
  const { email } = useSelector((state: RootState) => state.passwordReset)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleSimulateResetLink = async () => {
    try {
      // In a real implementation, these would be received in the actual email link
      // For demo purposes we're generating mock values
      const mockUidb64 = btoa(Math.floor(Math.random() * 1000).toString())
      const token = Math.random().toString(36).substring(2, 15)
      
      await dispatch(resetPasswordTokenCheck({ uidb64: mockUidb64, token })).unwrap()
      
      // Save both token and uidb64 in state
      dispatch(setToken(token))
      dispatch(setUidb64(mockUidb64))
      dispatch(setStep(PasswordResetStep.RESET_FORM))
      
      // Pass token and uidb64 in URL for better UX
      navigate(`/reset-password?uidb64=${mockUidb64}&token=${token}`)
    } catch (error) {
      console.error("Invalid or expired token:", error)
    }
  }

  const handleBackToLogin = () => {
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <img src="/icons/email-state.svg" alt="" className="w-20 h-15" />
        </div>

        <h2 className="text-xl font-semibold mb-2">Email Sent!</h2>
        <p className="text-gray-500 mb-6">
          We've sent a password reset link to <strong>{email}</strong>. Please check your email and follow the
          instructions to reset your password.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleSimulateResetLink}
            className="w-full py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Continue
          </button>

          <p className="text-sm text-gray-500">
            Don't have an account? <span className="text-[#34C759]">Sign up for free</span>
            <button onClick={() => navigate("/signup")} className="text-green-600 hover:underline ml-1"></button>
          </p>
        </div>

        <div className="mt-6 text-center text-sm">
          <button onClick={handleBackToLogin} className="text-green-600 hover:underline">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmailSent