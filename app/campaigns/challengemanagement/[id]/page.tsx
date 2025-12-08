"use client"

import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { useRedemptionRequests, useApproveRedemption } from "@/services/campaign"
import { MobileChallengeManagement } from "./_components/mobile-challenge-management"
import { DesktopChallengeManagement } from "./_components/desktop-challenge-management"
import { transformRedemptionsToCreators } from "./_components/redemption-adapters"

export default function ChallengeManagementPage({ params }: { params: { id: string } }) {
  const campaignId = parseInt(params.id)
  const [isMobile, setIsMobile] = useState(false)
  
  // API hooks
  const { data: redemptionsData, isLoading } = useRedemptionRequests(campaignId)
  const approveRedemption = useApproveRedemption()

  const redemptions = redemptionsData?.data || []

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
    // Auto-approve all pending redemptions
    const pendingRedemptions = redemptions.filter((r) => r.status === "pending")
    
    if (pendingRedemptions.length === 0) {
      toast({
        title: "No pending requests",
        description: "There are no pending redemption requests to approve.",
      })
      return
    }

    toast({
      title: "Auto Payout Initiated",
      description: `Approving ${pendingRedemptions.length} pending requests...`,
    })

    // Approve each pending redemption
    pendingRedemptions.forEach((redemption) => {
      handleApproveReward(redemption.id)
    })
  }

  const handleApproveReward = (redemptionId: number) => {
    approveRedemption.mutate(redemptionId, {
      onSuccess: () => {
        toast({
          title: "Reward approved",
          description: "The creator's reward has been approved successfully.",
        })
      },
      onError: (error: any) => {
        toast({
          title: "Approval failed",
          description: error?.response?.data?.message || "Failed to approve reward",
          variant: "destructive",
        })
      },
    })
  }

  const handleDeclineReward = (redemption: any) => {
    // Note: No decline endpoint available in API
    // This is a UI-only action for now
    toast({
      title: "Decline functionality",
      description: "Decline API endpoint not yet available. Contact backend team.",
      variant: "destructive",
    })
  }

  // Calculate campaign stats from redemptions
  const totalViews = redemptions.reduce((sum, r) => sum + r.challenge.views, 0)
  const totalPaidOut = redemptions
    .filter((r) => r.status === "approved")
    .reduce((sum, r) => sum + parseFloat(r.amount), 0)
  
  // Transform redemptions to creator format for UI compatibility
  const creators = transformRedemptionsToCreators(redemptions)
  
  // Mock challenge data (API doesn't return campaign details in redemption endpoint)
  const challenge = {
    id: campaignId,
    title: redemptions[0]?.challenge.challange_name || "Campaign",
    creator: "Brand", // Not available in API
    totalPool: 10000000, // TODO: Get from campaign details endpoint
    paidOut: totalPaidOut,
    views: totalViews,
    participants: redemptions.length,
    rewardRate: 1000, // Not available
    maxPayout: 100000, // Not available
    platforms: ["instagram", "facebook", "twitter", "youtube", "tiktok"],
    requirements: "", // Not available
    additionalNotes: "", // Not available
    endDate: "", // Not available
    status: "active", // Assume active
  }

  // Mobile view
  if (isMobile) {
    return (
      <MobileChallengeManagement
        challenge={challenge}
        creators={creators}
        isLoading={isLoading}
        onApprove={handleApproveReward}
        onDecline={handleDeclineReward}
        onAutoPayout={handleAutoPayout}
        isApproving={approveRedemption.isPending}
      />
    )
  }

  // Desktop view
  return (
    <DesktopChallengeManagement
      challenge={challenge}
      creators={creators}
      isLoading={isLoading}
      onApprove={handleApproveReward}
      onDecline={handleDeclineReward}
      onAutoPayout={handleAutoPayout}
      isApproving={approveRedemption.isPending}
    />
  )
}
