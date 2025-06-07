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
    console.log("Current pathname:", location.pathname)
    console.log("Current search:", location.search)
    
    // Handle path parameters (e.g., /auth/reset-password/uidb64/token)
    if (location.pathname.startsWith("/auth/reset-password")) {
      const pathSegments = location.pathname.split('/')
      console.log("Path segments:", pathSegments)
      
      // Check if we have the path parameter format: /auth/reset-password/uidb64/token
      // pathSegments: ["", "auth", "reset-password", "uidb64", "token"]
      if (pathSegments.length === 5 && pathSegments[3] && pathSegments[4]) {
        console.log("Found path parameters - showing ResetPassword component")
        return <ResetPassword />
      }
      
      // Handle query parameters (e.g., /auth/reset-password?uidb64=xxx&token=xxx)
      if (location.pathname === "/auth/reset-password" && 
          location.search.includes("token") && 
          location.search.includes("uidb64")) {
        console.log("Found query parameters - showing ResetPassword component")
        return <ResetPassword />
      }
    }
    
    // Success page
    if (location.pathname === "/auth/reset-password-success") {
      console.log("Showing success page")
      return <PasswordResetSuccess />
    }
    
    // Default flow based on Redux state
    console.log("Using default flow, currentStep:", currentStep)
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