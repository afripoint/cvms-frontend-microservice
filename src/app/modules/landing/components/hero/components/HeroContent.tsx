import type React from "react"
import CTAButton from "./CTAButton"
import type { HeroContentProps } from "../../../types/hero"

const HeroContent: React.FC<HeroContentProps> = ({
  title = "Experience The Customs Verification Management System",
  subtitle = "Check your Vehicle's Duty Payment Status",
}) => {
  return (
    <div className="flex flex-col gap-4 items-center px-5 pt-4 pb-6 max-w-[825px] max-sm:px-4 max-sm:pt-2">
      <h1 className="text-4xl font-medium text-center text-white max-md:text-4xl max-sm:text-3xl pb-4">{title}</h1>
      <p className="text-xl tracking-normal text-center text-white max-md:text-lg max-sm:text-base pb-6">{subtitle}</p>
      <CTAButton />
    </div>
  )
}

export default HeroContent