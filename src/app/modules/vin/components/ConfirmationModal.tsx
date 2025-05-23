"use client"

import type React from "react"
import { VehicleDetails } from "../types"


interface ConfirmationModalProps {
  isOpen: boolean
  vehicle: VehicleDetails | null
  onClose: () => void
  onConfirm: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, vehicle, onClose, onConfirm }) => {
  if (!isOpen || !vehicle) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Confirm Add to Cart</h2>
        
        <div className="mb-6">
          <p className="mb-3">Are you sure you want to add this vehicle to your cart?</p>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">VIN:</span>
              <span className="font-medium">{vehicle.vin}</span>
            </div>
            {vehicle.manufacturer && vehicle.model && (
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Vehicle:</span>
                <span className="font-medium">
                  {vehicle.year} {vehicle.manufacturer} {vehicle.model}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md"
          >
            Yes, Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal