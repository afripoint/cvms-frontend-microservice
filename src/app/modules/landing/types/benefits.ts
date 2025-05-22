import type React from "react"

export interface Benefit {
  text: string
}

export interface WorkflowStep {
  id: number
  title: string
  description: string
  icon: string
}

// Update CardProps to include title and description
export interface CardProps {
  className?: string
  children?: React.ReactNode
  title?: string
  description?: string
}

export interface CardHeaderProps {
  className?: string
  children: React.ReactNode
}

export interface CardTitleProps {
  className?: string
  children: React.ReactNode
}

export interface CardContentProps {
  className?: string
  children: React.ReactNode
}

// Add a specific interface for the cards in CardBenefits
export interface BenefitCardProps {
  title: string
  description: string
}

