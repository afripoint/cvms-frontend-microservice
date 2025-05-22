// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { useSelector, useDispatch } from "react-redux"
// import { updateUserData } from "../../redux/actions"
// import { selectUserData, selectIsBusinessAccount } from "../../redux/selectors"
// import { toast } from "react-toastify"
// import { FiMail, FiMapPin, FiEdit, FiSave } from "react-icons/fi"
// import ProfileImageUpload from "../file-management.tsx/file-upload"
// import type { AccountType } from "../../types"
// import CACUpload from "../file-management.tsx/Cac-Upload"
// import Status from "../file-management.tsx/Status-Upload"
// import Authorization from "../file-management.tsx/Authorization-upload"
// import { AppDispatch, RootState } from "../../../../core/store"
// import { fetchUserProfile, updateUserProfile } from "../../../auth/redux/slices/authSlice"

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

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setIsEditing(false);
  
//   //   try {
//   //     const formData = new FormData();
      
//   //     // Add all the form values
//   //     formData.append("first_name", formValues.firstName);
//   //     formData.append("last_name", formValues.lastName);
//   //     formData.append("phone_number", formValues.phone);
//   //     formData.append("address", formValues.address);
      
//   //     if (formValues.additionalPhone) {
//   //       formData.append("secondary_phone_number", formValues.additionalPhone);
//   //     }
  
//   //     // Add files if they exist
//   //     if (profileImageFile) {
//   //       formData.append("profile_image", profileImageFile);
//   //       setProfileImageSubmitted(true);
//   //     }
//   //     if (cacFile) {
//   //       formData.append("cac_certificate", cacFile);
//   //       setCacSubmitted(true);
//   //     }
//   //     if (authorizationFile) {
//   //       formData.append("authorization_letter", authorizationFile);
//   //       setAuthorizationSubmitted(true);
//   //     }
//   //     if (statusFile) {
//   //       formData.append("status_report", statusFile);
//   //       setStatusSubmitted(true);
//   //     }
  
//   //     // Dispatch the profile update
//   //     await dispatch(updateUserProfile(formData)).unwrap();
  
//   //     // Refresh user data after successful update
//   //     await dispatch(fetchUserProfile());
  
//   //     toast.success("Profile updated successfully!");
//   //   } catch (error) {
//   //     toast.error("Failed to update profile. Please try again.");
//   //   }
//   // };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsEditing(false);
  
//     try {
//       const formData = new FormData();
      
//       // Add all the form values
//       formData.append("first_name", formValues.firstName);
//       formData.append("last_name", formValues.lastName);
//       formData.append("phone_number", formValues.phone);
//       formData.append("address", formValues.address);
      
//       if (formValues.additionalPhone) {
//         formData.append("secondary_phone_number", formValues.additionalPhone);
//       }
  
//       // Add files if they exist
//       if (profileImageFile) {
//         formData.append("profile_image", profileImageFile);
//         console.log("Appending profile image:", profileImageFile.name);
//       }
//       if (cacFile) {
//         formData.append("cac_certificate", cacFile);
//         console.log("Appending CAC file:", cacFile.name);
//       }
//       if (authorizationFile) {
//         formData.append("authorization_letter", authorizationFile);
//         console.log("Appending authorization file:", authorizationFile.name);
//       }
//       if (statusFile) {
//         formData.append("status_report", statusFile);
//         console.log("Appending status file:", statusFile.name);
//       }
  
//       // Log FormData contents (for debugging)
//       for (let [key, value] of formData.entries()) {
//         console.log(key, value);
//       }
  
//       // Dispatch the profile update
//       const result = await dispatch(updateUserProfile(formData)).unwrap();
//       console.log("Update result:", result);
  
//       // Refresh user data after successful update
//       await dispatch(fetchUserProfile());
  
//       toast.success("Profile updated successfully!");
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error("Failed to update profile. Please try again.");
//     }
//   };

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
//     if (isEditing) {
//       // If we're currently editing, this is a save action
//       handleSubmit({ preventDefault: () => {} } as React.FormEvent)
//     }
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

//   return (
//     <form onSubmit={handleSubmit}>
//       <ProfileImageUpload 
//         onUpload={(file: File) => {
//           setProfileImageFile(file)
//           toast.success("Profile image selected for upload")
//         }}
//         isSubmitted={profileImageSubmitted}
//       />

