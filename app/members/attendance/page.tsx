"use client"

import { useState } from "react"
import { mockAttendance } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Clock, TrendingUp, Calendar } from "lucide-react"
import AttendanceForm from "@/components/members/attendance-form"

export default function AttendancePage() {
  const [attendance, setAttendance] = useState(mockAttendance)
  const [showForm, setShowForm] = useState(false)

  const handleAddAttendance = (newRecord: any) => {
    setAttendance([...attendance, { ...newRecord, id: Date.now().toString() }])
    setShowForm(false)
  }

  const totalHours = attendance.reduce((sum, a) => sum + a.hoursVolunteered, 0)
  const totalEvents = attendance.length
  const averageHours = totalEvents > 0 ? (totalHours / totalEvents).toFixed(1) : 0

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance & Volunteer Hours</h1>
          <p className="text-muted-foreground mt-2">Track your volunteer activities and hours</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Log Attendance
        </Button>
      </div>

      {showForm && <AttendanceForm onSubmit={handleAddAttendance} onCancel={() => setShowForm(false)} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground mt-1">Volunteer hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
            <Calendar className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
            <p className="text-xs text-muted-foreground mt-1">Total events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Hours</CardTitle>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageHours}h</div>
            <p className="text-xs text-muted-foreground mt-1">Per event</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendance.map((record) => (
              <div
                key={record.id}
                className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{record.eventName}</h4>
                    <Badge variant="outline">{record.role}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Date: {record.eventDate}</p>
                  {record.notes && <p className="text-sm text-muted-foreground mt-2 italic">{record.notes}</p>}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{record.hoursVolunteered}h</p>
                  <p className="text-xs text-muted-foreground">Hours</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Volunteer Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Hours by Role</h4>
              <div className="space-y-3">
                {Array.from(new Map(attendance.map((a) => [a.role, a])).entries()).map(([role, record]) => {
                  const roleHours = attendance
                    .filter((a) => a.role === role)
                    .reduce((sum, a) => sum + a.hoursVolunteered, 0)
                  return (
                    <div key={role} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{role}</span>
                      <span className="font-semibold text-foreground">{roleHours}h</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Recent Activity</h4>
              <div className="space-y-3">
                {attendance.slice(-3).map((record) => (
                  <div key={record.id} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{record.eventName}</span>
                    <span className="font-semibold text-foreground">{record.hoursVolunteered}h</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
