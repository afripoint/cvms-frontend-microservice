"use client"

import { SearchIcon, MapPin, Loader2 } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { setSearchFilters, searchAgencies, startSearch } from "../../accredify/redux/slices/agencySlice"
import { RootState } from "../../../core/store"

const categories = ["Customs Agency Brokers", "Bonded Warehouses", "Bonded Yards & Terminals"]

const locations = ["Tema, Lagos", "Onne, Port Harcourt", "Apapa, Lagos"]

const services = ["Customs Brokerage", "Freight Forwarding", "Compliance Management", "General Trading", "Cold Storage", "High-Value Goods Storage", "Documentation", "Cargo Handling", "Storage Solutions"]

const AgencySearch = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state: RootState) => state.agencies)

  const handleFilterChange = (type: string, value: string) => {
    dispatch(setSearchFilters({ type, value }))
  }

  const handleSearch = () => {
    // First set loading state
    dispatch(startSearch())
    
    // Simulate a delay to show loading state (in real app, this would be an API call)
    setTimeout(() => {
      dispatch(searchAgencies())
    }, 1000)
  }

  return (
    <div className="bg-green-600 py-20 mb-8 relative">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-center">
          <h2 className="text-white text-2xl font-medium mx-auto">Let's Find You Accredited Agencies</h2>
        </div>
        <div className="hidden md:block absolute right-56 top-14">
          <img src="/images/search-insights.svg" alt="Search" className="w-32 h-32 opacity-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">
                <SearchIcon size={16} />
              </span>
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 text-base bg-[#FFFFFF66]  border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              onChange={(e) => handleFilterChange("category", e.target.value)}
              disabled={loading}
            >
              <option value="">Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">
                <MapPin size={16} />
              </span>
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 text-base bg-[#FFFFFF66] border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              onChange={(e) => handleFilterChange("location", e.target.value)}
              disabled={loading}
            >
              <option value="">Location/Region</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">
                <SearchIcon size={16} />
              </span>
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 text-base bg-[#FFFFFF66] border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              onChange={(e) => handleFilterChange("service", e.target.value)}
              disabled={loading}
            >
              <option value="">Services</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-white hover:bg-white text-green-700 w-32 flex items-center justify-center mx-auto md:mx-0 font-medium py-1 px-4 rounded-md disabled:opacity-70"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AgencySearch