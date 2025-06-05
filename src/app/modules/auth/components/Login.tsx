// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate, useLocation } from "react-router-dom"
// import { useDispatch } from "react-redux"
// import type { AppDispatch } from "../../../core/store"
// import { LoginFormData, LoginResponse, User } from "../types/auth"
// import { loginUser, logoutUser } from "../redux/slices/authSlice"
// import { authService } from "../services"

// const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
//         <button 
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//         {children}
//       </div>
//     </div>
//   )
// }

// const Login: React.FC = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch<AppDispatch>()
//   const [formData, setFormData] = useState<LoginFormData>({
//     email: "",
//     password: "",
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [loginSuccess, setLoginSuccess] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [errorMessage, setErrorMessage] = useState<string | null>(null)
//   const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false)
//   const [oldPassword, setOldPassword] = useState("")
//   const [newPassword, setNewPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [passwordChangeError, setPasswordChangeError] = useState("")
//   const [isPasswordChangeLoading, setIsPasswordChangeLoading] = useState(false)

//   useEffect(() => {
//     let redirectTimer: NodeJS.Timeout
//     if (loginSuccess) {
//       redirectTimer = setTimeout(() => {
//         navigate("/", {
//           state: {
//             ninVerified: localStorage.getItem("ninVerified") === "true",
//             firstName: localStorage.getItem("firstName"),
//             lastName: localStorage.getItem("lastName"),
//             email: formData.email,
//           },
//         })
//       }, 500)
//     }

//     return () => {
//       if (redirectTimer) clearTimeout(redirectTimer)
//     }
//   }, [loginSuccess, navigate, formData.email])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setErrorMessage(null)
    
//     try {
//       const response = (await dispatch(loginUser(formData)).unwrap()) as LoginResponse

//       // Store tokens in localStorage
//       localStorage.setItem("access_token", response.tokens.access_token)
//       localStorage.setItem("refresh_token", response.tokens.refresh_token)

//       // Store token expiration time
//       const expiresAt = new Date().getTime() + 60 * 60 * 1000
//       localStorage.setItem("expires_at", expiresAt.toString())

//       // Store user info with email
//       const userData: User = {
//         ...response.user,
//         email: formData.email,
//       }
//       localStorage.setItem("user", JSON.stringify(userData))
      
//       // Store individual fields
//       localStorage.setItem("ninVerified", response.user["NIN Verified"]?.toString() || "false")
//       localStorage.setItem("firstName", response.user.first_name || "")
//       localStorage.setItem("lastName", response.user.last_name || "")

//       // Store CSRF token
//       const csrfToken = Math.random().toString(36).substring(2)
//       localStorage.setItem("csrf_token", csrfToken)

//       // Check if user is a sub-account - they must change password immediately
//       if (response.user.is_sub_account) {
//         // Store the current password for validation
//         setOldPassword(formData.password)
//         setShowPasswordChangeModal(true)
//       } else {
//         setLoginSuccess(true)
//       }
      
//     } catch (error) {
//       console.error("Login failed:", error)
//       setErrorMessage(typeof error === 'string' ? error : "Login failed. Please check your credentials and try again.")
//       setLoginSuccess(false)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const validatePassword = (password: string): string[] => {
//     const errors: string[] = []
    
//     if (password.length < 8) {
//       errors.push("Password must be at least 8 characters long")
//     }
    
//     if (!/[A-Z]/.test(password)) {
//       errors.push("Password must contain at least one uppercase letter")
//     }
    
//     if (!/[a-z]/.test(password)) {
//       errors.push("Password must contain at least one lowercase letter")
//     }
    
//     if (!/\d/.test(password)) {
//       errors.push("Password must contain at least one number")
//     }
    
//     if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
//       errors.push("Password must contain at least one special character")
//     }
    
//     return errors
//   }

//   const handlePasswordChange = async () => {
//     setPasswordChangeError("")
    
