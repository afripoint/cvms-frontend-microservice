// // import axios from "axios"
// // import * as XLSX from "xlsx"
// // import type { ApiResponse } from "../types"

// // const API_BASE_URL = "https://afridev.com.ng/vin"

// // // Create an axios instance with default headers
// // const apiClient = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // })

// // // Function to get authentication token from localStorage
// // const getAuthToken = () => {
// //   // Get the access token directly from localStorage
// //   return localStorage.getItem("access_token")
// // }

// // // Add request interceptor to include up-to-date auth token
// // apiClient.interceptors.request.use(
// //   (config) => {
// //     const token = getAuthToken()
// //     if (token) {
// //       config.headers["Authorization"] = `Bearer ${token}`
// //     }
// //     return config
// //   },
// //   (error) => Promise.reject(error),
// // )

// // export const searchVin = async (vinNumber: string): Promise<ApiResponse> => {
// //   try {
// //     // For single VIN search
// //     const response = await apiClient.get(`/single-multi-search/`, {
// //       params: { vins: vinNumber },
// //     })

// //     if (response.data && Array.isArray(response.data)) {
// //       return {
// //         success: true,
// //         data: response.data[0], // Return first item for single VIN search
// //       }
// //     }
// //     return { success: false, error: "Invalid response format" }
// //   } catch (error) {
// //     console.error("API Error:", error)
// //     if (axios.isAxiosError(error) && error.response?.status === 401) {
// //       return {
// //         success: false,
// //         error: "Authentication failed. Please log in again.",
// //       }
// //     }
// //     return {
// //       success: false,
// //       error: axios.isAxiosError(error)
// //         ? error.response?.data?.message || error.response?.data?.detail || "Server error"
// //         : "Network error",
// //     }
// //   }
// // }

// // export const searchMultipleVins = async (vinNumbers: string[]): Promise<ApiResponse> => {
// //   try {
// //     // Remove duplicate VINs before making requests
// //     const uniqueVins = [...new Set(vinNumbers.map((vin) => vin.trim()))]

// //     // Make separate requests for each unique VIN
// //     const promises = uniqueVins.map((vin) =>
// //       apiClient.get(`/single-multi-search/`, {
// //         params: { vins: vin },
// //       }),
// //     )

// //     const responses = await Promise.all(promises)

// //     // Combine all the results into a single array
// //     let combinedResults = responses.flatMap((response) => (Array.isArray(response.data) ? response.data : []))

// //     // Ensure no duplicate VINs in the results
// //     // Create a Map with VIN as key to keep only unique entries
// //     const vinMap = new Map()
// //     combinedResults.forEach((result) => {
// //       if (result.vin && !vinMap.has(result.vin)) {
// //         vinMap.set(result.vin, result)
// //       }
// //     })

// //     // Convert Map back to array
// //     combinedResults = Array.from(vinMap.values())

// //     if (combinedResults.length > 0) {
// //       return {
// //         success: true,
// //         data: combinedResults,
// //       }
// //     }

// //     return { success: false, error: "No data returned" }
// //   } catch (error) {
// //     console.error("API Error:", error)
// //     if (axios.isAxiosError(error) && error.response?.status === 401) {
// //       return {
// //         success: false,
// //         error: "Authentication failed. Please log in again.",
// //       }
// //     }
// //     return {
// //       success: false,
// //       error: axios.isAxiosError(error)
// //         ? error.response?.data?.message || error.response?.data?.detail || "Server error"
// //         : "Network error",
// //     }
// //   }
// // }

// // export const searchUploadedVins = async (vinNumbers: string[]): Promise<ApiResponse> => {
// //   try {
// //     // Remove duplicate VINs before creating the Excel file
// //     const uniqueVins = [...new Set(vinNumbers.map((vin) => vin.replace(/,+$/, "").trim()))]

// //     // Create an Excel file with the unique VINs
// //     const wb = XLSX.utils.book_new()
// //     const wsData = uniqueVins.map((vin) => ({ vin: vin }))
// //     const ws = XLSX.utils.json_to_sheet(wsData)
// //     XLSX.utils.book_append_sheet(wb, ws, "VINs")
// //     const excelBuffer = XLSX.write(wb, { type: "array", bookType: "xlsx" })
// //     const excelBlob = new Blob([excelBuffer], {
// //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// //     })
// //     const excelFile = new File([excelBlob], "vins.xlsx", {
// //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// //     })

