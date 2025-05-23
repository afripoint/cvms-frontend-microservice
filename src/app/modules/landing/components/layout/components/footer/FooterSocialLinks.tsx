// import type * as React from "react"
// import { socialLinks } from "../../../../constants/navigation"

// export const FooterSocialLinks: React.FC = () => {
//   return (
//     <nav className="flex gap-2 items-center self-start mt-20 max-md:mt-10" aria-label="Social Media Links">
//       {socialLinks.map((link, index) => (
//         <a key={index} href="#" className="hover:opacity-80 transition-opacity" aria-label={link.alt}>
//           <img
//             src={link.src || "/placeholder.svg"}
//             alt={link.alt}
//             className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
//           />
//         </a>
//       ))}
//     </nav>
//   )
// }

// export default FooterSocialLinks







import type * as React from "react"
import { socialLinks } from "../../../../constants/navigation"

export const FooterSocialLinks: React.FC = () => {
  return (
    <nav 
      className="flex gap-3 items-center self-start mt-6 sm:mt-8 md:mt-10 lg:mt-16" 
      aria-label="Social Media Links"
    >
      {socialLinks.map((link, index) => (
        <a 
          key={index} 
          href="#" 
          className="hover:opacity-80 transition-opacity" 
          aria-label={link.alt}
        >
          <img
            src={link.src || "/placeholder.svg"}
            alt={link.alt}
            className="object-contain shrink-0 w-5 sm:w-6 aspect-square"
          />
        </a>
      ))}
    </nav>
  )
}

export default FooterSocialLinks