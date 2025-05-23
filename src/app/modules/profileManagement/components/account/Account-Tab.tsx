


// "use client"

// import React from "react"
// import { useState, useEffect } from "react"
// import { useSelector, useDispatch } from "react-redux"
// import { updateUserData } from "../../redux/actions"
// import { selectUserData, selectIsBusinessAccount } from "../../redux/selectors"
// import { toast } from "react-toastify"
// import { FiMail, FiMapPin, FiEdit, FiSave } from "react-icons/fi"
// import ProfileImageUpload from "../file-management.tsx/file-upload"
// import type { AccountType } from "../../types"
// import CACUpload from "../file-management.tsx/Cac-Upload"
// import type { AppDispatch, RootState } from "../../../../core/store"
// import { fetchUserProfile, updateUserProfile } from "../../../auth/redux/slices/authSlice"
// import Authorization from "../file-management.tsx/Authorization-Upload"
// import Status from "../file-management.tsx/Status-Upload"

// const AccountTab = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const userData = useSelector(selectUserData)
//   const isBusinessAccount = useSelector(selectIsBusinessAccount)

//   // File states
//   const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
//   const [cacFile, setCacFile] = useState<File | null>(null)
//   const [authorizationFile, setAuthorizationFile] = useState<File | null>(null)
//   const [statusFile, setStatusFile] = useState<File | null>(null)

//   // Submission states
//   const [cacSubmitted, setCacSubmitted] = useState(false)
//   const [authorizationSubmitted, setAuthorizationSubmitted] = useState(false)
//   const [statusSubmitted, setStatusSubmitted] = useState(false)
//   const [profileImageSubmitted, setProfileImageSubmitted] = useState(false)

//   // Get user data from auth state
//   const authUser = useSelector((state: RootState) => state.auth.user)
//   const isLoading = useSelector((state: RootState) => state.auth.isLoading)

//   // Local state for form values with fallbacks
//   const [formValues, setFormValues] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     additionalPhone: "",
//     address: "",
//     accountType: "Individual User" as AccountType,
//   })

//   // Determine account type based on user role
//   const determineAccountType = (role?: string): AccountType => {
//     if (!role) return "Individual User"

//     if (role?.toLowerCase().includes("company")) {
//       return "Company"
//     } else if (role?.toLowerCase().includes("agent")) {
//       return "Agent"
//     } else {
//       return "Individual User"
//     }
//   }

//   // Update the useEffect to handle potential undefined values
//   useEffect(() => {
//     if (authUser) {
//       const accountType = determineAccountType(authUser?.role)

//       // Update the Redux state with user data, with null checks
//       dispatch(
//         updateUserData({
//           firstName: authUser?.first_name || "",
//           lastName: authUser?.last_name || "",
//           email: authUser?.email || "",
//           phone: authUser?.phone_number || "",
//           accountType: accountType,
//           address: authUser?.address || "",
//         }),
//       )

//       // Update local state with null checks
//       setFormValues({
//         firstName: authUser?.first_name || "",
//         lastName: authUser?.last_name || "",
//         email: authUser?.email || "",
//         phone: authUser?.phone_number || "",
//         additionalPhone: authUser?.additional_phone || "",
//         address: authUser?.address || "",
//         accountType: accountType,
//       })
//     }
//   }, [authUser, dispatch])

//   // Sync with Redux state when userData changes
//   useEffect(() => {
//     setFormValues((prev) => ({
//       ...prev,
//       firstName: userData.firstName || prev.firstName,
//       lastName: userData.lastName || prev.lastName,
//       email: userData.email || prev.email,
//       phone: userData.phone || prev.phone,
//       address: userData.address || prev.address,
//       accountType: userData.accountType || prev.accountType,
//     }))
//   }, [userData])

//   // Determine which upload sections to show
//   const shouldShowCacUpload = isBusinessAccount || formValues.accountType === "Company"
//   const shouldShowAuthorizationUpload = isBusinessAccount || formValues.accountType === "Company"
//   const shouldShowStatusUpload = isBusinessAccount || formValues.accountType === "Company"

