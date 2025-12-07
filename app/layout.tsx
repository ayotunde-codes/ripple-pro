import type React from "react"
import "@/app/globals.css"
import { Lexend } from "next/font/google"
import { Providers } from "@/providers"
import { Toaster } from "@/components/ui/toaster"

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata = {
  title: "RipplePro - Creator Marketing Platform",
  description: "Connect with creators, launch campaigns, and track performance all in one place.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${lexend.variable} font-lexend`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
