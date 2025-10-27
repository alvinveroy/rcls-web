"use client"

import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getImagePath } from '@/lib/image-path'

export default function MembersHeader() {
  const { user } = useAuth()

  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Members Portal</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-muted-foreground">{user?.position}</p>
          </div>
          <Avatar>
            <AvatarImage src={getImagePath(user?.avatarUrl || "/placeholder.svg")} />
            <AvatarFallback>
              {user?.firstName[0]}
              {user?.lastName[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
