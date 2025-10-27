"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ProjectReportFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function ProjectReportForm({ initialData, onSubmit, onCancel }: ProjectReportFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      projectDate: new Date().toISOString().split("T")[0],
      impactSummary: "",
      beneficiariesCount: "",
      hoursSpent: "",
      status: "draft",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      beneficiariesCount: Number.parseInt(formData.beneficiariesCount),
      hoursSpent: Number.parseFloat(formData.hoursSpent),
      publishedAt: formData.status === "published" ? new Date().toISOString().split("T")[0] : null,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Project Report" : "Create New Project Report"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Title</label>
            <Input
              placeholder="Enter project title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Describe the project..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Date</label>
              <Input
                type="date"
                value={formData.projectDate}
                onChange={(e) => setFormData({ ...formData, projectDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Beneficiaries Count</label>
              <Input
                type="number"
                placeholder="0"
                value={formData.beneficiariesCount}
                onChange={(e) => setFormData({ ...formData, beneficiariesCount: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Hours Spent</label>
              <Input
                type="number"
                placeholder="0.0"
                step="0.5"
                value={formData.hoursSpent}
                onChange={(e) => setFormData({ ...formData, hoursSpent: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Impact Summary</label>
            <Textarea
              placeholder="Summarize the impact of this project..."
              value={formData.impactSummary}
              onChange={(e) => setFormData({ ...formData, impactSummary: e.target.value })}
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              {initialData ? "Update Report" : "Create Report"}
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
