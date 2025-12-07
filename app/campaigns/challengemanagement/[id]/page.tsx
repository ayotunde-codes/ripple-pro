"use client"

import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { MobileChallengeManagement } from "./_components/mobile-challenge-management"
import { DesktopChallengeManagement } from "./_components/desktop-challenge-management"
import { challengeData, creatorsData } from "./_components/challenge-data"

export default function ChallengeManagementPage({ params }: { params: { id: string } }) {
  const [challenge, setChallenge] = useState(challengeData)
  const [creators, setCreators] = useState(creatorsData)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleAutoPayout = () => {
    toast({
      title: "Auto Payout Initiated",
      description: "All eligible creators will receive their payments automatically.",
    })
  }

  const handleApproveReward = (creatorId: number) => {
    // Update the creator's status to approved
    setCreators(creators.map((creator) => (creator.id === creatorId ? { ...creator, status: "approved" } : creator)))

    toast({
      title: "Reward approved",
      description: "The creator's reward has been approved successfully.",
    })
  }

  const handleDeclineReward = (creator: any) => {
    // Update the creator's status to declined
    setCreators(creators.map((c) => (c.id === creator.id ? { ...c, status: "declined" } : c)))

    toast({
      title: "Decline message sent",
      description: "The creator has been notified of the declined reward.",
    })
  }

  // Mobile view
  if (isMobile) {
    return (
      <MobileChallengeManagement
        challenge={challenge}
        creators={creators}
        onApprove={handleApproveReward}
        onDecline={handleDeclineReward}
        onAutoPayout={handleAutoPayout}
      />
    )
  }

  // Desktop view
  return (
    <DesktopChallengeManagement
      challenge={challenge}
      creators={creators}
      onApprove={handleApproveReward}
      onDecline={handleDeclineReward}
      onAutoPayout={handleAutoPayout}
    />
  )
}
