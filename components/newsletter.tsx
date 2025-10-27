"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail("")
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="py-16 sm:py-24 bg-[#01579B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-white/80 text-lg mb-8">
          Subscribe to our newsletter to get the latest updates on our projects and events
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F7A81B]"
            />
          </div>
          <Button type="submit" className="bg-[#F7A81B] text-[#01579B] hover:bg-[#F7A81B]/90 font-bold px-8">
            Subscribe
          </Button>
        </form>

        {submitted && (
          <p className="text-[#F7A81B] font-semibold">Thank you for subscribing! Check your email for confirmation.</p>
        )}

        <p className="text-white/60 text-sm">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </section>
  )
}
