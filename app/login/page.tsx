"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

const DEMO_ACCOUNTS = [
  { email: "member@rotary.com", password: "password123", role: "President" },
  { email: "volunteer@rotary.com", password: "password123", role: "Volunteer Coordinator" },
  { email: "treasurer@rotary.com", password: "password123", role: "Treasurer" },
  { email: "secretary@rotary.com", password: "password123", role: "Secretary" },
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      if (!email || !password) {
        setError("Please enter both email and password")
        setLoading(false)
        return
      }

      const result = await loginUser(email, password)
      if (result) {
        setSuccess("Login successful! Redirecting...")
        localStorage.setItem("auth_token", result.token)
        localStorage.setItem("user", JSON.stringify(result.user))
        setTimeout(() => {
          router.push("/members")
        }, 500)
      } else {
        setError("Invalid email or password. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error("[v0] Login error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const result = await loginUser(demoEmail, demoPassword)
      if (result) {
        setSuccess("Demo login successful! Redirecting...")
        localStorage.setItem("auth_token", result.token)
        localStorage.setItem("user", JSON.stringify(result.user))
        setTimeout(() => {
          router.push("/members")
        }, 500)
      } else {
        setError("Demo login failed. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error("[v0] Demo login error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#01579B]/5 via-white to-[#F7A81B]/5 flex items-center justify-center p-4">
      {/* Back Button */}
      <Link href="/" className="absolute top-4 left-4 md:top-6 md:left-6">
        <Button variant="ghost" className="gap-2 text-[#01579B] hover:bg-[#01579B]/10">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </Link>

      <div className="w-full max-w-2xl">
        {/* Main Login Card */}
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardHeader className="space-y-2 bg-gradient-to-r from-[#01579B] to-[#01579B]/80 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold">R</span>
              </div>
              <div>
                <CardTitle className="text-2xl">Members Portal</CardTitle>
                <CardDescription className="text-white/80">Rotary Club of Lucena South</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-8">
            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4 mb-8">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="member@rotary.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="border-gray-300 focus:border-[#01579B] focus:ring-[#01579B] text-base"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="border-gray-300 focus:border-[#01579B] focus:ring-[#01579B] text-base"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#01579B] hover:bg-[#01579B]/90 text-white font-semibold h-11 text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 font-medium">Demo Accounts</span>
              </div>
            </div>

            {/* Demo Accounts */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600 font-semibold mb-4">
                Try these demo accounts to explore the members portal:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DEMO_ACCOUNTS.map((account) => (
                  <button
                    key={account.email}
                    onClick={() => handleDemoLogin(account.email, account.password)}
                    disabled={loading}
                    className="p-4 border-2 border-[#F7A81B]/30 rounded-lg hover:border-[#F7A81B] hover:bg-[#F7A81B]/5 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{account.role}</p>
                        <p className="text-xs text-gray-600 mt-1">{account.email}</p>
                      </div>
                      {loading ? (
                        <Loader2 className="w-4 h-4 text-[#F7A81B] animate-spin" />
                      ) : (
                        <div className="w-2 h-2 bg-[#F7A81B] rounded-full mt-1"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700">
                  <span className="font-semibold">Password for all demo accounts:</span> password123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            This is a development environment with mock authentication.
            <br />
            In production, this will integrate with secure authentication services.
          </p>
        </div>
      </div>
    </div>
  )
}