//     // Validate inputs
//     if (!oldPassword) {
//       setPasswordChangeError("Please enter your current password")
//       return
//     }

//     if (!newPassword) {
//       setPasswordChangeError("Please enter a new password")
//       return
//     }

//     if (!confirmPassword) {
//       setPasswordChangeError("Please confirm your new password")
//       return
//     }

//     if (newPassword !== confirmPassword) {
//       setPasswordChangeError("New passwords do not match")
//       return
//     }

//     if (newPassword === oldPassword) {
//       setPasswordChangeError("New password must be different from current password")
//       return
//     }

//     // Validate password complexity
//     const passwordErrors = validatePassword(newPassword)
//     if (passwordErrors.length > 0) {
//       setPasswordChangeError(passwordErrors.join(". "))
//       return
//     }

//     try {
//       setIsPasswordChangeLoading(true)
      
//       // Call the password change API
//       await authService.changePassword(oldPassword, newPassword)
      
//       // Clear all auth-related localStorage items for complete logout
//       localStorage.removeItem("access_token")
//       localStorage.removeItem("refresh_token")
//       localStorage.removeItem("expires_at")
//       localStorage.removeItem("user")
//       localStorage.removeItem("csrf_token")
//       localStorage.removeItem("ninVerified")
//       localStorage.removeItem("firstName")
//       localStorage.removeItem("lastName")
      
//       // Dispatch logout action to clear Redux state
//       dispatch(logoutUser())
      
//       // Close modal and show success message
//       setShowPasswordChangeModal(false)
      
//       // Redirect to login with success message
//       navigate("/login", {
//         state: { 
//           successMessage: "Password changed successfully! Please log in with your new password.",
//           email: formData.email // Pre-fill email for convenience
//         }
//       })
//     } catch (error: any) {
//       console.error("Password change failed:", error)
//       setPasswordChangeError(error.message || "Failed to change password. Please try again.")
//     } finally {
//       setIsPasswordChangeLoading(false)
//     }
//   }

//   const handleModalClose = () => {
//     // Prevent closing modal if it's for mandatory password change
//     // Sub-users must change their password before proceeding
//     return
//   }

//   const handleSignUp = () => {
//     navigate("/account-type")
//   }

//   const handleForgotPassword = () => {
//     navigate("/forgot-password")
//   }

//   // Check for success message from navigation state
//   const location = useLocation()
//   const successMessage = location.state?.successMessage
//   const prefilledEmail = location.state?.email

//   useEffect(() => {
//     if (prefilledEmail) {
//       setFormData(prev => ({ ...prev, email: prefilledEmail }))
//     }
//   }, [prefilledEmail])

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//         <div className="flex justify-center mb-6">
//           <div className="h-16 w-16 flex items-center justify-center">
//             <img src="/images/logo.png" alt="Logo" className="h-10" />
//           </div>
//         </div>

//         {loginSuccess ? (
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-600 mb-4">
//               <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//               </svg>
//             </div>
//             <h2 className="text-xl font-semibold text-center mb-2">Login Successful!</h2>
//             <p className="text-gray-500">Redirecting you to your dashboard...</p>
//           </div>
//         ) : (
//           <>
//             <h2 className="text-xl font-semibold text-center mb-2">Welcome back!</h2>
//             <p className="text-gray-500 text-center mb-6">Enter your details to access your account</p>

//             {successMessage && (
//               <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
//                 {successMessage}
//               </div>
//             )}

