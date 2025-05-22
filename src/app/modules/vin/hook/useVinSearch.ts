// "use client"

// import type React from "react"

// import { useState, useCallback } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import {
//   setVinNumber,
//   addIndividualVin,
//   removeIndividualVin,
//   setIsSearching,
//   setValidationError,
//   setSearchError,
//   setSearchMessage,
//   setSearchResults,
//   setSelectedVehicle,
//   setShowPurchaseModal,
//   clearVins,
// } from "../redux/slices/vinSlice"
// import { validateVin } from "../services/validationService"
// import type { VehicleDetails, ApiResponse } from "../types"
// import type { RootState } from "../../../core/store"
// import { searchVin, searchMultipleVins, searchUploadedVins } from "../services/vinApiService"
// import { useAuth } from "../../../modules/auth/hooks/useAuth"

// export const useVinSearch = () => {
//   const dispatch = useDispatch()
//   const { isLoggedIn } = useAuth()
//   const {
//     vinNumber,
//     individualVins,
//     multipleVins,
//     isSearching,
//     validationError,
//     searchResults,
//     selectedVehicle,
//     showPurchaseModal,
//     searchError,
//     searchMessage,
//   } = useSelector((state: RootState) => state.vin)

//   const [showMultipleVinModal, setShowMultipleVinModal] = useState(false)
//   const [showMultipleVinListModal, setShowMultipleVinListModal] = useState(false)
//   const [showLoginPrompt, setShowLoginPrompt] = useState(false)

//   // Handle VIN input change
//   const handleVinChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       dispatch(setVinNumber(e.target.value.toUpperCase()))
//     },
//     [dispatch],
//   )

//   // Add VIN to individual VINs list
//   const handleAddVin = useCallback(() => {
//     const { isValid, errorMessage } = validateVin(vinNumber)

//     if (isValid) {
//       // Check if the VIN already exists in the list
//       if (individualVins.includes(vinNumber.trim())) {
//         dispatch(setValidationError(`VIN ${vinNumber} is already in the list.`))
//         return
//       }
//       dispatch(addIndividualVin())
//     } else if (errorMessage) {
//       dispatch(setValidationError(errorMessage))
//     }
//   }, [dispatch, vinNumber, individualVins])

//   // Remove VIN from individual VINs list
//   const handleRemoveVin = useCallback(
//     (index: number) => {
//       dispatch(removeIndividualVin(index))
//     },
//     [dispatch],
//   )

//   // Toggle multiple VIN modal
//   const toggleMultipleVinModal = useCallback(() => {
//     setShowMultipleVinModal((prev) => !prev)
//   }, [])

//   // Handle search for VINs
//   const handleSearch = useCallback(async () => {
//     // Check if user is logged in
//     if (!isLoggedIn) {
//       setShowLoginPrompt(true)
//       return
//     }

//     // Validate main VIN if it's not empty and there are no individual VINs
//     if (vinNumber && individualVins.length === 0) {
//       const { isValid, errorMessage } = validateVin(vinNumber)

//       if (!isValid) {
//         dispatch(setValidationError(errorMessage))
//         return
//       }
//     }

//     // Collect all VINs to search
//     const vinsToSearch = [...individualVins]
//     if (vinNumber) {
//       vinsToSearch.push(vinNumber)
//     }

//     if (vinsToSearch.length === 0) {
//       dispatch(setValidationError("Please enter at least one VIN to search."))
//       return
//     }

//     // Check for duplicate VINs
//     const uniqueVins = [...new Set(vinsToSearch)]
//     if (uniqueVins.length < vinsToSearch.length) {
//       dispatch(setValidationError("Duplicate VINs detected. Please ensure all VINs are unique."))
//       return
//     }

//     try {
//       dispatch(setIsSearching(true))
//       dispatch(setSearchError(null))
//       dispatch(setSearchMessage(null))

//       let response: ApiResponse

//       if (vinsToSearch.length === 1) {
//         response = await searchVin(vinsToSearch[0])
//       } else {
//         response = await searchMultipleVins(vinsToSearch)
//       }

//       if (response.success) {
//         if (Array.isArray(response.data)) {
//           dispatch(setSearchResults(response.data))
//           dispatch(setSearchMessage(`Records found for ${response.data.length} VINs`))
//         } else if (response.data) {
//           dispatch(setSearchResults([response.data]))
//           dispatch(setSearchMessage(`Records found for VIN: ${response.data.vin}`))
//         }
//       } else {
//         dispatch(setSearchError(response.error || "No records found"))
//       }

//       // Clear input fields after successful search
//       dispatch(setVinNumber(""))
//     } catch (error) {
//       dispatch(setSearchError(error instanceof Error ? error.message : "An error occurred during the search."))
//     } finally {
//       dispatch(setIsSearching(false))
//     }
//   }, [dispatch, vinNumber, individualVins, isLoggedIn])

//   // Handle search for multiple VINs from the list modal
//   const handleSearchMultipleVins = useCallback(async () => {
//     // Check if user is logged in
//     if (!isLoggedIn) {
//       setShowLoginPrompt(true)
//       return
//     }

