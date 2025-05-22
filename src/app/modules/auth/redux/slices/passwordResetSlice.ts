// import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
// import { type PasswordResetState, PasswordResetStep } from "../../types/auth"

// const initialState: PasswordResetState = {
//   currentStep: PasswordResetStep.REQUEST,
//   email: "",
//   token: null,
//   isLoading: false,
//   error: null,
// }

// const passwordResetSlice = createSlice({
//   name: "passwordReset",
//   initialState,
//   reducers: {
//     setEmail: (state, action: PayloadAction<string>) => {
//       state.email = action.payload
//     },
//     setToken: (state, action: PayloadAction<string>) => {
//       state.token = action.payload
//     },
//     setStep: (state, action: PayloadAction<PasswordResetStep>) => {
//       state.currentStep = action.payload
//     },
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.isLoading = action.payload
//     },
//     setError: (state, action: PayloadAction<string | null>) => {
//       state.error = action.payload
//     },
//     resetState: (state) => {
//       return initialState
//     },
//   },
// })

// export const { setEmail, setToken, setStep, setLoading, setError, resetState } = passwordResetSlice.actions

// export default passwordResetSlice.reducer






// import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
// import { type PasswordResetState, PasswordResetStep } from "../../types/auth"

// // const initialState: PasswordResetState = {
// //   currentStep: PasswordResetStep.REQUEST,
// //   email: "",
// //   token: null,
// //   isLoading: false,
// //   error: null,
// // }

// const initialState: PasswordResetState = {
//   currentStep: PasswordResetStep.REQUEST,
//   email: "",
//   uidb64: null,
//   token: null,
//   error: null,
//   isLoading: false,
// }




// const passwordResetSlice = createSlice({
//   name: "passwordReset",
//   initialState,
//   reducers: {
//     setEmail: (state, action: PayloadAction<string>) => {
//       state.email = action.payload
//     },
//     setToken: (state, action: PayloadAction<string>) => {
//       state.token = action.payload
//     },
//     setStep: (state, action: PayloadAction<PasswordResetStep>) => {
//       state.currentStep = action.payload
//     },
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.isLoading = action.payload
//     },
//     setError: (state, action: PayloadAction<string | null>) => {
//       state.error = action.payload
//     },
//     // Add setUidb64 action
//     setUidb64: (state, action: PayloadAction<string>) => {
//     state.uidb64 = action.payload
//     },

//     resetState: () => {
//       return initialState
//     },
//   },
// })

// export const { setEmail, setToken, setStep, setLoading, setError, resetState } = passwordResetSlice.actions

// export default passwordResetSlice.reducer




import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { PasswordResetStep } from "../../types/auth";


interface PasswordResetState {
  currentStep: PasswordResetStep;
  email: string;
  uidb64: string | null;
  token: string | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: PasswordResetState = {
  currentStep: PasswordResetStep.REQUEST,
  email: "",
  uidb64: null,
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
    setUidb64: (state, action: PayloadAction<string>) => {
      state.uidb64 = action.payload
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

export const { 
  setEmail, 
  setUidb64, 
  setToken, 
  setStep, 
  setLoading, 
  setError, 
  resetState 
} = passwordResetSlice.actions

export default passwordResetSlice.reducer