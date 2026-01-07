"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50 dark:bg-[#0E0E0E]">
      <Card className="w-full max-w-md border-red-200 dark:border-red-900">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <CardTitle className="text-red-600 dark:text-red-400">Something went wrong!</CardTitle>
          </div>
          <CardDescription>
            We encountered an unexpected error. Please try again or return to the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === "development" && (
            <div className="rounded-md bg-red-50 dark:bg-red-950 p-3 border border-red-200 dark:border-red-900">
              <p className="text-xs font-mono text-red-800 dark:text-red-200 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
          
          <div className="flex gap-3">
            <Button
              onClick={reset}
              className="flex-1 bg-[#B125F9] hover:bg-[#B125F9]/90 text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1"
            >
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

