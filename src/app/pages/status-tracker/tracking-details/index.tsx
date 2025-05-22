"use client"

import React from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Bell } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../../core/store/hooks"
import { searchTracking } from "../../../modules/status-tracker/redux/slices/trackingSlice"
import { MainLayout } from "../../../modules/landing/components/layout"

const TrackingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { trackingData, loading, error } = useAppSelector((state) => state.tracking)

  useEffect(() => {
    if (id) {
      dispatch(searchTracking(id))
    }
  }, [dispatch, id])

  // Define the tracking stages
  const stages = [
    { name: "Terminal", icon: "/icons/terminal.svg", completed: true },
    { name: "Warehouse", icon: "/icons/warehouse.svg", completed: true, current: true },
    { name: "Inspection", icon: "/icons/inspection.svg", completed: false },
    { name: "Payment", icon: "/icons/payment.svg", completed: false },
    { name: "Release", icon: "/icons/release.svg", completed: false },
    { name: "Transportation", icon: "/icons/transportion.svg", completed: false },
  ]

  // Get the appropriate vehicle image based on the product description
  const getVehicleImage = (description: string) => {
    if (description.toLowerCase().includes("mercedes")) {
      return "/images/status-tracker.svg"
    } else if (description.toLowerCase().includes("bmw")) {
      return "/images/status-tracker.svg"
    } else if (description.toLowerCase().includes("toyota")) {
      return "/images/status-tracker.svg"
    } else if (description.toLowerCase().includes("ford")) {
      return "/images/status-tracker.svg"
    } else {
      return "/images/status-tracker.svg" // Default image
    }
  }

  return (
    <MainLayout>
      <main className="flex-1 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-600">TRACK YOUR SHIPMENT</h1>
            <div className="w-full h-0.5 bg-gray-200 mt-2"></div>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
          )}

          {error && <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>}

          {!loading && !error && trackingData && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <h2 className="text-xl font-bold">SHIPMENT #{trackingData.shipmentId}</h2>
                  <p className="text-gray-600">Tracking ID: {trackingData.trackingId}</p>
                </div>
                <div className="flex justify-items-start mr-96">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                    {trackingData.status}
                  </span>
                </div>
                <button className="flex items-center gap-2 text-red-500 border border-red-500 rounded-md px-4 py-2 hover:bg-red-50 transition-colors">
                  <Bell size={16} />
                  <span>Request status updates & notifications</span>
                </button>
              </div>

              {/* Progress Tracker */}
              <div className="relative mt-12 mb-16">
                <div className="flex justify-between items-center">
                  {stages.map((stage, index) => (
                    <div key={index} className="flex flex-col items-center relative z-10">
                      {stage.name === trackingData.currentStage ? (
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white mb-2">
                          <img src={stage.icon} alt={stage.name} className="w-15 h-15" />
                        </div>
                      ) : (
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                            stage.completed
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-500 border-2 border-dashed border-gray-300"
                          }`}
                        >
                          <img src={stage.icon} alt={stage.name} className="w-15 h-15" />
                        </div>
                      )}
                      <span className="text-sm font-medium">{stage.name}</span>
                    </div>
                  ))}
                </div>
                {/* Progress Line */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-300" style={{ zIndex: 0 }}>
                  <div className="h-full bg-green-500" style={{ width: "25%" }}></div>
                </div>
              </div>

              {/* Sender and Receiver Information */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold mb-2">Sender's:</h3>
                  <p className="font-medium">{trackingData.sender.name}</p>
                  <p className="text-gray-600">{trackingData.sender.address}</p>
                  <p className="text-gray-600">
                    {trackingData.sender.city}, {trackingData.sender.state} {trackingData.sender.zip}
                  </p>
                  <p className="text-gray-600">{trackingData.sender.country}</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Receiver:</h3>
                  <p className="font-medium">{trackingData.receiver.name}</p>
                  <p className="text-gray-600">{trackingData.receiver.address}</p>
                  <p className="text-gray-600">
                    {trackingData.receiver.city}, {trackingData.receiver.state}
                  </p>
                  <p className="text-gray-600">{trackingData.receiver.country}</p>
                </div>
              </div>

              <div className="w-full h-0.5 bg-gray-200 my-6"></div>

              {/* Shipment Details */}
              <div>
                <h3 className="font-bold text-xl mb-4">Shipment Detail</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                    <img
                      src={getVehicleImage(trackingData.product.description)}
                      alt={trackingData.product.description}
                      className="w-70 h-auto object-cover rounded-md mb-4"
                    />
                    <div className="mt-4">
                      <p className="font-semibold text-lg">{trackingData.product.type}</p>
                      <p className="text-gray-700">{trackingData.product.description}</p>
                    </div>
                  </div>
                  {/* <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                    <h4 className="font-semibold text-lg mb-3">Vehicle Details</h4>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 font-medium">Make</td>
                          <td className="py-2 text-gray-700">
                            {trackingData.product.description.split(' ')[1] || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 font-medium">Color</td>
                          <td className="py-2 text-gray-700">
                            {trackingData.product.description.split(' ')[0] || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 font-medium">Status</td>
                          <td className="py-2 text-gray-700">{trackingData.status}</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Current Stage</td>
                          <td className="py-2 text-gray-700">{trackingData.currentStage}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </MainLayout>
  )
}

export default TrackingDetails