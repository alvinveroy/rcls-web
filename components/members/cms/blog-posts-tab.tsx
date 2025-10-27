"use client"

import { useState } from "react"
import { mockBlogPosts } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Eye } from "lucide-react"
import BlogPostForm from "./blog-post-form"

export default function BlogPostsTab() {
  const [posts, setPosts] = useState(mockBlogPosts)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<any>(null)

  const handleAddPost = (newPost: any) => {
    if (editingPost) {
      setPosts(posts.map((p) => (p.id === editingPost.id ? { ...newPost, id: editingPost.id } : p)))
      setEditingPost(null)
    } else {
      setPosts([...posts, { ...newPost, id: Date.now().toString() }])
    }
    setShowForm(false)
  }

  const handleEdit = (post: any) => {
    setEditingPost(post)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id))
  }

  const getStatusColor = (status: string) => {
    return status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setEditingPost(null)
            setShowForm(!showForm)
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Blog Post
        </Button>
      </div>

      {showForm && (
        <BlogPostForm
          initialData={editingPost}
          onSubmit={handleAddPost}
          onCancel={() => {
            setShowForm(false)
            setEditingPost(null)
          }}
        />
      )}

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
                    <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                  <p className="text-xs text-muted-foreground">Published: {post.publishedAt || "Not published"}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 bg-transparent" onClick={() => handleEdit(post)}>
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-destructive hover:text-destructive bg-transparent"
                    onClick={() => handleDelete(post.id)}
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

      {posts.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No blog posts yet. Create your first post!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
