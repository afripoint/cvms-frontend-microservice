// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { useAuth } from "../../../auth/hooks/useAuth"
// import { generateSampleExcelFile, processExcelFile } from "../../services/excelService"
// import { setIsProcessingFile, setMultipleVins } from "../../redux/slices/vinSlice"
// import type { MultipleVinModalProps } from "../../types"
// import { checkDuplicateVins } from "../../utils/vinValidation"

// const MultipleVinModal: React.FC<MultipleVinModalProps> = ({ isOpen, onClose, onUploadComplete }) => {
//   const dispatch = useDispatch()
//   const { isLoggedIn } = useAuth()
//   const navigate = useNavigate()
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [isDragging, setIsDragging] = useState(false)
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [showLoginPrompt, setShowLoginPrompt] = useState(false)
//   const [duplicateError, setDuplicateError] = useState<string | null>(null)

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
//       setSelectedFile(file)
//       setDuplicateError(null) // Clear any previous error when a new file is selected
//     } else {
//       alert("Please upload a valid Excel file (.xlsx)")
//     }
//   }

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//     setIsDragging(true)
//   }

//   const handleDragLeave = () => {
//     setIsDragging(false)
//   }

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//     setIsDragging(false)

//     const file = e.dataTransfer.files?.[0]
//     if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
//       setSelectedFile(file)
//       setDuplicateError(null) // Clear any previous error when a new file is selected
//     } else {
//       alert("Please upload a valid Excel file (.xlsx)")
//     }
//   }

//   const downloadSampleFile = () => {
//     const sampleFile = generateSampleExcelFile()
//     const blob = new Blob([sampleFile], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
//     const url = URL.createObjectURL(blob)

