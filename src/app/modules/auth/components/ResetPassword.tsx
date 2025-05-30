// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import type { AppDispatch, RootState } from "../../../core/store"
// import { usePasswordValidation } from "../hooks/usePasswordValidation"
// import { setNewPassword } from "../redux/slices/authSlice"
// import { setStep } from "../redux/slices/passwordResetSlice"
// import { PasswordResetStep } from "../types/auth"


// const ResetPassword: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const { token } = useSelector((state: RootState) => state.passwordReset)

//   const [formData, setFormData] = useState({
//     password: "",
//     confirmPassword: "",
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   const { isValid, passwordError, confirmPasswordError } = usePasswordValidation(
//     formData.password,
//     formData.confirmPassword,
//   )

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!isValid) {
//       return
//     }

//     try {
//       // Use token from URL or from state
//       const urlToken = new URLSearchParams(window.location.search).get("token")
//       const resetToken = urlToken || token

//       if (!resetToken) {
//         throw new Error("Invalid or missing token")
//       }

//       await dispatch(setNewPassword({ token: resetToken, newPassword: formData.password })).unwrap()
//       dispatch(setStep(PasswordResetStep.SUCCESS))
//       navigate("/reset-password-success")
//     } catch (error) {
//       console.error("Failed to reset password:", error)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//         <div className="flex justify-center mb-6">
//           <div className="h-16 w-16 flex items-center justify-center">
//             <img src="/images/logo.png" alt="Logo" className="h-10" />
//           </div>
//         </div>

//         <h2 className="text-xl font-semibold text-center mb-2">Set New Password</h2>
//         <p className="text-gray-500 text-center mb-6">Create a new password for your account</p>

//         <form onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 New Password*
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                     passwordError ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="••••••••"
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                       />
//                     </svg>
//                   ) : (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                       />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {passwordError && <p className="mt-1 text-sm text-red-500">{passwordError}</p>}
//               <p className="mt-1 text-xs text-gray-500">
//                 Password must be at least 8 characters and include uppercase, lowercase, and numbers
//               </p>
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                 Confirm New Password*
//               </label>
//               <div className="relative">
//                 <input
//                   id="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                     confirmPasswordError ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="••••••••"
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                       />
//                     </svg>
//                   ) : (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                       />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {confirmPasswordError && <p className="mt-1 text-sm text-red-500">{confirmPasswordError}</p>}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full mt-6 py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//           >
//             Reset Password
//           </button>
//         </form>

//         <p className="mt-4 text-xs text-center text-gray-500">
//           This link will expire in 24 hours. If you need a new link, you can request it again.
//         </p>
//       </div>
//     </div>
//   )
// }

// export default ResetPassword





// Updated ResetPassword.tsx component
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import type { AppDispatch, RootState } from "../../../core/store"
import { usePasswordValidation } from "../hooks/usePasswordValidation"
import { setNewPassword, resetPasswordTokenCheck } from "../redux/slices/authSlice"
import { setStep, setToken, setUidb64 } from "../redux/slices/passwordResetSlice"
import { PasswordResetStep } from "../types/auth"

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get stored token and uidb64 from Redux state
  const { token, uidb64 } = useSelector((state: RootState) => state.passwordReset)

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState(false)

  const { isValid, passwordError, confirmPasswordError } = usePasswordValidation(
    formData.password,
    formData.confirmPassword,
  )

  // Parse token and uidb64 from URL if available
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const urlUidb64 = queryParams.get("uidb64")
    const urlToken = queryParams.get("token")
    
    // If we have both parameters in URL, validate the token
    if (urlUidb64 && urlToken) {
      // Store them in Redux state
      dispatch(setUidb64(urlUidb64))
      dispatch(setToken(urlToken))
      
      // Validate the token
      dispatch(resetPasswordTokenCheck({ uidb64: urlUidb64, token: urlToken }))
        .unwrap()
        .then(() => {
          setIsTokenValid(true)
        })
        .catch((error) => {
          console.error("Invalid token:", error)
          // Handle invalid token - redirect to forgot password page
          alert("Your password reset link is invalid or has expired. Please request a new one.")
          dispatch(setStep(PasswordResetStep.REQUEST))
          navigate("/forgot-password")
        })
    } else if (!uidb64 || !token) {
      // If we don't have the params in the URL or in the Redux state, redirect
      alert("Missing password reset information. Please request a new reset link.")
      dispatch(setStep(PasswordResetStep.REQUEST))
      navigate("/forgot-password")
    } else {
      // We have the params in Redux state, validate them
      setIsTokenValid(true)
    }
  }, [dispatch, location.search, navigate, token, uidb64])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()

  //   if (!isValid) {
  //     return
  //   }

  //   try {
  //     // Get values from URL or Redux state
  //     const queryParams = new URLSearchParams(location.search)
  //     const urlUidb64 = queryParams.get("uidb64") || uidb64
  //     const urlToken = queryParams.get("token") || token

  //     if (!urlUidb64 || !urlToken) {
  //       throw new Error("Invalid or missing token information")
  //     }

  //     await dispatch(
  //       setNewPassword({ 
  //         uidb64: urlUidb64, 
  //         token: urlToken, 
  //         newPassword: formData.password 
  //       })
  //     ).unwrap()
      
  //     dispatch(setStep(PasswordResetStep.SUCCESS))
  //     navigate("/reset-password-success")
  //   } catch (error) {
  //     console.error("Failed to reset password:", error)
  //   }
  // }


  // Update this function in ResetPassword.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!isValid) {
    return
  }

  try {
    // Get values from URL or Redux state
    const queryParams = new URLSearchParams(location.search)
    const urlUidb64 = queryParams.get("uidb64") || uidb64
    const urlToken = queryParams.get("token") || token

    if (!urlUidb64 || !urlToken) {
      throw new Error("Invalid or missing token information")
    }

    await dispatch(
      setNewPassword({ 
        uidb64: urlUidb64, 
        token: urlToken, 
        newPassword: formData.password 
      })
    ).unwrap()
    
    dispatch(setStep(PasswordResetStep.SUCCESS))
    // Use the same pattern as the incoming URL - with /auth prefix
    navigate("/auth/reset-password-success")
  } catch (error) {
    console.error("Failed to reset password:", error)
  }
}

  // Show loading or redirect if token is invalid
  if (!isTokenValid) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <p>Validating your reset link...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 flex items-center justify-center">
            <img src="/images/logo.png" alt="Logo" className="h-10" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center mb-2">Set New Password</h2>
        <p className="text-gray-500 text-center mb-6">Create a new password for your account</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password*
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {passwordError && <p className="mt-1 text-sm text-red-500">{passwordError}</p>}
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters and include uppercase, lowercase, and numbers
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password*
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    confirmPasswordError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {confirmPasswordError && <p className="mt-1 text-sm text-red-500">{confirmPasswordError}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-2 px-4 bg-green-500 text-black rounded-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-4 text-xs text-center text-gray-500">
          This link will expire in 24 hours. If you need a new link, you can request it again.
        </p>
      </div>
    </div>
  )
}

export default ResetPassword