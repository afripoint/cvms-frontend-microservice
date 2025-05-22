import { CategoryTab, FAQ_CATEGORIES } from "../../../types/faq"


interface CategoryTabsProps {
  activeTab: CategoryTab
  onTabChange: (tab: CategoryTab) => void
}

export function CategoryTabs({ activeTab, onTabChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {FAQ_CATEGORIES.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded-full ${
            activeTab === tab 
              ? "bg-[#2a9f47] text-white font-medium" 
              : "text-[#262626] hover:bg-gray-100"
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}