//     const link = document.createElement("a")
//     link.href = url
//     link.download = "Customs_Duty1 (2).xlsx"
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   const navigateToLogin = () => {
//     navigate("/login")
//   }

//   // Update the handleSubmit function to use the actual Excel processing
//   const handleSubmit = async () => {
//     if (selectedFile) {
//       // Check if user is logged in
//       if (!isLoggedIn) {
//         setShowLoginPrompt(true)
//         return
//       }

//       // Proceed with upload if user is logged in
//       try {
//         setIsProcessing(true)
//         dispatch(setIsProcessingFile(true))

//         // Process the Excel file
//         const vins = await processExcelFile(selectedFile)

//         // Check for duplicate VINs in the Excel file
//         const validation = checkDuplicateVins(vins)

//         if (!validation.isValid) {
//           setDuplicateError(validation.error || "Duplicate VINs found in the file. Please ensure all VINs are unique.")
//           setIsProcessing(false)
//           dispatch(setIsProcessingFile(false))
//           return
//         }

//         // Update Redux state with the extracted VINs
//         dispatch(setMultipleVins(vins))

//         // Call the onUploadComplete callback if provided
//         if (onUploadComplete) {
//           onUploadComplete()
//         } else {
//           // Keep previous behavior if no callback provided
//           onClose()
//         }
//       } catch (error) {
//         console.error("Error processing file:", error)
//         alert("Error processing file. Please check the format and try again.")
//       } finally {
//         setIsProcessing(false)
//         dispatch(setIsProcessingFile(false))
//       }
//     } else {
//       alert("Please select a file first")
//     }
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black mt-12 bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative border border-gray-200 shadow-lg">
//         {/* Close button */}
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         {/* Login prompt overlay */}
//         {showLoginPrompt && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
//             <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
//               <div className="flex flex-col items-center">
//                 <img src="/images/logo.png" alt="" width={50} height={25}/>
//                 <h3 className="text-xl font-medium text-gray-900 mb-2">Login Required</h3>
//                 <p className="text-gray-600 text-center mb-6">
//                 You need to be logged in to search for vehicle details using a VIN.
//                 Please log in or create an account to proceed.
//                 </p>
//                 <div className="flex gap-4">
//                   <button
//                     onClick={() => setShowLoginPrompt(false)}
//                     className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={navigateToLogin}
//                     className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                   >
//                     Login
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="text-center mb-6">
//           <h2 className="text-lg font-bold text-[#01043D] uppercase">UPLOAD EXCEL FILE CONTAINING MULTIPLE VINs</h2>
//         </div>

//         {/* Display duplicate error message */}
//         {duplicateError && (
//           <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <h3 className="text-sm font-medium text-red-800">Error</h3>
//                 <div className="mt-1 text-sm text-red-700">
//                   <p>{duplicateError}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* File upload area */}
//         <div
//           className={`bg-[#FBFFBC] border-2 ${
//             isDragging ? "border-green-500" : selectedFile ? "border-green-600" : "border-[#FBFFBC]"
//           } p-8 mb-4 text-center`}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//         >
//           <div className="flex flex-col items-center">
//             <img src="/icons/upload.svg" alt="" width={70} height={30} />

//             <p className="text-[#555555] mb-4 text-lg">
//               {selectedFile ? "File selected" : "Click to upload excel or drag excel file here"}
//             </p>

//             <div
//               className={`border border-gray-300 rounded-lg w-2/3 flex items-center px-4 py-2 mb-4 ${
//                 selectedFile ? "bg-green-50" : ""
//               }`}
//             >
//               <span
//                 className={`${
//                   selectedFile ? "text-green-700 font-medium" : "text-[#555555]"
//                 } flex-grow text-left pl-2 truncate`}
//               >
//                 {selectedFile ? selectedFile.name : "browse here"}
//               </span>
//               <label className="cursor-pointer">
//                 <input type="file" className="hidden" accept=".xlsx" onChange={handleFileChange} />
//                 <span className="flex items-center justify-center">
//                   <img src="/icons/file.svg" alt="" width={15} height={5} />
//                 </span>
//               </label>
//             </div>

//             {selectedFile && !duplicateError && (
//               <div className="flex items-center text-green-600 mb-4">
//                 <svg
//                   className="w-5 h-5 mr-2"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//                 <span>File ready for upload</span>
//               </div>
//             )}

//             <button onClick={downloadSampleFile} className="text-[#037E1B] hover:text-green-700 font-medium">
//               Download sample excel file
//             </button>
//           </div>
//         </div>

//         {/* Action buttons */}
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//             disabled={isProcessing}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className={`px-4 py-2 ${
//               selectedFile && !duplicateError ? "bg-[#037E1B]" : "bg-[#037E1B] bg-opacity-50"
//             } text-white rounded-md hover:bg-green-700 flex items-center`}
//             disabled={isProcessing || !selectedFile || !!duplicateError}
//           >
//             {isProcessing ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Processing...
//               </>
//             ) : (
//               "Upload"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MultipleVinModal





"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../auth/hooks/useAuth"
import { generateSampleExcelFile, processExcelFile } from "../../services/excelService"
import { setIsProcessingFile, setMultipleVins } from "../../redux/slices/vinSlice"
import type { MultipleVinModalProps } from "../../types"
import { checkDuplicateVins } from "../../utils/vinValidation"

const MultipleVinModal: React.FC<MultipleVinModalProps> = ({ isOpen, onClose, onUploadComplete }) => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [duplicateError, setDuplicateError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      setSelectedFile(file)
      setDuplicateError(null) // Clear any previous error when a new file is selected
    } else {
      alert("Please upload a valid Excel file (.xlsx)")
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      setSelectedFile(file)
      setDuplicateError(null) // Clear any previous error when a new file is selected
    } else {
      alert("Please upload a valid Excel file (.xlsx)")
    }
  }

  const downloadSampleFile = () => {
    const sampleFile = generateSampleExcelFile()
    const blob = new Blob([sampleFile], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "Customs_Duty1 (2).xlsx"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const navigateToLogin = () => {
    navigate("/login")
  }

  // Update the handleSubmit function to use the actual Excel processing
  const handleSubmit = async () => {
    if (selectedFile) {
      // Check if user is logged in
      if (!isLoggedIn) {
        setShowLoginPrompt(true)
        return
      }

      // Proceed with upload if user is logged in
      try {
        setIsProcessing(true)
        dispatch(setIsProcessingFile(true))

        // Process the Excel file
        const vins = await processExcelFile(selectedFile)

        // Check for duplicate VINs in the Excel file
        const validation = checkDuplicateVins(vins)

        if (!validation.isValid) {
          setDuplicateError(validation.error || "Duplicate VINs found in the file. Please ensure all VINs are unique.")
          setIsProcessing(false)
          dispatch(setIsProcessingFile(false))
          return
        }

        // Update Redux state with the extracted VINs
        dispatch(setMultipleVins(vins))

        // Call the onUploadComplete callback if provided
        if (onUploadComplete) {
          onUploadComplete()
        } else {
          // Keep previous behavior if no callback provided
          onClose()
        }
      } catch (error) {
        console.error("Error processing file:", error)
        alert("Error processing file. Please check the format and try again.")
      } finally {
        setIsProcessing(false)
        dispatch(setIsProcessingFile(false))
      }
    } else {
      alert("Please select a file first")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black mt-12 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative border border-gray-200 shadow-lg">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
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

        {/* Login prompt overlay */}
        {showLoginPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
              <div className="flex flex-col items-center">
                <img src="/images/logo.png" alt="" width={50} height={25} />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Login Required</h3>
                <p className="text-gray-600 text-center mb-6">
                  You need to be logged in to search for vehicle details using a VIN. Please log in or create an account
                  to proceed.
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

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-[#01043D] uppercase">UPLOAD EXCEL FILE CONTAINING MULTIPLE VINs</h2>
        </div>

        {/* Display duplicate error message */}
        {duplicateError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-1 text-sm text-red-700">
                  <p>{duplicateError}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* File upload area */}
        <div
          className={`bg-[#FBFFBC] border-2 ${
            isDragging ? "border-green-500" : selectedFile ? "border-green-600" : "border-[#FBFFBC]"
          } p-8 mb-4 text-center`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <img src="/icons/upload.svg" alt="" width={70} height={30} />

            <p className="text-[#555555] mb-4 text-lg">
              {selectedFile ? "File selected" : "Click to upload excel or drag excel file here"}
            </p>

            <div
              className={`border border-gray-300 rounded-lg w-2/3 flex items-center px-4 py-2 mb-4 ${
                selectedFile ? "bg-green-50" : ""
              }`}
            >
              <span
                className={`${
                  selectedFile ? "text-green-700 font-medium" : "text-[#555555]"
                } flex-grow text-left pl-2 truncate`}
              >
                {selectedFile ? selectedFile.name : "browse here"}
              </span>
              <label className="cursor-pointer">
                <input type="file" className="hidden" accept=".xlsx" onChange={handleFileChange} />
                <span className="flex items-center justify-center">
                  <img src="/icons/file.svg" alt="" width={15} height={5} />
                </span>
              </label>
            </div>

            {selectedFile && !duplicateError && (
              <div className="flex items-center text-green-600 mb-4">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>File ready for upload</span>
              </div>
            )}

            <button onClick={downloadSampleFile} className="text-[#037E1B] hover:text-green-700 font-medium">
              Download sample excel file
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 ${
              selectedFile && !duplicateError ? "bg-[#037E1B]" : "bg-[#037E1B] bg-opacity-50"
            } text-white rounded-md hover:bg-green-700 flex items-center`}
            disabled={isProcessing || !selectedFile || !!duplicateError}
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MultipleVinModal
