// import type React from "react"
// import { useSelector } from "react-redux"
// import type { RootState } from "../../../core/store"
// import ForgotPassword from "./ForgotPassword"
// import EmailSent from "./EmailSent"
// import { PasswordResetStep } from "../types/auth"
// import ResetPassword from "./ResetPassword"
// import PasswordResetSuccess from "./PasswordResetSuccess"

// const PasswordResetContainer: React.FC = () => {
//   const { currentStep } = useSelector((state: RootState) => state.passwordReset)

//   // Render the appropriate component based on the current step
//   const renderStep = () => {
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





import type React from "react"
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
  
  // Determine which component to show based on path and query parameters
  const renderStep = () => {
    // If we're on /auth/reset-password with token and uidb64 parameters, show reset form
    if (location.pathname === "/auth/reset-password" && 
        location.search.includes("token") && 
        location.search.includes("uidb64")) {
      return <ResetPassword />
    }
    
    // If we're on /auth/reset-password-success, show success page
    if (location.pathname === "/auth/reset-password-success") {
      return <PasswordResetSuccess />
    }
    
    // Otherwise follow the normal flow
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