"use client"

import type React from "react"
import type { FormInputProps } from "../../../types/contact"

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  placeholder,
  required = false,
  optional = false,
  value,
  onChange,
  error,
}) => (
  <div className="flex flex-col flex-1 gap-1">
    <label className="flex gap-px items-center text-xs font-medium leading-5 text-slate-800">
      <span>{label}</span>
      {required && (
        <span className="text-xs font-medium text-red-500" aria-hidden="true">
          *
        </span>
      )}
      {optional && <span className="ml-1 text-xs text-gray-500">(Optional)</span>}
    </label>
    <div
      className={`flex items-center px-3 py-2 h-10 bg-white rounded-lg border ${error ? "border-red-500" : "border-gray-300"} border-solid shadow-sm`}
    >
      <input
        type={type}
        placeholder={placeholder}
        className="w-full text-xs leading-5 text-gray-600 border-[none] focus:outline-none"
        required={required}
        aria-required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
)

export default FormInput

