"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function MobileHeader() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between py-4 px-4 border-b bg-background dark:bg-[#000000] dark:border-border-dark">
      <Link href="/dashboard" className="flex items-center">
        <div className="flex items-center">
          <Image
            src="/images/ripple-pro-icon.png"
            alt="RipplePro Icon"
            width={30}
            height={30}
            className="h-auto mr-2"
          />
          <span className="text-[#B125F9] text-xl font-bold">RipplePro</span>
        </div>
      </Link>

      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          onClick={() => router.push("/profile/information")}
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
