import React from "react"

interface ErrorDisplayProps {
  error: string | null
  onDismiss?: () => void
  className?: string
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onDismiss, className = "" }) => {
  if (!error) return null
  
  return (
    <div className={`p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex justify-between items-center ${className}`}>
      <div>{error}</div>
      {onDismiss && (
        <button 
          onClick={onDismiss} 
          className="ml-2 text-red-500 hover:text-red-700"
          aria-label="Dismiss error"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default ErrorDisplay