//             {errorMessage && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
//                 {errorMessage}
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email Address*
//                   </label>
//                   <input
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     placeholder="hello@example.com"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                     Password*
//                   </label>
//                   <div className="relative">
//                     <input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                       placeholder="••••••••"
//                       required
//                       disabled={isLoading}
//                     />
//                     <button
//                       type="button"
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                       onClick={() => setShowPassword(!showPassword)}
//                       disabled={isLoading}
//                     >
//                       {showPassword ? (
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                           />
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                           />
//                         </svg>
//                       )}
//                     </button>
//                   </div>
//                   <div className="flex justify-end mt-1">
//                     <button 
//                       type="button" 
//                       onClick={handleForgotPassword} 
//                       className="text-sm text-red-500 hover:underline"
//                       disabled={isLoading}
//                     >
//                       Forgot password?
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className={`w-full mt-6 py-2 px-4 bg-green-500 text-black rounded-md ${
//                   isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"
//                 } transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Logging in...
//                   </span>
//                 ) : (
//                   "Login"
//                 )}
//               </button>
//             </form>

//             <div className="mt-6 text-center text-sm">
//               <span className="text-gray-500">Don't have an account? </span>
//               <button 
//                 onClick={handleSignUp} 
//                 className="text-green-600 hover:underline"
//                 disabled={isLoading}
//               >
//                 Sign up
//               </button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Password Change Modal for Sub-Users - Cannot be closed */}
//       {showPasswordChangeModal && (
//         <Modal onClose={handleModalClose}>
//           <div className="p-6">
//             <div className="flex items-center mb-4">
//               <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
//                 <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                 </svg>
//               </div>
//               <h2 className="text-xl font-semibold">Password Change Required</h2>
//             </div>
            
//             <p className="mb-6 text-gray-600">
//               As a sub-user account, you must change your default password before accessing the system. 
//               This is required for security purposes.
//             </p>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Current Password*
//                 </label>
//                 <input
//                   type="password"
//                   value={oldPassword}
//                   onChange={(e) => setOldPassword(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="Enter current password"
//                   required
//                   disabled={isPasswordChangeLoading}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   New Password*
//                 </label>
//                 <input
//                   type="password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="Enter new password"
//                   required
//                   disabled={isPasswordChangeLoading}
//                 />
//                 <div className="mt-1 text-xs text-gray-500">
//                   Must contain: 8+ characters, uppercase, lowercase, number, and special character
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Confirm New Password*
//                 </label>
//                 <input
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="Confirm new password"
//                   required
//                   disabled={isPasswordChangeLoading}
//                 />
//               </div>
              
//               {passwordChangeError && (
//                 <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
//                   {passwordChangeError}
//                 </div>
//               )}
              
//               <button
//                 onClick={handlePasswordChange}
//                 className={`w-full py-2 px-4 bg-green-500 text-black rounded-md ${
//                   isPasswordChangeLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"
//                 } transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
//                 disabled={isPasswordChangeLoading}
//               >
//                 {isPasswordChangeLoading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Changing Password...
//                   </span>
//                 ) : (
//                   "Change Password"
//                 )}
//               </button>
              
//               <p className="text-xs text-gray-500 text-center">
//                 You will be logged out after changing your password and need to log in again.
//               </p>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div>
//   )
// }

// export default Login


// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate, useLocation } from "react-router-dom"
// import { useDispatch } from "react-redux"
// import type { AppDispatch } from "../../../core/store"
// import { LoginFormData, LoginResponse, User } from "../types/auth"
// import { loginUser, logoutUser } from "../redux/slices/authSlice"
// import { authService } from "../services"

// const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
//         <button 
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//         {children}
//       </div>
//     </div>
//   )
// }

// const Login: React.FC = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch<AppDispatch>()
//   const [formData, setFormData] = useState<LoginFormData>({
//     email: "",
//     password: "",
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [loginSuccess, setLoginSuccess] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [errorMessage, setErrorMessage] = useState<string | null>(null)
//   const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false)
//   const [oldPassword, setOldPassword] = useState("")
//   const [newPassword, setNewPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [passwordChangeError, setPasswordChangeError] = useState("")
//   const [isPasswordChangeLoading, setIsPasswordChangeLoading] = useState(false)

//   useEffect(() => {
//     let redirectTimer: NodeJS.Timeout
//     if (loginSuccess) {
//       redirectTimer = setTimeout(() => {
//         navigate("/", {
//           state: {
//             ninVerified: localStorage.getItem("ninVerified") === "true",
//             firstName: localStorage.getItem("firstName"),
//             lastName: localStorage.getItem("lastName"),
//             email: formData.email,
//           },
//         })
//       }, 500)
//     }

//     return () => {
//       if (redirectTimer) clearTimeout(redirectTimer)
//     }
//   }, [loginSuccess, navigate, formData.email])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   // Helper function to check if sub-user needs password change
//   const requiresPasswordChange = (user: User): boolean => {
//     // Check if user is a sub-account AND has not changed their password yet
//     return user.is_sub_account && !user.password_changes
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setErrorMessage(null)
    
//     try {
//       const response = (await dispatch(loginUser(formData)).unwrap()) as LoginResponse

//       // Store tokens in localStorage
//       localStorage.setItem("access_token", response.tokens.access_token)
//       localStorage.setItem("refresh_token", response.tokens.refresh_token)

//       // Store token expiration time
//       const expiresAt = new Date().getTime() + 60 * 60 * 1000
//       localStorage.setItem("expires_at", expiresAt.toString())

//       // Store user info with email
//       const userData: User = {
//         ...response.user,
//         email: formData.email,
//       }
//       localStorage.setItem("user", JSON.stringify(userData))
      
//       // Store individual fields
//       localStorage.setItem("ninVerified", response.user["NIN Verified"]?.toString() || "false")
//       localStorage.setItem("firstName", response.user.first_name || "")
//       localStorage.setItem("lastName", response.user.last_name || "")

//       // Store CSRF token
//       const csrfToken = Math.random().toString(36).substring(2)
//       localStorage.setItem("csrf_token", csrfToken)

//       // ENHANCED LOGIC: Check if sub-user needs to change password
//       if (requiresPasswordChange(response.user)) {
//         console.log("Sub-user requires password change - showing modal")
//         // Store the current password for validation
//         setOldPassword(formData.password)
//         setShowPasswordChangeModal(true)
//       } else {
//         // User can proceed normally (regular user OR sub-user who already changed password)
//         console.log("User can proceed to dashboard")
//         setLoginSuccess(true)
//       }
      
//     } catch (error) {
//       console.error("Login failed:", error)
//       setErrorMessage(typeof error === 'string' ? error : "Login failed. Please check your credentials and try again.")
//       setLoginSuccess(false)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const validatePassword = (password: string): string[] => {
//     const errors: string[] = []
    
//     if (password.length < 8) {
//       errors.push("Password must be at least 8 characters long")
//     }
    
//     if (!/[A-Z]/.test(password)) {
//       errors.push("Password must contain at least one uppercase letter")
//     }
    
//     if (!/[a-z]/.test(password)) {
//       errors.push("Password must contain at least one lowercase letter")
//     }
    
//     if (!/\d/.test(password)) {
//       errors.push("Password must contain at least one number")
//     }
    
//     if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
//       errors.push("Password must contain at least one special character")
//     }
    
//     return errors
//   }

//   const handlePasswordChange = async () => {
//     setPasswordChangeError("")
    
//     // Validate inputs
//     if (!oldPassword) {
//       setPasswordChangeError("Please enter your current password")
//       return
//     }

//     if (!newPassword) {
//       setPasswordChangeError("Please enter a new password")
//       return
//     }

//     if (!confirmPassword) {
//       setPasswordChangeError("Please confirm your new password")
//       return
//     }

//     if (newPassword !== confirmPassword) {
//       setPasswordChangeError("New passwords do not match")
//       return
//     }

//     if (newPassword === oldPassword) {
//       setPasswordChangeError("New password must be different from current password")
//       return
//     }

//     // Validate password complexity
//     const passwordErrors = validatePassword(newPassword)
//     if (passwordErrors.length > 0) {
//       setPasswordChangeError(passwordErrors.join(". "))
//       return
//     }

//     try {
//       setIsPasswordChangeLoading(true)
      
//       // ENHANCED: Call the password change API with additional flag update
//       await authService.changePassword(oldPassword, newPassword, { 
//         updateSubUserStatus: true // Flag to update user's password_changed status
//       })
      
//       // Clear all auth-related localStorage items for complete logout
//       localStorage.removeItem("access_token")
//       localStorage.removeItem("refresh_token")
//       localStorage.removeItem("expires_at")
//       localStorage.removeItem("user")
//       localStorage.removeItem("csrf_token")
//       localStorage.removeItem("ninVerified")
//       localStorage.removeItem("firstName")
//       localStorage.removeItem("lastName")
      
//       // Dispatch logout action to clear Redux state
//       dispatch(logoutUser())
      
//       // Close modal and show success message
//       setShowPasswordChangeModal(false)
      
//       // ENHANCED: Clear form state for clean re-login
//       setFormData({ email: "", password: "" })
//       setOldPassword("")
//       setNewPassword("")
//       setConfirmPassword("")
      
//       // Redirect to login with success message
//       navigate("/login", {
//         state: { 
//           successMessage: "Password changed successfully! Please log in with your new password.",
//           email: formData.email, // Pre-fill email for convenience
//           isSubUserPasswordChanged: true // Flag to indicate this was a sub-user password change
//         }
//       })
//     } catch (error: any) {
//       console.error("Password change failed:", error)
//       setPasswordChangeError(error.message || "Failed to change password. Please try again.")
//     } finally {
//       setIsPasswordChangeLoading(false)
//     }
//   }

//   const handleModalClose = () => {
//     // Prevent closing modal if it's for mandatory password change
//     // Sub-users must change their password before proceeding
//     console.log("Password change modal cannot be closed - mandatory for sub-users")
//     return
//   }

//   const handleSignUp = () => {
//     navigate("/account-type")
//   }

//   const handleForgotPassword = () => {
//     navigate("/forgot-password")
//   }

//   // Check for success message from navigation state
//   const location = useLocation()
//   const successMessage = location.state?.successMessage
//   const prefilledEmail = location.state?.email
//   const isSubUserPasswordChanged = location.state?.isSubUserPasswordChanged

//   useEffect(() => {
//     if (prefilledEmail) {
//       setFormData(prev => ({ ...prev, email: prefilledEmail }))
//     }
    
//     // ENHANCED: Log the context for debugging
//     if (isSubUserPasswordChanged) {
//       console.log("Sub-user has successfully changed password and returned for second login")
//     }
//   }, [prefilledEmail, isSubUserPasswordChanged])

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//         <div className="flex justify-center mb-6">
//           <div className="h-16 w-16 flex items-center justify-center">
//             <img src="/images/logo.png" alt="Logo" className="h-10" />
//           </div>
//         </div>

//         {loginSuccess ? (
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-600 mb-4">
//               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//               </svg>
//             </div>
//             <h2 className="text-xl font-semibold text-center mb-2">Login Successful!</h2>
//             <p className="text-gray-500">Redirecting you to your dashboard...</p>
//           </div>
//         ) : (
//           <>
//             <h2 className="text-xl font-semibold text-center mb-2">Welcome back!</h2>
//             <p className="text-gray-500 text-center mb-6">Enter your details to access your account</p>

//             {successMessage && (
//               <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
//                 {successMessage}
//                 {isSubUserPasswordChanged && (
//                   <div className="mt-1 text-sm">
//                     You can now log in normally with your new password.
//                   </div>
//                 )}
//               </div>
//             )}

//             {errorMessage && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
//                 {errorMessage}
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email Address*
//                   </label>
//                   <input
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     placeholder="hello@example.com"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                     Password*
//                   </label>
//                   <div className="relative">
//                     <input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                       placeholder="••••••••"
//                       required
//                       disabled={isLoading}
//                     />
//                     <button
//                       type="button"
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                       onClick={() => setShowPassword(!showPassword)}
//                       disabled={isLoading}
//                     >
//                       {showPassword ? (
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                           />
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                           />
//                         </svg>
//                       )}
//                     </button>
//                   </div>
//                   <div className="flex justify-end mt-1">
//                     <button 
//                       type="button" 
//                       onClick={handleForgotPassword} 
//                       className="text-sm text-red-500 hover:underline"
//                       disabled={isLoading}
//                     >
//                       Forgot password?
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className={`w-full mt-6 py-2 px-4 bg-green-500 text-black rounded-md ${
//                   isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"
//                 } transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Logging in...
//                   </span>
//                 ) : (
//                   "Login"
//                 )}
//               </button>
//             </form>

//             <div className="mt-6 text-center text-sm">
//               <span className="text-gray-500">Don't have an account? </span>
//               <button 
//                 onClick={handleSignUp} 
//                 className="text-green-600 hover:underline"
//                 disabled={isLoading}
//               >
//                 Sign up
//               </button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Password Change Modal for Sub-Users - Cannot be closed */}
//       {showPasswordChangeModal && (
//         <Modal onClose={handleModalClose}>
//           <div className="p-6">
//             <div className="flex items-center mb-4">
//               <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
//                 <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                 </svg>
//               </div>
//               <h2 className="text-xl font-semibold">Password Change Required</h2>
//             </div>
            
//             <p className="mb-6 text-gray-600">
//               As a sub-user account, you must change your default password before accessing the system. 
//               This is required for security purposes and you'll only need to do this once.
//             </p>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Current Password*
//                 </label>
//                 <input
//                   type="password"
//                   value={oldPassword}
//                   onChange={(e) => setOldPassword(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="Enter current password"
//                   required
//                   disabled={isPasswordChangeLoading}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   New Password*
//                 </label>
//                 <input
//                   type="password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="Enter new password"
//                   required
//                   disabled={isPasswordChangeLoading}
//                 />
//                 <div className="mt-1 text-xs text-gray-500">
//                   Must contain: 8+ characters, uppercase, lowercase, number, and special character
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Confirm New Password*
//                 </label>
//                 <input
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="Confirm new password"
//                   required
//                   disabled={isPasswordChangeLoading}
//                 />
//               </div>
              
//               {passwordChangeError && (
//                 <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
//                   {passwordChangeError}
//                 </div>
//               )}
              
//               <button
//                 onClick={handlePasswordChange}
//                 className={`w-full py-2 px-4 bg-green-500 text-black rounded-md ${
//                   isPasswordChangeLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"
//                 } transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
//                 disabled={isPasswordChangeLoading}
//               >
//                 {isPasswordChangeLoading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Changing Password...
//                   </span>
//                 ) : (
//                   "Change Password"
//                 )}
//               </button>
              
//               <p className="text-xs text-gray-500 text-center">
//                 You will be logged out after changing your password and need to log in again with your new password.
//               </p>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div>
//   )
// }

// export default Login



"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../../core/store"
import { LoginFormData, LoginResponse, User } from "../types/auth"
import { loginUser, logoutUser } from "../redux/slices/authSlice"
import { authService } from "../services"

const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  )
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordChangeError, setPasswordChangeError] = useState("")
  const [isPasswordChangeLoading, setIsPasswordChangeLoading] = useState(false)

  useEffect(() => {
    let redirectTimer: NodeJS.Timeout
    if (loginSuccess) {
      redirectTimer = setTimeout(() => {
        navigate("/", {
          state: {
            ninVerified: localStorage.getItem("ninVerified") === "true",
            firstName: localStorage.getItem("firstName"),
            lastName: localStorage.getItem("lastName"),
            email: formData.email,
          },
        })
      }, 500)
    }

    return () => {
      if (redirectTimer) clearTimeout(redirectTimer)
    }
  }, [loginSuccess, navigate, formData.email])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Updated helper function to check if sub-user needs password change
  const requiresPasswordChange = (user: User): boolean => {
    // Check if user is a sub-account AND has NOT changed their default password yet
    return user.is_sub_account && !user.is_default_password_change
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)
    
    try {
      const response = (await dispatch(loginUser(formData)).unwrap()) as LoginResponse

      // Store tokens in localStorage
      localStorage.setItem("access_token", response.tokens.access_token)
      localStorage.setItem("refresh_token", response.tokens.refresh_token)

      // Store token expiration time
      const expiresAt = new Date().getTime() + 60 * 60 * 1000
      localStorage.setItem("expires_at", expiresAt.toString())

      // Store user info with email
      const userData: User = {
        ...response.user,
        email: formData.email,
      }
      localStorage.setItem("user", JSON.stringify(userData))
      
      // Store individual fields
      localStorage.setItem("ninVerified", response.user["NIN Verified"]?.toString() || "false")
      localStorage.setItem("firstName", response.user.first_name || "")
      localStorage.setItem("lastName", response.user.last_name || "")

      // Store CSRF token
      const csrfToken = Math.random().toString(36).substring(2)
      localStorage.setItem("csrf_token", csrfToken)

      // UPDATED LOGIC: Check if sub-user needs to change password based on is_default_password_change
      if (requiresPasswordChange(response.user)) {
        console.log("Sub-user requires password change - showing modal")
        // Store the current password for validation
        setOldPassword(formData.password)
        setShowPasswordChangeModal(true)
      } else {
        // User can proceed normally (regular user OR sub-user who already changed password)
        if (response.user.is_sub_account && response.user.is_default_password_change) {
          console.log("Sub-user has already changed password - proceeding to dashboard")
        } else {
          console.log("Regular user - proceeding to dashboard")
        }
        setLoginSuccess(true)
      }
      
    } catch (error) {
      console.error("Login failed:", error)
      setErrorMessage(typeof error === 'string' ? error : "Login failed. Please check your credentials and try again.")
      setLoginSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  const validatePassword = (password: string): string[] => {
    const errors: string[] = []
    
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long")
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter")
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter")
    }
    
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number")
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("Password must contain at least one special character")
    }
    
    return errors
  }

  const handlePasswordChange = async () => {
    setPasswordChangeError("")
    
    // Validate inputs
    if (!oldPassword) {
      setPasswordChangeError("Please enter your current password")
      return
    }

    if (!newPassword) {
      setPasswordChangeError("Please enter a new password")
      return
    }

    if (!confirmPassword) {
      setPasswordChangeError("Please confirm your new password")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordChangeError("New passwords do not match")
      return
    }

    if (newPassword === oldPassword) {
      setPasswordChangeError("New password must be different from current password")
      return
    }

    // Validate password complexity
    const passwordErrors = validatePassword(newPassword)
    if (passwordErrors.length > 0) {
      setPasswordChangeError(passwordErrors.join(". "))
      return
    }

    try {
      setIsPasswordChangeLoading(true)
      
      // Call the password change API
      await authService.changePassword(oldPassword, newPassword, { 
        updateSubUserStatus: true // Flag to update user's is_default_password_change status
      })
      
      // Clear all auth-related localStorage items for complete logout
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("expires_at")
      localStorage.removeItem("user")
      localStorage.removeItem("csrf_token")
      localStorage.removeItem("ninVerified")
      localStorage.removeItem("firstName")
      localStorage.removeItem("lastName")
      
      // Dispatch logout action to clear Redux state
      dispatch(logoutUser())
      
      // Close modal and show success message
      setShowPasswordChangeModal(false)
      
      // Clear form state for clean re-login
      setFormData({ email: "", password: "" })
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
      
      // Redirect to login with success message
      navigate("/login", {
        state: { 
          successMessage: "Password changed successfully! Please log in with your new password.",
          email: formData.email, // Pre-fill email for convenience
          isSubUserPasswordChanged: true // Flag to indicate this was a sub-user password change
        }
      })
    } catch (error: any) {
      console.error("Password change failed:", error)
      setPasswordChangeError(error.message || "Failed to change password. Please try again.")
    } finally {
      setIsPasswordChangeLoading(false)
    }
  }

  const handleModalClose = () => {
    // Prevent closing modal if it's for mandatory password change
    // Sub-users must change their password before proceeding
    console.log("Password change modal cannot be closed - mandatory for sub-users")
    return
  }

  const handleSignUp = () => {
    navigate("/account-type")
  }

  const handleForgotPassword = () => {
    navigate("/forgot-password")
  }

  // Check for success message from navigation state
  const location = useLocation()
  const successMessage = location.state?.successMessage
  const prefilledEmail = location.state?.email
  const isSubUserPasswordChanged = location.state?.isSubUserPasswordChanged

  useEffect(() => {
    if (prefilledEmail) {
      setFormData(prev => ({ ...prev, email: prefilledEmail }))
    }
    
    // Log the context for debugging
    if (isSubUserPasswordChanged) {
      console.log("Sub-user has successfully changed password and returned for second login")
    }
  }, [prefilledEmail, isSubUserPasswordChanged])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 flex items-center justify-center">
            <img src="/images/logo.png" alt="Logo" className="h-10" />
          </div>
        </div>

        {loginSuccess ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-600 mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">Login Successful!</h2>
            <p className="text-gray-500">Redirecting you to your dashboard...</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-center mb-2">Welcome back!</h2>
            <p className="text-gray-500 text-center mb-6">Enter your details to access your account</p>

            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
                {successMessage}
                {isSubUserPasswordChanged && (
                  <div className="mt-1 text-sm">
                    You can now log in normally with your new password.
                  </div>
                )}
              </div>
            )}

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="hello@example.com"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password*
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
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
                  <div className="flex justify-end mt-1">
                    <button 
                      type="button" 
                      onClick={handleForgotPassword} 
                      className="text-sm text-red-500 hover:underline"
                      disabled={isLoading}
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full mt-6 py-2 px-4 bg-green-500 text-black rounded-md ${
                  isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"
                } transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-500">Don't have an account? </span>
              <button 
                onClick={handleSignUp} 
                className="text-green-600 hover:underline"
                disabled={isLoading}
              >
                Sign up
              </button>
            </div>
          </>
        )}
      </div>

      {/* Password Change Modal for Sub-Users - Cannot be closed */}
      {showPasswordChangeModal && (
        <Modal onClose={handleModalClose}>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Password Change Required</h2>
            </div>
            
            <p className="mb-6 text-gray-600">
              As a sub-user account, you must change your default password before accessing the system. 
              This is required for security purposes and you'll only need to do this once.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password*
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter current password"
                  required
                  disabled={isPasswordChangeLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password*
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter new password"
                  required
                  disabled={isPasswordChangeLoading}
                />
                <div className="mt-1 text-xs text-gray-500">
                  Must contain: 8+ characters, uppercase, lowercase, number, and special character
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password*
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Confirm new password"
                  required
                  disabled={isPasswordChangeLoading}
                />
              </div>
              
              {passwordChangeError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                  {passwordChangeError}
                </div>
              )}
              
              <button
                onClick={handlePasswordChange}
                className={`w-full py-2 px-4 bg-green-500 text-black rounded-md ${
                  isPasswordChangeLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"
                } transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                disabled={isPasswordChangeLoading}
              >
                {isPasswordChangeLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Changing Password...
                  </span>
                ) : (
                  "Change Password"
                )}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                You will be logged out after changing your password and need to log in again with your new password.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Login