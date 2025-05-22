// import type * as React from "react"

// const FooterLogo: React.FC = () => {
//   return (
//     <div className="w-full text-xl font-bold text-black">
//       <img 
//         src="/images/CustomsImg.svg"
//         alt="Custom Image" 
//         className="object-contain w-16 sm:w-20 aspect-square" 
//       />
//       <h1 className="">CVMS</h1>
//       <p className="text-xl sm:text-sm ">Customs Verification Management System</p>
//     </div>
//   )
// }

// export default FooterLogo






import type * as React from "react"

const FooterLogo: React.FC = () => {
  return (
    <div className="w-full text-lg sm:text-xl font-bold text-black">
      <img 
        src="/images/CustomsImg.svg"
        alt="Custom Image" 
        className="object-contain w-16 sm:w-20 aspect-square" 
      />
      <h1 className="mt-2">CVMS</h1>
      <p className="text-sm sm:text-base md:text-sm lg:text-base font-normal">
        Customs Verification Management System
      </p>
    </div>
  )
}

export default FooterLogo