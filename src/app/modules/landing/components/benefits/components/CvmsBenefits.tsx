import type React from "react"
import { benefits } from "../../../constants/benefits"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../shared/components/ui"


const CvmsBenefits: React.FC = () => {
  return (
    <div className="py-10 px-6 md:px-8 w-full bg-[#FFF]">
      <div className="flex flex-col md:flex-row w-full max-w-full px-4 py-8 gap-8 bg-gray-100">
        {/* Benefits Card */}
        <Card className="w-full md:w-1/2 border-0 shadow-md overflow-hidden">
          <CardHeader className="bg-[#2A9F47] text-white p-4">
            <CardTitle className="font-semibold text-lg">Benefits</CardTitle>
          </CardHeader>
          <CardContent className="bg-[#2A9F47] text-white p-6">
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-5 w-5 bg-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-[#2A9F47]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-sm">{benefit.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Vertical line between sections - position relative to container */}
        <div className="hidden md:block w-px bg-black self-stretch"></div>

        {/* Mission and Vision Cards Container */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          {/* Mission Card */}
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-white p-4">
              <CardTitle className="font-semibold text-lg">Mission</CardTitle>
            </CardHeader>
            <CardContent className="bg-white p-6">
              <p className="text-sm">
              To provide a secure and efficient platform for customs and vehicle verification, 
                <br />
                enabling transparency, compliance, and ease of access for all stakeholders.
              </p>
            </CardContent>
          </Card>

          {/* Vision Card */}
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-white text-black  p-4">
              <CardTitle className="font-semibold text-lg">Vision</CardTitle>
            </CardHeader>
            <CardContent className="bg-white text-black  p-6">
              <p className="text-sm">
              To be the trusted digital infrastructure for customs verification

                <br />
                services nationwide.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CvmsBenefits

