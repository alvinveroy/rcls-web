"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { mockBlogPosts } from "@/lib/mock-data"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getImagePath } from '@/lib/image-path'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Community Service", "Events", "Projects", "Education", "Health"]

  // Filter published posts
  const publishedPosts = mockBlogPosts.filter((post) => post.status === "published")

  // Apply filters
  const filteredPosts = publishedPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = filteredPosts[0]
  const otherPosts = filteredPosts.slice(1)

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#01579B] to-[#0277BD] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">News & Updates</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Stay informed about our latest community projects, events, and impact stories
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Bar */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-[#01579B] text-white hover:bg-[#01579B]/90"
                    : "border-[#01579B] text-[#01579B] hover:bg-[#01579B]/5 bg-transparent"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <Card className="mb-12 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-80 md:h-full">
                    <Image
                      src={getImagePath(featuredPost.image || "/placeholder.svg")}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <Badge className="mb-4 w-fit bg-[#F7A81B] text-[#01579B] hover:bg-[#F7A81B]/90">
                      {featuredPost.category}
                    </Badge>
                    <h2 className="text-3xl font-bold text-[#01579B] mb-4">{featuredPost.title}</h2>
                    <p className="text-gray-600 mb-4 text-lg">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>By {featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.publishedAt}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${featuredPost.id}`}>
                      <Button className="bg-[#F7A81B] text-[#01579B] hover:bg-[#F7A81B]/90 font-bold gap-2">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            )}

            {/* Other Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                  <div className="relative h-48">
                    <Image src={getImagePath(post.image || "/placeholder.svg")} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <Badge className="mb-2 w-fit bg-[#F7A81B] text-[#01579B] hover:bg-[#F7A81B]/90">
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-[#01579B] line-clamp-2">{post.title}</h3>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <div className="flex items-center justify-between w-full text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.publishedAt}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${post.id}`} className="w-full">
                      <Button
                        variant="outline"
                        className="w-full border-[#01579B] text-[#01579B] hover:bg-[#01579B]/5 bg-transparent gap-2"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {filteredPosts.length > 9 && (
              <div className="text-center mt-12">
                <Button
                  size="lg"
                  className="bg-[#01579B] text-white hover:bg-[#01579B]/90 font-bold px-8"
                >
                  Load More Articles
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </main>
  )
}
