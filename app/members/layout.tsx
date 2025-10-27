"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import MembersSidebar from "@/components/members/sidebar"
import MembersHeader from "@/components/members/header"

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    router.push("/members/login")
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <MembersSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MembersHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