//       <div className="mx-auto w-full max-w-[450px] border-t-2 border-gray-200 pt-8 mt-6"></div>

//       <div className="w-full max-w-md mx-auto px-4 sm:px-0 space-y-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-semibold text-gray-800">Account Information</h2>
//           <button 
//             type="button" 
//             onClick={handleRefreshData} 
//             className="text-sm text-green-600 hover:text-green-700"
//           >
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
//             <p className="text-sm text-gray-500 mb-3">Upload a letter of authorization signed by your company's secretary or director.</p>
//             <Authorization
//               onUpload={(file: File) => {
//                 setAuthorizationFile(file)
//                 toast.success("Authorization letter selected for upload")
//               }}
//               isSubmitted={authorizationSubmitted}
//             />
//           </div>
//         )}

//         {shouldShowStatusUpload && (
//           <div>
//             <h3 className="text-md font-medium text-gray-700 mb-2">Status Report Certificate</h3>
//             <p className="text-sm text-gray-500 mb-3">Upload a recent company status certificate.</p>
//             <Status
//               onUpload={(file: File) => {
//                 setStatusFile(file)
//                 toast.success("Status certificate selected for upload")
//               }}
//               isSubmitted={statusSubmitted}
//             />
//           </div>
//         )}

//         {shouldShowCacUpload && (
//           <div>
//             <h3 className="text-md font-medium text-gray-700 mb-2">Corporate Affairs Commission (CAC) Document</h3>
//             <p className="text-sm text-gray-500 mb-3">Upload your company's CAC registration document.</p>
//             <CACUpload
//               onUpload={(file: File) => {
//                 setCacFile(file)
//                 toast.success("CAC document selected for upload")
//               }}
//               isSubmitted={cacSubmitted}
//             />
//           </div>
//         )}

//         <div className="pt-4">
//           <button
//             type="button"
//             onClick={toggleEdit}
//             className={`w-full py-3 flex items-center justify-center ${isEditing ? "bg-green-500 hover:bg-green-600" : "bg-green-500 hover:bg-green-600"} text-white rounded-md transition`}
//           >
//             {isEditing ? (
//               <>
//                 <FiSave className="mr-2" /> Save Changes
//               </>
//             ) : (
//               <>
//                 <FiEdit className="mr-2" /> Edit Profile
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </form>
//   )
// }

// export default AccountTab




