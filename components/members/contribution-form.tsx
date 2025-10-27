"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ContributionFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function ContributionForm({ onSubmit, onCancel }: ContributionFormProps) {
  const [formData, setFormData] = useState({
    contributionType: "Donation",
    amount: "",
    description: "",
    contributionDate: new Date().toISOString().split("T")[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      amount: Number.parseFloat(formData.amount),
      status: "pending",
    })
    setFormData({
      contributionType: "Donation",
      amount: "",
      description: "",
      contributionDate: new Date().toISOString().split("T")[0],
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Contribution</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Contribution Type</label>
              <select
                value={formData.contributionType}
                onChange={(e) => setFormData({ ...formData, contributionType: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option>Donation</option>
                <option>Project Fund</option>
                <option>Membership Fee</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount (₱)</label>
              <Input
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Input
              type="date"
              value={formData.contributionDate}
              onChange={(e) => setFormData({ ...formData, contributionDate: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Add details about this contribution..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Add Contribution
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
