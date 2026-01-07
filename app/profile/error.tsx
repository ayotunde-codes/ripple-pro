"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error("Profile error:", error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-md border-red-200 dark:border-red-900 dark:bg-[#0E0E0E]">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <CardTitle className="text-red-600 dark:text-red-400">Profile Error</CardTitle>
          </div>
          <CardDescription>
            Unable to load profile information. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === "development" && (
            <div className="rounded-md bg-red-50 dark:bg-red-950 p-3 border border-red-200 dark:border-red-900">
              <p className="text-xs font-mono text-red-800 dark:text-red-200 break-all">
                {error.message}
              </p>
            </div>
          )}
          
          <div className="flex gap-3">
            <Button
              onClick={reset}
              className="flex-1 bg-[#B125F9] hover:bg-[#B125F9]/90 text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

