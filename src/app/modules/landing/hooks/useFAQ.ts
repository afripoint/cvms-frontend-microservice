import { useState } from "react"
import { CategoryTab, FAQ } from "../types/faq"
import { faqData } from "../components/layout/components/faqData"


export function useFAQ(initialCategory: CategoryTab = "General") {
  const [activeCategory, setActiveCategory] = useState<CategoryTab>(initialCategory)
  
  const currentFAQs = faqData[activeCategory] || []
  
  const changeCategory = (category: CategoryTab) => {
    setActiveCategory(category)
  }
  
  const getFAQsByCategory = (category: CategoryTab): FAQ[] => {
    return faqData[category] || []
  }
  
  const searchFAQs = (query: string): FAQ[] => {
    if (!query.trim()) return currentFAQs
    
    const lowercaseQuery = query.toLowerCase()
    return currentFAQs.filter(faq => 
      faq.question.toLowerCase().includes(lowercaseQuery)
    )
  }
  
  return {
    activeCategory,
    currentFAQs,
    changeCategory,
    getFAQsByCategory,
    searchFAQs
  }
}