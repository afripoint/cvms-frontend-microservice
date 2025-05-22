// "use client"

// import type React from "react"
// import { useState } from "react"
// import type { VehicleTeaserResultProps } from "../../types"

// const VehicleTeaserResult: React.FC<VehicleTeaserResultProps> = ({ 
//   vehicle, 
//   onPurchase, 
//   onNewSearch, 
//   totalEntries = 1  // Default to 1 if not provided
// }) => {
//   const [isPurchased, setIsPurchased] = useState(false)

//   const handlePurchase = () => {
//     setIsPurchased(true)
//     onPurchase()
//   }

//   const handleProceedToCart = () => {
//     // Directly navigate to cart without alert
//     // This would typically use a navigation method
//     window.location.href = "/cart"
//   }

//   return (
//     <div className="flex flex-col items-center w-full">
//       {/* Records found banner - responsive padding */}
//       <div className="w-full py-12 md:py-20 lg:py-28 px-4 text-center text-white relative">
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: "url('/images/herosection.svg')" }}
//         ></div>
//         <div className="relative z-10">
//           {/* <h2 className="text-xl md:text-2xl font-medium mb-2">Records found for VIN:</h2> */}
//           <p className="text-2xl md:text-3xl font-bold break-words">{vehicle.vin}</p>
//         </div>
//       </div>

//       {/* Vehicle details card - responsive widths and padding */}
//       <div className="bg-white rounded-lg shadow-lg -mt-10 w-full max-w-3xl mx-auto p-4 md:p-6 z-10 border border-gray-200">
//         {/* Vehicle header with duty status - flex-wrap for mobile */}
//         {/* <div className="p-2 md:p-4 mb-4 md:mb-6 flex flex-wrap md:flex-nowrap justify-between items-center gap-y-4">
//           <div className="w-full md:w-auto">
//             <p className="text-gray-500 text-sm">VEHICLE</p>
//             <h3 className="font-medium text-gray-800 uppercase text-sm md:text-base break-words">
//               {vehicle.manufacturer} {vehicle.model} {vehicle.wmi || "SR5"} {vehicle.year}
//             </h3>
//           </div>
//           <div className="w-1/2 md:w-auto flex flex-col items-start md:items-end">
//             <p className="text-gray-500 text-sm">VIN NUMBER</p>
//             <p className="font-medium text-sm md:text-base break-words">{vehicle.vin}</p>
//           </div>
//           <div className="w-1/2 md:w-auto flex flex-col items-end">
//             <p className="text-gray-500 text-sm">Entry</p>
//             <p className="font-medium text-sm md:text-base">{totalEntries}</p>
//           </div>
//         </div> */}

//         {/* Vehicle details grid - responsive grid with 1 column on mobile, 2 on larger screens */}
//         {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
//           <div className="flex flex-col md:flex-row md:items-center md:space-x-3">
//             <label className="text-green-500 md:w-24 md:text-right md:pr-3 mb-1 md:mb-0">Vin:</label>
//             <input
//               type="text"
//               value={vehicle.vin}
//               readOnly
//               className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm md:text-base"
//             />
//           </div>
//           <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
//             <label className="text-green-500 md:w-24 md:text-right md:pr-2 mb-1 md:mb-0">Country:</label>
//             <input
//               type="text"
//               value={vehicle.country}
//               readOnly
//               className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm md:text-base"
//             />
//           </div>
//           <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
//             <label className="text-green-500 md:w-24 md:text-right md:pr-2 mb-1 md:mb-0">Manufacturer:</label>
//             <input
//               type="text"
//               value={vehicle.manufacturer}
//               readOnly
//               className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm md:text-base"
//             />
//           </div>
//           <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
//             <label className="text-green-500 md:w-24 md:text-right md:pr-2 mb-1 md:mb-0">Model:</label>
//             <input
//               type="text"
//               value={vehicle.model}
//               readOnly
//               className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm md:text-base"
//             />
//           </div>
//           <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
//             <label className="text-green-500 md:w-24 md:text-right md:pr-2 mb-1 md:mb-0">Class:</label>
//             <input
//               type="text"
//               value={vehicle.class}
//               readOnly
//               className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm md:text-base"
//             />
//           </div>
//           <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
//             <label className="text-green-500 md:w-24 md:text-right md:pr-2 mb-1 md:mb-0">Region:</label>
//             <input
//               type="text"
//               value={vehicle.region}
//               readOnly
//               className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm md:text-base"
//             />
//           </div>
//           <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
//             <label className="text-green-500 md:w-24 md:text-right md:pr-2 mb-1 md:mb-0">Wmi:</label>
//             <input
//               type="text"
//               value={vehicle.wmi}
//               readOnly
//               className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm md:text-base"
//             />
//           </div>
//           <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
//             <label className="text-green-500 md:w-24 md:text-right md:pr-2 mb-1 md:mb-0">Vds:</label>
//             <input
//               type="text"
//               value={vehicle.vds}
//               readOnly
//               className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm md:text-base"
//             />
//           </div>

