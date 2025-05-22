import type React from "react"
// Contact form related types
export interface FormValues {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  companyName: string
  message: string
}

export interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  message?: string
}

export interface FormInputProps {
  label: string
  type?: string
  placeholder: string
  required?: boolean
  optional?: boolean
  value: string
  onChange: (value: string) => void
  error?: string
}

export interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export interface ContactMethodCardProps {
  icon: React.ReactNode
  title: string
  detail: string
}

