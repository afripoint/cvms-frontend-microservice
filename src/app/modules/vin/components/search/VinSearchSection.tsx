// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { useAuth } from "../../../auth/hooks/useAuth"
// import type { VinSearchSectionProps } from "../../types"
// import { checkDuplicateVins } from "../../utils/vinValidation"

// const VinSearchSection: React.FC<VinSearchSectionProps> = ({
//   vinNumber,
//   individualVins,
//   validationError,
//   isSearching,
//   handleVinChange,
//   handleAddVin,
//   handleRemoveVin,
//   handleSearch,
//   toggleMultipleVin,
// }) => {
//   const { isLoggedIn } = useAuth()
//   const navigate = useNavigate()
//   const [showLoginPrompt, setShowLoginPrompt] = useState(false)
//   const [duplicateError, setDuplicateError] = useState<string | null>(null)
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false)

//   // Modified function to check for duplicates before adding a VIN
//   const handleAddVinWithValidation = () => {
//     // Check if the VIN being added already exists in the list
//     if (individualVins.includes(vinNumber.trim())) {
//       setDuplicateError(`Duplicate VIN: ${vinNumber}. Please enter a unique VIN.`)
//       return
//     }

//     // Check if adding this VIN would create duplicates
//     const allVins = [...individualVins, vinNumber.trim()]
//     const validation = checkDuplicateVins(allVins)

//     if (!validation.isValid) {
//       setDuplicateError(validation.error || "Duplicate VIN detected.")
//       return
//     }

//     setDuplicateError(null)
//     handleAddVin()
//   }

//   // Modified search function with confirmation modal
//   const handleSearchClick = () => {
//     // Clear previous errors
//     setDuplicateError(null)
  
//     // If not logged in, show login prompt
//     if (!isLoggedIn) {
//       setShowLoginPrompt(true)
//       return
//     }
  
//     // Check for duplicates
//     const allVins = vinNumber.trim() ? [...individualVins, vinNumber.trim()] : [...individualVins]
//     const validation = checkDuplicateVins(allVins)
    
//     if (!validation.isValid) {
//       setDuplicateError(validation.error || "Duplicate VIN detected.")
//       return
//     }
  
//     // Show confirmation modal instead of proceeding directly
//     setShowConfirmationModal(true)
//   }

//   // Function to handle confirmation and proceed with search
//   const handleConfirmSearch = () => {
//     setShowConfirmationModal(false)
//     handleSearch()
//   }

//   // Navigate to login page
//   const navigateToLogin = () => {
//     navigate("/login")
//   }

//   const MAX_INDIVIDUAL_VINS = 4 // Max 4 additional VINs (plus the main input = 5 total)

//   // Helper function to format VINs for display in the confirmation modal
//   const getVinsForDisplay = () => {
//     const vinsToDisplay = [...individualVins]
//     if (vinNumber.trim()) {
//       vinsToDisplay.push(vinNumber.trim())
//     }
//     return vinsToDisplay
//   }

//   return (
//     <div className="bg-green-600 flex-grow py-12 md:py-20 lg:py-40 px-4 sm:px-6 lg:px-8 relative">
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: "url('/images/herosection.svg')",
//         }}
//       ></div>
//       <div className="relative z-10 max-w-4xl mx-auto">
//         <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-2">VIN SEARCH</h1>
//         <p className="text-white text-sm sm:text-base text-center mb-4 sm:mb-8">
//           Enter one or multiple VINs to verify the customs duty status of your vehicles
//         </p>