// //     const formData = new FormData()
// //     formData.append("file", excelFile)

// //     const csrfToken = localStorage.getItem("csrf_token")

// //     const response = await axios.post(`${API_BASE_URL}/multi-upload-search/`, formData, {
// //       headers: {
// //         Authorization: `Bearer ${getAuthToken()}`,
// //         ...(csrfToken ? { "X-CSRFToken": csrfToken } : {}),
// //       },
// //     })

// //     // Check if response contains a "message" field indicating a successful API call
// //     if (response.data) {
// //       // Even if all VINs have errors, this is still valid data that should be returned to the client
// //       // The API is returning the data array with error messages for each VIN
// //       if (Array.isArray(response.data.data)) {
// //         // The response format seems to be { message: "Ok", data: [...] }
// //         return {
// //           success: true,
// //           data: response.data.data,
// //         };
// //       } else if (Array.isArray(response.data)) {
// //         // Handle case where response might be a direct array
// //         return {
// //           success: true,
// //           data: response.data,
// //         };
// //       }
// //     }

// //     return { success: false, error: "Invalid response format" }
// //   } catch (error) {
// //     console.error("API Error:", error)
// //     if (axios.isAxiosError(error) && error.response?.status === 401) {
// //       return {
// //         success: false,
// //         error: "Authentication failed. Please log in again.",
// //       }
// //     }
// //     if (axios.isAxiosError(error) && error.response?.status === 500) {
// //       return {
// //         success: false,
// //         error: "Server error processing the file. Please check the file format and try again.",
// //       }
// //     }
// //     return {
// //       success: false,
// //       error: axios.isAxiosError(error)
// //         ? error.response?.data?.message || error.response?.data?.detail || "Server error"
// //         : "Network error",
// //     }
// //   }
// // }





// import axios from "axios"
// import * as XLSX from "xlsx"
// import type { ApiResponse, VehicleDetails } from "../types"

// const API_BASE_URL = "http://cvms-api.afripointdev.com/vin"

// // Define interfaces for API responses
// interface VinResponseItem {
//   vin?: string
//   status?: string
//   [key: string]: any // Allow for other properties
// }

// // Create an axios instance with default headers
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// // Function to get authentication token from localStorage
// const getAuthToken = () => {
//   return localStorage.getItem("access_token")
// }

// // Add request interceptor to include up-to-date auth token
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = getAuthToken()
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error),
// )

// /**
//  * Handles API errors and returns a consistent error object
//  * @param error The error from axios
//  * @returns never - always throws an error
//  */
// const handleApiError = (error: unknown): never => {
//   console.error("API Error:", error)
  
//   if (axios.isAxiosError(error)) {
//     // Handle authentication errors
//     if (error.response?.status === 401) {
//       throw new Error("Authentication failed. Please log in again.")
//     }
    
//     // Handle server errors
//     if (error.response?.status === 500) {
//       throw new Error("Server error. Please try again later.")
//     }
    
//     // Handle other response errors
//     const errorMessage = error.response?.data?.message || 
//                          error.response?.data?.detail || 
//                          error.response?.data?.error ||
//                          `Error: ${error.response?.status || "Unknown"}`
    
//     throw new Error(errorMessage)
//   }
  
//   // Handle network errors or other unexpected errors
//   if (error instanceof Error) {
//     throw error
//   }
  
//   throw new Error("Network error or service unavailable. Please check your connection and try again.")
// }

// /**
//  * Process API response to handle various response formats including status messages
//  * @param response The API response item
//  * @returns Processed response data
//  */
// const processApiResponse = (response: VinResponseItem): VinResponseItem => {
//   // Check if response has a status field that indicates an error
//   if (response.status && typeof response.status === 'string' && 
//       (response.status.toLowerCase().includes('invalid') || 
//        response.status.toLowerCase().includes('error'))) {
//     throw new Error(response.status)
//   }
  
//   return response
// }

