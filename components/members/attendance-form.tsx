"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface AttendanceFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function AttendanceForm({ onSubmit, onCancel }: AttendanceFormProps) {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: new Date().toISOString().split("T")[0],
    hoursVolunteered: "",
    role: "Participant",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      hoursVolunteered: Number.parseFloat(formData.hoursVolunteered),
    })
    setFormData({
      eventName: "",
      eventDate: new Date().toISOString().split("T")[0],
      hoursVolunteered: "",
      role: "Participant",
      notes: "",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Event Name</label>
            <Input
              placeholder="Enter event name..."
              value={formData.eventName}
              onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Event Date</label>
              <Input
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Hours Volunteered</label>
              <Input
                type="number"
                placeholder="0.0"
                step="0.5"
                value={formData.hoursVolunteered}
                onChange={(e) => setFormData({ ...formData, hoursVolunteered: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            >
              <option>Participant</option>
              <option>Team Lead</option>
              <option>Coordinator</option>
              <option>Volunteer</option>
              <option>Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              placeholder="Add any additional notes about this activity..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Log Attendance
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
