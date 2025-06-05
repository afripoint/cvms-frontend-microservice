"use client"

import { useState, useEffect, useCallback } from "react"
import type { User } from "../types/auth"

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<User>({})

  // Use useCallback to make the function stable for dependency arrays
  const checkLoginStatus = useCallback(() => {
    const accessToken = localStorage.getItem("access_token")
    const expiresAt = localStorage.getItem("expires_at")

    if (accessToken && expiresAt && Number(expiresAt) > new Date().getTime()) {
      // Get user data from localStorage
      const userDataStr = localStorage.getItem("user")
      if (userDataStr) {
        try {
          const parsedUserData = JSON.parse(userDataStr) as User
          if (parsedUserData && parsedUserData.first_name && parsedUserData.last_name) {
            setUserData(parsedUserData)
            setIsLoggedIn(true)
            return
          }
        } catch (error) {
          console.error("Error parsing user data", error)
        }
      }
    }
    
    // If any condition fails, ensure logged out state
    setIsLoggedIn(false)
    setUserData({})
  }, [])

  useEffect(() => {
    checkLoginStatus()
    
    // Add event listener for storage changes (for multi-tab support)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "access_token" || e.key === "user" || e.key === null) {
        checkLoginStatus()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [checkLoginStatus])

  const signOut = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("expires_at")
    localStorage.removeItem("user")
    localStorage.removeItem("csrf_token")

    // Update state
    setIsLoggedIn(false)
    setUserData({})
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event("userSignedOut"))
  }, [])

  return {
    isLoggedIn,
    userData,
    signOut,
    checkLoginStatus,
  }
}