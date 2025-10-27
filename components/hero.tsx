"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from 'next/image'
import { getImagePath } from '@/lib/image-path'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Video autoplay failed, fallback to background image
      })
    }
  }, [])

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Video Background */}
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source src={getImagePath("/community-service-volunteers-helping-people.jpg")} type="video/mp4" />
      </video>

      {/* Fallback Background Image */}
      <div className="absolute inset-0">
        <Image
          src={getImagePath("/placeholder.svg?height=1080&width=1920&query=community service volunteers helping people")}
          alt="Community service volunteers"
          fill
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
        {/* Dark Blue to Transparent Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#01579B]/85 via-[#01579B]/70 to-[#01579B]/40"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#F7A81B]/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#F7A81B]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 inline-block animate-fade-in">
          <span className="bg-[#F7A81B] text-[#01579B] px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            50+ Years Serving Lucena South
          </span>
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Service Above Self
        </h1>

        <p
          className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          Building Community Through Action and Compassion
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <Link href="/about">
            <Button
              size="lg"
              className="bg-[#F7A81B] text-[#01579B] hover:bg-[#F7A81B]/90 font-bold text-lg px-8 shadow-lg hover:shadow-xl transition-all"
            >
              More Info
            </Button>
          </Link>
          <Link href="#projects">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-bold text-lg px-8 bg-transparent shadow-lg hover:shadow-xl transition-all"
            >
              View Our Projects
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <ChevronDown className="w-8 h-8 text-white scroll-indicator animate-bounce" />
      </div>
    </section>
  )
}
