// import type * as React from "react"
// import type { FooterNavSectionProps } from "../../../../types"

// export const FooterNavSection: React.FC<FooterNavSectionProps> = ({ title, links }) => {
//   return (
//     <nav className="grow max-md:mt-10">
//       <h2 className="text-lg font-bold text-black">{title}</h2>
//       <ul className="mt-3 w-full text-base  text-[#000000CC]">
//         {links.map((link, index) => (
//           <li key={index} className={index > 0 ? "mt-2" : ""}>
//             <a
//               href={link.href}
//               className="hover:text-[#000000CC] transition-colors"
//               aria-label={`Navigate to ${link.text}`}
//             >
//               {link.text}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   )
// }

// export default FooterNavSection




// import type * as React from "react"
// import type { FooterNavSectionProps } from "../../../../types"

// export const FooterNavSection: React.FC<FooterNavSectionProps> = ({ title, links }) => {
//   return (
//     <nav className="grow max-md:mt-10">
//       <h2 className="text-lg font-bold text-black">{title}</h2>
//       <ul className="mt-3 w-full text-base text-[#000000CC]">
//         {links.map((link, index) => (
//           <li key={index} className={index > 0 ? "mt-2" : ""}>
//             <a
//               href={link.href}
//               className={`hover:text-[#000000CC] transition-colors ${
//                 link.text === "cvmsproject@afripointgroup.com" ? "underline" : ""
//               }`}
//               aria-label={`Navigate to ${link.text}`}
//             >
//               {link.text}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   )
// }

// export default FooterNavSection





import React from "react"
import type { FooterNavSectionProps } from "../../../../types"
import { Link } from "react-router-dom"

export const FooterNavSection: React.FC<FooterNavSectionProps> = ({ title, links }) => {
  return (
    <nav className="grow">
      <h2 className="text-base sm:text-lg font-bold text-black">{title}</h2>
      <ul className="mt-2 sm:mt-3 w-full text-sm sm:text-base text-[#000000CC]">
        {links.map((link, index) => (
          <li key={index} className={index > 0 ? "mt-1 sm:mt-2" : ""}>
            <Link
              to={link.href}
              className={`block hover:text-[#000000CC] transition-colors ${
                link.text === "cvmsproject@afripointgroup.com" ? "underline break-words" : ""
              }`}
              aria-label={`Navigate to ${link.text}`}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default FooterNavSection