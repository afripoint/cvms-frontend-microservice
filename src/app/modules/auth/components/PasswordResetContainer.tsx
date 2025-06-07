import React from "react"
import { useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import type { RootState } from "../../../core/store"
import ForgotPassword from "./ForgotPassword"
import EmailSent from "./EmailSent"
import { PasswordResetStep } from "../types/auth"
import ResetPassword from "./ResetPassword"
import PasswordResetSuccess from "./PasswordResetSuccess"

const PasswordResetContainer: React.FC = () => {
  const { currentStep } = useSelector((state: RootState) => state.passwordReset)
  const location = useLocation()
  const params = useParams<{ uidb64?: string; token?: string }>()
  
  const renderStep = () => {
    console.log("=== PASSWORD RESET CONTAINER DEBUG ===")
    console.log("Current pathname:", location.pathname)
    console.log("Current search:", location.search)
    console.log("URL params:", params)
    console.log("Redux currentStep:", currentStep)
    
    // Handle success page first (most specific)
    if (location.pathname === "/auth/reset-password-success" || 
        location.pathname === "/reset-password-success") {
      console.log("✅ Showing SUCCESS page")
      return <PasswordResetSuccess />
    }
    
    // Handle reset password form with URL parameters (PRIMARY CASE)
    if (params.uidb64 && params.token) {
      console.log("✅ Found URL params - showing ResetPassword component")
      console.log("uidb64:", params.uidb64)
      console.log("token:", params.token)
      return <ResetPassword />
    }
    
    // Fallback: Manual path checking for the exact URL structure
    if (location.pathname.startsWith("/auth/reset-password/")) {
      const pathSegments = location.pathname.split('/')
      console.log("Path segments:", pathSegments)
      
      // For /auth/reset-password/MTY/cr1qgr-6e840ed234aba653c30128e836a3f0c7
      // pathSegments = ["", "auth", "reset-password", "MTY", "cr1qgr-6e840ed234aba653c30128e836a3f0c7"]
      if (pathSegments.length === 5 && pathSegments[3] && pathSegments[4]) {
        console.log("✅ Found path parameters via manual checking")
        console.log("Manual uidb64:", pathSegments[3])
        console.log("Manual token:", pathSegments[4])
        return <ResetPassword />
      }
    }
    
    // Handle query parameters as fallback
    const urlParams = new URLSearchParams(location.search)
    const queryUidb64 = urlParams.get("uidb64")
    const queryToken = urlParams.get("token")
    
    if (queryUidb64 && queryToken) {
      console.log("✅ Found query parameters - showing ResetPassword component")
      return <ResetPassword />
    }
    
    // Default flow based on Redux state
    console.log("⚠️ Using default Redux flow, currentStep:", currentStep)
    switch (currentStep) {
      case PasswordResetStep.REQUEST:
        console.log("→ Showing ForgotPassword")
        return <ForgotPassword />
      case PasswordResetStep.EMAIL_SENT:
        console.log("→ Showing EmailSent")
        return <EmailSent />
      case PasswordResetStep.RESET_FORM:
        console.log("→ Showing ResetPassword (via Redux)")
        return <ResetPassword />
      case PasswordResetStep.SUCCESS:
        console.log("→ Showing PasswordResetSuccess (via Redux)")
        return <PasswordResetSuccess />
      default:
        console.log("→ Showing ForgotPassword (default)")
        return <ForgotPassword />
    }
  }

  return renderStep()
}

export default PasswordResetContainer