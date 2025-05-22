export const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token")
}

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refresh_token")
}

export const isAccessTokenExpired = (): boolean => {
  const expiresAt = localStorage.getItem("expires_at")
  if (!expiresAt) return true

  return new Date().getTime() > Number.parseInt(expiresAt)
}

export const refreshAccessToken = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return false

  try {
    const response = await fetch("/api/auth/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    if (!response.ok) throw new Error("Token refresh failed")

    const data = await response.json()

    // Update tokens
    localStorage.setItem("access_token", data.access_token)
    const expiresAt = new Date().getTime() + 60 * 60 * 1000 // 1 hour from now
    localStorage.setItem("expires_at", expiresAt.toString())

    return true
  } catch (error) {
    console.error("Error refreshing token:", error)
    return false
  }
}

export const getCsrfToken = (): string | null => {
  return localStorage.getItem("csrf_token")
}

export const isNinVerified = (): boolean => {
  const user = localStorage.getItem("user")
  if (!user) return false

  try {
    const userData = JSON.parse(user)
    return userData["NIN Verified"] === true
  } catch (e) {
    return false
  }
}

export const clearAuthData = (): void => {
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  localStorage.removeItem("expires_at")
  localStorage.removeItem("user")
  localStorage.removeItem("csrf_token")
}

