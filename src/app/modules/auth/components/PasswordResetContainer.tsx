// import type React from "react"
// import { useSelector } from "react-redux"
// import { useLocation } from "react-router-dom"
// import type { RootState } from "../../../core/store"
// import ForgotPassword from "./ForgotPassword"
// import EmailSent from "./EmailSent"
// import { PasswordResetStep } from "../types/auth"
// import ResetPassword from "./ResetPassword"
// import PasswordResetSuccess from "./PasswordResetSuccess"

// const PasswordResetContainer: React.FC = () => {
//   const { currentStep } = useSelector((state: RootState) => state.passwordReset)
//   const location = useLocation()
  
//   // Determine which component to show based on path and query parameters
//   const renderStep = () => {
//     // If we're on /auth/reset-password with token and uidb64 parameters, show reset form
//     if (location.pathname === "/auth/reset-password" && 
//         location.search.includes("token") && 
//         location.search.includes("uidb64")) {
//       return <ResetPassword />
//     }
    
//     // If we're on /auth/reset-password-success, show success page
//     if (location.pathname === "/auth/reset-password-success") {
//       return <PasswordResetSuccess />
//     }
    
//     // Otherwise follow the normal flow
//     switch (currentStep) {
//       case PasswordResetStep.REQUEST:
//         return <ForgotPassword />
//       case PasswordResetStep.EMAIL_SENT:
//         return <EmailSent />
//       case PasswordResetStep.RESET_FORM:
//         return <ResetPassword />
//       case PasswordResetStep.SUCCESS:
//         return <PasswordResetSuccess />
//       default:
//         return <ForgotPassword />
//     }
//   }

//   return renderStep()
// }

// export default PasswordResetContainer




// import type React from "react"
// import { useSelector } from "react-redux"
// import { useLocation } from "react-router-dom"
// import type { RootState } from "../../../core/store"
// import ForgotPassword from "./ForgotPassword"
// import EmailSent from "./EmailSent"
// import { PasswordResetStep } from "../types/auth"
// import ResetPassword from "./ResetPassword"
// import PasswordResetSuccess from "./PasswordResetSuccess"

// const PasswordResetContainer: React.FC = () => {
//   const { currentStep } = useSelector((state: RootState) => state.passwordReset)
//   const location = useLocation()
  
//   // Determine which component to show based on path and query parameters
//   const renderStep = () => {
//     // Check for reset password path with parameters in URL (both formats)
//     // Format 1: /auth/reset-password?token=xxx&uidb64=xxx
//     // Format 2: /auth/reset-password/uidb64/token
//     if (location.pathname.startsWith("/auth/reset-password")) {
//       // Check if it's the query parameter format
//       if (location.search.includes("token") && location.search.includes("uidb64")) {
//         return <ResetPassword />
//       }
      
//       // Check if it's the path parameter format (/auth/reset-password/uidb64/token)
//       const pathSegments = location.pathname.split("/")
//       if (pathSegments.length >= 5 && pathSegments[3] && pathSegments[4]) {
//         // We have uidb64 and token in the path
//         return <ResetPassword />
//       }
//     }
    
//     // If we're on /auth/reset-password-success, show success page
//     if (location.pathname === "/auth/reset-password-success") {
//       return <PasswordResetSuccess />
//     }
    
//     // Otherwise follow the normal flow
//     switch (currentStep) {
//       case PasswordResetStep.REQUEST:
//         return <ForgotPassword />
//       case PasswordResetStep.EMAIL_SENT:
//         return <EmailSent />
//       case PasswordResetStep.RESET_FORM:
//         return <ResetPassword />
//       case PasswordResetStep.SUCCESS:
//         return <PasswordResetSuccess />
//       default:
//         return <ForgotPassword />
//     }
//   }

//   return renderStep()
// }

// export default PasswordResetContainer


import React from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import type { RootState } from "../../../core/store"
import ForgotPassword from "./ForgotPassword"
import EmailSent from "./EmailSent"
import { PasswordResetStep } from "../types/auth"
import ResetPassword from "./ResetPassword"
import PasswordResetSuccess from "./PasswordResetSuccess"

const PasswordResetContainer: React.FC = () => {
  const { currentStep } = useSelector((state: RootState) => state.passwordReset)
  const location = useLocation()
  
  const renderStep = () => {
    // Handle path parameters (e.g., /auth/reset-password/uidb64/token)
    if (location.pathname.startsWith("/auth/reset-password")) {
      const pathSegments = location.pathname.split('/')
      if (pathSegments.length >= 5) {
        return <ResetPassword />
      }
    }
    
    // Handle query parameters (e.g., ?uidb64=xxx&token=xxx)
    if (location.pathname === "/auth/reset-password" && 
        location.search.includes("token") && 
        location.search.includes("uidb64")) {
      return <ResetPassword />
    }
    
    // Success page
    if (location.pathname === "/auth/reset-password-success") {
      return <PasswordResetSuccess />
    }
    
    // Default flow
    switch (currentStep) {
      case PasswordResetStep.REQUEST:
        return <ForgotPassword />
      case PasswordResetStep.EMAIL_SENT:
        return <EmailSent />
      case PasswordResetStep.RESET_FORM:
        return <ResetPassword />
      case PasswordResetStep.SUCCESS:
        return <PasswordResetSuccess />
      default:
        return <ForgotPassword />
    }
  }

  return renderStep()
}

export default PasswordResetContainer