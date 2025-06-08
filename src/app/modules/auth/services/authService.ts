
import axios from "axios"
import type { LoginResponse, RegistrationData, User } from "../types/auth"
import {
  appSaveToLocalStorage,
  appGetFromLocalStorage,
  appRemoveFromLocalStorage,
  StorageKeys,
} from "../../../core/storage/storage"
import { TeamMember } from "../../profileManagement/types"

const API_URL = "https://cvms-staging.afripointdev.com/auth"

// Define types for HTTP headers
type HttpHeaders = {
  "Content-Type": string
  Authorization?: string
  [key: string]: string | undefined
}

// Update the ProfileResponse interface to match the actual API response
interface ProfileResponse {
  full_name?: string
  user_email?: string
  user_address?: string
  phone_number?: string
  role?: string
  profile_image_url?: string
  authorization_letter?: string | null
  cac_certificate?: string | null
  status_report?: string | null
  company_name?: string
  secondary_phone_number?: string | null
  cac?: string
  is_cac_verified?: boolean
  limit?: number
  created_at?: string
  updated_at?: string
  [key: string]: any // Allow for additional properties
}

// Debug function to log token information
const debugTokenStatus = () => {
  const directToken = localStorage.getItem("authToken")
  const tokenDataStr = localStorage.getItem(StorageKeys.TOKEN_DATA)
  let tokenData = null
  try {
    if (tokenDataStr) {
      tokenData = JSON.parse(tokenDataStr)
    }
  } catch (e) {
    console.error("Error parsing token data:", e)
  }

  console.log("--- Token Debug Info ---")
  console.log("Direct Token:", directToken ? "exists" : "missing")
  console.log("Token Data:", tokenData)
  console.log("----------------------")
}

// Create axios instance with improved error handling
const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
  withCredentials: true,
})

// Improved token retrieval function
const getAuthToken = (): string | null => {
  // First check for direct token
  const directToken = localStorage.getItem("authToken")
  if (directToken) {
    try {
      // If it's JSON, parse it (in case it was accidentally stringified)
      return JSON.parse(directToken)
    } catch (e) {
      // If it's not JSON, just return it as is
      return directToken
    }
  }

  // Then check token data object
  const tokenDataStr = localStorage.getItem(StorageKeys.TOKEN_DATA)
  if (tokenDataStr) {
    try {
      const tokenData = JSON.parse(tokenDataStr)
      return tokenData?.access_token || null
    } catch (e) {
      console.error("Error parsing token data:", e)
      return null
    }
  }

  return null
}

// Add request interceptor for debugging and token handling
authAxios.interceptors.request.use(
  (config) => {
    // Debug token status for every request
    debugTokenStatus()

    // Get token using the helper function
    const token = getAuthToken()

    if (token) {
      console.log("Adding token to request:", token.substring(0, 10) + "...")
      // Ensure headers object exists
      config.headers = config.headers || {}
      // Set authorization header
      config.headers.Authorization = `Bearer ${token}`
    } else {
      console.warn("No authentication token available for request")
    }

    console.log("Final Request Config:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
    })

    return config
  },
  (error) => {
    console.error("Request error:", error)
    return Promise.reject(error)
  },
)

// Add response interceptor for debugging
authAxios.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.status, response.statusText)
    return response
  },
  (error) => {
    console.error("Response error details:", error.response?.status, error.response?.statusText, error.response?.data)
    return Promise.reject(error.response || error)
  },
)

