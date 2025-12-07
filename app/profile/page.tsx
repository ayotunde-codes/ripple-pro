"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the profile information page by default
    router.push("/profile/information")
  }, [router])

  // Return a loading state while redirecting
  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-muted-foreground">Loading profile...</p>
    </div>
  )
}
