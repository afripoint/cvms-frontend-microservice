import React from "react"
import { cn } from "../../../vin/utils/utils"

interface AlertProps {
  variant?: "default" | "destructive"
  className?: string
  children: React.ReactNode
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-lg border p-4",
          {
            "bg-background text-foreground": variant === "default",
            "border-destructive/50 text-destructive bg-destructive/10": variant === "destructive",
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Alert.displayName = "Alert"