const authService = {

  register: async (userData: RegistrationData): Promise<any> => {
  try {
    console.log("Sending registration data:", userData)
    const response = await authAxios.post("/register/", userData)
    console.log("Registration successful:", response.data)
    
    if (response.data.user) {
      appSaveToLocalStorage(StorageKeys.USER_DATA, response.data.user)
    }
    
    return response.data
  } catch (error: any) {
    console.error("Registration error:", error)
    
    // Ensure the error has a consistent structure
    if (error.response) {
      throw {
        response: {
          data: error.response.data,
          status: error.response.status,
          statusText: error.response.statusText
        }
      }
    }
    
    throw error
  }
},
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await authAxios.post<LoginResponse>("/login/", { email, password })

      // Store tokens and user data
      if (response.data.tokens?.access_token) {
        const tokenData = {
          access_token: response.data.tokens.access_token,
          refresh_token: response.data.tokens.refresh_token || "",
        }

        // Store using your storage utility
        appSaveToLocalStorage(StorageKeys.TOKEN_DATA, tokenData)
        appSaveToLocalStorage(StorageKeys.USER_DATA, response.data.user)

        // Also store directly for backward compatibility
        localStorage.setItem("authToken", response.data.tokens.access_token)

        // Set default auth header
        authAxios.defaults.headers.common["Authorization"] = `Bearer ${response.data.tokens.access_token}`
      }

      return response.data
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  },

  forgotPassword: async (email: string): Promise<any> => {
    try {
      console.log("Sending password reset request for:", email)
      const response = await authAxios.post("/forget-password-email/", { email })
      console.log("Password reset email sent")
      return response.data
    } catch (error: any) {
      console.error("Password reset request error:", error.response?.data || error.message)
      throw error
    }
  },

  resetPasswordTokenCheck: async (uidb64: string, token: string): Promise<any> => {
    try {
      console.log("Validating reset password token")
      const response = await authAxios.get(`/reset-password-token-check/${uidb64}/${token}/`)
      console.log("Token validation successful")
      return response.data
    } catch (error: any) {
      console.error("Token validation error:", error.response?.data || error.message)
      throw error
    }
  },

  
  setNewPassword: async (uidb64: string, token: string, newPassword: string): Promise<any> => {
  try {
    console.log("Setting new password with token")
    
    // The backend expects 'password' and 'confirm_password' fields
    // NOT 'new_password' as currently implemented
    const response = await authAxios.patch("/set-new-password/", {
      uidb64,
      token,
      password: newPassword,           // Changed from 'new_password'
      confirm_password: newPassword,   // Added required field
    })
    
    console.log("Password reset successful")
    return response.data
  } catch (error: any) {
    console.error("Password reset error:", error.response?.data || error.message)
    throw error
  }
},

  sendOtp: async (): Promise<any> => {
    try {
      // Get the current token
      const token = getAuthToken()

      if (!token) {
        throw new Error("User is not authenticated. Please login first.")
      }

      // Verify token is valid (optional)
      console.log("Using token:", token.substring(0, 10) + "...")

      // Make the request
      const response = await authAxios.post("/send-otp/")
      return response.data
    } catch (error: any) {
      console.error("OTP send error:", error.response?.data || error.message)

      // Handle specific error cases
      if (error.response?.status === 401) {
        // Token might be expired - clear storage and prompt re-login
        appRemoveFromLocalStorage(StorageKeys.TOKEN_DATA)
        localStorage.removeItem("authToken")
        throw new Error("Session expired. Please login again.")
      }

      throw error
    }
  },

  verifyOtp: async (email: string, otp: string, phone_number?: string): Promise<any> => {
    try {
      console.log("Sending OTP verification data:", { email, otp, phone_number })

      const payload: any = { email, otp }
      if (phone_number) {
        payload.phone_number = phone_number
        localStorage.setItem("userPhoneNumber", phone_number)
      }

      // Get token and create headers
      debugTokenStatus()
      const token = getAuthToken()
      console.log("Using token for verifyOtp:", token ? `${token.substring(0, 10)}...` : "No token found")

      const response = await axios({
        method: "post",
        url: `${API_URL}/verify-otp/`,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        data: payload,
        withCredentials: true,
      })

      console.log("OTP verification successful, response:", response.data)

      if (!response.data) {
        throw new Error("Empty response received from server")
      }

      // Handle token if present in the response
      if (response.data.token) {
        const newToken = response.data.token
        localStorage.setItem("authToken", newToken)
        console.log("Updated auth token:", newToken.substring(0, 10) + "...")

        const tokenData = {
          access_token: newToken,
          refresh_token: response.data.refresh_token || "",
        }
        localStorage.setItem(StorageKeys.TOKEN_DATA, JSON.stringify(tokenData))
        console.log("Updated token data object")
      }

      // Store user data if available
      if (response.data.user) {
        appSaveToLocalStorage(StorageKeys.USER_DATA, response.data.user)
        console.log("Updated user data")
      }

      // Debug final token status
      debugTokenStatus()

      return response.data
    } catch (error: any) {
      console.error(
        "OTP verification error:",
        error.response?.status,
        error.response?.statusText,
        error.response?.data || error.message,
      )
      throw error.response || error
    }
  },

  verifyConfirmPasswordOtp: async (email: string, otp: string, phone_number?: string): Promise<any> => {
    try {
      console.log("Sending OTP verification data:", { email, otp, phone_number })

      const payload: any = { email, otp }
      if (phone_number) {
        payload.phone_number = phone_number
        localStorage.setItem("userPhoneNumber", phone_number)
      }

      // Get token and create headers
      debugTokenStatus()
      const token = getAuthToken()
      console.log("Using token for verifyOtp:", token ? `${token.substring(0, 10)}...` : "No token found")

      const response = await axios({
        method: "post",
        url: `${API_URL}/sub-user-verify-otp/`,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        data: payload,
        withCredentials: true,
      })

      console.log("OTP verification successful, response:", response.data)

      if (!response.data) {
        throw new Error("Empty response received from server")
      }

      // Handle token if present in the response
      if (response.data.token) {
        const newToken = response.data.token
        localStorage.setItem("authToken", newToken)
        console.log("Updated auth token:", newToken.substring(0, 10) + "...")

        const tokenData = {
          access_token: newToken,
          refresh_token: response.data.refresh_token || "",
        }
        localStorage.setItem(StorageKeys.TOKEN_DATA, JSON.stringify(tokenData))
        console.log("Updated token data object")
      }

      // Store user data if available
      if (response.data.user) {
        appSaveToLocalStorage(StorageKeys.USER_DATA, response.data.user)
        console.log("Updated user data")
      }

      // Debug final token status
      debugTokenStatus()

      return response.data
    } catch (error: any) {
      console.error(
        "OTP verification error:",
        error.response?.status,
        error.response?.statusText,
        error.response?.data || error.message,
      )
      throw error.response || error
    }
  },

  changePassword: async (
  oldPassword: string, 
  newPassword: string,
  options?: { updateSubUserStatus?: boolean }
): Promise<any> => {
  try {
    console.log("Changing password", options)

    // Get token
    const token = getAuthToken()

    if (!token) {
      throw new Error("User is not authenticated. Please login first.")
    }

    console.log("Using token for changePassword:", token ? `${token.substring(0, 10)}...` : "No token found")

    // Create request headers with proper Authorization
    const headers: HttpHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }

    // Include options in the request data if provided
    const requestData: any = {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_new_password: newPassword,
    }

    if (options?.updateSubUserStatus) {
      requestData.update_sub_user_status = true
    }

    // Log headers for debugging
    console.log("Request headers:", headers)

    // Use direct axios call to ensure headers are set properly
    const response = await axios({
      method: "patch",
      url: `${API_URL}/change-password/`,
      headers: headers,
      data: requestData,
      withCredentials: true,
    })

    console.log("Password changed successfully")
    return response.data
  } catch (error: any) {
    // Enhanced error logging
    console.error("Password change error:", error)
    if (error.response) {
      console.error("Response status:", error.response.status)
      console.error("Response data:", error.response.data)

      // Check for specific error types
      if (error.response.status === 403) {
        throw new Error("Permission denied. You may not have the right permissions to change the password.")
      } else if (error.response.status === 401) {
        throw new Error("Authentication failed. Your session may have expired.")
      }
    }

    throw error.response?.data?.detail ? new Error(error.response.data.detail) : error
  }
},
  resendOtp: async (email: string, deliveryMethod: "email" | "sms"): Promise<any> => {
    try {
      console.log("Resending OTP via", deliveryMethod, "to:", email)

      // Get phone number from localStorage if available
      const phoneNumber = appGetFromLocalStorage<string>("userPhoneNumber") || ""

      // Build the payload according to the backend requirements
      const payload = {
        email: email,
        phone_number: phoneNumber || "not_provided",
        message_choice: deliveryMethod,
      }

      console.log("Sending resend OTP payload:", payload)
      const response = await authAxios.put("/resend-otp/", payload)

      console.log("OTP resent successfully")
      return response.data
    } catch (error: any) {
      console.error("OTP resend error:", error.response?.data || error.message)
      throw error
    }
  },

  verifyNIN: async (nin: string, email?: string): Promise<any> => {
    try {
      const response = await authAxios.post("/verifications/nin/", { nin, email })
      return response.data
    } catch (error: any) {
      throw error
    }
  },

  // Update the getUserProfile function to handle the actual API response structure
  getUserProfile: async (): Promise<User> => {
    try {
      console.log("Fetching user profile data")

      // Get token
      const token = getAuthToken()

      if (!token) {
        throw new Error("User is not authenticated. Please login first.")
      }

      const response = await authAxios.get("/profile/")
      console.log("Raw API response data:", response.data)

      // Explicitly type the response data and add null checks
      const responseData = (response.data as ProfileResponse | null) || {}

      // Log specific fields we're interested in
      console.log("API response user_address:", responseData.user_address)
      console.log("API response user_email:", responseData.user_email)

      // Parse full name into first and last name
      let firstName = ""
      let lastName = ""
      if (responseData.full_name) {
        const nameParts = responseData.full_name.split(" ")
        firstName = nameParts[0] || ""
        lastName = nameParts.slice(1).join(" ") || ""
      }

      // Create a properly typed user object with null checks and mapping from API response
      const userData: User = {
        id: responseData.id || "",
        email: responseData.user_email || "",
        first_name: firstName,
        last_name: lastName,
        role: responseData.role || "",
        agency_name: responseData.company_name || "",
        declarant_code: responseData.declarant_code || "",
        cac: responseData.cac || "",
        address: responseData.user_address || "", // Map user_address to address
        phone_number: responseData.phone_number || "",
        additional_phone: responseData.secondary_phone_number || "",
        state: responseData.state || "",
        local_govt: responseData.local_govt || "",
        is_accredify: responseData.is_cac_verified || false,
      }

      console.log("Processed user data with address:", userData.address)

      // If the API doesn't return address or email, check if we have it in local storage
      if (!userData.address || !userData.email) {
        console.log("Address or email missing, checking local storage")
        const storedUserData = appGetFromLocalStorage<User>(StorageKeys.USER_DATA)
        if (storedUserData) {
          console.log("Local storage user data:", storedUserData)
          console.log("Local storage address:", storedUserData.address)

          // Merge the stored data with the API response
          userData.address = userData.address || storedUserData.address || ""
          userData.email = userData.email || storedUserData.email || ""
          console.log("Enhanced user data with local storage. Final address:", userData.address)
        }
      }

      // Store the complete user data for future use
      appSaveToLocalStorage(StorageKeys.USER_DATA, userData)
      console.log("Saved complete user data to local storage")

      return userData
    } catch (error: any) {
      console.error("Error fetching user profile:", error)

      // If API call fails, try to get user data from local storage as fallback
      try {
        const storedUserData = appGetFromLocalStorage<User>(StorageKeys.USER_DATA)
        if (storedUserData) {
          console.log("Using stored user data as fallback:", storedUserData)
          console.log("Fallback address:", storedUserData.address)
          return storedUserData
        }
      } catch (storageError) {
        console.error("Error retrieving stored user data:", storageError)
      }

      // If all else fails, return a minimal user object
      return {
        id: "",
        email: "",
        first_name: "",
        last_name: "",
        role: "",
        address: "",
        phone_number: "",
      }
    }
  },

  // Add this to authService.ts in the authService object
  updateUserProfile: async (profileData: FormData): Promise<User> => {
    try {
      console.log("Updating user profile with data:", profileData)

      // Get token
      const token = getAuthToken()
      if (!token) {
        throw new Error("User is not authenticated. Please login first.")
      }

      // Set a longer timeout for file uploads
      const response = await axios({
        method: "patch",
        url: `${API_URL}/profile-update/`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: profileData,
        withCredentials: true,
        timeout: 60000, // Increase timeout to 60 seconds for large uploads
        maxContentLength: 10 * 1024 * 1024, // 10MB max content length
        maxBodyLength: 10 * 1024 * 1024, // 10MB max body length
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
          console.log(`Upload progress: ${percentCompleted}%`)
        },
      })

      console.log("Profile update successful:", response.data)

      // Update local storage with new user data if returned
      if (response.data.user) {
        appSaveToLocalStorage(StorageKeys.USER_DATA, response.data.user)
      }

      return response.data.user || response.data
    } catch (error: any) {
      console.error("Profile update error:", error)

      // Improve error handling for specific cases
      if (error.response?.status === 413) {
        throw { status: 413, message: "Files are too large. Please reduce file sizes." }
      } else if (error.response?.status === 401) {
        throw { status: 401, message: "Authentication failed. Please log in again." }
      } else if (error.response?.data?.detail) {
        throw { status: error.response.status, message: error.response.data.detail }
      }

      throw error
    }
  },

 
