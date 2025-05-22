import type React from "react"
import CvmsBenefits from "./CvmsBenefits"
import CvmsVehicle from "./CvmsVehicle"


const Benefits: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <CvmsBenefits/>
      <CvmsVehicle />
    </div>
  )
}

export default Benefits



