"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import type { CTAButtonProps } from "../../../types/hero"
import { useAuth } from "../../../hooks/useAuth" // Updated import path to match your project structure

const CTAButton: React.FC<CTAButtonProps> = ({ text = "Get Started", onClick }) => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth() // Get authentication status directly

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      // Redirect based on authentication status
      if (isLoggedIn) {
        navigate("/vin")
      } else {
        navigate("/account-type")
      }
    }
  }

  return (
    <button
      className="px-10 py-3 text-base font-semibold text-black bg-[#34C759] rounded cursor-pointer duration-[0.3s] ease-[ease] transition-[background-color] hover:bg-green-600 max-sm:px-8 max-sm:py-3 max-sm:text-sm"
      aria-label={text}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

export default CTAButton