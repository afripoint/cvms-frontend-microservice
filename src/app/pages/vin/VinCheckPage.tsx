// "use client"

// import type React from "react"
// import { useSelector, useDispatch } from "react-redux"
// import {
//   MultipleVinListModal,
//   MultipleVinModal,
//   ProcessSteps,
//   PurchaseModal,
//   setShowPurchaseModal,
//   useVinSearch,
//   VinSearchResults,
//   VinSearchSection,
// } from "../../modules/vin"
// import type { RootState } from "../../core/store"
// import { MainLayout } from "../../modules/landing/components/layout"
// import ErrorMessage from "../../modules/vin/components/ui/ErrorMessage"
// import { useNavigate } from "react-router-dom"

// const VinSearchPage: React.FC = () => {
//   const {
//     vinNumber,
//     individualVins,
//     validationError,
//     isSearching,
//     searchResults,
//     searchError,
//     searchMessage,
//     showPurchaseModal,
//     selectedVehicle,
//     showMultipleVinModal,
//     showMultipleVinListModal,
//     showLoginPrompt,
//     handleVinChange,
//     handleAddVin,
//     handleRemoveVin,
//     handleSearch,
//     handlePurchase,
//     handleAddToCart,
//     handleNewSearch,
//     toggleMultipleVinModal,
//     setShowMultipleVinModal,
//     setShowMultipleVinListModal,
//     setShowLoginPrompt,
//     handleMultipleVinUploadComplete,
//     handleSearchMultipleVins,
//   } = useVinSearch()

//   const multipleVins = useSelector((state: RootState) => state.vin.multipleVins)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   // Navigate to login page
//   const navigateToLogin = () => {
//     navigate("/login")
//   }

//   return (
//     <MainLayout>
//       {/* Error Message - Display at the top */}
//       {searchError && <ErrorMessage message={searchError} onRetry={handleSearch} />}

//       {/* Search Section - Only show if no results or error */}
//       {!searchResults && !searchError && (
//         <>
//           <VinSearchSection
//             vinNumber={vinNumber}
//             individualVins={individualVins}
//             validationError={validationError}
//             isSearching={isSearching}
//             handleVinChange={handleVinChange}
//             handleAddVin={handleAddVin}
//             handleRemoveVin={handleRemoveVin}
//             handleSearch={handleSearch}
//             toggleMultipleVin={toggleMultipleVinModal}
//           />
//           <ProcessSteps />
//         </>
//       )}

//       {/* Search Message */}
//       {searchMessage && !searchError && !searchResults && (
//         <div className="w-full bg-gray-800 py-8 px-4 text-center text-white">
//           <h2 className="text-xl font-medium">{searchMessage}</h2>
//         </div>
//       )}

//       {/* Search Results */}
//       {searchResults && searchResults.length > 0 && (
//         <VinSearchResults searchResults={searchResults} onPurchase={handlePurchase} onNewSearch={handleNewSearch} />
//       )}

//       {/* Login prompt overlay */}
//       {showLoginPrompt && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
//             <div className="flex flex-col items-center">
//               <svg className="h-12 w-12 text-yellow-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <h3 className="text-xl font-medium text-gray-900 mb-2">Login Required</h3>
//               <p className="text-gray-600 text-center mb-6">
//                 You need to be logged in to search for VIN numbers. Please login or create an account to continue.
//               </p>
//               <div className="flex gap-4">
//                 <button
//                   onClick={() => setShowLoginPrompt(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={navigateToLogin}
//                   className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                 >
//                   Login
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modals */}
//       <MultipleVinModal
//         isOpen={showMultipleVinModal}
//         onClose={() => setShowMultipleVinModal(false)}
//         onUploadComplete={handleMultipleVinUploadComplete}
//       />

//       <MultipleVinListModal
//         isOpen={showMultipleVinListModal}
//         vins={multipleVins}
//         onClose={() => setShowMultipleVinListModal(false)}
//         onSearch={handleSearchMultipleVins}
//       />