// /**
//  * Search for a single VIN number
//  * @param vinNumber The VIN to search for
//  * @returns ApiResponse with search results or error
//  */
// export const searchVin = async (vinNumber: string): Promise<ApiResponse> => {
//   try {
//     const response = await apiClient.get(`/single-multi-search/`, {
//       params: { vins: vinNumber },
//     })

//     if (response.data && Array.isArray(response.data)) {
//       // Process each item in the array to check for status errors
//       const processedData = response.data.map((item: VinResponseItem) => processApiResponse(item))
      
//       return {
//         success: true,
//         data: processedData[0] as VehicleDetails, // Return first item for single VIN search
//       }
//     }
    
//     // If response is not an array, check if it has status field
//     if (response.data) {
//       processApiResponse(response.data as VinResponseItem)
//     }
    
//     throw new Error("Invalid response format")
//   } catch (error) {
//     throw handleApiError(error)
//   }
// }

// /**
//  * Search for multiple VIN numbers
//  * @param vinNumbers Array of VINs to search for
//  * @returns ApiResponse with search results or error
//  */
// export const searchMultipleVins = async (vinNumbers: string[]): Promise<ApiResponse> => {
//   try {
//     // Remove duplicate VINs before making requests
//     const uniqueVins = [...new Set(vinNumbers.map((vin) => vin.trim()))]

//     // Make separate requests for each unique VIN
//     const promises = uniqueVins.map((vin) =>
//       apiClient.get(`/single-multi-search/`, {
//         params: { vins: vin },
//       }),
//     )

//     const responses = await Promise.all(promises)

//     // Combine all the results into a single array
//     let combinedResults = responses.flatMap((response) => {
//       if (Array.isArray(response.data)) {
//         // Process each item to check for status errors
//         return response.data.map((item: VinResponseItem) => processApiResponse(item))
//       }
//       return []
//     })

//     // Ensure no duplicate VINs in the results
//     const vinMap = new Map<string, VinResponseItem>()
//     combinedResults.forEach((result: VinResponseItem) => {
//       if (result.vin && !vinMap.has(result.vin)) {
//         vinMap.set(result.vin, result)
//       }
//     })

//     // Convert Map back to array
//     combinedResults = Array.from(vinMap.values())

//     if (combinedResults.length > 0) {
//       return {
//         success: true,
//         data: combinedResults as VehicleDetails[],
//       }
//     }

//     throw new Error("No data returned from the API")
//   } catch (error) {
//     throw handleApiError(error)
//   }
// }

// /**
//  * Error response interface for VIN records
//  */
// interface VinErrorResponse {
//   vin: string
//   error: string
//   status: string
// }

// /**
//  * Search for VINs by uploading an Excel file
//  * @param vinNumbers Array of VINs to search for
//  * @returns ApiResponse with search results or error
//  */
// export const searchUploadedVins = async (vinNumbers: string[]): Promise<ApiResponse> => {
//   try {
//     // Remove duplicate VINs before creating the Excel file
//     const uniqueVins = [...new Set(vinNumbers.map((vin) => vin.replace(/,+$/, "").trim()))]

//     // Create an Excel file with the unique VINs
//     const wb = XLSX.utils.book_new()
//     const wsData = uniqueVins.map((vin) => ({ vin: vin }))
//     const ws = XLSX.utils.json_to_sheet(wsData)
//     XLSX.utils.book_append_sheet(wb, ws, "VINs")
//     const excelBuffer = XLSX.write(wb, { type: "array", bookType: "xlsx" })
//     const excelBlob = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     })
//     const excelFile = new File([excelBlob], "vins.xlsx", {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     })

//     const formData = new FormData()
//     formData.append("file", excelFile)

//     const csrfToken = localStorage.getItem("csrf_token")

//     const response = await axios.post(`${API_BASE_URL}/multi-upload-search/`, formData, {
//       headers: {
//         Authorization: `Bearer ${getAuthToken()}`,
//         ...(csrfToken ? { "X-CSRFToken": csrfToken } : {}),
//       },
//     })

//     // Process the response based on its structure
//     if (response.data) {
//       let dataArray: VinResponseItem[];
      