// createSubAccount: async (subAccountData: {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   role?: string;
// }): Promise<{ id: number }> => {
//   try {
//     const token = getAuthToken();
//     if (!token) {
//       throw new Error("User is not authenticated. Please login first.");
//     }

//     const response = await authAxios.post("/create/sub-account/", {
//       first_name: subAccountData.first_name,
//       last_name: subAccountData.last_name,
//       email: subAccountData.email,
//       phone_number: subAccountData.phone_number,

//       // ...(subAccountData.phone_number && { phone: subAccountData.phone_number }),
//       // ...(subAccountData.role && { role: subAccountData.role })
//     });

//     return response.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       if (error.response?.status === 403) {
//         throw new Error("You don't have permission to create sub-accounts.");
//       }
//       throw new Error(error.response?.data?.message || "Failed to create sub-account");
//     }
//     throw new Error("Failed to create sub-account");
//   }
// },
 
createSubAccount: async (subAccountData: {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role?: string;
}): Promise<{ id: number }> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("User is not authenticated. Please login first.");
    }

    const response = await authAxios.post("/create/sub-account/", {
      first_name: subAccountData.first_name,
      last_name: subAccountData.last_name,
      email: subAccountData.email,
      phone_number: subAccountData.phone_number,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Re-throw the full axios error so the action creator can handle detailed error parsing
      throw error;
    }
    throw new Error("Failed to create sub-account");
  }
},

