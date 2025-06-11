import type React from "react"
import HeroContent from "./HeroContent"
import type { HeroSectionProps } from "../../../types/hero"

const HeroSection: React.FC<HeroSectionProps> = ({ backgroundImage = "/images/herosection.svg" }) => {
  return (
    <>
      {/* <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&family=Manrope:wght@600;700&display=swap"
        rel="stylesheet"
      /> */}
      <section
        className="flex justify-center items-start pt-20 px-0 pb-40 w-full bg-center bg-no-repeat bg-cover min-h-[300px] max-md:pt-16 max-md:px-0 max-md:pb-36 max-sm:pt-12 max-sm:px-0 max-sm:pb-24 mb-8"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <HeroContent />
      </section>
    </>
  )
}

export default HeroSection