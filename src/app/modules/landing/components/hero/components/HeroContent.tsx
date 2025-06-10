import type React from "react"
import CTAButton from "./CTAButton"
import type { HeroContentProps } from "../../../types/hero"

const HeroContent: React.FC<HeroContentProps> = ({
  title = "Experience The Customs Verification Management System",
  subtitle = "Check your Vehicle’s Duty Payment Status",
}) => {
  return (
    <div className="flex flex-col gap-4 items-center px-5 py-0 max-w-[825px] max-sm:px-4 max-sm:py-0">
      <h1 className="text-4xl font-medium text-center text-white max-md:text-4xl max-sm:text-3xl">{title}</h1>
      <p className="text-xl tracking-normal text-center text-white max-md:text-lg max-sm:text-base">{subtitle}</p>
      <CTAButton />
    </div>
  )
}

export default HeroContent

