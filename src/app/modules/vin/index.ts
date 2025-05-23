// Export main page
export { default as VinSearchPage } from "../../pages/vin/VinCheckPage"

// Export components
export { default as VinSearchSection } from "./components/search/VinSearchSection"
export { default as ProcessSteps } from "./components/search/ProcessStep"
export { default as VinSearchResults } from "./components/result/VinSearchResults"
//export { default as VehicleTeaserResult } from "./components/result/VehicleTeaserResult"
export { default as MultipleVinModal } from "./components/modal/MultipleVinModal"
export { default as MultipleVinListModal } from "./components/modal/MultipleVinListModal"
export { default as PurchaseModal } from "./components/modal/PurchaseModal"

// Export hooks
export { useVinSearch } from "./hook/useVinSearch"

// Export services
export * from "./services/excelService"
export * from "./services/validationService"
export * from "./services/vinApiService"

// Export types
export * from "./types/index"

// Export store
export * from "./redux/slices/vinSlice"

