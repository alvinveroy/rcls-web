"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, TrendingUp, CreditCard, BookOpen, Calendar, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSidebar } from "@/hooks/useSidebar"

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
  const { isCollapsed, isSidebarOpen, isMobile, toggleSidebar } = useSidebar()

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
          isMobile
            ? isSidebarOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full w-64"
            : isCollapsed
              ? "w-12"
              : "w-64"
        )}
      >
        <div className="p-4 border-b border-sidebar-border">
          <Link href="/members" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg">RC</span>
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="font-bold text-sidebar-foreground">Rotary Club</p>
                <p className="text-xs text-sidebar-foreground/60">Lucena South</p>
              </div>
            )}
          </Link>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            
            const buttonContent = (
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
                  isCollapsed && !isMobile && "justify-center px-2"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!isCollapsed && !isMobile && <span>{item.label}</span>}
              </Button>
            )

            if (isCollapsed && !isMobile) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link href={item.href}>{buttonContent}</Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              )
            }

            return (
              <Link key={item.href} href={item.href}>
                {buttonContent}
              </Link>
            )
          })}
        </nav>

        <div className="p-2 border-t border-sidebar-border space-y-1">
          {!isMobile && (
            <Button
              variant="ghost"
              className="w-full justify-center hidden md:flex"
              onClick={toggleSidebar}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          )}
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10",
                  isCollapsed && !isMobile && "justify-center px-2"
                )}
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 shrink-0" />
                {!isCollapsed && !isMobile && <span>Logout</span>}
              </Button>
            </TooltipTrigger>
            {(isCollapsed && !isMobile) && (
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  )
}