//   const [isEditing, setIsEditing] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     try {
//       const formData = new FormData()

//       // Add all the form values
//       formData.append("first_name", formValues.firstName)
//       formData.append("last_name", formValues.lastName)
//       formData.append("phone_number", formValues.phone)
//       formData.append("address", formValues.address)

//       if (formValues.additionalPhone) {
//         formData.append("secondary_phone_number", formValues.additionalPhone)
//       }

//       // Add files if they exist - make sure files are actually selected
//       if (profileImageFile) {
//         formData.append("profile_image", profileImageFile)
//         console.log("Appending profile image:", profileImageFile.name, "Size:", profileImageFile.size)
//       }
//       if (cacFile) {
//         formData.append("cac_certificate", cacFile)
//         console.log("Appending CAC file:", cacFile.name, "Size:", cacFile.size)
//       }
//       if (authorizationFile) {
//         formData.append("authorization_letter", authorizationFile)
//         console.log("Appending authorization file:", authorizationFile.name, "Size:", authorizationFile.size)
//       }
//       if (statusFile) {
//         formData.append("status_report", statusFile)
//         console.log("Appending status file:", statusFile.name, "Size:", statusFile.size)
//       }

//       // Log FormData contents (for debugging)
//       console.log("FormData entries:")
//       for (const [key, value] of formData.entries()) {
//         if (value instanceof File) {
//           console.log(key, "File:", value.name, "Size:", value.size, "Type:", value.type)
//         } else {
//           console.log(key, value)
//         }
//       }

//       // Dispatch the profile update
//       const result = await dispatch(updateUserProfile(formData)).unwrap()
//       console.log("Update result:", result)

//       // Set submission states to true after successful upload
//       if (profileImageFile) setProfileImageSubmitted(true)
//       if (cacFile) setCacSubmitted(true)
//       if (authorizationFile) setAuthorizationSubmitted(true)
//       if (statusFile) setStatusSubmitted(true)

//       // Refresh user data after successful update
//       await dispatch(fetchUserProfile())

