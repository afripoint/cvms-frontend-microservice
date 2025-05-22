"use client"

import type React from "react"
import { useState } from "react"
import type { PhoneInputProps } from "../../../types/contact"

import { countryCodes } from "../../../constants/contact"
import { ArrowDownIcon, NigeriaFlag } from "../../../../shared/components/icons/icons"

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, error }) => {
  const [countryCode, setCountryCode] = useState("+234")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleCountryCodeChange = (code: string) => {
    setCountryCode(code)
    setIsDropdownOpen(false)
  }

  const renderFlag = (flagCode: string) => {
    if (flagCode === "nigeria") {
      return <NigeriaFlag/>
    }
    // Add other flag components as needed
    return <span>{flagCode === "us" ? "🇺🇸" : flagCode === "uk" ? "🇬🇧" : flagCode === "france" ? "🇫🇷" : "🌐"}</span>
  }

  return (
    <div className="flex flex-col flex-1 gap-1 relative">
      <label className="flex gap-px items-center text-xs font-medium leading-5 text-slate-800">
        <span>Phone Number</span>
        <span className="text-xs font-medium text-red-500" aria-hidden="true">
          *
        </span>
      </label>
      <div
        className={`flex h-10 bg-white rounded-lg border ${error ? "border-red-500" : "border-gray-300"} border-solid shadow-sm`}
      >
        <button
          type="button"
          className="flex gap-1 items-center py-2 pr-1.5 pl-2 bg-white border-r border-solid border-r-gray-300"
          aria-label="Select country code"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {renderFlag(countryCodes.find((c) => c.code === countryCode)?.flag || "globe")}
          <span className="text-xs leading-5 text-slate-800">{countryCode}</span>
          <ArrowDownIcon/>
        </button>
        <input
          type="tel"
          placeholder="(555) 000-0000"
          className="w-full text-xs leading-5 text-gray-600 border-[none] pl-2 focus:outline-none"
          required
          aria-required="true"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg border border-gray-200 shadow-lg z-10">
          {countryCodes.map((country) => (
            <button
              key={country.code}
              type="button"
              className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-gray-50"
              onClick={() => handleCountryCodeChange(country.code)}
            >
              {renderFlag(country.flag)}
              <span>{country.name}</span>
              <span className="ml-auto text-gray-500">{country.code}</span>
            </button>
          ))}
        </div>
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default PhoneInput