listSubAccounts: async (): Promise<TeamMember[]> => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("User is not authenticated. Please login first.");
    }

    const response = await authAxios.get("/list/sub-account/");
    return response.data.map((member: any) => ({
      id: member.id,
      name: `${member.first_name} ${member.last_name}`,
      email: member.email,
      phone_number: member.phone_number || '',
      role: member.role || 'Team Member',
      status: member.is_active ? 'Active' : 'Inactive',
      initials: `${member.first_name[0]}${member.last_name[0]}`.toUpperCase(),
      lastLogin: member.last_login || 'Never',
      slug: member.slug 
    }));
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch sub-accounts");
    }
    throw new Error("Failed to fetch sub-accounts");
  }
},


// Add these methods to the authService object in authService.ts

// Get sub-account details
getSubAccountDetails: async (slug: string): Promise<TeamMember> => {
  try {
    const response = await authAxios.get(`/detail/sub-account/${slug}/`);
    const member = response.data;
    return {
      id: member.id,
      name: `${member.first_name} ${member.last_name}`,
      email: member.email,
      phone_number: member.phone_number || '',
      role: member.role || 'Team Member',
      status: member.is_active ? 'Active' : 'Inactive',
      initials: `${member.first_name[0]}${member.last_name[0]}`.toUpperCase(),
      last_Login: member.last_login || 'Never',
      slug: member.slug
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch sub-account details");
    }
    throw new Error("Failed to fetch sub-account details");
  }
},

