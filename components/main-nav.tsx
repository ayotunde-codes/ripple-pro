import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center space-x-2">
        <div className="flex items-center">
          <Image
            src="/images/ripple-pro-icon.png"
            alt="RipplePro Icon"
            width={40}
            height={40}
            className="h-auto mr-2"
          />
          <Image src="/images/ripple-pro-logo.png" alt="RipplePro" width={120} height={40} className="h-auto" />
        </div>
      </Link>
      <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link
        href="/challenges"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Challenges
      </Link>
      <Link
        href="/campaigns"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Campaigns
      </Link>
      <Link href="/payments" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Payments
      </Link>
    </nav>
  )
}
