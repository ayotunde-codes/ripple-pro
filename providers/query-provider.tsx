"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

// Lazy load devtools only in development
let ReactQueryDevtools: any = null
if (process.env.NODE_ENV === "development") {
  try {
    const devtools = require("@tanstack/react-query-devtools")
    ReactQueryDevtools = devtools.ReactQueryDevtools
  } catch (e) {
    // Devtools not installed yet
    console.log("React Query Devtools not installed. Run: npm install")
  }
}

/**
 * React Query Provider Component
 * Wraps the app with QueryClientProvider for data fetching
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Create a client instance per component mount
  // This ensures queries are not shared between different users/requests
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Disable automatic refetching on window focus in development
            refetchOnWindowFocus: process.env.NODE_ENV === "production",
            // Retry failed requests 1 time
            retry: 1,
            // Cache data for 5 minutes by default
            staleTime: 1000 * 60 * 5,
            // Keep unused data in cache for 10 minutes
            gcTime: 1000 * 60 * 10,
          },
          mutations: {
            // Retry failed mutations 0 times by default
            retry: 0,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query Devtools - only in development */}
      {process.env.NODE_ENV === "development" && ReactQueryDevtools && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  )
}

