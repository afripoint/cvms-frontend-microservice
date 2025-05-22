// export interface User {
//   id?: string
//   email?: string
//   first_name?: string
//   last_name?: string
//   role?: string
//   agency_name?: string
//   declarant_code?: string
//   cac?: string
//   address?: string
//   phone_number?: string
//   state?: string
//   local_govt?: string
//   is_accredify?: boolean
//   "NIN Verified"?: boolean // Add this property to fix the TypeScript error
//   NIN?: string;
//   NINVerified?: boolean;
// }

export interface User {
  id?: string
  email?: string
  first_name?: string
  last_name?: string
  role?: string
  agency_name?: string
  declarant_code?: string
  cac?: string
  address?: string
  phone_number?: string
  additional_phone?: string
  state?: string
  local_govt?: string
  is_accredify?: boolean
  "NIN Verified"?: boolean
  NIN?: string
  NINVerified?: boolean
  [key: string]: any // Allow for additional properties
}


export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  role: "individual account" | "agent account/freight forwarders" | "company account" | null
  is_accredify: boolean | null
  otpResent: boolean
  selectedServices: string[]
  successMessage: string | null;
}

export interface StepIndicatorProps {
  currentStep?: number
}


// export interface OTPDeliveryModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (deliveryMethod: "email" | "sms") => void;
//   email: string;
//   phone: string;
//   hasPhone: boolean;
//   errorMessage?: string | null; // Add this line
// }


// In auth.ts, update the OTPDeliveryModalProps interface
// export interface OTPDeliveryModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (deliveryMethod: "email" | "sms") => void;
//   email: string;
//   phone: string;
//   hasPhone: boolean;
//   errorMessage?: string | null;
//   title?: string; // Add this
//   description?: string; // Add this
//   submitButtonText?: string; // Add this
//   showLoginLink?: boolean; // Add this
// }


export interface OTPDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (deliveryMethod: "email" | "sms") => void;
  email: string;
  phone: string;
  hasPhone: boolean;
  errorMessage?: string | null;
  title?: string;
  description?: string;
  submitButtonText?: string;
  showLoginLink?: boolean;
  isPasswordChange?: boolean; // Add this new prop
}

export interface ServiceRequestModalProps {
  onClose: () => void
  onProceed: () => void
}

export interface TooltipProps {
  content: string
}

export interface CountryCode {
  name: string
  code: string
  dialCode: string
  flag: string
}

export interface SignUpFormData {
  first_Name: string
  last_Name: string
  other_name: string
  phone_number: string
  email: string
  agency_Name: string
  company_Name: string

  declarant_Code: string
  cac: string
  address: string
  state: string
  local_govt: string
  password: string
  confirm_Password: string
  message_choice: "email" | "sms"
}

export interface RegistrationData {
  first_name: string
  last_name: string
  other_name?: string
  email: string
  phone_number?: string
  password: string
  confirm_password: string
  role: string
  agency_name?: string
  company_name?: string
  declarant_code?: string
  cac?: string
  address?: string
  state?: string
  local_govt?: string
  is_accredify: boolean | null
  accredify_services?: string[]
  message_choice: "email" | "sms"
}

export interface LoginFormData {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  tokens: {
    access_token: string
    refresh_token: string
  }
  user: User
}

export interface PasswordResetFormData {
  password: string
  confirmPassword: string
}

export enum PasswordResetStep {
  REQUEST = "request",
  EMAIL_SENT = "email_sent",
  RESET_FORM = "reset_form",
  SUCCESS = "success",
}

export interface PasswordResetState {
  // currentStep: PasswordResetStep
  // email: string
  // token: string | null
  // isLoading: boolean
  // error: string | null

  currentStep: PasswordResetStep
  email: string
  uidb64: string | null
  token: string | null
  error: string | null
  isLoading: boolean
}





