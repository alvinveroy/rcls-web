"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockContributions, mockPayments, mockAttendance } from "@/lib/mock-data"
import { TrendingUp, CreditCard, Calendar, Users } from "lucide-react"

export default function DashboardOverview() {
  const totalContributions = mockContributions.reduce((sum, c) => sum + c.amount, 0)
  const totalPayments = mockPayments.reduce((sum, p) => sum + p.amount, 0)
  const totalHours = mockAttendance.reduce((sum, a) => sum + a.hoursVolunteered, 0)

  const stats = [
    {
      title: "Total Contributions",
      value: `₱${totalContributions.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Total Payments",
      value: `₱${totalPayments.toLocaleString()}`,
      icon: CreditCard,
      color: "text-blue-600",
    },
    {
      title: "Volunteer Hours",
      value: totalHours.toFixed(1),
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      title: "Active Members",
      value: "4",
      icon: Users,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">Club activity</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