//     setShowMultipleVinListModal(false)

//     if (multipleVins.length === 0) {
//       dispatch(setValidationError("No VINs available to search."))
//       return
//     }

//     // Check for duplicate VINs
//     const uniqueVins = [...new Set(multipleVins)]
//     if (uniqueVins.length < multipleVins.length) {
//       dispatch(setValidationError("Duplicate VINs detected in the uploaded file. Please ensure all VINs are unique."))
//       return
//     }

//     dispatch(setIsSearching(true))
//     dispatch(setSearchError(null))
//     dispatch(setSearchMessage(null))

//     try {
//       const response = await searchUploadedVins(multipleVins)

//       if (response.success && Array.isArray(response.data)) {
//         dispatch(setSearchResults(response.data))
//         dispatch(setSearchMessage(`Records found for ${response.data.length} out of ${multipleVins.length} VINs`))
//       } else {
//         dispatch(setSearchError(response.error || "No records found"))
//       }
//     } catch (error) {
//       dispatch(setSearchError(error instanceof Error ? error.message : "An error occurred during the search."))
//     } finally {
//       dispatch(setIsSearching(false))
//     }
//   }, [dispatch, multipleVins, isLoggedIn])

//   // Handle purchase action
//   const handlePurchase = useCallback(
//     (vehicle: VehicleDetails | null) => {
//       dispatch(setSelectedVehicle(vehicle))
//       dispatch(setShowPurchaseModal(true))
//     },
//     [dispatch],
//   )

//   // Handle add to cart action
//   const handleAddToCart = useCallback(() => {
//     // Here you would typically add the item to a cart
//     // For now, we'll just close the modal
//     dispatch(setShowPurchaseModal(false))
//     alert("Item added to cart! The full report will be available for download after purchase.")
//   }, [dispatch])

//   // Handle new search action
//   const handleNewSearch = useCallback(() => {
//     dispatch(clearVins())
//     dispatch(setSearchMessage(null))
//   }, [dispatch])

//   // Handle multiple VIN upload complete
//   const handleMultipleVinUploadComplete = useCallback(() => {
//     setShowMultipleVinModal(false)
//     setShowMultipleVinListModal(true)
//   }, [])

//   return {
//     // State
//     vinNumber,
//     individualVins,
//     multipleVins,
//     isSearching,
//     validationError,
//     searchResults,
//     selectedVehicle,
//     showPurchaseModal,
//     showMultipleVinModal,
//     showMultipleVinListModal,
//     searchError,
//     searchMessage,
//     showLoginPrompt,

//     // Actions
//     handleVinChange,
//     handleAddVin,
//     handleRemoveVin,
//     handleSearch,
//     handleSearchMultipleVins,
//     handlePurchase,
//     handleAddToCart,
//     handleNewSearch,
//     toggleMultipleVinModal,
//     setShowMultipleVinModal,
//     setShowMultipleVinListModal,
//     handleMultipleVinUploadComplete,
//     setShowLoginPrompt,
//   }
// }




"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setVinNumber,
  addIndividualVin,
  removeIndividualVin,
  setIsSearching,
  setValidationError,
  setSearchError,
  setSearchMessage,
  setSearchResults,
  setSelectedVehicle,
  setShowPurchaseModal,
  clearVins,
} from "../redux/slices/vinSlice"
import { validateVin } from "../services/validationService"
import type { VehicleDetails, ApiResponse } from "../types"
import type { RootState } from "../../../core/store"
import { searchVin, searchMultipleVins, searchUploadedVins } from "../services/vinApiService"
import { useAuth } from "../../../modules/auth/hooks/useAuth"

