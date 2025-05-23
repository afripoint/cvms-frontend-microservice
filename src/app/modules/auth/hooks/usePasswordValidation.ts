// "use client"

// import { useState, useEffect } from "react"

// interface PasswordValidationResult {
//   isValid: boolean
//   passwordError: string
//   confirmPasswordError: string
// }

// export const usePasswordValidation = (password: string, confirmPassword: string): PasswordValidationResult => {
//   const [passwordError, setPasswordError] = useState("")
//   const [confirmPasswordError, setConfirmPasswordError] = useState("")
//   const [isValid, setIsValid] = useState(false)

//   useEffect(() => {
//     // Reset errors when inputs change
//     setPasswordError("")
//     setConfirmPasswordError("")

//     let valid = true

//     // Password validation
//     if (password) {
//       if (password.length < 8) {
//         setPasswordError("Password must be at least 8 characters")
//         valid = false
//       } else if (!/\d/.test(password)) {
//         setPasswordError("Password must contain at least one number")
//         valid = false
//       } else if (!/[A-Z]/.test(password)) {
//         setPasswordError("Password must contain at least one uppercase letter")
//         valid = false
//       } else if (!/[a-z]/.test(password)) {
//         setPasswordError("Password must contain at least one lowercase letter")
//         valid = false
//       }
//     }

//     // Confirm password validation
//     if (confirmPassword && password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match")
//       valid = false
//     }

//     setIsValid(valid)
//   }, [password, confirmPassword])

//   return {
//     isValid,
//     passwordError,
//     confirmPasswordError,
//   }
// }




"use client"

import { useState, useEffect } from "react"

interface PasswordValidationResult {
  isValid: boolean
  passwordError: string
  confirmPasswordError: string
}

export const usePasswordValidation = (password: string, confirmPassword: string): PasswordValidationResult => {
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    // Reset errors when inputs change
    setPasswordError("")
    setConfirmPasswordError("")

    let valid = true

    // Password validation
    if (password) {
      if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters")
        valid = false
      } else if (!/\d/.test(password)) {
        setPasswordError("Password must contain at least one number")
        valid = false
      } else if (!/[A-Z]/.test(password)) {
        setPasswordError("Password must contain at least one uppercase letter")
        valid = false
      } else if (!/[a-z]/.test(password)) {
        setPasswordError("Password must contain at least one lowercase letter")
        valid = false
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        setPasswordError("Password must contain at least one special character")
        valid = false
      }
    }

    // Confirm password validation
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match")
      valid = false
    }

    setIsValid(valid)
  }, [password, confirmPassword])

  return {
    isValid,
    passwordError,
    confirmPasswordError,
  }
}