//         {/* Login prompt overlay */}
//         {showLoginPrompt && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg p-4 sm:p-8 max-w-md w-full shadow-xl">
//               <div className="flex flex-col items-center">
//                 <svg className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-500 mb-3 sm:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Login Required</h3>
//                 <p className="text-gray-600 text-center text-sm sm:text-base mb-4 sm:mb-6">
//                   You need to be logged in to search for VIN numbers. Please login or create an account to continue.
//                 </p>
//                 <div className="flex gap-3 sm:gap-4">
//                   <button
//                     onClick={() => setShowLoginPrompt(false)}
//                     className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md text-sm sm:text-base text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={navigateToLogin}
//                     className="px-3 py-2 sm:px-4 sm:py-2 bg-green-500 text-sm sm:text-base text-white rounded-md hover:bg-green-600"
//                   >
//                     Login
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Confirmation Modal */}
//         {showConfirmationModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full shadow-xl">
//               <div className="flex flex-col">
//                 <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">Confirm Search</h3>
//                 <p className="text-gray-700 text-sm sm:text-base mb-4">
//                   {getVinsForDisplay().length > 1 
//                     ? `Proceed with search for these VINs?` 
//                     : `Proceed with search for this VIN?`}
//                 </p>
                
//                 {/* Display the VINs */}
//                 <div className="bg-gray-50 p-3 rounded-md mb-4 max-h-40 overflow-y-auto">
//                   {getVinsForDisplay().map((vin, index) => (
//                     <div key={index} className="font-mono text-sm sm:text-base text-gray-800 mb-1">
//                       {vin}
//                     </div>
//                   ))}
//                 </div>
                
//                 <div className="flex justify-end gap-3 sm:gap-4">
//                   <button
//                     onClick={() => setShowConfirmationModal(false)}
//                     className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md text-sm sm:text-base text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleConfirmSearch}
//                     className="px-3 py-2 sm:px-4 sm:py-2 bg-green-500 text-sm sm:text-base text-white rounded-md hover:bg-green-600"
//                   >
//                     Proceed
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Mobile view - ONLY changes the layout for mobile */}
//         <div className="sm:hidden">
//           <div className="mb-3">
//             <input
//               type="text"
//               value={vinNumber}
//               onChange={(e) => {
//                 handleVinChange(e)
//                 setDuplicateError(null) // Clear duplicate error when input changes
//               }}
//               placeholder="Enter VIN (Chassis Number)"
//               className={`w-full px-3 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border ${
//                 validationError || duplicateError ? "border-red-400" : "border-white border-opacity-30"
//               } focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50`}
//               maxLength={17}
//             />

//             {validationError && <p className="mt-1 text-red-200 text-xs">{validationError}</p>}
//             {duplicateError && <p className="mt-1 text-red-200 text-xs">{duplicateError}</p>}
//           </div>

//           {/* Display additional VIN input fields first on mobile */}
//           {individualVins.length > 0 && (
//             <div className="mb-3">
//               {individualVins.map((vin, index) => (
//                 <div key={index} className="flex items-center gap-2 mb-2">
//                   <div className="flex-grow">
//                     <input
//                       type="text"
//                       value={vin}
//                       readOnly
//                       className="w-full px-3 py-2 rounded-md bg-white bg-opacity-20 text-white border border-white border-opacity-30"
//                     />
//                   </div>
//                   <button
//                     onClick={() => {
//                       handleRemoveVin(index)
//                       setDuplicateError(null) // Clear duplicate error when a VIN is removed
//                     }}
//                     disabled={isSearching}
//                     className="bg-red-500 text-white p-1.5 rounded-md hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
//                     title="Remove VIN"
//                   >
//                     <svg
//                       className="w-3 h-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Action buttons placed below on mobile */}
//           <div className="flex gap-2">
//             {individualVins.length < MAX_INDIVIDUAL_VINS && (
//               <button
//                 onClick={handleAddVinWithValidation}
//                 disabled={!vinNumber.trim() || isSearching}
//                 className="bg-white text-green-600 px-3 py-2 rounded-md font-bold hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                 title="Add another VIN"
//               >
//                 +
//               </button>
//             )}

