import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import authService from "../../services/authService"
import type { AuthState, RegistrationData, User } from "../../types/auth"

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  role: null,
  is_accredify: null,
  otpResent: false,
  selectedServices: [],
  successMessage: null,
}

export const extractErrorMessage = (error: any): string => {
  console.log("Extracting error message from:", error)

  // Handle non_field_errors array from API (most common format for auth errors)
  if (error?.data?.non_field_errors && Array.isArray(error.data.non_field_errors)) {
    return error.data.non_field_errors[0]
  }

  // Handle array of error messages from API
  if (error?.data?.error && Array.isArray(error.data.error)) {
    return error.data.error[0]
  }

  // Handle single error message
  if (error?.data?.error) {
    return error.data.error
  }

  // Handle detail error format
  if (error?.data?.detail) {
    return error.data.detail
  }

  // Handle message format
  if (error?.data?.message) {
    return error.data.message
  }

  // Check if error itself is a string
  if (typeof error === "string") {
    return error
  }

  // Check if error has a message property
  if (error?.message) {
    return error.message
  }

  // Default error message
  return "An unexpected error occurred"
}
// Async thunks for authentication actions
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegistrationData, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState }

      // Ensure role is a string (not null)
      const role = userData.role || state.auth.role || "individual account"

      // Ensure the role value is valid without modifying its case
      const validRoles = ["individual account", "agent account/freight forwarders", "company account"]
      if (!validRoles.includes(role)) {
        return rejectWithValue("Invalid role type")
      }

      // Prepare the API payload with the correct format
      const completeUserData: RegistrationData = {
        ...userData,
        // Ensure role is a string
        role: role,
        // Ensure consistent property name and handle null case
        is_accredify: userData.is_accredify !== undefined ? userData.is_accredify : state.auth.is_accredify,
      }

      const response = await authService.register(completeUserData)
      localStorage.setItem("otpSentTime", Date.now().toString())
      return response
    } catch (error: any) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp, phone_number }: { email: string; otp: string; phone_number?: string }, { rejectWithValue }) => {
    try {
      const response = await authService.verifyOtp(email, otp, phone_number)
      return response
    } catch (error: any) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

export const verifyConfirmPasswordOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp, phone_number }: { email: string; otp: string; phone_number?: string }, { rejectWithValue }) => {
    try {
      const response = await authService.verifyConfirmPasswordOtp(email, otp, phone_number)
      return response
    } catch (error: any) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async ({ email, deliveryMethod }: { email: string; deliveryMethod: "email" | "sms" }, { rejectWithValue }) => {
    try {
      const response = await authService.resendOtp(email, deliveryMethod)
      return response
    } catch (error: any) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password)
      return response
    } catch (error: any) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email: string, { rejectWithValue }) => {
  try {
    const response = await authService.forgotPassword(email)
    return response
  } catch (error: any) {
    return rejectWithValue(extractErrorMessage(error))
  }
})

// export const resetPasswordTokenCheck = createAsyncThunk(
//   "auth/resetPasswordTokenCheck",
//   async (token: string, { rejectWithValue }) => {
//     try {
//       const response = await authService.resetPasswordTokenCheck(token)
//       return response
//     } catch (error: any) {
//       return rejectWithValue(extractErrorMessage(error))
//     }
//   },
// )

// export const setNewPassword = createAsyncThunk(
//   "auth/setNewPassword",
//   async ({ token, newPassword }: { token: string; newPassword: string }, { rejectWithValue }) => {
//     try {
//       const response = await authService.setNewPassword(token, newPassword)
//       return response
//     } catch (error: any) {
//       return rejectWithValue(extractErrorMessage(error))
//     }
//   },
// )