//           <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
//             <label className="text-green-500 md:w-24 md:text-right md:pr-2 mb-1 md:mb-0">Vis:</label>
//             <input
//               type="text"
//               value={vehicle.vis}
//               readOnly
//               className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm md:text-base"
//             />
//           </div>

//           <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
//             <label className="text-green-500 md:w-24 md:text-right md:pr-2 mb-1 md:mb-0">Year:</label>
//             <input
//               type="text"
//               value={vehicle.year}
//               readOnly
//               className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm md:text-base"
//             />
//           </div>
//         </div> */}

//         {/* Action buttons - stack on mobile */}
//         <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
//           {isPurchased ? (
//             <>
//               <button
//                 onClick={onNewSearch}
//                 className="px-4 py-2 md:px-6 md:py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm md:text-base"
//               >
//                 Continue Shopping
//               </button>
//               <button
//                 onClick={handleProceedToCart}
//                 className="px-4 py-2 md:px-6 md:py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md font-medium text-sm md:text-base"
//               >
//                 Proceed to Cart
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={handlePurchase}
//               className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 md:py-3 px-4 md:px-6 rounded-md font-medium flex items-center justify-center transition-colors text-sm md:text-base"
//             >
//               Add to Cart
//               <svg
//                 className="w-4 h-4 md:w-5 md:h-5 ml-2"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Full report section - responsive padding and spacing */}
//       <div className="w-full max-w-4xl mx-auto mt-10 md:mt-8 mb-4 px-4">
//         <h3 className="text-base md:text-lg font-bold text-[#000000] text-center uppercase mb-4 md:mb-6">Full Report Will Include:</h3>
//         <div className="flex justify-center">
//           <div className="flex flex-col sm:flex-row justify-between border-b-[#0b0b0b] border-b-2 items-center w-full max-w-md px-2">
//             <span className="text-[#000000] text-sm md:text-base mb-2 sm:mb-0">CUSTOMS DUTY PAYMENT</span>
//             <div className="mb-2 sm:mb-0">
//               <div className="w-5 h-5 border-2 border-green-500 flex items-center justify-center">
//                 <svg 
//                   xmlns="http://www.w3.org/2000/svg" 
//                   className="h-4 w-4 text-green-500"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path 
//                     strokeLinecap="round" 
//                     strokeLinejoin="round" 
//                     strokeWidth={2} 
//                     d="M5 13l4 4L19 7" 
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         {!isPurchased && (
//           <div className="flex justify-center mt-8 mb-6">
//             <button 
//               onClick={onNewSearch} 
//               className="text-green-600 hover:text-green-500 font-medium flex items-center text-sm md:text-base"
//             >
//               <svg
//                 className="w-4 h-4 md:w-5 md:h-5 mr-2"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//               </svg>
//               Search Another Vehicle
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default VehicleTeaserResult