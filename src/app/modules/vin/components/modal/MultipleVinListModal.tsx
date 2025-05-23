// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useDispatch } from "react-redux"
// import { setSelectedVehicle, setShowPurchaseModal } from "../../redux/slices/vinSlice"
// import type { MultipleVinListModalProps, VehicleDetails } from "../../types"

// const MultipleVinListModal: React.FC<MultipleVinListModalProps> = ({ isOpen, vins, onClose, onSearch }) => {
//   const dispatch = useDispatch()
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false)

//   if (!isOpen) return null

//   // @ts-ignore
//   const _handleSelectVin = (vin: string) => {
//     const vehicle: VehicleDetails = {
//       id: vin,
//       vin: vin,
//       manufacturer: "",
//       model: "",
//       year: "",
//       vis: "",
//       vreg: "",
//       class: "",
//       brand: "",
//       engine_type: "",
//       country: "",
//       region: "",
//       wmi: "",
//       vds: ""
//     }

//     dispatch(setSelectedVehicle(vehicle))
//     dispatch(setShowPurchaseModal(true))
//   }

//   const handleSearchClick = () => {
//     setShowConfirmationModal(true)
//   }

//   const handleConfirmSearch = () => {
//     setShowConfirmationModal(false)
//     onSearch()
//   }

//   return (
//     <>
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center mt-20 mb-6 justify-center z-20">
//         <div className="bg-[#F2F2F7] rounded-lg w-full max-w-xl max-h-[80vh] flex flex-col relative border border-gray-200 shadow-lg">
//           {/* Close button */}
//           <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>

//           {/* Header */}
//           <div className="text-center p-6 pb-0">
//             <h2 className="text-lg font-bold text-[#01043D] uppercase">EXTRACTED VINs FROM EXCEL</h2>
//             <p className="text-gray-600 mt-2">{vins.length} VINs found in your file</p>
//           </div>

//           {/* VIN List - Scrollable Container */}
//           <div className="flex-grow overflow-auto p-6 pt-4">
//             {vins.length > 0 ? (
//               <div className="space-y-2">
//                 {vins.map((vin, index) => (
//                   <div 
//                     key={index} 
//                     className="border rounded-lg p-3 hover:bg-gray-50 flex justify-between items-center"
//                   >
//                     <span className="font-medium">{vin}</span>
//                     <div className="flex space-x-2">
//                       {/* Optional purchase button - currently commented out */}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center text-gray-500 py-8">
//                 No VINs found in the uploaded file. Please ensure your Excel file has a column named "VIN".
//               </div>
//             )}
//           </div>

//           {/* Action buttons */}
//           <div className="p-6 pt-0 flex justify-between gap-4">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSearchClick}
//               className="px-4 py-2 bg-[#037E1B] text-white rounded-md hover:bg-green-700 flex items-center"
//               disabled={vins.length === 0}
//             >
//               <svg
//                 className="w-5 h-5 mr-2"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//               Search All VINs
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirmationModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full shadow-xl">
//             <div className="flex flex-col">
//               <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">Confirm Search</h3>
//               <p className="text-gray-700 text-sm sm:text-base mb-4">
//                 {vins.length > 1 
//                   ? `Proceed with search for these VINs?` 
//                   : `Proceed with search for this VIN?`}
//               </p>
              
//               {/* Display the VINs */}
//               <div className="bg-gray-50 p-3 rounded-md mb-4 max-h-40 overflow-y-auto">
//                 {vins.map((vin, index) => (
//                   <div key={index} className="font-mono text-sm sm:text-base text-gray-800 mb-1">
//                     {vin}
//                   </div>
//                 ))}
//               </div>
              
//               <div className="flex justify-end gap-3 sm:gap-4">
//                 <button
//                   onClick={() => setShowConfirmationModal(false)}
//                   className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md text-sm sm:text-base text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleConfirmSearch}
//                   className="px-3 py-2 sm:px-4 sm:py-2 bg-green-500 text-sm sm:text-base text-white rounded-md hover:bg-green-600"
//                 >
//                   Proceed
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default MultipleVinListModal






"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setSelectedVehicle, setShowPurchaseModal } from "../../redux/slices/vinSlice"
import type { MultipleVinListModalProps, VehicleDetails } from "../../types"

const MultipleVinListModal: React.FC<MultipleVinListModalProps> = ({ isOpen, vins, onClose, onSearch }) => {
  const dispatch = useDispatch()
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  if (!isOpen) return null

  // @ts-ignore
  const _handleSelectVin = (vin: string) => {
    const vehicle: VehicleDetails = {
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

    dispatch(setSelectedVehicle(vehicle))
    dispatch(setShowPurchaseModal(true))
  }

  const handleSearchClick = () => {
    setShowConfirmationModal(true)
  }

  const handleConfirmSearch = () => {
    setShowConfirmationModal(false)
    onSearch()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center mt-20 mb-6 justify-center z-20">
        <div className="bg-[#F2F2F7] rounded-lg w-full max-w-xl max-h-[80vh] flex flex-col relative border border-gray-200 shadow-lg">
          {/* Close button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="text-center p-6 pb-0">
            <h2 className="text-lg font-bold text-[#01043D] uppercase">EXTRACTED VINs FROM EXCEL</h2>
            <p className="text-gray-600 mt-2">{vins.length} VINs found in your file</p>
          </div>

          {/* VIN List - Scrollable Container */}
          <div className="flex-grow overflow-auto p-6 pt-4">
            {vins.length > 0 ? (
              <div className="space-y-2">
                {vins.map((vin, index) => (
                  <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 flex justify-between items-center">
                    <span className="font-medium">{vin}</span>
                    <div className="flex space-x-2">{/* Optional purchase button - currently commented out */}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No VINs found in the uploaded file. Please ensure your Excel file has a column named "VIN".
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="p-6 pt-0 flex justify-between gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSearchClick}
              className="px-4 py-2 bg-[#037E1B] text-white rounded-md hover:bg-green-700 flex items-center"
              disabled={vins.length === 0}
            >
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
              Search All VINs
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full shadow-xl">
            <div className="flex flex-col">
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">Confirm Search</h3>
              <p className="text-gray-700 text-sm sm:text-base mb-4">
                {vins.length > 1 ? `Proceed with search for these VINs?` : `Proceed with search for this VIN?`}
              </p>

              {/* Display the VINs */}
              <div className="bg-gray-50 p-3 rounded-md mb-4 max-h-40 overflow-y-auto">
                {vins.map((vin, index) => (
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
    </>
  )
}

export default MultipleVinListModal
