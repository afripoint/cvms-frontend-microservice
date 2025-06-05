// // utils/axiosConfig.ts
// import axios, { AxiosInstance, AxiosResponse } from 'axios'
// import { RootState, store } from '../../../core/store'


// // Create axios instance with base configuration
// const apiClient: AxiosInstance = axios.create({
//   baseURL: 'https://cvms-microservice.afripointdev.com',
//   timeout: 30000, // 30 seconds timeout
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// // Helper function to get auth token from multiple sources
// const getAuthToken = (): string | null => {
//   try {
//     // First try to get from Redux store
//     const state: RootState = store.getState()
    
//     // Check different possible auth state structures using type assertion to avoid TS errors
//     const authState = state.auth as any
    
//     if (authState?.token) {
//       return authState.token
//     }
    
//     if (authState?.tokens?.access_token) {
//       return authState.tokens.access_token
//     }
    
//     if (authState?.access_token) {
//       return authState.access_token
//     }
    
//     if (authState?.accessToken) {
//       return authState.accessToken
//     }
    
//     // Fallback to localStorage (same logic as authService.ts)
//     const directToken = localStorage.getItem("authToken")
//     if (directToken) {
//       try {
//         return JSON.parse(directToken)
//       } catch (e) {
//         return directToken
//       }
//     }

//     // Check token data object in localStorage
//     const tokenDataStr = localStorage.getItem("TOKEN_DATA") // Adjust key as needed
//     if (tokenDataStr) {
//       try {
//         const tokenData = JSON.parse(tokenDataStr)
//         return tokenData?.access_token || null
//       } catch (e) {
//         console.error("Error parsing token data:", e)
//         return null
//       }
//     }

//     return null
//   } catch (error) {
//     console.error("Error getting auth token:", error)
//     return null
//   }
// }

// // Request interceptor to add auth token
// apiClient.interceptors.request.use(
//   (config: any) => {
//     // Get token using the helper function
//     const token = getAuthToken()

//     // Add authorization header if token exists
//     if (token) {
//       config.headers = config.headers || {}
//       config.headers.Authorization = `Bearer ${token}`
//     }

//     console.log('API Request:', {
//       method: config.method?.toUpperCase(),
//       url: config.url,
//       data: config.data,
//       headers: config.headers,
//     })

//     return config
//   },
//   (error) => {
//     console.error('Request interceptor error:', error)
//     return Promise.reject(error)
//   }
// )

// // Response interceptor for handling common responses
// apiClient.interceptors.response.use(
//   (response: AxiosResponse) => {
//     console.log('API Response:', {
//       status: response.status,
//       url: response.config.url,
//       data: response.data,
//     })
//     return response
//   },
//   (error) => {
//     console.error('API Error:', {
//       status: error.response?.status,
//       url: error.config?.url,
//       data: error.response?.data,
//       message: error.message,
//     })

//     // Handle common error cases
//     if (error.response?.status === 401) {
//       // Handle unauthorized - token may be expired
//       console.log('Unauthorized access - token may be expired')
      
//       // Clear local storage tokens
//       localStorage.removeItem("authToken")
//       localStorage.removeItem("TOKEN_DATA")
      
//       // You can dispatch a logout action here if needed
//       // store.dispatch(logout())
//     }

//     if (error.response?.status === 403) {
//       console.log('Forbidden access')
//     }

//     if (error.response?.status >= 500) {
//       console.log('Server error')
//     }

//     return Promise.reject(error)
//   }
// )

// export default apiClient

// // Export specific API functions for payment
// export const paymentAPI = {
//   checkoutOneTimePayment: (gateway: 'paystack' | 'remita') => 
//     apiClient.post('/vin/checkout-one-time-payment/', { gateway }),
  
//   verifyOneTimePayment: (reference: string, gateway: 'paystack' | 'remita') => 
//     apiClient.get(`/vin/verify-one-time-payment/${reference}`, {
//       params: { payment_gateway: gateway }
//     }),
// }

// // Export other API groups as needed
// export const vinAPI = {
//   // Add your VIN-related API calls here
//   searchVin: (vin: string) => apiClient.get(`/vin/search/${vin}`),
//   // ... other VIN endpoints
// }

// export const authAPI = {
//   // Add your auth-related API calls here
//   login: (credentials: any) => apiClient.post('/auth/login/', credentials),
//   register: (userData: any) => apiClient.post('/auth/register/', userData),
//   // ... other auth endpoints
// }