// "use client"

// import type React from "react"

// import { useState } from "react"
// import { FiX } from "react-icons/fi"

// interface CreateTeamModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onSubmit: (teamData: { name: string; email: string }) => void
// }

// const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ isOpen, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       await onSubmit(formData)
//       onClose()
//     } catch (error) {
//       console.error("Error creating team:", error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg w-full max-w-md p-4 sm:p-6 relative overflow-y-auto max-h-[90vh]">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700"
//           aria-label="Close modal"
//         >
//           <FiX size={24} />
//         </button>

//         <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 pr-8">Create New Team</h2>

//         <form onSubmit={handleSubmit}>
//           <div className="space-y-3 sm:space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Team Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-md bg-[#F5F7FA]"
//                 required
//               />
//             </div>
//           </div>

//           <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
//             <button
//               type="button"
//               onClick={onClose}
//               className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 order-2 sm:order-1"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="w-full sm:w-auto px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 transition order-1 sm:order-2 flex items-center justify-center"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Creating..." : "Create Team"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default CreateTeamModal
