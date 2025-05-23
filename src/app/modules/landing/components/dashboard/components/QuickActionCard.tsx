import type React from "react"
import type { QuickActionProps } from "../../../types/dashboard"

const QuickActionCard: React.FC<QuickActionProps> = ({ icon, title }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white border border-white rounded-lg p-4 flex flex-col items-center text-center cursor-pointer hover:bg-gray-100 transition-colors">
      <div className="mb-2">{icon}</div>
      <span className="text-xs font-medium">{title}</span>
    </div>
  )
}

export default QuickActionCard

