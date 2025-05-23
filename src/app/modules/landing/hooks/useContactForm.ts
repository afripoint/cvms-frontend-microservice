"use client"

import { useState, type FormEvent } from "react"
import type { FormValues, FormErrors } from "../types/contact"

export const useContactForm = () => {
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null)
  const [submitMessage, setSubmitMessage] = useState("")

  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate first name
    if (!formValues.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    // Validate last name
    if (!formValues.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    // Validate email
    if (!formValues.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Validate phone
    if (!formValues.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!/^[0-9\s\-$$$$]+$/.test(formValues.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number"
    }

    // Validate message
    if (!formValues.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (name: string, value: string) => {
    setFormValues({
      ...formValues,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!agreed) {
      setSubmitSuccess(false)
      setSubmitMessage("Please agree to our Privacy Policy to continue")
      return
    }

    const isValid = validateForm()

    if (isValid) {
      setIsSubmitting(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Success response
        setSubmitSuccess(true)
        setSubmitMessage("Your message has been sent successfully!")

        // Reset form
        setFormValues({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          companyName: "",
          message: "",
        })
        setAgreed(false)
      } catch (error) {
        // Error handling
        setSubmitSuccess(false)
        setSubmitMessage("There was an error sending your message. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      // Form has validation errors
      setSubmitSuccess(false)
      setSubmitMessage("Please correct the errors in the form before submitting")
    }
  }

  return {
    formValues,
    errors,
    agreed,
    isSubmitting,
    submitSuccess,
    submitMessage,
    setAgreed,
    handleInputChange,
    handleSubmit,
    setSubmitSuccess,
  }
}

