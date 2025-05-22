
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import type { ProfileSectionProps } from "../../landing/types";
// import { useAuth } from "../hooks";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../../core/store";
// import ChangePasswordModal from "../../../pages/profilemanagement/ChangePassword";

// const ProfileSection: React.FC<ProfileSectionProps> = ({ firstName, lastName, email, phone_number}) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
//   const navigate = useNavigate();
//   const { signOut } = useAuth();

//   // Get user role and data from Redux state
//   const { role, user } = useSelector((state: RootState) => state.auth);

//   // Format role for display (capitalize first letter of each word)
//   const formatRole = (roleString?: string | null) => {
//     if (!roleString) {
//       // If no role is provided, check if we can determine it from other user data
//       if (user?.agency_name) return "Agent Account/Freight Forwarders";
//       if (user?.cac) return "Company Account";
//       return "Individual Account"; // Default to Individual if we can't determine
//     }

//     // Format specific role values with proper capitalization
//     switch (roleString.toLowerCase()) {
//       case "individual account":
//         return "Individual Account";
//       case "agent account/freight forwarders":
//         return "Agent Account/Freight Forwarders";
//       case "company account":
//         return "Company Account";
//       default:
//         // If it's some other value, format it properly
//         return roleString
//           .split(" ")
//           .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//           .join(" ");
//     }
//   };

//   // Get initials from first and last name
//   const getInitials = () => {
//     if (firstName && lastName) {
//       return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
//     } else if (firstName) {
//       return firstName.charAt(0).toUpperCase();
//     } else if (user?.first_name && user?.last_name) {
//       return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
//     } else {
//       return "U"; // Default for "User"
//     }
//   };

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as HTMLElement;
//       if (!target.closest("#avatarButton") && !target.closest("#userDropdown")) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleSignOut = () => {
//     signOut();
//     // Show success message
//     toast.success("You have been successfully signed out!");
//     // Redirect to landing page
//     navigate("/");
//   };

//   // Navigate to settings page
//   const handleNavigateToSettings = () => {
//     navigate("/settings");
//     setIsOpen(false);
//   };

//   // Handle opening change password modal
//   const handleChangePassword = () => {
//     setShowChangePasswordModal(true);
//     setIsOpen(false); // Close dropdown when opening modal
//   };

//   return (
//     <div className="relative">
//       <button
//         id="avatarButton"
//         className="flex items-center justify-center w-9 h-9 font-semibold text-white bg-green-500 rounded-full hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//         onClick={() => setIsOpen(!isOpen)}
//         aria-expanded={isOpen}
//         aria-haspopup="true"
//       >
//         {getInitials()}
//       </button>

//       {isOpen && (
//         <div
//           id="userDropdown"
//           className="absolute right-0 mt-2 w-60 rounded-lg shadow-lg bg-white z-10 divide-y divide-gray-100"
//           role="menu"
//           aria-orientation="vertical"
//         >
//           <div className="px-4 py-3 text-sm text-gray-900">
//             <div className="font-medium">
//               {firstName || user?.first_name} {lastName || user?.last_name}
//             </div>
//             <div className="truncate text-gray-600">{email || user?.email}</div>
//             <div className="mt-1 text-xs font-medium py-1 px-2 bg-green-100 text-green-800 rounded-full inline-block">
//               {formatRole(role || user?.role) || "Individual Account"}
//             </div>
//           </div>
//           <ul className="py-2 text-sm text-gray-700" aria-labelledby="avatarButton">
//             <li>
//               <button
//                 onClick={handleNavigateToSettings}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                 role="menuitem"
//               >
//                 Profile Settings
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={handleChangePassword}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                 role="menuitem"
//               >
//                 Change Password
//               </button>
//             </li>
//           </ul>
//           <div className="py-1">
//             <button
//               onClick={handleSignOut}
//               className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//               role="menuitem"
//             >
//               Log Out
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Render change password modal with immediate OTP flow */}
//       {showChangePasswordModal && (
//         <ChangePasswordModal
//           isOpen={showChangePasswordModal}
//           onClose={() => setShowChangePasswordModal(false)}
//           email={email || user?.email || ""}
//           phone_number={phone_number || user?.phone_number || ""}
//           hasPhone={!!user?.phone_number}
//         />
//       )}
//     </div>
//   );
// };