//             <button
//               onClick={handleSearchClick}
//               disabled={isSearching || (!vinNumber.trim() && individualVins.length === 0) || !!duplicateError}
//               className="flex-grow bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSearching ? (
//                 <>
//                   <svg
//                     className="animate-spin w-4 h-4 mr-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   <span className="text-sm">SEARCHING...</span>
//                 </>
//               ) : (
//                 <>
//                   <svg
//                     className="w-4 h-4 mr-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                   <span className="text-sm">SEARCH</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Tablet and Desktop view - Keep exactly as was */}
//         <div className="hidden sm:block">
//           {/* Main VIN input field */}
//           <div className="flex flex-row items-center gap-4 mb-4 max-w-2xl mx-auto">
//             <div className="flex-grow">
//               <input
//                 type="text"
//                 value={vinNumber}
//                 onChange={(e) => {
//                   handleVinChange(e)
//                   setDuplicateError(null) // Clear duplicate error when input changes
//                 }}
//                 placeholder="Enter VIN (Chassis Number)"
//                 className={`w-full px-4 py-3 rounded-md bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border ${
//                   validationError || duplicateError ? "border-red-400" : "border-white border-opacity-30"
//                 } focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50`}
//                 maxLength={17}
//               />

//               {validationError && <p className="mt-1 text-red-200 text-sm">{validationError}</p>}
//               {duplicateError && <p className="mt-1 text-red-200 text-sm">{duplicateError}</p>}
//             </div>

//             {/* Add "+" button */}
//             {individualVins.length < MAX_INDIVIDUAL_VINS && (
//               <button
//                 onClick={handleAddVinWithValidation}
//                 disabled={!vinNumber.trim() || isSearching}
//                 className="bg-white text-green-600 px-3 py-3 rounded-md font-bold hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                 title="Add another VIN"
//               >
//                 +
//               </button>
//             )}

//             <button
//               onClick={handleSearchClick}
//               disabled={isSearching || (!vinNumber.trim() && individualVins.length === 0) || !!duplicateError}
//               className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSearching ? (
//                 <>
//                   <svg
//                     className="animate-spin w-5 h-5 mr-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   SEARCHING...
//                 </>
//               ) : (
//                 <>
//                   <svg
//                     className="w-5 h-5 mr-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                   SEARCH
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Display additional VIN input fields for tablet and desktop with reduced width */}
//         <div className="hidden sm:block">
//           {individualVins.length > 0 && (
//             <div className="md:mr-24 lg:mr-40 mb-4 max-w-xl mx-auto">
//               {individualVins.map((vin, index) => (
//                 <div key={index} className="flex items-center gap-2 mb-2">
//                   <div className="flex-grow">
//                     <input
//                       type="text"
//                       value={vin}
//                       readOnly
//                       className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white border border-white border-opacity-30"
//                     />
//                   </div>
//                   <button
//                     onClick={() => {
//                       handleRemoveVin(index)
//                       setDuplicateError(null) // Clear duplicate error when a VIN is removed
//                     }}
//                     disabled={isSearching}
//                     className="bg-red-500 text-white p-2 rounded-md hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
//                     title="Remove VIN"
//                   >
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Indicator for when limit is reached */}
//         {individualVins.length === MAX_INDIVIDUAL_VINS && (
//           <div className="text-white text-center text-xs sm:text-sm mb-4 italic">
//             Maximum of 5 VINs reached. For more, use the option below.
//           </div>
//         )}

//         <div className="flex justify-center mt-4">
//           <button
//             onClick={toggleMultipleVin}
//             disabled={isSearching}
//             className="bg-green-600 hover:bg-green-500 text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             For multiple VINs (more than 5), Click here
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default VinSearchSection




"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../auth/hooks/useAuth"
import type { VinSearchSectionProps } from "../../types"
import { checkDuplicateVins } from "../../utils/vinValidation"