"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateUserData } from "../../redux/actions"
import { selectUserData, selectIsBusinessAccount } from "../../redux/selectors"
import { toast } from "react-toastify"
import { FiMail, FiMapPin, FiEdit, FiSave } from "react-icons/fi"
import ProfileImageUpload from "../file-management.tsx/file-upload"
import type { AccountType } from "../../types"
import CACUpload from "../file-management.tsx/Cac-Upload"
import Status from "../file-management.tsx/Status-Upload"
import Authorization from "../file-management.tsx/Authorization-upload"
import type { AppDispatch, RootState } from "../../../../core/store"
import { fetchUserProfile, updateUserProfile } from "../../../auth/redux/slices/authSlice"

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

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsEditing(false);

  //   try {
  //     const formData = new FormData();

  //     // Add all the form values
  //     formData.append("first_name", formValues.firstName);
  //     formData.append("last_name", formValues.lastName);
  //     formData.append("phone_number", formValues.phone);
  //     formData.append("address", formValues.address);

  //     if (formValues.additionalPhone) {
  //       formData.append("secondary_phone_number", formValues.additionalPhone);
  //     }

  //     // Add files if they exist
  //     if (profileImageFile) {
  //       formData.append("profile_image", profileImageFile);
  //       setProfileImageSubmitted(true);
  //     }
  //     if (cacFile) {
  //       formData.append("cac_certificate", cacFile);
  //       setCacSubmitted(true);
  //     }
  //     if (authorizationFile) {
  //       formData.append("authorization_letter", authorizationFile);
  //       setAuthorizationSubmitted(true);
  //     }
  //     if (statusFile) {
  //       formData.append("status_report", statusFile);
  //       setStatusSubmitted(true);
  //     }

  //     // Dispatch the profile update
  //     await dispatch(updateUserProfile(formData)).unwrap();

  //     // Refresh user data after successful update
  //     await dispatch(fetchUserProfile());

  //     toast.success("Profile updated successfully!");
  //   } catch (error) {
  //     toast.error("Failed to update profile. Please try again.");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)

    try {
      const formData = new FormData()

      // Add all the form values
      formData.append("first_name", formValues.firstName)
      formData.append("last_name", formValues.lastName)
      formData.append("phone_number", formValues.phone)
      formData.append("address", formValues.address)

      if (formValues.additionalPhone) {
        formData.append("secondary_phone_number", formValues.additionalPhone)
      }

      // Add files if they exist
      if (profileImageFile) {
        formData.append("profile_image", profileImageFile)
        console.log("Appending profile image:", profileImageFile.name)
      }
      if (cacFile) {
        formData.append("cac_certificate", cacFile)
        console.log("Appending CAC file:", cacFile.name)
      }
      if (authorizationFile) {
        formData.append("authorization_letter", authorizationFile)
        console.log("Appending authorization file:", authorizationFile.name)
      }
      if (statusFile) {
        formData.append("status_report", statusFile)
        console.log("Appending status file:", statusFile.name)
      }

      // Log FormData contents (for debugging)
      for (const [key, value] of formData.entries()) {
        console.log(key, value)
      }

      // Dispatch the profile update
      const result = await dispatch(updateUserProfile(formData)).unwrap()
      console.log("Update result:", result)

      // Refresh user data after successful update
      await dispatch(fetchUserProfile())

      toast.success("Profile updated successfully!")
    } catch (error) {
      console.error("Update error:", error)
      toast.error("Failed to update profile. Please try again.")
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
    if (isEditing) {
      // If we're currently editing, this is a save action
      handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    }
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
    const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
    return file.size <= maxSizeInBytes
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <form onSubmit={handleSubmit}>
      <ProfileImageUpload
        onUpload={(file: File) => {
          if (validateFileSize(file)) {
            setProfileImageFile(file)
            toast.success(`Profile image selected (${formatFileSize(file.size)})`)
          } else {
            toast.error("Profile image exceeds 5MB size limit. Please select a smaller file.")
          }
        }}
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
              Upload a letter of authorization signed by your company's secretary or director.
            </p>
            <Authorization
              onUpload={(file: File) => {
                if (validateFileSize(file)) {
                  setAuthorizationFile(file)
                  toast.success(`Authorization letter selected (${formatFileSize(file.size)})`)
                } else {
                  toast.error("Authorization letter exceeds 5MB size limit. Please select a smaller file.")
                }
              }}
              isSubmitted={authorizationSubmitted}
            />
          </div>
        )}

        {shouldShowStatusUpload && (
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Status Report Certificate</h3>
            <p className="text-sm text-gray-500 mb-3">Upload a recent company status certificate.</p>
            <Status
              onUpload={(file: File) => {
                if (validateFileSize(file)) {
                  setStatusFile(file)
                  toast.success(`Status certificate selected (${formatFileSize(file.size)})`)
                } else {
                  toast.error("Status certificate exceeds 5MB size limit. Please select a smaller file.")
                }
              }}
              isSubmitted={statusSubmitted}
            />
          </div>
        )}

        {shouldShowCacUpload && (
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Corporate Affairs Commission (CAC) Document</h3>
            <p className="text-sm text-gray-500 mb-3">Upload your company's CAC registration document.</p>
            <CACUpload
              onUpload={(file: File) => {
                if (validateFileSize(file)) {
                  setCacFile(file)
                  toast.success(`CAC document selected (${formatFileSize(file.size)})`)
                } else {
                  toast.error("CAC document exceeds 5MB size limit. Please select a smaller file.")
                }
              }}
              isSubmitted={cacSubmitted}
            />
          </div>
        )}

        <div className="pt-4">
          <button
            type="button"
            onClick={toggleEdit}
            className={`w-full py-3 flex items-center justify-center ${isEditing ? "bg-green-500 hover:bg-green-600" : "bg-green-500 hover:bg-green-600"} text-white rounded-md transition`}
          >
            {isEditing ? (
              <>
                <FiSave className="mr-2" /> Save Changes
              </>
            ) : (
              <>
                <FiEdit className="mr-2" /> Edit Profile
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

export default AccountTab