//       if (Array.isArray(response.data.data)) {
//         // The response format seems to be { message: "Ok", data: [...] }
//         dataArray = response.data.data
//       } else if (Array.isArray(response.data)) {
//         // Handle case where response might be a direct array
//         dataArray = response.data
//       } else {
//         throw new Error("Invalid response format from the API")
//       }
      
//       // Process each item to check for status errors
//       const processedData = dataArray.map((item: VinResponseItem) => {
//         try {
//           return processApiResponse(item)
//         } catch (error) {
//           // For bulk uploads, we'll collect errors instead of throwing
//           if (error instanceof Error) {
//             return {
//               vin: item.vin || "Unknown",
//               error: error.message,
//               status: "error"
//             } as VinErrorResponse
//           }
//           return item
//         }
//       })
      
//       return {
//         success: true,
//         data: processedData as VehicleDetails[],
//       }
//     }

//     throw new Error("Invalid response format from the API")
//   } catch (error) {
//     throw handleApiError(error)
//   }
// }

// /**
//  * Download error report as Excel file
//  * @param errorData Array of error objects
//  */
// export const downloadErrorReport = (errorData: VinErrorResponse[]): void => {
//   try {
//     // Create workbook
//     const wb = XLSX.utils.book_new()
    
//     // Format data for Excel
//     const wsData = errorData.map(item => ({
//       VIN: item.vin || "N/A",
//       Error: item.error || item.status || "Unknown error",
//       Date: new Date().toISOString().split('T')[0]
//     }))
    
//     // Create worksheet
//     const ws = XLSX.utils.json_to_sheet(wsData)
    
//     // Add worksheet to workbook
//     XLSX.utils.book_append_sheet(wb, ws, "Error Report")
    
//     // Generate Excel file and trigger download
//     XLSX.writeFile(wb, `vin-error-report-${new Date().toISOString().split('T')[0]}.xlsx`)
//   } catch (error) {
//     console.error("Failed to generate error report:", error)
//     throw new Error("Failed to generate error report")
//   }
// }




// Replace the entire file with this simplified version that doesn't make API calls

import type { ApiResponse, VehicleDetails } from "../types"

/**
 * Creates a basic vehicle object from a VIN
 * @param vin The VIN number
 * @returns A basic VehicleDetails object
 */
const createVehicleFromVin = (vin: string): VehicleDetails => {
  return {
    id: vin,
    vin: vin,
    manufacturer: "",
    model: "",
    year: "",
    vis: "",
    vreg: "",
    class: "",
    brand: "",
    engine_type: "",
    country: "",
    region: "",
    wmi: "",
    vds: "",
  }
}

/**
 * Process a single VIN without API call
 * @param vinNumber The VIN to process
 * @returns ApiResponse with the created vehicle object
 */
export const searchVin = async (vinNumber: string): Promise<ApiResponse> => {
  try {
    // Create a vehicle object from the VIN
    const vehicle = createVehicleFromVin(vinNumber)

    return {
      success: true,
      data: vehicle,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred during processing.",
    }
  }
}

/**
 * Process multiple VINs without API call
 * @param vinNumbers Array of VINs to process
 * @returns ApiResponse with array of created vehicle objects
 */
export const searchMultipleVins = async (vinNumbers: string[]): Promise<ApiResponse> => {
  try {
    // Remove duplicate VINs
    const uniqueVins = [...new Set(vinNumbers.map((vin) => vin.trim()))]

    // Create vehicle objects for each VIN
    const vehicles = uniqueVins.map((vin) => createVehicleFromVin(vin))

    return {
      success: true,
      data: vehicles,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred during processing.",
    }
  }
}

/**
 * Process uploaded VINs without API call
 * @param vinNumbers Array of VINs from upload
 * @returns ApiResponse with array of created vehicle objects
 */
export const searchUploadedVins = async (vinNumbers: string[]): Promise<ApiResponse> => {
  try {
    // Remove duplicate VINs
    const uniqueVins = [...new Set(vinNumbers.map((vin) => vin.replace(/,+$/, "").trim()))]

    // Create vehicle objects for each VIN
    const vehicles = uniqueVins.map((vin) => createVehicleFromVin(vin))

    return {
      success: true,
      data: vehicles,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred during processing.",
    }
  }
}
