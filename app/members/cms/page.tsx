"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BlogPostsTab from "@/components/members/cms/blog-posts-tab"
import ProjectReportsTab from "@/components/members/cms/project-reports-tab"

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState("blog")

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Content Management System</h1>
        <p className="text-muted-foreground mt-2">Create and manage your blog posts and project reports</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="reports">Project Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="blog" className="space-y-4">
          <BlogPostsTab />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <ProjectReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
