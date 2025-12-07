"use client"

import type React from "react"
import { usePathname, useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMobile()

  // Determine the active tab based on the current path
  const activeTab = pathname.includes("/change-password") ? "change-password" : "profile"

  // Handle tab change
  const handleTabChange = (value: string) => {
    if (value === "profile") {
      router.push("/profile/information")
    } else if (value === "change-password") {
      router.push("/profile/change-password")
    }
  }

  return (
    <DashboardShell>
      {!isMobile && <DashboardHeader heading="Profile" text="Manage your account profile and preferences." />}

      <div className={`${isMobile ? "mb-4" : "mb-8"}`}>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList
            className={`grid w-full ${isMobile ? "max-w-full" : "max-w-md"} grid-cols-2 ${isMobile ? "bg-transparent p-0 gap-2" : ""}`}
          >
            <TabsTrigger
              value="profile"
              className={isMobile ? `rounded-full data-[state=active]:bg-[#1A0B2E] data-[state=active]:text-white` : ""}
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="change-password"
              className={isMobile ? `rounded-full data-[state=active]:bg-[#1A0B2E] data-[state=active]:text-white` : ""}
            >
              Change Password
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {children}
    </DashboardShell>
  )
}
