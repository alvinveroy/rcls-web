"use client"

import { useEffect, useState } from "react"
import type { User } from "@/lib/auth"
import { getCurrentUser } from "@/lib/auth"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

        if (token) {
          const currentUser = await getCurrentUser(token)
          if (currentUser) {
            setUser(currentUser)
            setIsAuthenticated(true)
          } else {
            setIsAuthenticated(false)
            localStorage.removeItem("auth_token")
            localStorage.removeItem("user")
          }
        } else {
          setIsAuthenticated(false)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Authentication error")
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  return { user, loading, isAuthenticated, error }
}
