"use client"

import { useState } from "react"
import { mockMembers } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

export default function RosterPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMembers = mockMembers.filter(
    (member) =>
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Members Roster</h1>
        <p className="text-muted-foreground mt-2">View and manage club members</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={`/.jpg?height=48&width=48&query=${member.firstName}`} />
                  <AvatarFallback>
                    {member.firstName[0]}
                    {member.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {member.firstName} {member.lastName}
                  </h3>
                  <Badge className="mt-1 bg-primary text-primary-foreground">{member.position}</Badge>
                  <p className="text-sm text-muted-foreground mt-2">{member.email}</p>
                  <p className="text-sm text-muted-foreground">{member.phone}</p>
                  <p className="text-xs text-muted-foreground mt-2">Joined: {member.joinDate}</p>
                </div>
              </div>
              {member.bio && <p className="text-sm text-muted-foreground mt-4 italic">{member.bio}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No members found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