export const useVinSearch = () => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useAuth()
  const {
    vinNumber,
    individualVins,
    multipleVins,
    isSearching,
    validationError,
    searchResults,
    selectedVehicle,
    showPurchaseModal,
    searchError,
    searchMessage,
  } = useSelector((state: RootState) => state.vin)

  const [showMultipleVinModal, setShowMultipleVinModal] = useState(false)
  const [showMultipleVinListModal, setShowMultipleVinListModal] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  // Handle VIN input change
  const handleVinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setVinNumber(e.target.value.toUpperCase()))
    },
    [dispatch],
  )

  // Add VIN to individual VINs list
  const handleAddVin = useCallback(() => {
    const { isValid, errorMessage } = validateVin(vinNumber)

    if (isValid) {
      // Check if the VIN already exists in the list
      if (individualVins.includes(vinNumber.trim())) {
        dispatch(setValidationError(`VIN ${vinNumber} is already in the list.`))
        return
      }
      dispatch(addIndividualVin())
    } else if (errorMessage) {
      dispatch(setValidationError(errorMessage))
    }
  }, [dispatch, vinNumber, individualVins])

  // Remove VIN from individual VINs list
  const handleRemoveVin = useCallback(
    (index: number) => {
      dispatch(removeIndividualVin(index))
    },
    [dispatch],
  )

  // Toggle multiple VIN modal
  const toggleMultipleVinModal = useCallback(() => {
    setShowMultipleVinModal((prev) => !prev)
  }, [])

  // Handle search for VINs
  const handleSearch = useCallback(async () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }

    // Validate main VIN if it's not empty and there are no individual VINs
    if (vinNumber && individualVins.length === 0) {
      const { isValid, errorMessage } = validateVin(vinNumber)

      if (!isValid) {
        dispatch(setValidationError(errorMessage))
        return
      }
    }

    // Collect all VINs to search
    const vinsToSearch = [...individualVins]
    if (vinNumber) {
      vinsToSearch.push(vinNumber)
    }

    if (vinsToSearch.length === 0) {
      dispatch(setValidationError("Please enter at least one VIN to search."))
      return
    }

    // Check for duplicate VINs
    const uniqueVins = [...new Set(vinsToSearch)]
    if (uniqueVins.length < vinsToSearch.length) {
      dispatch(setValidationError("Duplicate VINs detected. Please ensure all VINs are unique."))
      return
    }

    try {
      dispatch(setIsSearching(true))
      dispatch(setSearchError(null))
      dispatch(setSearchMessage(null))

      let response: ApiResponse

      if (vinsToSearch.length === 1) {
        response = await searchVin(vinsToSearch[0])
      } else {
        response = await searchMultipleVins(vinsToSearch)
      }

      if (response.success) {
        if (Array.isArray(response.data)) {
          dispatch(setSearchResults(response.data))
          dispatch(setSearchMessage(`Processing ${response.data.length} VINs`))
        } else if (response.data) {
          dispatch(setSearchResults([response.data]))
          dispatch(setSearchMessage(`Processing VIN: ${response.data.vin}`))
        }
      } else {
        dispatch(setSearchError(response.error || "Error processing VINs"))
      }

      // Clear input fields after successful search
      dispatch(setVinNumber(""))
    } catch (error) {
      dispatch(setSearchError(error instanceof Error ? error.message : "An error occurred during processing."))
    } finally {
      dispatch(setIsSearching(false))
    }
  }, [dispatch, vinNumber, individualVins, isLoggedIn])

  // Handle search for multiple VINs from the list modal
  const handleSearchMultipleVins = useCallback(async () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }

    setShowMultipleVinListModal(false)

    if (multipleVins.length === 0) {
      dispatch(setValidationError("No VINs available to process."))
      return
    }

    // Check for duplicate VINs
    const uniqueVins = [...new Set(multipleVins)]
    if (uniqueVins.length < multipleVins.length) {
      dispatch(setValidationError("Duplicate VINs detected in the uploaded file. Please ensure all VINs are unique."))
      return
    }

    dispatch(setIsSearching(true))
    dispatch(setSearchError(null))
    dispatch(setSearchMessage(null))

    try {
      const response = await searchUploadedVins(multipleVins)

      if (response.success && Array.isArray(response.data)) {
        dispatch(setSearchResults(response.data))
        dispatch(setSearchMessage(`Processing ${response.data.length} VINs`))
      } else {
        dispatch(setSearchError(response.error || "Error processing VINs"))
      }
    } catch (error) {
      dispatch(setSearchError(error instanceof Error ? error.message : "An error occurred during processing."))
    } finally {
      dispatch(setIsSearching(false))
    }
  }, [dispatch, multipleVins, isLoggedIn])

  // Handle purchase action
  const handlePurchase = useCallback(
    (vehicle: VehicleDetails | null) => {
      dispatch(setSelectedVehicle(vehicle))
      dispatch(setShowPurchaseModal(true))
    },
    [dispatch],
  )

  // Handle add to cart action
  const handleAddToCart = useCallback(() => {
    // Here you would typically add the item to a cart
    // For now, we'll just close the modal
    dispatch(setShowPurchaseModal(false))
    alert("Item added to cart! The full report will be available for download after purchase.")
  }, [dispatch])

  // Handle new search action
  const handleNewSearch = useCallback(() => {
    dispatch(clearVins())
    dispatch(setSearchMessage(null))
  }, [dispatch])

  // Handle multiple VIN upload complete
  const handleMultipleVinUploadComplete = useCallback(() => {
    setShowMultipleVinModal(false)
    setShowMultipleVinListModal(true)
  }, [])

  return {
    // State
    vinNumber,
    individualVins,
    multipleVins,
    isSearching,
    validationError,
    searchResults,
    selectedVehicle,
    showPurchaseModal,
    showMultipleVinModal,
    showMultipleVinListModal,
    searchError,
    searchMessage,
    showLoginPrompt,

    // Actions
    handleVinChange,
    handleAddVin,
    handleRemoveVin,
    handleSearch,
    handleSearchMultipleVins,
    handlePurchase,
    handleAddToCart,
    handleNewSearch,
    toggleMultipleVinModal,
    setShowMultipleVinModal,
    setShowMultipleVinListModal,
    handleMultipleVinUploadComplete,
    setShowLoginPrompt,
  }
}
