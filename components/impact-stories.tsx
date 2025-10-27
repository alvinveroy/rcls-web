"use client"

import { mockBlogPosts } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getImagePath } from '@/lib/image-path'

export default function LatestUpdates() {
  // Get the 3 latest blog posts
  const latestPosts = mockBlogPosts.slice(0, 3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section className="py-16 sm:py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#01579B] mb-4">Latest Updates</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay connected with our latest news and community engagement
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Blog Posts (60% on desktop) */}
          <div className="lg:col-span-3 space-y-6">
            {latestPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="md:flex">
                  {/* Blog Post Image */}
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <Image
                      src={getImagePath(post.image || "/placeholder.svg")}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Blog Post Content */}
                  <CardContent className="md:w-2/3 p-6">
                    {/* Category Badge */}
                    <Badge className="bg-[#F7A81B] text-[#01579B] hover:bg-[#F7A81B]/90 mb-3">
                      {post.category}
                    </Badge>
                    
                    {/* Post Title */}
                    <h3 className="text-xl font-bold text-[#01579B] mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                    
                    {/* Read More Link */}
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-[#01579B] hover:text-[#F7A81B] font-semibold transition-colors"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Right Column - Facebook Feed (40% on desktop) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-[#01579B] mb-4">Follow Us on Facebook</h3>
              
              {/* Facebook Page Plugin */}
              <div className="w-full overflow-hidden rounded-lg">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Frclucenasouthofficial&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                  width="100%"
                  height="600"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  className="w-full"
                />
              </div>
              
              {/* Direct Facebook Link */}
              <div className="mt-4 text-center">
                <a
                  href="https://www.facebook.com/rclucenasouthofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#01579B] hover:text-[#F7A81B] font-semibold transition-colors"
                >
                  Visit our Facebook Page
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
