"use client"

import type React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../../../../../core/store"

const CartIcon: React.FC = () => {
  const { items = [] } = useSelector((state: RootState) => {
    // Make sure cart exists and has items property
    return state.cart && typeof state.cart === "object"
      ? (state.cart as { items: Array<{ id: string; quantity: number }> })
      : { items: [] }
  })
  const navigate = useNavigate()

  const itemCount = items.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0)

  return (
    <button
      onClick={() => navigate("/cart")}
      className="relative p-2 text-black hover:bg-gray-100 rounded-full"
      aria-label="Shopping cart"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>

      {itemCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full">
          {itemCount}
        </span>
      )}
    </button>
  )
}

export default CartIcon

