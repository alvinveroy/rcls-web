"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useSidebar } from "@/hooks/useSidebar"
import { SidebarProvider } from "@/hooks/useSidebar"
import MembersSidebar from "@/components/members/sidebar"
import MembersHeader from "@/components/members/header"
import { cn } from "@/lib/utils"

function MembersLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, loading } = useAuth()
  const { isCollapsed, isSidebarOpen, isMobile, toggleSidebar } = useSidebar()
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
    router.push("/login")
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <MembersSidebar />
      
      {/* Mobile backdrop overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          !isMobile && (isCollapsed ? "ml-12" : "ml-64")
        )}
      >
        <MembersHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <MembersLayoutContent>{children}</MembersLayoutContent>
    </SidebarProvider>
  )
}
