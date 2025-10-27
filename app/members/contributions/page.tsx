"use client"

import { useState } from "react"
import { mockContributions } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp } from "lucide-react"
import ContributionForm from "@/components/members/contribution-form"

export default function ContributionsPage() {
  const [contributions, setContributions] = useState(mockContributions)
  const [showForm, setShowForm] = useState(false)

  const handleAddContribution = (newContribution: any) => {
    setContributions([...contributions, { ...newContribution, id: Date.now().toString() }])
    setShowForm(false)
  }

  const totalAmount = contributions.reduce((sum, c) => sum + c.amount, 0)
  const completedAmount = contributions.filter((c) => c.status === "completed").reduce((sum, c) => sum + c.amount, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-4 sm:px-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Contributions Tracking</h1>
          <p className="text-muted-foreground mt-2">Monitor your club contributions</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Add Contribution
        </Button>
      </div>

      {showForm && <ContributionForm onSubmit={handleAddContribution} onCancel={() => setShowForm(false)} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">{contributions.length} contributions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{completedAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {contributions.filter((c) => c.status === "completed").length} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <TrendingUp className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₱
              {contributions
                .filter((c) => c.status === "pending")
                .reduce((sum, c) => sum + c.amount, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {contributions.filter((c) => c.status === "pending").length} pending
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contribution History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contributions.map((contribution) => (
              <div
                key={contribution.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{contribution.contributionType}</h4>
                  <p className="text-sm text-muted-foreground">{contribution.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">Date: {contribution.contributionDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">₱{contribution.amount.toLocaleString()}</p>
                  <Badge className={getStatusColor(contribution.status)}>{contribution.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
