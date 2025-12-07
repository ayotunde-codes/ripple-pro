"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BarChart2, Layers, Wallet, User, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLogout } from "@/services/auth"
import { toast } from "sonner"

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const { mutate: logout, isPending } = useLogout()

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") return true
    if (path === "/challenges" && pathname.includes("/challenges")) return true
    if (path === "/campaigns" && pathname.includes("/campaigns")) return true
    if (path === "/payments" && pathname.includes("/payments")) return true
    if (path === "/profile/information" && (pathname.includes("/profile") || pathname.includes("/settings")))
      return true
    return false
  }

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully")
        // useLogout hook will automatically clear cache and redirect
      },
    })
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Challenges", href: "/challenges", icon: BarChart2 },
    { name: "Campaigns", href: "/campaigns", icon: Layers },
    { name: "Payments", href: "/payments", icon: Wallet },
    { name: "Profile", href: "/profile/information", icon: User },
  ]

  return (
    <div
      className={cn(
        "hidden border-r bg-card/50 md:block md:w-64 dark:bg-[#0E0E0E] dark:border-border-dark transition-all duration-300",
        collapsed ? "md:w-[70px]" : "md:w-[240px]",
      )}
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-border dark:border-border-dark">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/images/ripple-pro-icon.png"
              alt="RipplePro Icon"
              width={30}
              height={30}
              className="h-auto mr-2"
            />
            <span className="text-primary text-xl font-bold">RipplePro</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" className="mx-auto">
            <Image src="/images/ripple-pro-icon.png" alt="RipplePro Icon" width={30} height={30} className="h-auto" />
          </Link>
        )}
        <div className="flex items-center">
          {!collapsed && <ThemeToggle />}
          <Button
            variant="ghost"
            size="icon"
            className={cn("text-muted-foreground hover:bg-accent hover:text-accent-foreground", collapsed && "mx-auto")}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive(item.href)
                  ? "bg-primary-light text-primary dark:bg-[#B124F9] dark:text-[#FAFAFA]"
                  : "text-muted-foreground hover:bg-primary-light hover:text-primary dark:text-[#A9A9A9] dark:hover:bg-opacity-10 dark:hover:bg-primary",
                collapsed && "justify-center",
              )}
              title={collapsed ? item.name : ""}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", collapsed ? "mx-auto" : "mr-3")} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border dark:border-border-dark">
        <Button
          variant="outline"
          className={cn("w-full", collapsed ? "justify-center" : "justify-start")}
          onClick={handleLogout}
          disabled={isPending}
          title={collapsed ? "Logout" : ""}
        >
          <LogOut className={cn("h-5 w-5", !collapsed && "mr-2")} />
          {!collapsed && <span>{isPending ? "Logging out..." : "Logout"}</span>}
        </Button>
      </div>
    </div>
  )
}
