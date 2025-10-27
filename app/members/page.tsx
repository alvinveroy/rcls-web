"use client"

import { useAuth } from "@/hooks/use-auth"
import DashboardOverview from "@/components/members/dashboard-overview"

export default function MembersDashboard() {
  const { user } = useAuth()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.firstName}!</h1>
        <p className="text-muted-foreground mt-2">Here's your club activity overview</p>
      </div>
      <DashboardOverview />
    </div>
  )
}
