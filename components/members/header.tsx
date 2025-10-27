"use client"

import { useAuth } from "@/hooks/use-auth"
import { useSidebar } from "@/hooks/useSidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Settings, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getImagePath } from '@/lib/image-path'

export default function MembersHeader() {
  const { user } = useAuth()
  const { toggleSidebar } = useSidebar()

  return (
    <header className="bg-card border-b border-border px-4 md:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-semibold text-foreground hidden sm:block">Members Portal</h2>
        <h2 className="text-lg font-semibold text-foreground sm:hidden">Portal</h2>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-border">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-foreground">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-muted-foreground">{user?.position}</p>
          </div>
          <Avatar className="h-8 w-8 md:h-10 md:w-10">
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
