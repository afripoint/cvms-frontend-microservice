// "use client"
// import type * as React from "react"
// import FooterNavSection from "./FooterNavSection"
// import FooterLogo from "./FooterLogo"
// import FooterSocialLinks from "./FooterSocialLinks"
// import { footerNavSections } from "../../../../constants/navigation"

// const Footer: React.FC = () => {
//   return (
//     <footer className="overflow-hidden px-20 py-6 bg-gray-100 max-md:px-5" role="contentinfo">
//       <div className="flex gap-5 max-md:flex-col">
//         <section className="w-[21%] max-md:ml-0 max-md:w-full">
//           <div className="flex flex-col w-full max-md:mt-10">
//             <FooterLogo />
//             <FooterSocialLinks />
//           </div>
//         </section>

//         <section className="ml-24 w-[79%] max-md:ml-0 max-md:w-full">
//           <div className="max-md:mt-10 max-md:max-w-full">
//             <div className="flex gap-5 max-md:flex-col">
              
//               <div className="ml-20 w-1/5 max-md:ml-0 max-md:w-full">
//                 <FooterNavSection {...footerNavSections.hotlines} />
//               </div>
//               <div className="ml-20 w-[27%] max-md:ml-0 max-md:w-full">
//                 <FooterNavSection {...footerNavSections.supportAdresses} />
//               </div>
//               <div className="ml-14 w-[19%] max-md:ml-0 max-md:w-full">
//                 <FooterNavSection {...footerNavSections.resources} />
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </footer>
//   )
// }

// export default Footer




"use client"
import type * as React from "react"
import FooterNavSection from "./FooterNavSection"
import FooterLogo from "./FooterLogo"
import FooterSocialLinks from "./FooterSocialLinks"
import { footerNavSections } from "../../../../constants/navigation"

const Footer: React.FC = () => {
  return (
    <footer className="overflow-hidden px-4 sm:px-6 md:px-10 lg:px-20 py-6 bg-gray-100" role="contentinfo">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Logo and social links column */}
        <section className="w-full md:w-1/4 lg:w-1/5">
          <div className="flex flex-col w-full">
            <FooterLogo />
            <FooterSocialLinks />
          </div>
        </section>

        {/* Navigation sections */}
        <section className="w-full md:w-3/4 lg:w-4/5 md:ml-5 lg:ml-48">
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-5">
              
              <div className="w-full ml-10">
                <FooterNavSection {...footerNavSections.hotlines} />
              </div>
              
              <div className="w-full mr-">
                <FooterNavSection {...footerNavSections.supportAdresses} />
              </div>
              
              <div className="w-full ml-12 ">
                <FooterNavSection {...footerNavSections.resources} />
              </div>
              
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}

export default Footer