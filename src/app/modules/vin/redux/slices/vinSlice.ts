import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { VehicleDetails } from "../../types/index"

interface VinState {
  vinNumber: string
  individualVins: string[]
  multipleVins: string[]
  isProcessingFile: boolean
  isSearching: boolean
  searchResults: VehicleDetails[] | null
  validationError: string | null
  searchError: string | null
  searchMessage: string | null
  showPurchaseModal: boolean
  selectedVehicle: VehicleDetails | null
}



const initialState: VinState = {
  vinNumber: "",
  individualVins: [],
  multipleVins: [],
  isProcessingFile: false,
  isSearching: false,
  searchResults: null,
  validationError: null,
  searchError: null,
  searchMessage: null,
  showPurchaseModal: false,
  selectedVehicle: null,

}

export const vinSlice = createSlice({
  name: "vin",
  initialState,
  reducers: {
    setVinNumber: (state, action: PayloadAction<string>) => {
      state.vinNumber = action.payload
      // Clear validation error when input changes
      state.validationError = null
    },
    addIndividualVin: (state) => {
      if (state.vinNumber.trim() && !state.individualVins.includes(state.vinNumber)) {
        state.individualVins.push(state.vinNumber)
        state.vinNumber = ""
      }
    },
    removeIndividualVin: (state, action: PayloadAction<number>) => {
      state.individualVins = state.individualVins.filter((_, index) => index !== action.payload)
    },
    setMultipleVins: (state, action: PayloadAction<string[]>) => {
      state.multipleVins = action.payload
    },
    setIsProcessingFile: (state, action: PayloadAction<boolean>) => {
      state.isProcessingFile = action.payload
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload
    },
    setValidationError: (state, action: PayloadAction<string | null>) => {
      state.validationError = action.payload
    },
    setSearchError: (state, action: PayloadAction<string | null>) => {
      state.searchError = action.payload
    },
    setSearchMessage: (state, action: PayloadAction<string | null>) => {
      state.searchMessage = action.payload
    },
    setSearchResults: (state, action: PayloadAction<VehicleDetails[] | null>) => {
      state.searchResults = action.payload
    },
    setSelectedVehicle: (state, action: PayloadAction<VehicleDetails | null>) => {
      state.selectedVehicle = action.payload
    },
    setShowPurchaseModal: (state, action: PayloadAction<boolean>) => {
      state.showPurchaseModal = action.payload
    },
    clearVins: (state) => {
      state.vinNumber = ""
      state.individualVins = []
      state.multipleVins = []
      state.searchResults = null
      state.selectedVehicle = null
      state.validationError = null
      state.searchError = null
      state.searchMessage = null
    },
    clearSearchResults: (state) => {
      state.searchResults = null
      state.selectedVehicle = null
      state.searchError = null
      state.searchMessage = null
    },
  },
})

export const {
  setVinNumber,
  setMultipleVins,
  setIsProcessingFile,
  setIsSearching,
  setValidationError,
  setSearchError,
  setSearchMessage,
  setSearchResults,
  setSelectedVehicle,
  setShowPurchaseModal,
  clearVins,
  clearSearchResults,
  addIndividualVin,
  removeIndividualVin,
} = vinSlice.actions

export default vinSlice.reducer

