import type React from "react"
import QuickActionCard from "./QuickActionCard"
import CircleIcon from "../../../../shared/components/icons/CircleIcon"
import DocumentIcon from "../../../../shared/components/icons/DocumentIcon"
import CheckCircleIcon from "../../../../shared/components/icons/CheckCircleIcon"
import SearchIcon from "../../../../shared/components/icons/SearchIcon"

const DashboardHeader: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto shadow-lg">
      <div className="bg-gray-100 p-6 rounded-b-md">
        <div className="mb-3">
          <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-4">
            <QuickActionCard icon={<CircleIcon color="#FF6B6B" />} title="VIN Verification History" />
            <QuickActionCard icon={<DocumentIcon color="#4CAF50" />} title="Transaction History" />
            <QuickActionCard icon={<CheckCircleIcon color="#FFD700" />} title="Verification Status" />
            <QuickActionCard icon={<SearchIcon color="#3498DB" />} title="Completed VIN Searches" />
          </div>
      </div>
    </div>
    </div>
  )
}

export default DashboardHeader

