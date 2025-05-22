import { useSelector, useDispatch } from "react-redux"
import { Loader2 } from "lucide-react"

import AgencyCard from "./AgencyCard"
import { RootState } from "../../../core/store"
import { setSortBy } from "../redux/slices/agencySlice"

const RecommendedAgencies = () => {
  const { agencies, filteredAgencies, sortBy, currentPage, loading } = useSelector((state: RootState) => state.agencies)
  const dispatch = useDispatch()
  
  // Use filtered agencies if available, otherwise use all agencies
  const displayAgencies = filteredAgencies.length > 0 ? filteredAgencies : agencies
  
  // Simple pagination - show 6 items per page
  const startIndex = (currentPage - 1) * 6
  const endIndex = startIndex + 6
  const paginatedAgencies = displayAgencies.slice(startIndex, endIndex)
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value))
  }

  return (
    <div className="mb-6 max-w-3xl m-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <h3 className="font-semibold text-xl">Recommended Agencies</h3>
          <span className="ml-2 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
            {displayAgencies.length}
          </span>
        </div>

        <div className="flex items-center">
          <span className="text-xs text-gray-500 mr-2">Sort by:</span>
          <select 
            className="text-xs border-gray-300 rounded-md py-1" 
            value={sortBy}
            onChange={handleSortChange}
            disabled={loading}
          >
            <option value="last-updated">Last updated</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <span className="ml-2 text-gray-600">Searching for agencies...</span>
        </div>
      ) : paginatedAgencies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedAgencies.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No agencies found matching your criteria. Please try different search filters.</p>
        </div>
      )}
    </div>
  )
}

export default RecommendedAgencies