"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SettingsProfilePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the new profile page
    router.push("/profile/information")
  }, [router])

  // Return a loading state while redirecting
  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-muted-foreground">Redirecting to profile...</p>
    </div>
  )
}