//       setIsEditing(false)
//       toast.success("Profile updated successfully!")
//     } catch (error) {
//       console.error("Update error:", error)
//       toast.error("Failed to update profile. Please try again later.")
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormValues((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleAdditionalPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValues((prev) => ({ ...prev, additionalPhone: e.target.value }))
//   }

//   const handleAccountTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value as AccountType
//     setFormValues((prev) => ({ ...prev, accountType: value }))
//   }

//   const toggleEdit = () => {
//     setIsEditing(!isEditing)
//   }

//   // Manually refresh user data
//   const handleRefreshData = () => {
//     dispatch(fetchUserProfile())
//       .then(() => {
//         // Reset file states on refresh
//         setProfileImageFile(null)
//         setCacFile(null)
//         setAuthorizationFile(null)
//         setStatusFile(null)
//         setProfileImageSubmitted(false)
//         setCacSubmitted(false)
//         setAuthorizationSubmitted(false)
//         setStatusSubmitted(false)

//         toast.success("Profile data refreshed")
//       })
//       .catch(() => {
//         toast.error("Failed to refresh profile data")
//       })
//   }

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//       </div>
//     )
//   }

//   const validateFileSize = (file: File): boolean => {
//     const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
//     return file.size <= maxSizeInBytes
//   }

//   const formatFileSize = (bytes: number): string => {
//     if (bytes === 0) return "0 Bytes"
//     const k = 1024
//     const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
//     const i = Math.floor(Math.log(bytes) / Math.log(k))
//     return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
//   }

//   // File upload handlers that properly set the file state
//   const handleProfileImageUpload = (file: File) => {
//     if (validateFileSize(file)) {
//       setProfileImageFile(file)
//       console.log("Profile image file set:", file.name, file.size)
//       toast.success(`Profile image selected (${formatFileSize(file.size)})`)
//     } else {
//       toast.error("Profile image exceeds 5MB size limit. Please select a smaller file.")
//     }
//   }

//   const handleCacUpload = (file: File) => {
//     if (validateFileSize(file)) {
//       setCacFile(file)
//       console.log("CAC file set:", file.name, file.size)
//       toast.success(`CAC document selected (${formatFileSize(file.size)})`)
//     } else {
//       toast.error("CAC document exceeds 5MB size limit. Please select a smaller file.")
//     }
//   }

//   const handleAuthorizationUpload = (file: File) => {
//     if (validateFileSize(file)) {
//       setAuthorizationFile(file)
//       console.log("Authorization file set:", file.name, file.size)
//       toast.success(`Authorization letter selected (${formatFileSize(file.size)})`)
//     } else {
//       toast.error("Authorization letter exceeds 5MB size limit. Please select a smaller file.")
//     }
//   }

//   const handleStatusUpload = (file: File) => {
//     if (validateFileSize(file)) {
//       setStatusFile(file)
//       console.log("Status file set:", file.name, file.size)
//       toast.success(`Status certificate selected (${formatFileSize(file.size)})`)
//     } else {
//       toast.error("Status certificate exceeds 5MB size limit. Please select a smaller file.")
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <ProfileImageUpload
//         onUpload={handleProfileImageUpload}
//         isSubmitted={profileImageSubmitted}
//       />

//       <div className="mx-auto w-full max-w-[450px] border-t-2 border-gray-200 pt-8 mt-6"></div>

//       <div className="w-full max-w-md mx-auto px-4 sm:px-0 space-y-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-semibold text-gray-800">Account Information</h2>
//           <button type="button" onClick={handleRefreshData} className="text-sm text-green-600 hover:text-green-700">
//             Refresh Data
//           </button>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Account Type (Demo Selector)</label>
//           <select
//             onChange={handleAccountTypeChange}
//             value={formValues.accountType}
//             disabled={!isEditing}
//             className={`w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA] ${!isEditing ? "cursor-not-allowed opacity-75" : ""}`}
//           >
//             <option value="Individual User">Individual User</option>
//             <option value="Agent">Agent</option>
//             <option value="Company">Company</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <img src="/icons/users.svg" alt="" />
//             </div>
//             <input
//               type="text"
//               name="accountType"
//               value={formValues.accountType}
//               className="pl-10 w-full py-2 px-4 bg-[#F5F7FA] border border-gray-300 rounded-md cursor-not-allowed opacity-75"
//               readOnly
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Primary Phone Number</label>
//           <div className="flex">
//             <div className="w-1/4 sm:w-1/5">
//               <div className="flex items-center border border-gray-300 rounded-l-md px-2 sm:px-3 py-2">
//                 <span className="text-green-500">
//                   <img src="/icons/flag.svg" alt="" />
//                 </span>
//                 <span className="ml-1 text-gray-600 text-sm sm:text-base">+234</span>
//               </div>
//             </div>
//             <div className="relative w-3/4 sm:w-4/5">
//               <input
//                 type="text"
//                 name="phone"
//                 value={formValues.phone}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className={`w-full py-2 px-4 border border-gray-300 rounded-r-md bg-[#F5F7FA] ${!isEditing ? "cursor-not-allowed opacity-75" : ""}`}
//               />
//             </div>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Additional Phone Number (Optional)</label>
//           <div className="flex">
//             <div className="w-1/4 sm:w-1/5">
//               <div className="flex items-center border border-gray-300 rounded-l-md px-2 sm:px-3 py-2">
//                 <span className="text-green-500">
//                   <img src="/icons/flag.svg" alt="" />
//                 </span>
//                 <span className="ml-1 text-gray-600 text-sm sm:text-base">+234</span>
//               </div>
//             </div>
//             <div className="relative w-3/4 sm:w-4/5">
//               <input
//                 type="text"
//                 name="additionalPhone"
//                 value={formValues.additionalPhone}
//                 onChange={handleAdditionalPhoneChange}
//                 disabled={!isEditing}
//                 placeholder="Enter additional phone number"
//                 className={`w-full py-2 px-4 border border-gray-300 rounded-r-md bg-[#F5F7FA] ${!isEditing ? "cursor-not-allowed opacity-75" : ""}`}
//               />
//             </div>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiMail className="text-gray-400" />
//             </div>
//             <input
//               type="email"
//               name="email"
//               value={formValues.email}
//               className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA] cursor-not-allowed opacity-75"
//               readOnly
//             />
//           </div>
//           <p className="text-xs text-gray-500 mt-1 ml-2">Email address cannot be changed</p>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiMapPin className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               name="address"
//               value={formValues.address}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className={`pl-10 w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA] ${!isEditing ? "cursor-not-allowed opacity-75" : ""}`}
//             />
//           </div>
//         </div>

//         {shouldShowAuthorizationUpload && (
//           <div>
//             <h3 className="text-md font-medium text-gray-700 mb-2">Letter of Authorization</h3>
//             <p className="text-sm text-gray-500 mb-3">
//               Upload a letter of authorization signed by your company's secretary or director.
//             </p>
//             <Authorization
//               onUpload={handleAuthorizationUpload}
//               isSubmitted={authorizationSubmitted}
//             />
//           </div>
//         )}

//         {shouldShowStatusUpload && (
//           <div>
//             <h3 className="text-md font-medium text-gray-700 mb-2">Status Report Certificate</h3>
//             <p className="text-sm text-gray-500 mb-3">Upload a recent company status certificate.</p>
//             <Status
//               onUpload={handleStatusUpload}
//               isSubmitted={statusSubmitted}
//             />
//           </div>
//         )}

//         {shouldShowCacUpload && (
//           <div>
//             <h3 className="text-md font-medium text-gray-700 mb-2">Corporate Affairs Commission (CAC) Document</h3>
//             <p className="text-sm text-gray-500 mb-3">Upload your company's CAC registration document.</p>
//             <CACUpload
//               onUpload={handleCacUpload}
//               isSubmitted={cacSubmitted}
//             />
//           </div>
//         )}

//         {/* Debug Section - Remove in production */}
//         <div className="bg-gray-100 p-4 rounded-md text-xs">
//           <h4 className="font-bold mb-2">Debug Info:</h4>
//           <p>Profile Image: {profileImageFile ? `${profileImageFile.name} (${formatFileSize(profileImageFile.size)})` : 'None'}</p>
//           <p>CAC File: {cacFile ? `${cacFile.name} (${formatFileSize(cacFile.size)})` : 'None'}</p>
//           <p>Authorization File: {authorizationFile ? `${authorizationFile.name} (${formatFileSize(authorizationFile.size)})` : 'None'}</p>
//           <p>Status File: {statusFile ? `${statusFile.name} (${formatFileSize(statusFile.size)})` : 'None'}</p>
//         </div>

//         <div className="pt-4 space-y-3">
//           <button
//             type="button"
//             onClick={toggleEdit}
//             className={`w-full py-3 flex items-center justify-center ${isEditing ? "bg-gray-500 hover:bg-gray-600" : "bg-green-500 hover:bg-green-600"} text-white rounded-md transition`}
//           >
//             {isEditing ? (
//               <>
//                 <FiEdit className="mr-2" /> Cancel Edit
//               </>
//             ) : (
//               <>
//                 <FiEdit className="mr-2" /> Edit Profile
//               </>
//             )}
//           </button>
          
//           {isEditing && (
//             <button
//               type="submit"
//               className="w-full py-3 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-md transition"
//             >
//               <FiSave className="mr-2" /> Save Changes
//             </button>
//           )}
//         </div>
//       </div>
//     </form>
//   )
// }

// export default AccountTab



// Enhanced Account-Tab.tsx with file compression and better error handling

"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateUserData } from "../../redux/actions"
import { selectUserData, selectIsBusinessAccount } from "../../redux/selectors"
import { toast } from "react-toastify"
import { FiMail, FiMapPin, FiEdit, FiSave } from "react-icons/fi"
import ProfileImageUpload from "../file-management.tsx/file-upload"
import CACUpload from "../file-management.tsx/Cac-Upload"
import type { AppDispatch, RootState } from "../../../../core/store"
import { fetchUserProfile, updateUserProfile } from "../../../auth/redux/slices/authSlice"
import Authorization from "../file-management.tsx/Authorization-Upload"
import Status from "../file-management.tsx/Status-Upload"
import { AccountType } from "../../types"

// File compression utility
const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      const newWidth = img.width * ratio;
      const newHeight = img.height * ratio;
      
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const compressedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        } else {
          resolve(file); // Fallback to original file
        }
      }, file.type, quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Separate upload function for individual files
