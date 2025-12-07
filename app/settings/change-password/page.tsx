"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SettingsChangePasswordPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the new change password page
    router.push("/profile/change-password")
  }, [router])

  // Return a loading state while redirecting
  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-muted-foreground">Redirecting to change password...</p>
    </div>
  )
}
