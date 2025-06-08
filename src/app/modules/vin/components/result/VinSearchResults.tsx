"use client"

import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { VehicleDetails, VinSearchResultsProps } from "../../types"
import ConfirmationModal from "../ConfirmationModal"
import { addVinsToCartAsync, clearError, CartItem } from "../../../cart"
import { useAuth } from "../../../auth/hooks"

// Type for Redux state (adjust according to your store structure)
interface RootState {
  cart: {
    items: CartItem[]
    totalPrice: number
    promoCode: string | null
    discount: number
    isLoading: boolean
    error: string | null
  }
}

const VinSearchResults: React.FC<VinSearchResultsProps> = ({ searchResults, onNewSearch }) => {
  const dispatch = useDispatch<any>() // Use any for async thunks, or properly type your dispatch
  const navigate = useNavigate()
  const { isLoggedIn, checkLoginStatus } = useAuth()
  
  // Get cart state from Redux
  const { isLoading: cartLoading, error: cartError } = useSelector((state: RootState) => state.cart)
  
  const [localError, setLocalError] = useState<string | null>(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleDetails | null>(null)

  // Convert vehicle to cart item (for local additions)
  // const vehicleToCartItem = (vehicle: VehicleDetails): CartItem => {
  //   return {
  //     id: vehicle.vin,
  //     name: `VIN: ${vehicle.vin}`,
  //     quantity: 1,
  //     price: 7500, // Standard price for CVMS report
  //     type: "CVMS Standard Report",
  //     vin: vehicle.vin,
  //   }
  // }

  // Check authentication before proceeding
  const checkAuthBeforeAction = (): boolean => {
    if (!isLoggedIn) {
      setLocalError("Please log in to add items to your cart.")
      return false
    }
    
    // Double-check token validity
    const accessToken = localStorage.getItem("access_token")
    const expiresAt = localStorage.getItem("expires_at")
    
    if (!accessToken || !expiresAt || Number(expiresAt) <= new Date().getTime()) {
      setLocalError("Your session has expired. Please log in again.")
      checkLoginStatus() // Update auth state
      return false
    }
    
    return true
  }

  // Open confirmation modal for a single vehicle
  const handleAddSingleToCart = (vehicle: VehicleDetails) => {
    if (!checkAuthBeforeAction()) return
    
    setSelectedVehicle(vehicle)
    setIsConfirmModalOpen(true)
  }

  // Handle adding single vehicle from confirmation modal
  const handleConfirmSingleAdd = async () => {
    if (!selectedVehicle) return
    
    setIsConfirmModalOpen(false)
    await addVehiclesToCart([selectedVehicle])
  }

  // Handle purchasing all vehicles
  const handlePurchaseAll = async () => {
    if (!checkAuthBeforeAction()) return
    
    await addVehiclesToCart(searchResults)
  }

  // Core function to add vehicles to cart via Redux async thunk
  const addVehiclesToCart = async (vehicles: VehicleDetails[]) => {
    // Clear any previous errors
    setLocalError(null)
    dispatch(clearError())
    
    try {
      // Dispatch the async thunk
      const result = await dispatch(addVinsToCartAsync(vehicles))
      
      if (addVinsToCartAsync.fulfilled.match(result)) {
        // Success - navigate to cart page
        navigate("/cart")
      } else if (addVinsToCartAsync.rejected.match(result)) {
        // Handle rejection
        const errorMessage = result.payload as string
        
        if (errorMessage.includes("Authentication") || 
            errorMessage.includes("log in") || 
            errorMessage.includes("token") ||
            errorMessage.includes("expired")) {
          checkLoginStatus() // Update auth state
          setTimeout(() => {
            navigate("/login")
          }, 2000)
        }
        
        setLocalError(errorMessage)
      }
    } catch (error) {
      setLocalError(error instanceof Error ? error.message : "An unexpected error occurred")
    }
  }

  // Combine local error and cart error for display
  const displayError = localError || cartError

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto my-4 md:my-8 p-3 md:p-6">
      {/* Error message if exists */}
      {displayError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          <p className="font-medium">Unable to add to cart</p>
          <p className="text-sm">{displayError}</p>
          {(displayError.includes("log in") || displayError.includes("Authentication") || displayError.includes("session")) && (
            <button
              onClick={() => navigate("/login")}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Go to Login
            </button>
          )}
        </div>
      )}
      
      {/* Auth warning if not logged in */}
      {!isLoggedIn && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md mb-4">
          <p className="font-medium">Login Required</p>
          <p className="text-sm">Please log in to add items to your cart and proceed with checkout.</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Go to Login
          </button>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">VINs Ready for Processing</h2>
        <span className="text-gray-500 text-sm md:text-base">
          {searchResults.length} {searchResults.length === 1 ? "VIN" : "VINs"} found
        </span>
      </div>

      {/* <div className="space-y-3 md:space-y-4">
        {searchResults.map((vehicle) => (
          <div key={vehicle.vin} className="border rounded-lg p-3 md:p-4 hover:bg-gray-50 transition">
            <div className="flex justify-between items-center">
              <p className="text-md lg:text-base font-bold text-[#000] break-words">VIN: {vehicle.vin}</p>
              
              {searchResults.length > 1 && (
                <button
                  onClick={() => handleAddSingleToCart(vehicle)}
                  disabled={!isLoggedIn || cartLoading}
                  className="text-sm px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        ))}
      </div> */}

      <div className="space-y-3 md:space-y-4">
  {searchResults.map((vehicle) => (
    <div key={vehicle.vin} className="border rounded-lg p-3 md:p-4 hover:bg-gray-50 transition">
      <div className={`flex items-center ${searchResults.length > 1 ? 'justify-between' : 'justify-center'}`}>
        <p className="text-md lg:text-base font-bold text-[#000] break-words">VIN: {vehicle.vin}</p>
        
        {searchResults.length > 1 && (
          <button
            onClick={() => handleAddSingleToCart(vehicle)}
            disabled={!isLoggedIn || cartLoading}
            className="text-sm px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        )}
      </div>
    </div>
  ))}
</div>

      {/* Action buttons - responsive layout */}
      <div className="mt-4 md:mt-6 flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
        <button
          onClick={onNewSearch}
          disabled={cartLoading}
          className="px-4 py-2 md:px-6 md:py-3 border border-gray-300 rounded-md text-green-600 hover:text-green-500 hover:bg-gray-50 font-medium flex items-center justify-center text-sm md:text-base disabled:opacity-50"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Start a New Search
        </button>

        <button
          onClick={handlePurchaseAll}
          disabled={!isLoggedIn || cartLoading}
          className="px-4 py-2 md:px-6 md:py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md font-medium flex items-center justify-center text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {cartLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 md:w-5 md:h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {!isLoggedIn ? "Login to Add to Cart" : (searchResults.length === 1 ? "Add to Cart" : "Add All to Cart")}
            </>
          )}
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        vehicle={selectedVehicle}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmSingleAdd}
      />
    </div>
  )
}

export default VinSearchResults