export const resetPasswordTokenCheck = createAsyncThunk(
  "auth/resetPasswordTokenCheck",
  async ({ uidb64, token }: { uidb64: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await authService.resetPasswordTokenCheck(uidb64, token)
      return response
    } catch (error: any) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

// Updated setNewPassword in authSlice.ts
export const setNewPassword = createAsyncThunk(
  "auth/setNewPassword",
  async (
    { uidb64, token, newPassword }: { uidb64: string; token: string; newPassword: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await authService.setNewPassword(uidb64, token, newPassword)
      return response
    } catch (error: any) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)



export const verifyNIN = createAsyncThunk(
  "auth/verifyNIN",
  async ({ nin, email }: { nin: string; email?: string }, { rejectWithValue }) => {
    try {
      const response = await authService.verifyNIN(nin, email)
      return response
    } catch (error: any) {
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

// Add a new async thunk to fetch user profile
// Add this after the verifyNIN thunk and before logoutUser

export const fetchUserProfile = createAsyncThunk<User, void>(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getUserProfile()
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch user profile")
    }
  },
)

// export const updateUserProfile = createAsyncThunk(
//   "auth/updateUserProfile",
//   async (profileData: {
//     first_name: string;
//     last_name: string;
//     phone_number: string;
//     address: string;
//     secondary_phone_number?: string;
//     profile_image?: File;
//     cac_certificate?: File;
//     authorization_letter?: File;
//     status_report?: File;
//   }, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();

//       // Append all fields to FormData
//       formData.append("first_name", profileData.first_name);
//       formData.append("last_name", profileData.last_name);
//       formData.append("phone_number", profileData.phone_number);
//       formData.append("address", profileData.address);

//       if (profileData.secondary_phone_number) {
//         formData.append("secondary_phone_number", profileData.secondary_phone_number);
//       }

//       // Append files if they exist
//       if (profileData.profile_image) {
//         formData.append("profile_image", profileData.profile_image);
//       }
//       if (profileData.cac_certificate) {
//         formData.append("cac_certificate", profileData.cac_certificate);
//       }
//       if (profileData.authorization_letter) {
//         formData.append("authorization_letter", profileData.authorization_letter);
//       }
//       if (profileData.status_report) {
//         formData.append("status_report", profileData.status_report);
//       }

//       const response = await authService.updateUserProfile(formData);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(extractErrorMessage(error));
//     }
//   }
// );

// export const fetchCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, { rejectWithValue }) => {
//   try {
//     return await authService.getCurrentUser()
//   } catch (error: any) {
//     return rejectWithValue(extractErrorMessage(error))
//   }
// })

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      // Log the size of files being uploaded
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`Uploading ${key}: ${value.name} (${(value.size / 1024 / 1024).toFixed(2)}MB)`)
        }
      }

      const response = await authService.updateUserProfile(formData)
      return response
    } catch (error: any) {
      // Handle specific error types
      if (error.status === 413) {
        return rejectWithValue("Files are too large. Please reduce file sizes to under 5MB each.")
      }
      return rejectWithValue(extractErrorMessage(error))
    }
  },
)

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await authService.logout()
  return null
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setRole: (
      state,
      action: PayloadAction<"individual account" | "agent account/freight forwarders" | "company account" | null>,
    ) => {
      state.role = action.payload
    },
    setIs_Accredify: (state, action: PayloadAction<boolean | null>) => {
      state.is_accredify = action.payload
    },
    setSelectedServices: (state, action: PayloadAction<string[]>) => {
      state.selectedServices = action.payload
    },
    resetOtpResent: (state) => {
      state.otpResent = false
    },
  },

  extraReducers: (builder) => {
    // Register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.user = action.payload.user || {}
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user || {}
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Forgot password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Reset password token check
    builder
      .addCase(resetPasswordTokenCheck.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(resetPasswordTokenCheck.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(resetPasswordTokenCheck.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Set new password
    builder
      .addCase(setNewPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(setNewPassword.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(setNewPassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Verify OTP
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user || {}
        state.successMessage = action.payload.message || "Account verified successfully"
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage = action.payload as string
        if (errorMessage && errorMessage.includes("Inactive user")) {
          state.error = "Your account is not activated. Please try verifying your OTP again or contact support."
        } else {
          state.error = errorMessage
        }
      })

    // Resend OTP
    builder
      .addCase(resendOtp.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.otpResent = false
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.isLoading = false
        state.otpResent = true
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.otpResent = false
      })

    // Verify NIN
    builder
      .addCase(verifyNIN.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(verifyNIN.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.user = { ...state.user, NIN: action.payload.nin, NINVerified: true }
      })
      .addCase(verifyNIN.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // Fetch user profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

      // Update user profile - SINGLE DEFINITION
      // builder
      //   .addCase(updateUserProfile.pending, (state) => {
      //     state.isLoading = true
      //     state.error = null
      //   })
      //   .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
      //     state.isLoading = false
      //     state.user = action.payload
      //     state.successMessage = "Profile updated successfully"
      //   })
      //   .addCase(updateUserProfile.rejected, (state, action) => {
      //     state.isLoading = false
      //     state.error = action.payload as string
      //   })

      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false
        // Merge the new data with existing user data
        state.user = {
          ...state.user,
          ...action.payload,
          profile_image_url: action.payload.profile_image_url || state.user?.profile_image_url,
          authorization_letter: action.payload.authorization_letter || state.user?.authorization_letter,
          cac_certificate: action.payload.cac_certificate || state.user?.cac_certificate,
          status_report: action.payload.status_report || state.user?.status_report,
        }
        state.successMessage = "Profile updated successfully"
      })

    // Logout user
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null
      state.isAuthenticated = false
    })
  },
})

export const { clearError, setRole, setIs_Accredify, setSelectedServices, resetOtpResent } = authSlice.actions
export default authSlice.reducer
