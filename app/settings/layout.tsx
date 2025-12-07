"use client"

import type React from "react"
import { usePathname, useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  // Determine the active tab based on the current path
  const activeTab = pathname.includes("/change-password") ? "change-password" : "profile"

  // Handle tab change
  const handleTabChange = (value: string) => {
    if (value === "profile") {
      router.push("/settings/profile")
    } else if (value === "change-password") {
      router.push("/settings/change-password")
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your account settings and preferences." />

      <div className="mb-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="change-password">Change Password</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {children}
    </DashboardShell>
  )
}
