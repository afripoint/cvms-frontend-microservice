"use client"

import type React from "react"
import type { PurchaseModalProps } from "../../types"

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, vehicle, onClose, onAddToCart }) => {
  if (!isOpen || !vehicle) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-600">Add to Cart</h2>
          <p className="text-gray-600">
            CVMS Certificate for {vehicle.year} {vehicle.brand} {vehicle.model}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Vehicle:</span>
            <span className="font-medium">
              {vehicle.year} {vehicle.brand} {vehicle.model}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">VIN:</span>
            <span className="font-medium">{vehicle.vin}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Certificate Type:</span>
            <span className="font-medium">CVMS Standard</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
            <span className="text-gray-600">Price:</span>
            <span className="font-bold">$19.99</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onAddToCart}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default PurchaseModal


