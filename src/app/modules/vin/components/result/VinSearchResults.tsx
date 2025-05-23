// import type React from "react"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import type { VinSearchResultsProps } from "../../types"
// import type { VehicleDetails } from "../../types"
// import { addToCart, CartItem } from "../../../cart/redux/slices/cartSlice"

// const VinSearchResults: React.FC<VinSearchResultsProps> = ({ searchResults, onNewSearch }) => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   // Convert vehicle to cart item
//   const vehicleToCartItem = (vehicle: VehicleDetails): CartItem => {
//     return {
//       id: vehicle.vin,
//       name: `${vehicle.year} ${vehicle.manufacturer} ${vehicle.model}`,
//       quantity: 1,
//       price: 7500, // Standard price for CVMS report
//       type: "CVMS Standard Report",
//     }
//   }

//   // Handle purchasing all vehicles
//   const handlePurchaseAll = () => {
//     // If there's only one result, just add that one to cart
//     if (searchResults.length === 1) {
//       dispatch(addToCart(vehicleToCartItem(searchResults[0])))
//     } else {
//       // Add all vehicles to cart
//       searchResults.forEach((vehicle) => {
//         dispatch(addToCart(vehicleToCartItem(vehicle)))
//       })
//     }

//     // Navigate to cart page
//     navigate("/cart")
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto my-4 md:my-8 p-3 md:p-6">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6">
//         <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Search Results</h2>
//         <span className="text-gray-500 text-sm md:text-base">{searchResults.length} {searchResults.length === 1 ? 'vehicle' : 'vehicles'} found</span>
//       </div>

//       <div className="space-y-3 md:space-y-4">
//         {searchResults.map((vehicle) => (
//           <div key={vehicle.vin} className="border rounded-lg p-3 md:p-4 hover:bg-gray-50 transition">
//             <div className="flex flex-col items-center text-center">
//               <h3 className="text-base lg:text-lg font-bold text-gray-700">
//                 {vehicle.year} {vehicle.manufacturer} {vehicle.model}
//               </h3>
//               <p className="text-md lg:text-base font-bold text-[#000] break-words">VIN: {vehicle.vin}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Action buttons - responsive layout */}
//       <div className="mt-4 md:mt-6 flex flex-col sm:flex-row justify-center gap-3 md:gap-4">

//         <button 
//           onClick={onNewSearch} 
//           className="px-4 py-2 md:px-6 md:py-3 border border-gray-300 rounded-md text-green-600 hover:text-green-500 hover:bg-gray-50 font-medium flex items-center justify-center text-sm md:text-base"
//         >
//           <svg
//             className="w-4 h-4 md:w-5 md:h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           Start a New Search
//         </button>
        
//         {/* <button
//           onClick={handlePurchaseAll}
//           className="px-4 py-2 md:px-6 md:py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md font-medium flex items-center justify-center text-sm md:text-base"
//         >
//           <svg
//             className="w-4 h-4 md:w-5 md:h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//             />
//           </svg>
//           {searchResults.length === 1 ? 'Add to Cart' : 'Add All to Cart'}
//         </button> */}

//         {/* <button 
//           onClick={onNewSearch} 
//           className="px-4 py-2 md:px-6 md:py-3 border border-gray-300 rounded-md text-green-600 hover:text-green-500 hover:bg-gray-50 font-medium flex items-center justify-center text-sm md:text-base"
//         >
//           <svg
//             className="w-4 h-4 md:w-5 md:h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           Start a New Search
//         </button> */}

//         <button
//           onClick={handlePurchaseAll}
//           className="px-4 py-2 md:px-6 md:py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md font-medium flex items-center justify-center text-sm md:text-base"
//         >
//           <svg
//             className="w-4 h-4 md:w-5 md:h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//             />
//           </svg>
//           {searchResults.length === 1 ? 'Add to Cart' : 'Add All to Cart'}
//         </button> 
//       </div>
//     </div>
//   )
// }

// export default VinSearchResults




"use client"

import type React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { VinSearchResultsProps } from "../../types"
import type { VehicleDetails } from "../../types"
import { addToCart, type CartItem } from "../../../cart/redux/slices/cartSlice"

const VinSearchResults: React.FC<VinSearchResultsProps> = ({ searchResults, onNewSearch }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Convert vehicle to cart item
  const vehicleToCartItem = (vehicle: VehicleDetails): CartItem => {
    return {
      id: vehicle.vin,
      name: `VIN: ${vehicle.vin}`,
      quantity: 1,
      price: 7500, // Standard price for CVMS report
      type: "CVMS Standard Report",
    }
  }

  // Handle purchasing all vehicles
  const handlePurchaseAll = () => {
    // If there's only one result, just add that one to cart
    if (searchResults.length === 1) {
      dispatch(addToCart(vehicleToCartItem(searchResults[0])))
    } else {
      // Add all vehicles to cart
      searchResults.forEach((vehicle) => {
        dispatch(addToCart(vehicleToCartItem(vehicle)))
      })
    }

    // Navigate to cart page
    navigate("/cart")
  }

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto my-4 md:my-8 p-3 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">VINs Ready for Processing</h2>
        <span className="text-gray-500 text-sm md:text-base">
          {searchResults.length} {searchResults.length === 1 ? "VIN" : "VINs"} found
        </span>
      </div>

      <div className="space-y-3 md:space-y-4">
        {searchResults.map((vehicle) => (
          <div key={vehicle.vin} className="border rounded-lg p-3 md:p-4 hover:bg-gray-50 transition">
            <div className="flex flex-col items-center text-center">
              <p className="text-md lg:text-base font-bold text-[#000] break-words">VIN: {vehicle.vin}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons - responsive layout */}
      <div className="mt-4 md:mt-6 flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
        <button
          onClick={onNewSearch}
          className="px-4 py-2 md:px-6 md:py-3 border border-gray-300 rounded-md text-green-600 hover:text-green-500 hover:bg-gray-50 font-medium flex items-center justify-center text-sm md:text-base"
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
          className="px-4 py-2 md:px-6 md:py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md font-medium flex items-center justify-center text-sm md:text-base"
        >
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
          {searchResults.length === 1 ? "Add to Cart" : "Add All to Cart"}
        </button>
      </div>
    </div>
  )
}

export default VinSearchResults
