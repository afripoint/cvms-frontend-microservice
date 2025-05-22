import React from "react"

export interface FAQ {
  id: number
  question: string
  answer: React.ReactNode
  isOpen?: boolean
}

export interface FAQCategoryData {
  [key: string]: FAQ[]
}

export type CategoryTab = "General" | "Account" | "Payment" | "Certificates & Reports" | "Support & Troubleshooting" | "Others"

export const FAQ_CATEGORIES: CategoryTab[] = [
  "General",
  "Account", 
  "Payment",
  "Certificates & Reports",
  "Support & Troubleshooting",
  "Others",
]