"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, TrendingUp, CreditCard, BookOpen, Calendar, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { href: "/members", label: "Dashboard", icon: LayoutDashboard },
  { href: "/members/roster", label: "Members Roster", icon: Users },
  { href: "/members/contributions", label: "Contributions", icon: TrendingUp },
  { href: "/members/payments", label: "Payments", icon: CreditCard },
  { href: "/members/cms", label: "CMS & Reports", icon: BookOpen },
  { href: "/members/attendance", label: "Attendance", icon: Calendar },
]

export default function MembersSidebar() {
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/members" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">RC</span>
          </div>
          <div>
            <p className="font-bold text-sidebar-foreground">Rotary Club</p>
            <p className="text-xs text-sidebar-foreground/60">Lucena South</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
