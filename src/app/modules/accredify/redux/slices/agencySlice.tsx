import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AgencyState, Agency } from "../../types/index"

const initialState: AgencyState = {
  agencies: [
    {
      id: "1",
      name: "Venecia & Co Warehouses",
      rating: 4,
      status: "Accredify",
      location: "Apapa, Lagos",
      services: ["General Trading", "Cold Storage", "High-Value Goods Storage"],
    },
    {
      id: "2",
      name: "Golden Gate Customs Brokers",
      rating: 5,
      status: "Expired",
      location: "Tema, Lagos",
      services: ["Customs Brokerage", "Freight Forwarding", "Documentation"],
    },
    {
      id: "3",
      name: "Horizon Bonded Terminals",
      rating: 4,
      status: "Expired",
      location: "Onne, Port Harcourt",
      services: ["Compliance Management", "Cargo Handling", "Storage Solutions"],
    },
    {
      id: "4",
      name: "Pacific Trade Services",
      rating: 5,
      status: "Accredify",
      location: "Apapa, Lagos",
      services: ["Customs Brokerage", "High-Value Goods Storage", "Compliance Management"],
    },
    {
      id: "5",
      name: "Alpha Logistics Partners",
      rating: 4,
      status: "Expired",
      location: "Tema, Lagos",
      services: ["Freight Forwarding", "Documentation", "General Trading"],
    },
    {
      id: "6",
      name: "Maritime Express Agency",
      rating: 5,
      status: "Accredify",
      location: "Onne, Port Harcourt",
      services: ["Cold Storage", "Cargo Handling", "Customs Brokerage"],
    },
  ],
  filteredAgencies: [],
  searchFilters: {
    category: "",
    location: "",
    service: "",
  },
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 6,
  sortBy: "last-updated",
}

const agencySlice = createSlice({
  name: "agencies",
  initialState,
  reducers: {
    setSearchFilters: (state, action: PayloadAction<{ type: string; value: string }>) => {
      const { type, value } = action.payload
      state.searchFilters = {
        ...state.searchFilters,
        [type]: value,
      }
    },
    startSearch: (state) => {
      state.loading = true;
    },
    searchComplete: (state, action: PayloadAction<Agency[]>) => {
      state.filteredAgencies = action.payload;
      state.totalPages = Math.max(1, Math.ceil(action.payload.length / 6));
      state.currentPage = 1;
      state.loading = false;
    },
    searchAgencies: (state) => {
      // Filter agencies based on search criteria
      let results = [...state.agencies];
      
      if (state.searchFilters.category) {
        // For demo purposes, just filter by some criteria since we don't have category in the data model
        // In a real app, you would match this to actual agency categories
      }
      
      if (state.searchFilters.location) {
        results = results.filter(agency => 
          agency.location === state.searchFilters.location
        );
      }
      
      if (state.searchFilters.service) {
        results = results.filter(agency => 
          agency.services.includes(state.searchFilters.service)
        );
      }
      
      state.filteredAgencies = results;
      state.totalPages = Math.max(1, Math.ceil(results.length / 6));
      state.currentPage = 1;
      state.loading = false;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload
      
      // Sort the filtered agencies based on sortBy value
      const agenciesToSort = state.filteredAgencies.length > 0 ? state.filteredAgencies : state.agencies;
      
      if (state.sortBy === "name") {
        state.filteredAgencies = [...agenciesToSort].sort((a, b) => a.name.localeCompare(b.name));
      } else if (state.sortBy === "rating") {
        state.filteredAgencies = [...agenciesToSort].sort((a, b) => b.rating - a.rating);
      }
      // For "last-updated" we can't sort without that data, so we'll skip it
    },
  },
})

export const { 
  setSearchFilters, 
  searchAgencies, 
  setCurrentPage, 
  setSortBy,
  startSearch,
  searchComplete
} = agencySlice.actions

export default agencySlice.reducer