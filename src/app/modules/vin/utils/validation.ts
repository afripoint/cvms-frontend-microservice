import type React from "react"
export interface VehicleDetails {
  id?: string
  vin: string
  make: string
  model: string
  year: number
  status: string
  bodyType?: string
  color?: string
  engineSize?: string
  fuelType?: string
}

// Modal props types
export interface MultipleVinModalProps {
  isOpen: boolean
  onClose: () => void
  onUploadComplete?: () => void
}

export interface PurchaseModalProps {
  isOpen: boolean
  vehicle: VehicleDetails | null
  onClose: () => void
  onAddToCart: () => void
}

export interface MultipleVinListModalProps {
  isOpen: boolean
  vins: string[]
  onClose: () => void
  onSearch: () => void
}

// Component props types
export interface VinSearchSectionProps {
  vinNumber: string
  individualVins: string[]
  validationError: string | null
  isSearching: boolean
  handleVinChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAddVin: () => void
  handleRemoveVin: (index: number) => void
  handleSearch: () => void
  toggleMultipleVin: () => void
}

export interface VinSearchResultsProps {
  searchResults: VehicleDetails[]
  onPurchase: (vehicle: VehicleDetails) => void
  onNewSearch: () => void
}

// export interface VehicleTeaserResultProps {
//   vehicle: VehicleDetails
//   onPurchase: () => void
//   onNewSearch: () => void
// }

export interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export interface ApiResponse {
  success: boolean
  data?: VehicleDetails | VehicleDetails[]
  error?: string
}

