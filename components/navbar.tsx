"use client"

import { useState, useEffect } from "react"
import { Menu, X, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Events", href: "/events" },
    { label: "History", href: "/history" },
    { label: "News and Updates", href: "/blog" },
    { label: "Contact", href: "/#footer" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#01579B] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">RC</span>
            </div>
            <span className="font-bold text-[#01579B] hidden sm:inline text-sm">Rotary Club of Lucena South</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-700 hover:text-[#01579B] transition-colors font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="outline"
                className="border-[#01579B] text-[#01579B] hover:bg-[#01579B]/5 bg-transparent gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            </Link>
            <Button className="bg-[#F7A81B] text-[#01579B] hover:bg-[#F7A81B]/90">Donate</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6 text-[#01579B]" /> : <Menu className="w-6 h-6 text-[#01579B]" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-[#01579B] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-4">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full border-[#01579B] text-[#01579B] bg-transparent gap-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </Link>
              <Button className="w-full bg-[#F7A81B] text-[#01579B]">Donate</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
