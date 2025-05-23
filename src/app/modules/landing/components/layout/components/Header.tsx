// "use client"
// import type React from "react"
// import { useState, useEffect } from "react"
// import { Link,  useLocation } from "react-router-dom"
// import { toast, ToastContainer } from "react-toastify" // Import ToastContainer

// import { navigationItems } from "../../../constants/navigation"
// import { useAuth } from "../../../hooks/useAuth"
// import CartIcon from "./CartIcon"

// import ProfileSection from "../../../../auth/components/ProfileSection"

// export const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)
//   const { isLoggedIn, userData, signOut, checkLoginStatus } = useAuth()
//   // const navigate = useNavigate()
//   const location = useLocation()
  
//   // Handle scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true)
//       } else {
//         setIsScrolled(false)
//       }
//     }
    
//     window.addEventListener('scroll', handleScroll)
//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, [])

//   // Check login status whenever location changes
//   useEffect(() => {
//     checkLoginStatus()
//   }, [location, checkLoginStatus])

//   // Close mobile menu when resizing to desktop
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024 && isMobileMenuOpen) {
//         setIsMobileMenuOpen(false)
//       }
//     }
    
//     window.addEventListener('resize', handleResize)
//     return () => {
//       window.removeEventListener('resize', handleResize)
//     }
//   }, [isMobileMenuOpen])

//   // Handle sign out in any view
//   const handleSignOut = async () => {
//     signOut()
//     setIsMobileMenuOpen(false)
//     toast.success("You have been successfully signed out!")
    
//     // Force a hard redirect to the homepage
//     window.location.href = "/"
//   }

//   // Helper to check if user data is valid
//   const hasValidUserData = Boolean(
//     isLoggedIn && 
//     userData && 
//     userData.first_name && 
//     userData.last_name
//   )

//   return (
//     <header className={`box-border w-full bg-white shadow fixed top-0 left-0 z-10 ${isScrolled ? 'py-1' : 'py-1'}`}>
//       {/* Toast container for notifications */}
//       <ToastContainer position="top-right" autoClose={3000} />
      
//       <div className="flex justify-between items-center px-6 sm:px-6 md:px-8 lg:px-8 max-w-7xl mx-auto">
//         <div className="flex items-center">
//           <img 
//             src="/images/CustomsImg.svg" 
//             alt="Custom Image" 
//             className={`object-contain aspect-square ${isScrolled ? 'w-12' : 'w-14 sm:w-16'} transition-all duration-300`} 
//           />
//           <h1 className={`ml-2 text-base sm:text-lg md:text-xl font-medium text-black leading-tight ${isScrolled ? 'max-w-40 sm:max-w-56' : 'max-w-48 sm:max-w-64'} transition-all duration-300`}>
//             Customs Verification <br className="sm:block hidden" />
//             <span className="sm:block">Management System</span>
//           </h1>
//         </div>

//         <div className="flex items-center">
//           {/* Desktop Navigation - Only visible on large screens (lg and up) */}
//           <nav className="hidden lg:flex gap-3 lg:gap-6 items-center" aria-label="Main navigation">
//           {navigationItems.map((item) => {
//   if (item.href.startsWith('#')) {
//     return (
//       <a
//         key={item.label}
//         href={item.href}
//         onClick={(e) => {
//           e.preventDefault();
//           const targetId = item.href.substring(1); // Remove the #
//           const targetElement = document.getElementById(targetId);
//           if (targetElement) {
//             targetElement.scrollIntoView({ behavior: 'smooth' });
//           }
//         }}
//         className={`text-sm lg:text-base text-black hover:bg-[#F2F2F7] focus:ring-gray-500 rounded-md ${isScrolled ? 'py-1' : 'py-2'} transition-all duration-300`}
//       >
//         {item.label}
//       </a>
//     );
//   }
//   return (
//     <Link
//       key={item.label}
//       to={item.href}
//       className={`text-sm lg:text-base text-black hover:bg-[#F2F2F7] focus:ring-gray-500 rounded-md ${isScrolled ? 'py-1' : 'py-2'} transition-all duration-300`}
//     >
//       {item.label}
//     </Link>
//   );
// })}
//             {/* Conditional rendering based on login status for desktop */}
//             {hasValidUserData ? (
//               <>
//                 <CartIcon />
//                 <ProfileSection firstName={userData.first_name} lastName={userData.last_name} email={userData.email} />
//               </>
//             ) : (
//               <>
//                 <Link 
//                   to="/login" 
//                   className={`bg-[#F2F2F7] text-[#000000]  rounded-sm hover:bg-gray-100 px-3 lg:px-4 ${isScrolled ? 'py-1 text-sm' : 'py-2 text-base'} transition-all duration-300 whitespace-nowrap`}
//                 >
//                   Login <span className="ml-1">→</span>
//                 </Link>
//                 <Link 
//                   to="/account-type" 
//                   className={`bg-[#34C759] text-[#000000] rounded-sm hover:bg-green-200 px-3 lg:px-4 ${isScrolled ? 'py-1 text-sm' : 'py-2 text-base'} transition-all duration-300 whitespace-nowrap text-white`}
//                 >
//                   Sign up
//                 </Link>
//               </>
//             )}
//           </nav>

//           {/* Tablet Navigation - Only visible on tablet screens (md to lg) */}
//           <div className="hidden md:flex lg:hidden items-center gap-3">
//             {/* Cart is conditionally visible */}
//             {hasValidUserData && <CartIcon />}
            
//             {/* Show user initials only when logged in */}
//             {hasValidUserData ? (
//               <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
//                 <ProfileSection firstName={userData.first_name} lastName={userData.last_name} email={userData.email} />
//               </div>
//             ) : (
//               <>
//                 {/* Login and signup buttons for tablet when not logged in */}
//                 <Link 
//                   to="/login" 
//                   className={`bg-[#F2F2F7] text-[#000000] rounded-sm hover:bg-gray-100 px-3 ${isScrolled ? 'py-1 text-sm' : 'py-2 text-base'} transition-all duration-300 whitespace-nowrap`}
//                 >
//                   Login <span className="ml-1">→</span>
//                 </Link>
//                 <Link 
//                   to="/account-type" 
//                   className={`bg-[#34C759]  text-[#000000] rounded-sm hover:bg-green-200 px-3 ${isScrolled ? 'py-1 text-sm' : 'py-2 text-base'} transition-all duration-300 whitespace-nowrap text-white`}
//                 >
//                   Sign up
//                 </Link>
//               </>
//             )}
            
//             {/* Hamburger menu icon for tablet */}
//             <button
//               className="text-2xl p-2 ml-1"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               aria-expanded={isMobileMenuOpen}
//               aria-label="Toggle mobile menu"
//             >
//               {isMobileMenuOpen ? (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <line x1="18" y1="6" x2="6" y2="18"></line>
//                   <line x1="6" y1="6" x2="18" y2="18"></line>
//                 </svg>
//               ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <line x1="3" y1="12" x2="21" y2="12"></line>
//                   <line x1="3" y1="6" x2="21" y2="6"></line>
//                   <line x1="3" y1="18" x2="21" y2="18"></line>
//                 </svg>
//               )}
//             </button>
//           </div>

//           {/* Mobile Navigation - Only visible on mobile screens (below md) */}
//           <div className="md:hidden flex items-center gap-3">
//             {/* Cart is conditionally visible */}
//             {hasValidUserData && <CartIcon />}
            
//             {/* Show user initials only when logged in */}
//             {hasValidUserData ? (
//               <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
//                 <ProfileSection firstName={userData.first_name} lastName={userData.last_name} email={userData.email} />
//               </div>
//             ) : (
//               <>
//                 {/* Show Login button on mobile when not enough space */}
//                 <Link 
//                   to="/login" 
//                   className={`bg-[#F2F2F7] text-[#000000] rounded-sm hover:bg-gray-100 px-3 ${isScrolled ? 'py-1 text-sm' : 'py-1 text-sm'} transition-all duration-300 whitespace-nowrap`}
//                 >
//                   Login
//                 </Link>
//               </>
//             )}
            
//             {/* Hamburger menu icon for mobile */}
//             <button
//               className="text-2xl p-2 ml-1"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               aria-expanded={isMobileMenuOpen}
//               aria-label="Toggle mobile menu"
//             >
//               {isMobileMenuOpen ? (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <line x1="18" y1="6" x2="6" y2="18"></line>
//                   <line x1="6" y1="6" x2="18" y2="18"></line>
//                 </svg>
//               ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <line x1="3" y1="12" x2="21" y2="12"></line>
//                   <line x1="3" y1="6" x2="21" y2="6"></line>
//                   <line x1="3" y1="18" x2="21" y2="18"></line>
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile and Tablet Navigation Menu - Slide down animation */}
//       <div 
//         className={`lg:hidden bg-white border-t overflow-hidden transition-all duration-300 ${
//           isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
//         }`}
//       >
//         <nav className="px-6 sm:px-6 md:px-8 py-1" aria-label="Mobile navigation">
//         {navigationItems.map((item) => {
//   if (item.href.startsWith('#')) {
//     return (
//       <a
//         key={item.label}
//         href={item.href}
//         onClick={(e) => {
//           e.preventDefault();
//           setIsMobileMenuOpen(false);
//           const targetId = item.href.substring(1);
//           const targetElement = document.getElementById(targetId);
//           if (targetElement) {
//             targetElement.scrollIntoView({ behavior: 'smooth' });
//           }
//         }}
//         className="block py-3 text-base text-black hover:bg-gray-50 border-b border-gray-100"
//       >
//         {item.label}
//       </a>
//     );
//   }
//   return (
//     <Link
//       key={item.label}
//       to={item.href}
//       onClick={() => setIsMobileMenuOpen(false)}
//       className="block py-3 text-base text-black hover:bg-gray-50 border-b border-gray-100"
//     >
//       {item.label}
//     </Link>
//   );
// })}
//           {/* Conditional rendering for mobile menu - show login/signup buttons when not logged in */}
//           {!hasValidUserData ? (
//             <div className="flex flex-col gap-2 py-3">
//               <Link 
//                 to="/login" 
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="block w-full bg-[#F2F2F7] text-[#000000] rounded-sm text-center py-2 text-base"
//               >
//                 Login <span className="ml-1">→</span>
//               </Link>
//               <Link 
//                 to="/account-type" 
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="block w-full bg-[#34C759] text-[#000000] rounded-sm text-center py-2 text-base"
//               >
//                 Sign up
//               </Link>
//             </div>
//           ) : (
//             /* User profile and sign out for mobile and tablet */
//             <div className="py-3 border-t border-gray-100">
//               <div className="py-2 flex items-center">
//                 <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium mr-2">
//                   {userData.first_name?.[0]}{userData.last_name?.[0]}
//                 </div>
//                 <div className="text-sm">
//                   <p className="font-medium">{userData.first_name} {userData.last_name}</p>
//                   <p className="text-gray-500 text-xs truncate max-w-[200px]">{userData.email}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleSignOut}
//                 className="mt-2 block w-full bg-red-500 text-white rounded-sm text-center py-2 text-base"
//               >
//                 Sign out
//               </button>
//             </div>
//           )}
//         </nav>
//       </div>
//     </header>
//   )
// }