// Update sub-account
updateSubAccount: async (slug: string, updateData: {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  role?: string;
}): Promise<TeamMember> => {
  try {
    const response = await authAxios.patch(`/update/sub-account/${slug}/`, updateData);
    const member = response.data;
    return {
      id: member.id,
      name: `${member.first_name} ${member.last_name}`,
      email: member.email,
      phone_number: member.phone_number || '',
      role: member.role || 'Team Member',
      status: member.is_active ? 'Active' : 'Inactive',
      initials: `${member.first_name[0]}${member.last_name[0]}`.toUpperCase(),
      last_Login: member.last_login || 'Never',
      slug: member.slug
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to update sub-account");
    }
    throw new Error("Failed to update sub-account");
  }
},


toggleSubAccountStatus: async (slug: string): Promise<{ is_active: boolean }> => {
  try {
    console.log("Toggling status for sub-account:", slug);
    const response = await authAxios.patch(`/deactivate-activate/sub-account/${slug}/`);
    console.log("Toggle status response:", response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Failed to toggle sub-account status";
      console.error("Error toggling status:", errorMessage);
      throw new Error(errorMessage);
    }
    throw new Error("Failed to toggle sub-account status");
  }
},



  logout: async () => {
  try {
    console.log("Logging out user")

    // Get both access and refresh tokens
    const token = getAuthToken()
    let refreshToken = null

    // Try to get refresh token from token data
    const tokenDataStr = localStorage.getItem(StorageKeys.TOKEN_DATA)
    if (tokenDataStr) {
      try {
        const tokenData = JSON.parse(tokenDataStr)
        refreshToken = tokenData?.refresh_token
      } catch (e) {
        console.error("Error parsing token data for refresh token:", e)
      }
    }

    // Also check if refresh token is stored separately
    if (!refreshToken) {
      refreshToken = localStorage.getItem("refresh_token")
    }

    console.log("Tokens for logout:", {
      hasAccessToken: !!token,
      hasRefreshToken: !!refreshToken
    })

    if (token && refreshToken) {
      try {
        await axios({
          method: "post",
          url: `${API_URL}/logout/`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            refresh_token: refreshToken
          },
          withCredentials: true,
        })
        console.log("Logout API call successful")
      } catch (logoutError: any) {
        console.warn("Logout API call failed:", logoutError.response?.data || logoutError.message)
        // Continue with local logout even if API call fails
      }
    } else {
      console.warn("Missing tokens for logout API call:", {
        hasAccessToken: !!token,
        hasRefreshToken: !!refreshToken
      })
    }

    console.log("Clearing local storage data")

    // Clear all stored user data and tokens
    localStorage.removeItem("authToken")
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("expires_at")
    localStorage.removeItem("user")
    localStorage.removeItem("csrf_token")
    localStorage.removeItem("ninVerified")
    localStorage.removeItem("firstName")
    localStorage.removeItem("lastName")
    localStorage.removeItem(StorageKeys.USER_DATA)
    localStorage.removeItem(StorageKeys.TOKEN_DATA)
    localStorage.removeItem("userPhoneNumber")

    // Remove auth header
    delete authAxios.defaults.headers.common["Authorization"]

    console.log("User logged out successfully")
  } catch (error: any) {
    console.error("Logout error:", error.response?.data || error.message)

    // Still remove auth header and clear storage even if API call fails
    delete authAxios.defaults.headers.common["Authorization"]
    
    // Clear all possible storage keys
    localStorage.removeItem("authToken")
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("expires_at")
    localStorage.removeItem("user")
    localStorage.removeItem("csrf_token")
    localStorage.removeItem("ninVerified")
    localStorage.removeItem("firstName")
    localStorage.removeItem("lastName")
    localStorage.removeItem(StorageKeys.USER_DATA)
    localStorage.removeItem(StorageKeys.TOKEN_DATA)
    localStorage.removeItem("userPhoneNumber")

    throw error
  }
},
}

export default authService

