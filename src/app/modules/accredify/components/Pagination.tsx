"use client"

import { useSelector, useDispatch } from "react-redux"
import { ChevronRight } from "lucide-react"
import { RootState } from "../../../core/store"
import { setCurrentPage } from "../redux/slices/agencySlice"

const Pagination = () => {
  const { currentPage, totalPages } = useSelector((state: RootState) => state.agencies)
  const dispatch = useDispatch()

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  return (
    <div className="flex items-center justify-center space-x-1">
      <div className="text-sm text-gray-500 mr-2">
        Page {currentPage} of {totalPages}
      </div>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
            currentPage === i + 1 ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}

export default Pagination
