"use client"

import { useState } from "react"
import { mockProjectReports } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Eye } from "lucide-react"
import ProjectReportForm from "./project-report-form"

export default function ProjectReportsTab() {
  const [reports, setReports] = useState(mockProjectReports)
  const [showForm, setShowForm] = useState(false)
  const [editingReport, setEditingReport] = useState<any>(null)

  const handleAddReport = (newReport: any) => {
    if (editingReport) {
      setReports(reports.map((r) => (r.id === editingReport.id ? { ...newReport, id: editingReport.id } : r)))
      setEditingReport(null)
    } else {
      setReports([...reports, { ...newReport, id: Date.now().toString() }])
    }
    setShowForm(false)
  }

  const handleEdit = (report: any) => {
    setEditingReport(report)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setReports(reports.filter((r) => r.id !== id))
  }

  const getStatusColor = (status: string) => {
    return status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setEditingReport(null)
            setShowForm(!showForm)
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Project Report
        </Button>
      </div>

      {showForm && (
        <ProjectReportForm
          initialData={editingReport}
          onSubmit={handleAddReport}
          onCancel={() => {
            setShowForm(false)
            setEditingReport(null)
          }}
        />
      )}

      <div className="grid gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{report.title}</h3>
                    <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Beneficiaries</p>
                      <p className="font-semibold text-foreground">{report.beneficiariesCount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Hours Spent</p>
                      <p className="font-semibold text-foreground">{report.hoursSpent}h</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-semibold text-foreground">{report.projectDate}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 bg-transparent"
                    onClick={() => handleEdit(report)}
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-destructive hover:text-destructive bg-transparent"
                    onClick={() => handleDelete(report.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reports.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No project reports yet. Create your first report!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