//       <PurchaseModal
//         isOpen={showPurchaseModal}
//         vehicle={selectedVehicle}
//         onClose={() => dispatch(setShowPurchaseModal(false))}
//         onAddToCart={handleAddToCart}
//       />
//     </MainLayout>
//   )
// }

// export default VinSearchPage





"use client"

import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  MultipleVinListModal,
  MultipleVinModal,
  ProcessSteps,
  PurchaseModal,
  setShowPurchaseModal,
  useVinSearch,
  VinSearchResults,
  VinSearchSection,
} from "../../modules/vin"
import type { RootState } from "../../core/store"
import { MainLayout } from "../../modules/landing/components/layout"
import ErrorMessage from "../../modules/vin/components/ui/ErrorMessage"
import { useNavigate } from "react-router-dom"

const VinSearchPage: React.FC = () => {
  const {
    vinNumber,
    individualVins,
    validationError,
    isSearching,
    searchResults,
    searchError,
    searchMessage,
    showPurchaseModal,
    selectedVehicle,
    showMultipleVinModal,
    showMultipleVinListModal,
    showLoginPrompt,
    handleVinChange,
    handleAddVin,
    handleRemoveVin,
    handleSearch,
    handlePurchase,
    handleAddToCart,
    handleNewSearch,
    toggleMultipleVinModal,
    setShowMultipleVinModal,
    setShowMultipleVinListModal,
    setShowLoginPrompt,
    handleMultipleVinUploadComplete,
    handleSearchMultipleVins,
  } = useVinSearch()

  const multipleVins = useSelector((state: RootState) => state.vin.multipleVins)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Navigate to login page
  const navigateToLogin = () => {
    navigate("/login")
  }

  return (
    <MainLayout>
      {/* Error Message - Display at the top */}
      {searchError && <ErrorMessage message={searchError} onRetry={handleSearch} />}

      {/* Search Section - Only show if no results or error */}
      {!searchResults && !searchError && (
        <>
          <VinSearchSection
            vinNumber={vinNumber}
            individualVins={individualVins}
            validationError={validationError}
            isSearching={isSearching}
            handleVinChange={handleVinChange}
            handleAddVin={handleAddVin}
            handleRemoveVin={handleRemoveVin}
            handleSearch={handleSearch}
            toggleMultipleVin={toggleMultipleVinModal}
          />
          <ProcessSteps />
        </>
      )}

      {/* Search Message */}
      {searchMessage && !searchError && !searchResults && (
        <div className="w-full bg-gray-800 py-8 px-4 text-center text-white">
          <h2 className="text-xl font-medium">{searchMessage}</h2>
        </div>
      )}

      {/* Search Results */}
      {searchResults && searchResults.length > 0 && (
        <VinSearchResults searchResults={searchResults} onPurchase={handlePurchase} onNewSearch={handleNewSearch} />
      )}

      {/* Login prompt overlay */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
            <div className="flex flex-col items-center">
              <svg className="h-12 w-12 text-yellow-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Login Required</h3>
              <p className="text-gray-600 text-center mb-6">
                You need to be logged in to search for VIN numbers. Please login or create an account to continue.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={navigateToLogin}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <MultipleVinModal
        isOpen={showMultipleVinModal}
        onClose={() => setShowMultipleVinModal(false)}
        onUploadComplete={handleMultipleVinUploadComplete}
      />

      <MultipleVinListModal
        isOpen={showMultipleVinListModal}
        vins={multipleVins}
        onClose={() => setShowMultipleVinListModal(false)}
        onSearch={handleSearchMultipleVins}
      />

      <PurchaseModal
        isOpen={showPurchaseModal}
        vehicle={selectedVehicle}
        onClose={() => dispatch(setShowPurchaseModal(false))}
        onAddToCart={handleAddToCart}
      />
    </MainLayout>
  )
}

export default VinSearchPage
