"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageSquare, BarChart2, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileBottomNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") return true
    if (path === "/challenges" && pathname.includes("/challenges")) return true
    if (path === "/campaigns" && (pathname.includes("/campaigns") || pathname === "/campaigns")) return true
    if (path === "/payments" && pathname.includes("/payments")) return true
    return false
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background dark:bg-[#000000] border-t border-border dark:border-border-dark h-16 flex items-center justify-around px-2 md:hidden z-40">
      <Link
        href="/dashboard"
        className={cn(
          "flex flex-col items-center justify-center",
          isActive("/dashboard") ? "text-[#B125F9]" : "text-gray-400",
        )}
      >
        <Home className="h-6 w-6 mb-1" />
        <span className="text-xs">Dashboard</span>
      </Link>

      <Link
        href="/challenges"
        className={cn(
          "flex flex-col items-center justify-center",
          isActive("/challenges") ? "text-[#B125F9]" : "text-gray-400",
        )}
      >
        <MessageSquare className="h-6 w-6 mb-1" />
        <span className="text-xs">Challenges</span>
      </Link>

      <Link
        href="/campaigns"
        className={cn(
          "flex flex-col items-center justify-center",
          isActive("/campaigns") ? "text-[#B125F9]" : "text-gray-400",
        )}
      >
        <BarChart2 className="h-6 w-6 mb-1" />
        <span className="text-xs">Campaigns</span>
      </Link>

      <Link
        href="/payments"
        className={cn(
          "flex flex-col items-center justify-center",
          isActive("/payments") ? "text-[#B125F9]" : "text-gray-400",
        )}
      >
        <Wallet className="h-6 w-6 mb-1" />
        <span className="text-xs">Payments</span>
      </Link>
    </div>
  )
}