const VinSearchSection: React.FC<VinSearchSectionProps> = ({
  vinNumber,
  individualVins,
  validationError,
  isSearching,
  handleVinChange,
  handleAddVin,
  handleRemoveVin,
  handleSearch,
  toggleMultipleVin,
}) => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [duplicateError, setDuplicateError] = useState<string | null>(null)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  // Modified function to check for duplicates before adding a VIN
  const handleAddVinWithValidation = () => {
    // Check if the VIN being added already exists in the list
    if (individualVins.includes(vinNumber.trim())) {
      setDuplicateError(`Duplicate VIN: ${vinNumber}. Please enter a unique VIN.`)
      return
    }

    // Check if adding this VIN would create duplicates
    const allVins = [...individualVins, vinNumber.trim()]
    const validation = checkDuplicateVins(allVins)

    if (!validation.isValid) {
      setDuplicateError(validation.error || "Duplicate VIN detected.")
      return
    }

    setDuplicateError(null)
    handleAddVin()
  }

  // Modified search function with confirmation modal
  const handleSearchClick = () => {
    // Clear previous errors
    setDuplicateError(null)

    // If not logged in, show login prompt
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }

    // Check for duplicates
    const allVins = vinNumber.trim() ? [...individualVins, vinNumber.trim()] : [...individualVins]
    const validation = checkDuplicateVins(allVins)

    if (!validation.isValid) {
      setDuplicateError(validation.error || "Duplicate VIN detected.")
      return
    }

    // Show confirmation modal instead of proceeding directly
    setShowConfirmationModal(true)
  }

  // Function to handle confirmation and proceed with search
  const handleConfirmSearch = () => {
    setShowConfirmationModal(false)
    handleSearch()
  }

  // Navigate to login page
  const navigateToLogin = () => {
    navigate("/login")
  }

  const MAX_INDIVIDUAL_VINS = 4 // Max 4 additional VINs (plus the main input = 5 total)

  // Helper function to format VINs for display in the confirmation modal
  const getVinsForDisplay = () => {
    const vinsToDisplay = [...individualVins]
    if (vinNumber.trim()) {
      vinsToDisplay.push(vinNumber.trim())
    }
    return vinsToDisplay
  }

  return (
    <div className="bg-green-600 flex-grow py-12 md:py-20 lg:py-40 px-4 sm:px-6 lg:px-8 relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/herosection.svg')",
        }}
      ></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-2">VIN SEARCH</h1>
        <p className="text-white text-sm sm:text-base text-center mb-4 sm:mb-8">
          Enter one or multiple VINs to verify the customs duty status of your vehicles
        </p>

        {/* Login prompt overlay */}
        {showLoginPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 sm:p-8 max-w-md w-full shadow-xl">
              <div className="flex flex-col items-center">
                <svg
                  className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-500 mb-3 sm:mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Login Required</h3>
                <p className="text-gray-600 text-center text-sm sm:text-base mb-4 sm:mb-6">
                  You need to be logged in to search for VIN numbers. Please login or create an account to continue.
                </p>
                <div className="flex gap-3 sm:gap-4">
                  <button
                    onClick={() => setShowLoginPrompt(false)}
                    className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md text-sm sm:text-base text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={navigateToLogin}
                    className="px-3 py-2 sm:px-4 sm:py-2 bg-green-500 text-sm sm:text-base text-white rounded-md hover:bg-green-600"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full shadow-xl">
              <div className="flex flex-col">
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">Confirm Processing</h3>
                <p className="text-gray-700 text-sm sm:text-base mb-4">
                  {getVinsForDisplay().length > 1
                    ? `Proceed with processing these VINs?`
                    : `Proceed with processing this VIN?`}
                </p>

                {/* Display the VINs */}
                <div className="bg-gray-50 p-3 rounded-md mb-4 max-h-40 overflow-y-auto">
                  {getVinsForDisplay().map((vin, index) => (
                    <div key={index} className="font-mono text-sm sm:text-base text-gray-800 mb-1">
                      {vin}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3 sm:gap-4">
                  <button
                    onClick={() => setShowConfirmationModal(false)}
                    className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md text-sm sm:text-base text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmSearch}
                    className="px-3 py-2 sm:px-4 sm:py-2 bg-green-500 text-sm sm:text-base text-white rounded-md hover:bg-green-600"
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile view - ONLY changes the layout for mobile */}
        <div className="sm:hidden">
          <div className="mb-3">
            <input
              type="text"
              value={vinNumber}
              onChange={(e) => {
                handleVinChange(e)
                setDuplicateError(null) // Clear duplicate error when input changes
              }}
              placeholder="Enter VIN (Chassis Number)"
              className={`w-full px-3 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border ${
                validationError || duplicateError ? "border-red-400" : "border-white border-opacity-30"
              } focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50`}
              maxLength={17}
            />

            {validationError && <p className="mt-1 text-red-200 text-xs">{validationError}</p>}
            {duplicateError && <p className="mt-1 text-red-200 text-xs">{duplicateError}</p>}
          </div>

          {/* Display additional VIN input fields first on mobile */}
          {individualVins.length > 0 && (
            <div className="mb-3">
              {individualVins.map((vin, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={vin}
                      readOnly
                      className="w-full px-3 py-2 rounded-md bg-white bg-opacity-20 text-white border border-white border-opacity-30"
                    />
                  </div>
                  <button
                    onClick={() => {
                      handleRemoveVin(index)
                      setDuplicateError(null) // Clear duplicate error when a VIN is removed
                    }}
                    disabled={isSearching}
                    className="bg-red-500 text-white p-1.5 rounded-md hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Remove VIN"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Action buttons placed below on mobile */}
          <div className="flex gap-2">
            {individualVins.length < MAX_INDIVIDUAL_VINS && (
              <button
                onClick={handleAddVinWithValidation}
                disabled={!vinNumber.trim() || isSearching}
                className="bg-white text-green-600 px-3 py-2 rounded-md font-bold hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add another VIN"
              >
                +
              </button>
            )}

            <button
              onClick={handleSearchClick}
              disabled={isSearching || (!vinNumber.trim() && individualVins.length === 0) || !!duplicateError}
              className="flex-grow bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-sm">SEARCHING...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span className="text-sm">SEARCH</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tablet and Desktop view - Keep exactly as was */}
        <div className="hidden sm:block">
          {/* Main VIN input field */}
          <div className="flex flex-row items-center gap-4 mb-4 max-w-2xl mx-auto">
            <div className="flex-grow">
              <input
                type="text"
                value={vinNumber}
                onChange={(e) => {
                  handleVinChange(e)
                  setDuplicateError(null) // Clear duplicate error when input changes
                }}
                placeholder="Enter VIN (Chassis Number)"
                className={`w-full px-4 py-3 rounded-md bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border ${
                  validationError || duplicateError ? "border-red-400" : "border-white border-opacity-30"
                } focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50`}
                maxLength={17}
              />

              {validationError && <p className="mt-1 text-red-200 text-sm">{validationError}</p>}
              {duplicateError && <p className="mt-1 text-red-200 text-sm">{duplicateError}</p>}
            </div>

            {/* Add "+" button */}
            {individualVins.length < MAX_INDIVIDUAL_VINS && (
              <button
                onClick={handleAddVinWithValidation}
                disabled={!vinNumber.trim() || isSearching}
                className="bg-white text-green-600 px-3 py-3 rounded-md font-bold hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add another VIN"
              >
                +
              </button>
            )}

            <button
              onClick={handleSearchClick}
              disabled={isSearching || (!vinNumber.trim() && individualVins.length === 0) || !!duplicateError}
              className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  SEARCHING...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  SEARCH
                </>
              )}
            </button>
          </div>
        </div>

        {/* Display additional VIN input fields for tablet and desktop with reduced width */}
        <div className="hidden sm:block">
          {individualVins.length > 0 && (
            <div className="md:mr-24 lg:mr-40 mb-4 max-w-xl mx-auto">
              {individualVins.map((vin, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={vin}
                      readOnly
                      className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white border border-white border-opacity-30"
                    />
                  </div>
                  <button
                    onClick={() => {
                      handleRemoveVin(index)
                      setDuplicateError(null) // Clear duplicate error when a VIN is removed
                    }}
                    disabled={isSearching}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Remove VIN"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Indicator for when limit is reached */}
        {individualVins.length === MAX_INDIVIDUAL_VINS && (
          <div className="text-white text-center text-xs sm:text-sm mb-4 italic">
            Maximum of 5 VINs reached. For more, use the option below.
          </div>
        )}

        <div className="flex justify-center mt-4">
          <button
            onClick={toggleMultipleVin}
            disabled={isSearching}
            className="bg-green-600 hover:bg-green-500 text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            For multiple VINs (more than 5), Click here
          </button>
        </div>
      </div>
    </div>
  )
}

export default VinSearchSection
