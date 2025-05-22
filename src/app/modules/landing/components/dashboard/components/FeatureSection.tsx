import type React from "react"
import { features } from "../../../constants/dashboard"

const FeatureSection: React.FC = () => {
  return (
    <div className="rounded-lg mt-4 mb-6">
      <div className="bg-[#FAFAFA] py-12 px-12">
        <h2 className="text-2xl font-bold text-center mb-4 text-[#000000]">
          Why Choose <span className="text-[#34C759]">CVMS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="border-r p-6 rounded-lg flex flex-col items-center text-center font-semibold">
              <div className="mb-4">
                <img src={(feature.icon as string) || "/placeholder.svg"} alt={feature.title} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-[#000000]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeatureSection

