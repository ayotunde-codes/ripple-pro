import type React from "react"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { MobileHeader } from "@/components/mobile-header"
import { Sidebar } from "@/components/sidebar"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background dark:bg-[#000000]">
      <div className="md:hidden">
        <MobileHeader />
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 bg-background dark:bg-[#000000]">{children}</main>
      </div>

      <MobileBottomNav />
    </div>
  )
}
