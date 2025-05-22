import type React from "react"
// Dashboard related types
export interface Transaction {
  id: string
  products: string
  date: string
  amount: string
  status: "completed" | "pending" | "failed"
}

export interface Feature {
  title: string
  description: string
  icon: React.ReactNode
}

export interface QuickActionProps {
  icon: React.ReactNode
  title: string
}