// export default Header





"use client"
import React from 'react';
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify" // Import ToastContainer

import { navigationItems } from "../../../constants/navigation"
import { useAuth } from "../../../hooks/useAuth"
import CartIcon from "./CartIcon"
import { handleScrollToSection, scrollToHashSection } from "../../../utils/scroll"

import ProfileSection from "../../../../auth/components/ProfileSection"

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isLoggedIn, userData, signOut, checkLoginStatus } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Check login status whenever location changes
  useEffect(() => {
    checkLoginStatus()
  }, [location, checkLoginStatus])

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobileMenuOpen])

  // Effect to handle scrolling to section after navigation
  useEffect(() => {
    // Only run this on the home page
    if (location.pathname === '/' || location.pathname === '') {
      scrollToHashSection()
    }
  }, [location])

  // Handle sign out in any view
  const handleSignOut = async () => {
    signOut()
    setIsMobileMenuOpen(false)
    toast.success("You have been successfully signed out!")
    
    // Force a hard redirect to the homepage
    window.location.href = "/"
  }

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Helper to check if user data is valid
  const hasValidUserData = Boolean(
    isLoggedIn && 
    userData && 
    userData.first_name && 
    userData.last_name
  )

  return (
    <header className={`box-border w-full bg-white shadow fixed top-0 left-0 z-10 ${isScrolled ? 'py-1' : 'py-1'}`}>
      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="flex justify-between items-center px-6 sm:px-6 md:px-8 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center">
          <img 
            src="/images/CustomsImg.svg" 
            alt="Custom Image" 
            className={`object-contain aspect-square ${isScrolled ? 'w-12' : 'w-14 sm:w-16'} transition-all duration-300`} 
          />
          <h1 className={`ml-2 text-base sm:text-lg md:text-xl font-medium text-black leading-tight ${isScrolled ? 'max-w-40 sm:max-w-56' : 'max-w-48 sm:max-w-64'} transition-all duration-300`}>
            Customs Verification <br className="sm:block hidden" />
            <span className="sm:block">Management System</span>
          </h1>
        </div>

        <div className="flex items-center">
          {/* Desktop Navigation - Only visible on large screens (lg and up) */}
          <nav className="hidden lg:flex gap-3 lg:gap-6 items-center" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={(e) => handleScrollToSection(e, item.href, navigate, closeMobileMenu)}
                className={`text-sm lg:text-base text-black hover:bg-[#F2F2F7] focus:ring-gray-500 rounded-md ${isScrolled ? 'py-1' : 'py-2'} transition-all duration-300`}
              >
                {item.label}
              </Link>
            ))}
            {/* Conditional rendering based on login status for desktop */}
            {hasValidUserData ? (
              <>
                <CartIcon />
                <ProfileSection firstName={userData.first_name} lastName={userData.last_name} email={userData.email} />
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`bg-[#F2F2F7] text-[#000000] rounded-sm hover:bg-gray-100 px-3 lg:px-4 ${isScrolled ? 'py-1 text-sm' : 'py-2 text-base'} transition-all duration-300 whitespace-nowrap`}
                >
                  Login <span className="ml-1">→</span>
                </Link>
                <Link 
                  to="/account-type" 
                  className={`bg-[#34C759] text-[#000000] rounded-sm hover:bg-green-200 px-3 lg:px-4 ${isScrolled ? 'py-1 text-sm' : 'py-2 text-base'} transition-all duration-300 whitespace-nowrap text-white`}
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>

          {/* Tablet Navigation - Only visible on tablet screens (md to lg) */}
          <div className="hidden md:flex lg:hidden items-center gap-3">
            {/* Cart is conditionally visible */}
            {hasValidUserData && <CartIcon />}
            
            {/* Show user initials only when logged in */}
            {hasValidUserData ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                <ProfileSection firstName={userData.first_name} lastName={userData.last_name} email={userData.email} />
              </div>
            ) : (
              <>
                {/* Login and signup buttons for tablet when not logged in */}
                <Link 
                  to="/login" 
                  className={`bg-[#F2F2F7] text-[#000000] rounded-sm hover:bg-gray-100 px-3 ${isScrolled ? 'py-1 text-sm' : 'py-2 text-base'} transition-all duration-300 whitespace-nowrap`}
                >
                  Login <span className="ml-1">→</span>
                </Link>
                <Link 
                  to="/account-type" 
                  className={`bg-[#34C759] text-[#000000] rounded-sm hover:bg-green-200 px-3 ${isScrolled ? 'py-1 text-sm' : 'py-2 text-base'} transition-all duration-300 whitespace-nowrap text-white`}
                >
                  Sign up
                </Link>
              </>
            )}
            
            {/* Hamburger menu icon for tablet */}
            <button
              className="text-2xl p-2 ml-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation - Only visible on mobile screens (below md) */}
          <div className="md:hidden flex items-center gap-3">
            {/* Cart is conditionally visible */}
            {hasValidUserData && <CartIcon />}
            
            {/* Show user initials only when logged in */}
            {hasValidUserData ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                <ProfileSection firstName={userData.first_name} lastName={userData.last_name} email={userData.email} />
              </div>
            ) : (
              <>
                {/* Show Login button on mobile when not enough space */}
                <Link 
                  to="/login" 
                  className={`bg-[#F2F2F7] text-[#000000] rounded-sm hover:bg-gray-100 px-3 ${isScrolled ? 'py-1 text-sm' : 'py-1 text-sm'} transition-all duration-300 whitespace-nowrap`}
                >
                  Login
                </Link>
              </>
            )}
            
            {/* Hamburger menu icon for mobile */}
            <button
              className="text-2xl p-2 ml-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile and Tablet Navigation Menu - Slide down animation */}
      <div 
        className={`lg:hidden bg-white border-t overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <nav className="px-6 sm:px-6 md:px-8 py-1" aria-label="Mobile navigation">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={(e) => handleScrollToSection(e, item.href, navigate, closeMobileMenu)}
              className="block py-3 text-base text-black hover:bg-gray-50 border-b border-gray-100"
            >
              {item.label}
            </Link>
          ))}
          {/* Conditional rendering for mobile menu - show login/signup buttons when not logged in */}
          {!hasValidUserData ? (
            <div className="flex flex-col gap-2 py-3">
              <Link 
                to="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full bg-[#F2F2F7] text-[#000000] rounded-sm text-center py-2 text-base"
              >
                Login <span className="ml-1">→</span>
              </Link>
              <Link 
                to="/account-type" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full bg-[#34C759] text-[#000000] rounded-sm text-center py-2 text-base"
              >
                Sign up
              </Link>
            </div>
          ) : (
            /* User profile and sign out for mobile and tablet */
            <div className="py-3 border-t border-gray-100">
              <div className="py-2 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium mr-2">
                  {userData.first_name?.[0]}{userData.last_name?.[0]}
                </div>
                <div className="text-sm">
                  <p className="font-medium">{userData.first_name} {userData.last_name}</p>
                  <p className="text-gray-500 text-xs truncate max-w-[200px]">{userData.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="mt-2 block w-full bg-red-500 text-white rounded-sm text-center py-2 text-base"
              >
                Sign out
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header