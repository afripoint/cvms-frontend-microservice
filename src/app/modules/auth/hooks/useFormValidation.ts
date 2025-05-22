// "use client"

// import { useState, useEffect } from "react"
// import type { SignUpFormData } from "../types/auth"

// export const useFormValidation = (formData: SignUpFormData, shouldShowField: (fieldName: string) => boolean) => {
//   const [isFormValid, setIsFormValid] = useState(false)
//   const [passwordError, setPasswordError] = useState<string | null>(null)
//   const [emailError, setEmailError] = useState<string | null>(null)

//   useEffect(() => {
//     const requiredFields = Object.keys(formData).filter((field) => {
//       // Only validate fields that are shown and required (phone is optional)
//       return shouldShowField(field) && field !== "phone"
//     })

//     // Validate password format
//     if (formData.password) {
//       const hasUpperCase = /[A-Z]/.test(formData.password)
//       const hasNumber = /\d/.test(formData.password)
//       const isLongEnough = formData.password.length >= 8

//       if (!hasUpperCase || !hasNumber || !isLongEnough) {
//         setPasswordError(
//           "Password must contain at least 1 uppercase letter, 1 number, and be at least 8 characters long",
//         )
//       } else if (formData.confirm_Password && formData.password !== formData.confirm_Password) {
//         setPasswordError("Passwords do not match")
//       } else {
//         setPasswordError(null)
//       }
//     }

//     // Simple email validation
//     if (formData.email) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//       if (!emailRegex.test(formData.email)) {
//         setEmailError("Please enter a valid email address")
//       } else {
//         setEmailError(null)
//       }
//     }

//     const allFieldsValid =
//       requiredFields.every((field) => formData[field as keyof typeof formData] !== "") && !passwordError && !emailError
//     setIsFormValid(allFieldsValid)
//   }, [formData, shouldShowField, passwordError, emailError])

//   return {
//     isFormValid,
//     passwordError,
//     emailError,
//   }
// }





"use client"

import { useState, useEffect } from "react"
import type { SignUpFormData } from "../types/auth"

export const useFormValidation = (formData: SignUpFormData, shouldShowField: (fieldName: string) => boolean) => {
  const [isFormValid, setIsFormValid] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)

  useEffect(() => {
    const requiredFields = Object.keys(formData).filter((field) => {
      // Only validate fields that are shown and required (phone is optional)
      return shouldShowField(field) && field !== "phone"
    })

    // Validate password format
    if (formData.password) {
      const hasUpperCase = /[A-Z]/.test(formData.password)
      const hasNumber = /\d/.test(formData.password)
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
      const isLongEnough = formData.password.length >= 8

      if (!hasUpperCase || !hasNumber || !hasSpecialChar || !isLongEnough) {
        setPasswordError(
          "Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be at least 8 characters long",
        )
      } else if (formData.confirm_Password && formData.password !== formData.confirm_Password) {
        setPasswordError("Passwords do not match")
      } else {
        setPasswordError(null)
      }
    }

    // Simple email validation
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setEmailError("Please enter a valid email address")
      } else {
        setEmailError(null)
      }
    }

    const allFieldsValid =
      requiredFields.every((field) => formData[field as keyof typeof formData] !== "") && !passwordError && !emailError
    setIsFormValid(allFieldsValid)
  }, [formData, shouldShowField, passwordError, emailError])

  return {
    isFormValid,
    passwordError,
    emailError,
  }
}