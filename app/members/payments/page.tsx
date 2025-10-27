"use client"

import { useState } from "react"
import { mockPayments } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, CreditCard, CheckCircle, Clock } from "lucide-react"
import PaymentForm from "@/components/members/payment-form"

export default function PaymentsPage() {
  const [payments, setPayments] = useState(mockPayments)
  const [showForm, setShowForm] = useState(false)

  const handleAddPayment = (newPayment: any) => {
    setPayments([...payments, { ...newPayment, id: Date.now().toString() }])
    setShowForm(false)
  }

  const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0)
  const completedPayments = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)
  const pendingPayments = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="p-4 sm:px-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Payments Management</h1>
          <p className="text-muted-foreground mt-2">Track and manage your payments</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Add Payment
        </Button>
      </div>

      {showForm && <PaymentForm onSubmit={handleAddPayment} onCancel={() => setShowForm(false)} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <CreditCard className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{totalPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">{payments.length} payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{completedPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {payments.filter((p) => p.status === "completed").length} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{pendingPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {payments.filter((p) => p.status === "pending").length} pending
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">{payment.paymentType}</h4>
                    {getStatusIcon(payment.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{payment.description}</p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Date: {payment.paymentDate}</span>
                    <span>Method: {payment.paymentMethod}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">₱{payment.amount.toLocaleString()}</p>
                  <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Bank Transfer</h4>
              <p className="text-sm text-muted-foreground">Account: Rotary Club of Lucena South</p>
              <p className="text-sm text-muted-foreground">Bank: Philippine National Bank</p>
              <p className="text-sm text-muted-foreground">Account Number: 1234567890</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Online Payment</h4>
              <p className="text-sm text-muted-foreground">GCash: 09171234567</p>
              <p className="text-sm text-muted-foreground">PayMaya: 09171234567</p>
              <p className="text-sm text-muted-foreground">Contact treasurer for details</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
