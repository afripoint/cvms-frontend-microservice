import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export enum PasswordResetStep {
  REQUEST = "request",
  EMAIL_SENT = "emailSent",
  RESET_FORM = "resetForm",
  SUCCESS = "success",
}

interface PasswordResetState {
  currentStep: PasswordResetStep
  email: string
  token: string | null
  error: string | null
  isLoading: boolean
}

const initialState: PasswordResetState = {
  currentStep: PasswordResetStep.REQUEST,
  email: "",
  token: null,
  error: null,
  isLoading: false,
}

export const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setStep: (state, action: PayloadAction<PasswordResetStep>) => {
      state.currentStep = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    resetState: () => {
      return initialState
    },
  },
})

export const { setEmail, setToken, setStep, setLoading, setError, resetState } = passwordResetSlice.actions

export default passwordResetSlice.reducer

