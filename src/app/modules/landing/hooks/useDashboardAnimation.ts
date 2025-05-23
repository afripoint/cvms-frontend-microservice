"use client"

import { useState, useEffect } from "react"

export const useDashboardAnimation = () => {
  const [isSliding, setIsSliding] = useState(false)

  useEffect(() => {
    // Initial animation delay
    const initialTimer = setTimeout(() => {
      setIsSliding(true)
    }, 100)

    // Set up interval for repeating animation
    const intervalId = setInterval(() => {
      setIsSliding(false)

      // Small delay before sliding back up
      setTimeout(() => {
        setIsSliding(true)
      }, 500)
    }, 5000) // Repeat every 5 seconds

    // Clean up timers on unmount
    return () => {
      clearTimeout(initialTimer)
      clearInterval(intervalId)
    }
  }, [])

  return { isSliding }
}

