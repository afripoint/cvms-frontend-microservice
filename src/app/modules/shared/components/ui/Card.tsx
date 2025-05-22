import type React from "react"
import type { CardProps, CardHeaderProps, CardTitleProps, CardContentProps } from "../../../landing/types/benefits"

export const Card: React.FC<CardProps> = ({ className, children }) => (
  <div className={`rounded-lg ${className || ""}`}>{children}</div>
)

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children }) => (
  <div className={`${className || ""}`}>{children}</div>
)

export const CardTitle: React.FC<CardTitleProps> = ({ className, children }) => (
  <h3 className={`${className || ""}`}>{children}</h3>
)

export const CardContent: React.FC<CardContentProps> = ({ className, children }) => (
  <div className={`${className || ""}`}>{children}</div>
)

