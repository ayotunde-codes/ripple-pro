"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "./query-provider"

/**
 * Combined Providers Component
 * Wraps the app with all necessary providers
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </QueryProvider>
  )
}

