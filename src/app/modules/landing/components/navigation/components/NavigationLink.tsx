// "use client"

// import type React from "react"
// import { Link } from "react-router-dom"
// import { navigationItems } from "../../../constants/navigation"
// import { handleScroll } from "../../../utils/scroll"

// export const NavigationLinks: React.FC = () => {
//   return (
//     <nav className="flex gap-6 items-center max-md:gap-4 max-sm:hidden" aria-label="Main navigation">
//       {navigationItems.map((item) => (
//         <Link
//           key={item.label}
//           to={item.href}
//           onClick={(e) => handleScroll(e, item.href)}
//           className="text-base leading-6 text-black "
//         >
//           {item.label}
//         </Link>
//       ))}

//       {/* Login link with arrow */}
//       <Link to="/login" className="bg-[#F2F2F7] text-[#000000] rounded-sm hover:bg-gray-100 px-4 py-2">
//         Login <span className="ml-1">→</span>
//       </Link>

//       {/* Sign up button */}
//       <Link to="/account-type" className="bg-[#34C759] text-[#000000] rounded-sm hover:bg-green-200 px-4 py-2">
//         Sign up
//       </Link>
//     </nav>
//   )
// }

// export default NavigationLinks





"use client"

import type React from "react"
import { Link, useNavigate } from "react-router-dom"
import { navigationItems } from "../../../constants/navigation"
import { handleScrollToSection } from "../../../utils/scroll"

export const NavigationLinks: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="flex gap-6 items-center max-md:gap-4 max-sm:hidden" aria-label="Main navigation">
      {navigationItems.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          onClick={(e) => handleScrollToSection(e, item.href, navigate)}
          className="text-base leading-6 text-black "
        >
          {item.label}
        </Link>
      ))}

      {/* Login link with arrow */}
      <Link to="/login" className="bg-[#F2F2F7] text-[#000000] rounded-sm hover:bg-gray-100 px-4 py-2">
        Login <span className="ml-1">→</span>
      </Link>

      {/* Sign up button */}
      <Link to="/account-type" className="bg-[#34C759] text-[#000000] rounded-sm hover:bg-green-200 px-4 py-2">
        Sign up
      </Link>
    </nav>
  )
}

export default NavigationLinks