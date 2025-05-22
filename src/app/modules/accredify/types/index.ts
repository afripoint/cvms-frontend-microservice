export interface Agency {
    id: string
    name: string
    rating: number
    status: string
    location: string
    services: string[]
  }
  
  export interface SearchFilters {
    category: string
    location: string
    service: string
  }
  
  export interface AgencyState {
    agencies: Agency[]
    filteredAgencies: Agency[]
    searchFilters: SearchFilters
    loading: boolean
    error: string | null
    currentPage: number
    totalPages: number
    sortBy: string
  }
  