import type React from "react"
import { workflowSteps } from "../../../constants/benefits"

const CvmsVehicle: React.FC = () => {
  return (
    <div 
      id="how-it-works" 
      className="bg-white px-6 sm:px-12 rounded-lg shadow-sm max-w-6xl mx-auto min-h-[60vh] flex flex-col justify-center py-12 scroll-mt-20"
    >
      {/* Heading with adjusted spacing */}
      <h2 className="text-2xl font-bold text-center text-[#000000] mb-10">
        How does CVMS Work?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 relative pr-0 md:pr-16">
        {workflowSteps.map((step) => (
          <div key={step.id} className="flex">
            <div className="mr-4">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <img src={`/icons/${step.icon}.svg`} alt="" className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-green-500 font-medium mb-1">{step.title}</h3>
              <p className="text-sm text-gray-700 leading-snug">{step.description}</p>
            </div>
          </div>
        ))}

        {/* Vehicle Image */}
        <div className="absolute right-0 bottom-0 transform translate-y-1/2 translate-x-8 md:translate-x-20">
          <img src='/images/vehicle.svg' alt="Vehicle" className="w-36 md:w-48 h-auto" />
        </div>
      </div>
    </div>
  )
}

export default CvmsVehicle