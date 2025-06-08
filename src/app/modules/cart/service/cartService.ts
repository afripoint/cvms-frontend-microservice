import axios, { AxiosError } from "axios";
import { VehicleDetails } from "../../vin";

interface AddVinsResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface RemoveVinResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Service to handle cart operations with the CVMS microservice
 */
export const cartService = {
  /**
   * Add VINs to cart using the CVMS microservice
   * @param vehicles Array of vehicle details to add to cart
   * @returns Promise with the response from the API
   */
  addVinsToCart: async (vehicles: VehicleDetails[]): Promise<AddVinsResponse> => {
    try {
      // Extract VINs from vehicle objects
      const vins = vehicles.map(vehicle => vehicle.vin);
      
      console.log(`Attempting to add ${vins.length} VIN(s) to cart:`, vins);
      
      // Get authentication token from localStorage
      const accessToken = localStorage.getItem("access_token");
      const expiresAt = localStorage.getItem("expires_at");
      
      // Check if token exists and is valid
      if (!accessToken || !expiresAt || Number(expiresAt) <= new Date().getTime()) {
        return {
          success: false,
          message: "Authentication token is missing or expired. Please log in again.",
        };
      }

      // Prepare headers with authentication
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      };

      // Make the API call using axios
      const response = await axios.post(
        'https://cvms-staging.afripointdev.com/vin/add-vins-to-cart/',
        { vins }, // Request body
        {
          headers,
          withCredentials: true,
          timeout: 30000,
        }
      );

      console.log(`API Response Status: ${response.status}`);
      console.log("API Response Data:", response.data);
      
      return {
        success: true,
        message: response.data.message || `Successfully added ${vins.length} VIN(s) to cart`,
        data: response.data
      };
      
    } catch (error: any) {
      console.error('Error adding VINs to cart:', error);
      
      // Handle axios errors
      if (error instanceof AxiosError) {
        // Handle response errors (4xx, 5xx)
        if (error.response) {
          const status = error.response.status;
          const errorData = error.response.data;
          const errorMessage = errorData?.message || errorData?.error || `HTTP error! status: ${status}`;
          
          switch (status) {
            case 401:
              return {
                success: false,
                message: "Authentication failed. Please log in again.",
              };
            case 403:
              return {
                success: false,
                message: "Access denied. You don't have permission to perform this action.",
              };
            case 404:
              return {
                success: false,
                message: "Service not found. Please try again later.",
              };
            case 500:
              return {
                success: false,
                message: "Server error. Please try again later.",
              };
            default:
              return {
                success: false,
                message: errorMessage,
              };
          }
        }
        
        // Handle request errors (network issues, timeouts, etc.)
        if (error.request) {
          return {
            success: false,
            message: 'Network error. Please check your internet connection and try again.',
          };
        }
      }
      
      // Handle other types of errors
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to add VINs to cart. Please try again.',
      };
    }
  },

  /**
   * Remove VIN from cart using the CVMS microservice
   * @param vin VIN to remove from cart
   * @returns Promise with the response from the API
   */
  removeVinFromCart: async (vin: string): Promise<RemoveVinResponse> => {
    try {
      // Validate VIN parameter
      if (!vin || typeof vin !== 'string' || vin.trim().length === 0) {
        return {
          success: false,
          message: "Invalid VIN provided for removal.",
        };
      }

      const cleanVin = vin.trim();
      console.log(`Attempting to remove VIN from cart:`, cleanVin);
      
      // Get authentication token from localStorage
      const accessToken = localStorage.getItem("access_token");
      const expiresAt = localStorage.getItem("expires_at");
      
      // Check if token exists and is valid
      if (!accessToken || !expiresAt || Number(expiresAt) <= new Date().getTime()) {
        return {
          success: false,
          message: "Authentication token is missing or expired. Please log in again.",
        };
      }

      // Prepare headers with authentication
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      };

      // Build the correct URL with VIN as path parameter
      const url = `https://cvms-staging.afripointdev.com/vin/cart/remove-vin/${cleanVin}/`;
      
      console.log(`Making DELETE request to:`, url);

      // Make the DELETE request with VIN in the URL path
      const response = await axios.delete(url, {
        headers,
        timeout: 30000,
      });

      console.log(`Remove VIN API Response Status: ${response.status}`);
      console.log("Remove VIN API Response Data:", response.data);
      
      return {
        success: true,
        message: response.data.message || `Successfully removed VIN ${cleanVin} from cart`,
        data: response.data
      };
      
    } catch (error: any) {
      console.error('Error removing VIN from cart:', error);
      
      // Handle axios errors
      if (error instanceof AxiosError) {
        // Handle response errors (4xx, 5xx)
        if (error.response) {
          const status = error.response.status;
          const errorData = error.response.data;
          const errorMessage = errorData?.message || errorData?.error || `HTTP error! status: ${status}`;
          
          switch (status) {
            case 401:
              return {
                success: false,
                message: "Authentication failed. Please log in again.",
              };
            case 403:
              return {
                success: false,
                message: "Access denied. You don't have permission to perform this action.",
              };
            case 404:
              return {
                success: false,
                message: "VIN not found in cart or service not available.",
              };
            case 405:
              return {
                success: false,
                message: "Method not allowed. The server doesn't support this operation.",
              };
            case 500:
              return {
                success: false,
                message: "Server error. Please try again later.",
              };
            default:
              return {
                success: false,
                message: errorMessage,
              };
          }
        }
        
        // Handle request errors (network issues, timeouts, etc.)
        if (error.request) {
          return {
            success: false,
            message: 'Network error. Please check your internet connection and try again.',
          };
        }
      }
      
      // Handle other types of errors
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to remove VIN from cart. Please try again.',
      };
    }
  }
};