const uploadFileIndividually = async (
  dispatch: AppDispatch,
  fieldName: string,
  file: File,
  compress: boolean = false
): Promise<boolean> => {
  try {
    const formData = new FormData();
    
    let fileToUpload = file;
    if (compress && file.type.startsWith('image/')) {
      fileToUpload = await compressImage(file, 800, 0.7);
      console.log(`Compressed ${file.name} from ${file.size} to ${fileToUpload.size} bytes`);
    }
    
    formData.append(fieldName, fileToUpload);
    
    const result = await dispatch(updateUserProfile(formData)).unwrap();
    console.log(`Upload result for ${fieldName}:`, result);
    return true;
  } catch (error) {
    console.error(`Upload error for ${fieldName}:`, error);
    throw error;
  }
};

const AccountTab = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userData = useSelector(selectUserData)
  const isBusinessAccount = useSelector(selectIsBusinessAccount)

  // File states
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [cacFile, setCacFile] = useState<File | null>(null)
  const [authorizationFile, setAuthorizationFile] = useState<File | null>(null)
  const [statusFile, setStatusFile] = useState<File | null>(null)

  // Submission states
  const [cacSubmitted, setCacSubmitted] = useState(false)
  const [authorizationSubmitted, setAuthorizationSubmitted] = useState(false)
  const [statusSubmitted, setStatusSubmitted] = useState(false)
  const [profileImageSubmitted, setProfileImageSubmitted] = useState(false)

  // Upload progress states
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({})
  const [isUploading, setIsUploading] = useState(false)

  // Get user data from auth state
  const authUser = useSelector((state: RootState) => state.auth.user)
  const isLoading = useSelector((state: RootState) => state.auth.isLoading)

  // Local state for form values with fallbacks
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    additionalPhone: "",
    address: "",
    accountType: "Individual User" as AccountType,
  })

  // Determine account type based on user role
  const determineAccountType = (role?: string): AccountType => {
    if (!role) return "Individual User"

    if (role?.toLowerCase().includes("company")) {
      return "Company"
    } else if (role?.toLowerCase().includes("agent")) {
      return "Agent"
    } else {
      return "Individual User"
    }
  }

  // Update the useEffect to handle potential undefined values
  useEffect(() => {
    if (authUser) {
      const accountType = determineAccountType(authUser?.role)

      // Update the Redux state with user data, with null checks
      dispatch(
        updateUserData({
          firstName: authUser?.first_name || "",
          lastName: authUser?.last_name || "",
          email: authUser?.email || "",
          phone: authUser?.phone_number || "",
          accountType: accountType,
          address: authUser?.address || "",
        }),
      )

      // Update local state with null checks
      setFormValues({
        firstName: authUser?.first_name || "",
        lastName: authUser?.last_name || "",
        email: authUser?.email || "",
        phone: authUser?.phone_number || "",
        additionalPhone: authUser?.additional_phone || "",
        address: authUser?.address || "",
        accountType: accountType,
      })
    }
  }, [authUser, dispatch])

  // Sync with Redux state when userData changes
  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      firstName: userData.firstName || prev.firstName,
      lastName: userData.lastName || prev.lastName,
      email: userData.email || prev.email,
      phone: userData.phone || prev.phone,
      address: userData.address || prev.address,
      accountType: userData.accountType || prev.accountType,
    }))
  }, [userData])

  // Determine which upload sections to show
  const shouldShowCacUpload = isBusinessAccount || formValues.accountType === "Company"
  const shouldShowAuthorizationUpload = isBusinessAccount || formValues.accountType === "Company"
  const shouldShowStatusUpload = isBusinessAccount || formValues.accountType === "Company"

  const [isEditing, setIsEditing] = useState(false)

  // Enhanced submit function with better error handling and file size management
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    
    try {
      // First, update basic profile information (no files)
      const profileFormData = new FormData()
      profileFormData.append("first_name", formValues.firstName)
      profileFormData.append("last_name", formValues.lastName)
      profileFormData.append("phone_number", formValues.phone)
      profileFormData.append("address", formValues.address)

      if (formValues.additionalPhone) {
        profileFormData.append("secondary_phone_number", formValues.additionalPhone)
      }

      // Update profile info first
      await dispatch(updateUserProfile(profileFormData)).unwrap()
      console.log("Profile info updated successfully")

      // Upload files individually to avoid 413 error
      const fileUploads = []

      if (profileImageFile) {
        setUploadProgress(prev => ({ ...prev, profile: 0 }))
        fileUploads.push(
          uploadFileIndividually(dispatch, "profile_image", profileImageFile, true)
            .then(() => {
              setProfileImageSubmitted(true)
              setUploadProgress(prev => ({ ...prev, profile: 100 }))
              toast.success("Profile image uploaded successfully!")
            })
        )
      }

      if (cacFile) {
        setUploadProgress(prev => ({ ...prev, cac: 0 }))
        fileUploads.push(
          uploadFileIndividually(dispatch, "cac_certificate", cacFile)
            .then(() => {
              setCacSubmitted(true)
              setUploadProgress(prev => ({ ...prev, cac: 100 }))
              toast.success("CAC document uploaded successfully!")
            })
        )
      }

      if (authorizationFile) {
        setUploadProgress(prev => ({ ...prev, auth: 0 }))
        fileUploads.push(
          uploadFileIndividually(dispatch, "authorization_letter", authorizationFile)
            .then(() => {
              setAuthorizationSubmitted(true)
              setUploadProgress(prev => ({ ...prev, auth: 100 }))
              toast.success("Authorization letter uploaded successfully!")
            })
        )
      }

      if (statusFile) {
        setUploadProgress(prev => ({ ...prev, status: 0 }))
        fileUploads.push(
          uploadFileIndividually(dispatch, "status_report", statusFile)
            .then(() => {
              setStatusSubmitted(true)
              setUploadProgress(prev => ({ ...prev, status: 100 }))
              toast.success("Status certificate uploaded successfully!")
            })
        )
      }

      // Wait for all file uploads to complete
      if (fileUploads.length > 0) {
        await Promise.allSettled(fileUploads)
      }

      // Refresh user data after successful updates
      await dispatch(fetchUserProfile())

      setIsEditing(false)
      toast.success("Profile updated successfully!")

    } catch (error: any) {
      console.error("Update error:", error)
      
      // Handle specific error types
      if (error?.status === 413 || error?.message?.includes('413')) {
        toast.error("Files are too large. Please compress your files and try again.")
      } else if (error?.status === 400) {
        toast.error("Invalid file format or data. Please check your files and try again.")
      } else if (error?.status === 500) {
        toast.error("Server error. Please try again later.")
      } else {
        toast.error("Failed to update profile. Please try again.")
      }
    } finally {
      setIsUploading(false)
      setUploadProgress({})
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleAdditionalPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, additionalPhone: e.target.value }))
  }

  const handleAccountTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as AccountType
    setFormValues((prev) => ({ ...prev, accountType: value }))
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  // Manually refresh user data
  const handleRefreshData = () => {
    dispatch(fetchUserProfile())
      .then(() => {
        // Reset file states on refresh
        setProfileImageFile(null)
        setCacFile(null)
        setAuthorizationFile(null)
        setStatusFile(null)
        setProfileImageSubmitted(false)
        setCacSubmitted(false)
        setAuthorizationSubmitted(false)
        setStatusSubmitted(false)

        toast.success("Profile data refreshed")
      })
      .catch(() => {
        toast.error("Failed to refresh profile data")
      })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  const validateFileSize = (file: File): boolean => {
    const maxSizeInBytes = 2 * 1024 * 1024 // Reduced to 2MB
    return file.size <= maxSizeInBytes
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Enhanced file upload handlers with better validation
  const handleProfileImageUpload = async (file: File) => {
    if (!validateFileSize(file)) {
      toast.error("Profile image exceeds 2MB size limit. Please select a smaller file or it will be compressed.")
    }
    
    // Always compress images to ensure they're under size limit
    try {
      const compressedFile = await compressImage(file, 800, 0.7);
      setProfileImageFile(compressedFile)
      console.log("Profile image file set:", compressedFile.name, compressedFile.size)
      toast.success(`Profile image selected (${formatFileSize(compressedFile.size)})`)
    } catch (error) {
      console.error('Error compressing image:', error)
      toast.error("Error processing image. Please try a different file.")
    }
  }

  const handleCacUpload = (file: File) => {
    if (validateFileSize(file)) {
      setCacFile(file)
      console.log("CAC file set:", file.name, file.size)
      toast.success(`CAC document selected (${formatFileSize(file.size)})`)
    } else {
      toast.error("CAC document exceeds 2MB size limit. Please select a smaller file.")
    }
  }

  const handleAuthorizationUpload = (file: File) => {
    if (validateFileSize(file)) {
      setAuthorizationFile(file)
      console.log("Authorization file set:", file.name, file.size)
      toast.success(`Authorization letter selected (${formatFileSize(file.size)})`)
    } else {
      toast.error("Authorization letter exceeds 2MB size limit. Please select a smaller file.")
    }
  }

  const handleStatusUpload = (file: File) => {
    if (validateFileSize(file)) {
      setStatusFile(file)
      console.log("Status file set:", file.name, file.size)
      toast.success(`Status certificate selected (${formatFileSize(file.size)})`)
    } else {
      toast.error("Status certificate exceeds 2MB size limit. Please select a smaller file.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ProfileImageUpload
        onUpload={handleProfileImageUpload}
        isSubmitted={profileImageSubmitted}
      />

      <div className="mx-auto w-full max-w-[450px] border-t-2 border-gray-200 pt-8 mt-6"></div>

      <div className="w-full max-w-md mx-auto px-4 sm:px-0 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Account Information</h2>
          <button type="button" onClick={handleRefreshData} className="text-sm text-green-600 hover:text-green-700">
            Refresh Data
          </button>
        </div>

        {/* Upload Progress Indicator */}
        {isUploading && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h4 className="font-medium text-blue-800 mb-2">Uploading files...</h4>
            {Object.entries(uploadProgress).map(([key, progress]) => (
              <div key={key} className="mb-2">
                <div className="flex justify-between text-sm text-blue-600 mb-1">
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Type (Demo Selector)</label>
          <select
            onChange={handleAccountTypeChange}
            value={formValues.accountType}
            disabled={!isEditing}
            className={`w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA] ${!isEditing ? "cursor-not-allowed opacity-75" : ""}`}
          >
            <option value="Individual User">Individual User</option>
            <option value="Agent">Agent</option>
            <option value="Company">Company</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src="/icons/users.svg" alt="" />
            </div>
            <input
              type="text"
              name="accountType"
              value={formValues.accountType}
              className="pl-10 w-full py-2 px-4 bg-[#F5F7FA] border border-gray-300 rounded-md cursor-not-allowed opacity-75"
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Phone Number</label>
          <div className="flex">
            <div className="w-1/4 sm:w-1/5">
              <div className="flex items-center border border-gray-300 rounded-l-md px-2 sm:px-3 py-2">
                <span className="text-green-500">
                  <img src="/icons/flag.svg" alt="" />
                </span>
                <span className="ml-1 text-gray-600 text-sm sm:text-base">+234</span>
              </div>
            </div>
            <div className="relative w-3/4 sm:w-4/5">
              <input
                type="text"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full py-2 px-4 border border-gray-300 rounded-r-md bg-[#F5F7FA] ${!isEditing ? "cursor-not-allowed opacity-75" : ""}`}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Phone Number (Optional)</label>
          <div className="flex">
            <div className="w-1/4 sm:w-1/5">
              <div className="flex items-center border border-gray-300 rounded-l-md px-2 sm:px-3 py-2">
                <span className="text-green-500">
                  <img src="/icons/flag.svg" alt="" />
                </span>
                <span className="ml-1 text-gray-600 text-sm sm:text-base">+234</span>
              </div>
            </div>
            <div className="relative w-3/4 sm:w-4/5">
              <input
                type="text"
                name="additionalPhone"
                value={formValues.additionalPhone}
                onChange={handleAdditionalPhoneChange}
                disabled={!isEditing}
                placeholder="Enter additional phone number"
                className={`w-full py-2 px-4 border border-gray-300 rounded-r-md bg-[#F5F7FA] ${!isEditing ? "cursor-not-allowed opacity-75" : ""}`}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formValues.email}
              className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA] cursor-not-allowed opacity-75"
              readOnly
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-2">Email address cannot be changed</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMapPin className="text-gray-400" />
            </div>
            <input
              type="text"
              name="address"
              value={formValues.address}
              onChange={handleChange}
              disabled={!isEditing}
              className={`pl-10 w-full py-2 px-4 border border-gray-300 rounded-md bg-[#F5F7FA] ${!isEditing ? "cursor-not-allowed opacity-75" : ""}`}
            />
          </div>
        </div>

        {shouldShowAuthorizationUpload && (
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Letter of Authorization</h3>
            <p className="text-sm text-gray-500 mb-3">
              Upload a letter of authorization signed by your company's secretary or director. <strong>Max 2MB</strong>
            </p>
            <Authorization
              onUpload={handleAuthorizationUpload}
              isSubmitted={authorizationSubmitted}
            />
          </div>
        )}

        {shouldShowStatusUpload && (
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Status Report Certificate</h3>
            <p className="text-sm text-gray-500 mb-3">Upload a recent company status certificate. <strong>Max 2MB</strong></p>
            <Status
              onUpload={handleStatusUpload}
              isSubmitted={statusSubmitted}
            />
          </div>
        )}

        {shouldShowCacUpload && (
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Corporate Affairs Commission (CAC) Document</h3>
            <p className="text-sm text-gray-500 mb-3">Upload your company's CAC registration document. <strong>Max 2MB</strong></p>
            <CACUpload
              onUpload={handleCacUpload}
              isSubmitted={cacSubmitted}
            />
          </div>
        )}

        {/* File Size Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                <strong>File Size Limit:</strong> Each file must be under 2MB. Images will be automatically compressed to ensure they meet this requirement.
              </p>
            </div>
          </div>
        </div>

        {/* Debug Section - Remove in production */}
        <div className="bg-gray-100 p-4 rounded-md text-xs">
          <h4 className="font-bold mb-2">Debug Info:</h4>
          <p>Profile Image: {profileImageFile ? `${profileImageFile.name} (${formatFileSize(profileImageFile.size)})` : 'None'}</p>
          <p>CAC File: {cacFile ? `${cacFile.name} (${formatFileSize(cacFile.size)})` : 'None'}</p>
          <p>Authorization File: {authorizationFile ? `${authorizationFile.name} (${formatFileSize(authorizationFile.size)})` : 'None'}</p>
          <p>Status File: {statusFile ? `${statusFile.name} (${formatFileSize(statusFile.size)})` : 'None'}</p>
        </div>

        <div className="pt-4 space-y-3">
          <button
            type="button"
            onClick={toggleEdit}
            className={`w-full py-3 flex items-center justify-center ${isEditing ? "bg-gray-500 hover:bg-gray-600" : "bg-green-500 hover:bg-green-600"} text-white rounded-md transition`}
            disabled={isUploading}
          >
            {isEditing ? (
              <>
                <FiEdit className="mr-2" /> Cancel Edit
              </>
            ) : (
              <>
                <FiEdit className="mr-2" /> Edit Profile
              </>
            )}
          </button>
          
          {isEditing && (
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full py-3 flex items-center justify-center ${isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white rounded-md transition`}
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" /> Save Changes
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default AccountTab