// export default ProfileSection;




"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import type { ProfileSectionProps } from "../../landing/types"
import { useAuth } from "../hooks"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../../core/store"
import ChangePasswordModal from "../../../pages/profilemanagement/ChangePassword"
import { fetchUserProfile } from "../redux/slices/authSlice"

const ProfileSection: React.FC<ProfileSectionProps> = ({ firstName, lastName, email, phone_number }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const dispatch = useDispatch<AppDispatch>()

  // Get user role and data from Redux state
  const { role, user } = useSelector((state: RootState) => state.auth)

  // Format role for display (capitalize first letter of each word)
  const formatRole = (roleString?: string | null) => {
    if (!roleString) {
      // If no role is provided, check if we can determine it from other user data
      if (user?.agency_name) return "Agent Account/Freight Forwarders"
      if (user?.cac) return "Company Account"
      return "Individual Account" // Default to Individual if we can't determine
    }

    // Format specific role values with proper capitalization
    switch (roleString.toLowerCase()) {
      case "individual account":
        return "Individual Account"
      case "agent account/freight forwarders":
        return "Agent Account/Freight Forwarders"
      case "company account":
        return "Company Account"
      default:
        // If it's some other value, format it properly
        return roleString
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ")
    }
  }

  // Get initials from first and last name
  const getInitials = () => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    } else if (firstName) {
      return firstName.charAt(0).toUpperCase()
    } else if (user?.first_name && user?.last_name) {
      return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
    } else {
      return "U" // Default for "User"
    }
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest("#avatarButton") && !target.closest("#userDropdown")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSignOut = () => {
    signOut()
    // Show success message
    toast.success("You have been successfully signed out!")
    // Redirect to landing page
    navigate("/")
  }

  // Navigate to settings page and fetch fresh user data
  const handleNavigateToSettings = () => {
    // Dispatch the fetchUserProfile action to get fresh data
    dispatch(fetchUserProfile())
      .then(() => {
        console.log("User profile fetched successfully before navigation")
        navigate("/settings")
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error)
        toast.error("Failed to fetch user profile. Please try again.")
        navigate("/settings") // Still navigate even if there's an error
      })

    setIsOpen(false)
  }

  // Handle opening change password modal
  const handleChangePassword = () => {
    setShowChangePasswordModal(true)
    setIsOpen(false) // Close dropdown when opening modal
  }

  return (
    <div className="relative">
      <button
        id="avatarButton"
        className="flex items-center justify-center w-9 h-9 font-semibold text-white bg-green-500 rounded-full hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {getInitials()}
      </button>

      {isOpen && (
        <div
          id="userDropdown"
          className="absolute right-0 mt-2 w-60 rounded-lg shadow-lg bg-white z-10 divide-y divide-gray-100"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-4 py-3 text-sm text-gray-900">
            <div className="font-medium">
              {firstName || user?.first_name} {lastName || user?.last_name}
            </div>
            <div className="truncate text-gray-600">{email || user?.email}</div>
            <div className="mt-1 text-xs font-medium py-1 px-2 bg-green-100 text-green-800 rounded-full inline-block">
              {formatRole(role || user?.role) || "Individual Account"}
            </div>
          </div>
          <ul className="py-2 text-sm text-gray-700" aria-labelledby="avatarButton">
            <li>
              <button
                onClick={handleNavigateToSettings}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                role="menuitem"
              >
                Profile Settings
              </button>
            </li>
            <li>
              <button
                onClick={handleChangePassword}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                role="menuitem"
              >
                Change Password
              </button>
            </li>
          </ul>
          <div className="py-1">
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              role="menuitem"
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* Render change password modal with immediate OTP flow */}
      {showChangePasswordModal && (
        <ChangePasswordModal
          isOpen={showChangePasswordModal}
          onClose={() => setShowChangePasswordModal(false)}
          email={email || user?.email || ""}
          phone_number={phone_number || user?.phone_number || ""}
          hasPhone={!!user?.phone_number}
        />
      )}
    </div>
  )
}

export default ProfileSection
