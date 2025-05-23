"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setIs_Accredify, setSelectedServices } from "../../../modules/auth/redux/slices/authSlice"
import { setShowServiceModal } from "../../../modules/auth/redux/slices/uiSlice"
import type { AppDispatch, RootState } from "../../../core/store"
import type { ServiceRequestModalProps } from "../../auth/types/auth"
import { ACCREDIFY_SERVICES, SERVICE_DESCRIPTIONS } from "../../auth/constants/auth"

const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({ onClose, onProceed }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { is_accredify, role } = useSelector((state: RootState) => state.auth)
  // Remove this line if showServiceModal is not used elsewhere in the component

  const [selectedServices, setLocalSelectedServices] = useState<string[]>([])
  const [showServices, setShowServices] = useState(false)
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleYesClick = () => {
    dispatch(setIs_Accredify(true))
    setShowServices(true)
  }

  const handleNoClick = () => {
    dispatch(setIs_Accredify(false))
    setLocalSelectedServices([])
    dispatch(setSelectedServices([]))
    setShowServices(false)
  }

  const toggleService = (service: string) => {
    let newSelectedServices
    if (selectedServices.includes(service)) {
      newSelectedServices = selectedServices.filter((s) => s !== service)
    } else {
      newSelectedServices = [...selectedServices, service]
    }
    setLocalSelectedServices(newSelectedServices)
    setIsDropdownOpen(false)
  }

  const getMessage = () => {
    if (role === "company account") {
      return "Are you interested in being a service provider?"
    } else if (role === "agent account/freight forwarders") {
      return "Are you interested in rendering services under CVMS Accredify?"
    } else {
      return "Are you interested in being a service provider?"
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleProceed = () => {
    dispatch(setSelectedServices(selectedServices))
    dispatch(setShowServiceModal(false))
    onProceed()
  }

  const handleClose = () => {
    dispatch(setShowServiceModal(false))
    onClose()
  }

  // Rest of the component remains the same
  // ...

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4 relative">
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-[#26272B]">Message Request</h3>
            <button onClick={handleClose} className="text-[#8E8E93] hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-2">
            <p className="font-medium mb-2">{getMessage()}</p>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-5 h-5 border rounded-full flex items-center justify-center ${is_accredify === true ? "border-green-500" : "border-gray-300"}`}
                >
                  {is_accredify === true && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                </div>
                <input type="radio" className="hidden" checked={is_accredify === true} onChange={handleYesClick} />
                <span>Yes</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-5 h-5 border rounded-full flex items-center justify-center ${is_accredify === false ? "border-green-500" : "border-gray-300"}`}
                >
                  {is_accredify === false && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                </div>
                <input type="radio" className="hidden" checked={is_accredify === false} onChange={handleNoClick} />
                <span>No</span>
              </label>
            </div>
          </div>

          <p className="text-sm text-[#8E8E93] mb-2">
            Accredify enables users to discover and connect with accredited agents, companies, and service providers,
            streamlining access to trusted services like logistics, bonded warehousing, and terminal operations.
          </p>

          {showServices && (
            <div className="mb-2">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Accredify Services</h4>
                <a href="/" className="text-sm text-gray-500 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Service Descriptions
                </a>
              </div>

              <div className="relative">
                {/* Dropdown button */}
                <div className="border rounded-md cursor-pointer" onClick={toggleDropdown}>
                  <div className="p-3 flex justify-between items-center">
                    <span className="text-gray-500 text-sm">
                      {selectedServices.length > 0
                        ? `${selectedServices.length} service${selectedServices.length > 1 ? "s" : ""} selected`
                        : "Select service type"}
                    </span>
                    <svg
                      className={`w-5 h-5 transition-transform ${isDropdownOpen ? "transform rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Selected services tags */}
                  {selectedServices.length > 0 && (
                    <div className="px-3 pb-3 flex flex-wrap gap-2">
                      {selectedServices.map((service) => (
                        <div
                          key={service}
                          className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full flex items-center"
                        >
                          {service}
                          <button
                            className="ml-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleService(service)
                            }}
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dropdown menu with scrollable container */}
                {isDropdownOpen && (
                  <div className="absolute w-full bg-white shadow-lg z-10 border">
                    <div className="max-h-40 overflow-y-auto scrollbar-hide">
                      {ACCREDIFY_SERVICES.map((service) => (
                        <div
                          key={service}
                          className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          onMouseEnter={() => setHoveredService(service)}
                          onMouseLeave={() => setHoveredService(null)}
                        >
                          <label className="flex items-center w-full cursor-pointer">
                            <div className="relative flex items-center mr-2">
                              <input
                                type="checkbox"
                                className="opacity-0 absolute h-4 w-4 cursor-pointer"
                                checked={selectedServices.includes(service)}
                                onChange={() => toggleService(service)}
                              />
                              <div
                                className={`border h-4 w-4 flex items-center justify-center ${
                                  selectedServices.includes(service)
                                    ? "bg-green-500 border-green-500"
                                    : "border-gray-300 bg-white"
                                }`}
                              >
                                {selectedServices.includes(service) && (
                                  <svg
                                    className="h-3 w-3 text-black"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <span>{service}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

               
                {/* Service description tooltip */}
                {hoveredService && 
                  SERVICE_DESCRIPTIONS[hoveredService] && 
                  isDropdownOpen && 
                  !selectedServices.includes(hoveredService) && (
                  <div className="absolute right-0 top-0 translate-x-full ml-2 z-10 w-64 bg-white p-4 rounded-md shadow-lg border">
                    <h5 className="font-medium mb-2">{hoveredService}</h5>
                    <p className="text-sm text-gray-600">{SERVICE_DESCRIPTIONS[hoveredService]}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleProceed}
            className={`w-full py-3 rounded-md transition ${
              is_accredify !== null
                ? "bg-green-500 text-black hover:bg-green-600"
                : "bg-gray-200 text-white cursor-not-allowed"
            }`}
            disabled={is_accredify === null}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceRequestModal

