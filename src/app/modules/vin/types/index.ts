// import type React from "react"

// export interface VehicleDetails {
//   id?: string
//   vin: string
//   brand: string
//   model: string
//   engine_type: string
//   vreg?: string
//   // vehicle_type?: string
//   payment_status?: string
//   country: string
//   manufacturer:string
//   class: string
//   region: string
//   wmi: string
//   vds: string
//   vis: string
//   year: string
  
// }

// // Modal props types
// export interface MultipleVinModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onUploadComplete?: () => void
// }

// export interface PurchaseModalProps {
//   isOpen: boolean
//   vehicle: VehicleDetails | null
//   onClose: () => void
//   onAddToCart: () => void
// }

// export interface MultipleVinListModalProps {
//   isOpen: boolean
//   vins: string[]
//   onClose: () => void
//   onSearch: () => void
// }

// // Component props types
// export interface VinSearchSectionProps {
//   vinNumber: string
//   individualVins: string[]
//   validationError: string | null
//   isSearching: boolean
//   handleVinChange: (e: React.ChangeEvent<HTMLInputElement>) => void
//   handleAddVin: () => void
//   handleRemoveVin: (index: number) => void
//   handleSearch: () => void
//   toggleMultipleVin: () => void
// }

// export interface VinSearchResultsProps {
//   searchResults: VehicleDetails[]
//   onPurchase: (vehicle: VehicleDetails) => void
//   onNewSearch: () => void
// }

// // export interface VehicleTeaserResultProps {
// //   vehicle: VehicleDetails
// //   onPurchase: () => void
// //   onNewSearch: () => void
// //   totalEntries?: number // Add this optional prop
// // }

// export interface ErrorMessageProps {
//   message: string
//   onRetry?: () => void
// }

// export interface ApiResponse {
//   success: boolean
//   data?: VehicleDetails | VehicleDetails[]
//   error?: string
// }




import type React from "react"

export interface VehicleDetails {
  id?: string
  vin: string
  brand: string
  model: string
  engine_type: string
  vreg?: string
  // vehicle_type?: string
  payment_status?: string
  country: string
  manufacturer:string
  class: string
  region: string
  wmi: string
  vds: string
  vis: string
  year: string
  
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

// Updated interface to match actual implementation
export interface VinSearchResultsProps {
  searchResults: VehicleDetails[]
  onNewSearch: () => void
}

export interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export interface ApiResponse {
  success: boolean
  data?: VehicleDetails | VehicleDetails[]
  error?: string
}