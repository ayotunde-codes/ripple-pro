"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { useCurrentUser } from "@/services/auth"
import { useCampaigns, useCampaignSummary, useCloseCampaign } from "@/services/campaign"
import { MobileCampaignsView } from "./_components/mobile-campaigns-view"
import { DesktopCampaignsView } from "./_components/desktop-campaigns-view"

export default function CampaignsPage() {
  const router = useRouter()
  const { data: currentUser } = useCurrentUser()
  
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [initialStep, setInitialStep] = useState(0)
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"open" | "closed" | undefined>(undefined)

  // API hooks
  const { data: campaignsData, isLoading: isLoadingCampaigns } = useCampaigns({
    search: searchQuery || undefined,
    status: statusFilter,
  })
  const { data: summaryData, isLoading: isLoadingSummary } = useCampaignSummary()
  const closeCampaign = useCloseCampaign()

  const isVerified = currentUser?.kyc_status === "approved" || currentUser?.status === "active"

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleCompleteVerification = () => {
    setShowVerificationPrompt(false)
    setShowOnboarding(true)
  }

  const handleCloseChallenge = (challenge: any) => {
    setSelectedChallenge(challenge)
    setShowCloseConfirmation(true)
  }

  const confirmCloseChallenge = () => {
    if (!selectedChallenge) return

    closeCampaign.mutate(selectedChallenge.id, {
      onSuccess: () => {
        toast({
          title: "Campaign Closed",
          description: "The campaign has been closed and any remaining balance has been refunded to your wallet.",
        })
        setShowCloseConfirmation(false)
        setSelectedChallenge(null)
      },
      onError: (error: any) => {
        toast({
          title: "Failed to close campaign",
          description: error?.response?.data?.message || "An error occurred",
          variant: "destructive",
        })
      },
    })
  }

  // Navigate to challenge management page
  const navigateToChallengeManagement = (challengeId: number) => {
    router.push(`/campaigns/challengemanagement/${challengeId}`)
  }

  // Extract campaigns from API response (PaginatedResponse structure)
  const campaigns = campaignsData?.data || []
  const campaignsMeta = campaignsData?.meta
  const summary = summaryData?.data

  const handleCreateCampaign = () => {
    if (!isVerified) {
      setInitialStep(0)
      setShowVerificationPrompt(true)
    } else {
      router.push("/campaigns/new")
    }
  }

  // Mobile view
  if (isMobile) {
    return (
      <MobileCampaignsView
        isVerified={isVerified}
        campaigns={campaigns}
        summary={summary}
        isLoadingCampaigns={isLoadingCampaigns}
        isLoadingSummary={isLoadingSummary}
        showVerificationPrompt={showVerificationPrompt}
        setShowVerificationPrompt={setShowVerificationPrompt}
        showOnboarding={showOnboarding}
        setShowOnboarding={setShowOnboarding}
        initialStep={initialStep}
        setInitialStep={setInitialStep}
        showCloseConfirmation={showCloseConfirmation}
        setShowCloseConfirmation={setShowCloseConfirmation}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        navigateToChallengeManagement={navigateToChallengeManagement}
        handleCompleteVerification={handleCompleteVerification}
        confirmCloseChallenge={confirmCloseChallenge}
        onCreateCampaign={handleCreateCampaign}
        isClosing={closeCampaign.isPending}
      />
    )
  }

  // Desktop view
  return (
    <DesktopCampaignsView
      isVerified={isVerified}
      campaigns={campaigns}
      summary={summary}
      isLoadingCampaigns={isLoadingCampaigns}
      isLoadingSummary={isLoadingSummary}
      showVerificationPrompt={showVerificationPrompt}
      setShowVerificationPrompt={setShowVerificationPrompt}
      showOnboarding={showOnboarding}
      setShowOnboarding={setShowOnboarding}
      initialStep={initialStep}
      setInitialStep={setInitialStep}
      showCloseConfirmation={showCloseConfirmation}
      setShowCloseConfirmation={setShowCloseConfirmation}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      navigateToChallengeManagement={navigateToChallengeManagement}
      handleCloseChallenge={handleCloseChallenge}
      handleCompleteVerification={handleCompleteVerification}
      confirmCloseChallenge={confirmCloseChallenge}
      onCreateCampaign={handleCreateCampaign}
      isClosing={closeCampaign.isPending}
    />
  )
}
