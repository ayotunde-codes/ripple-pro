"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { useCurrentUser } from "@/services/auth"
import { useCampaigns, useCampaignSummary, useCloseCampaign } from "@/services/campaign"
import { useModalStore, useCampaignStore } from "@/stores"
import { MobileCampaignsView } from "./_components/mobile-campaigns-view"
import { DesktopCampaignsView } from "./_components/desktop-campaigns-view"

export default function CampaignsPage() {
  const router = useRouter()
  const { data: currentUser } = useCurrentUser()
  
  // Zustand stores
  const campaignStoreData = useCampaignStore()
  const searchQuery = campaignStoreData?.searchQuery || ''
  const statusFilter = campaignStoreData?.statusFilter || 'all'
  const setCampaigns = campaignStoreData?.setCampaigns || (() => {})
  const setSummary = campaignStoreData?.setSummary || (() => {})
  const setIsLoadingCampaigns = campaignStoreData?.setIsLoadingCampaigns || (() => {})
  const setIsLoadingSummary = campaignStoreData?.setIsLoadingSummary || (() => {})
  const setIsMobile = campaignStoreData?.setIsMobile || (() => {})
  const selectedChallenge = campaignStoreData?.selectedChallenge || null
  const closeCloseConfirmation = campaignStoreData?.closeCloseConfirmation || (() => {})
  const isMobile = campaignStoreData?.isMobile || false

  // API hooks
  const { data: campaignsData, isLoading: isLoadingCampaigns } = useCampaigns({
    search: searchQuery || undefined,
    status: statusFilter,
  })
  const { data: summaryData, isLoading: isLoadingSummary } = useCampaignSummary()
  const closeCampaign = useCloseCampaign()

  const isVerified = currentUser?.kyc_status === "approved" || currentUser?.status === "active"

  // Update store with API data
  useEffect(() => {
    setCampaigns(campaignsData?.data || [])
    setIsLoadingCampaigns(isLoadingCampaigns)
  }, [campaignsData, isLoadingCampaigns, setCampaigns, setIsLoadingCampaigns])

  useEffect(() => {
    setSummary(summaryData?.data)
    setIsLoadingSummary(isLoadingSummary)
  }, [summaryData, isLoadingSummary, setSummary, setIsLoadingSummary])

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [setIsMobile])

  const handleCompleteVerification = () => {
    useModalStore.getState().closeVerificationPrompt()
    useModalStore.getState().openOnboarding()
  }

  const confirmCloseChallenge = () => {
    if (!selectedChallenge) return

    closeCampaign.mutate(selectedChallenge.id, {
      onSuccess: () => {
        toast({
          title: "Campaign Closed",
          description: "The campaign has been closed and any remaining balance has been refunded to your wallet.",
        })
        closeCloseConfirmation()
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

  const navigateToChallengeManagement = (challengeId: number) => {
    router.push(`/campaigns/challengemanagement/${challengeId}`)
  }

  const handleCreateCampaign = () => {
    if (!isVerified) {
      useModalStore.getState().openVerificationPrompt()
    } else {
      router.push("/campaigns/new")
    }
  }

  // Render based on screen size
  return isMobile ? (
    <MobileCampaignsView
      onCompleteVerification={handleCompleteVerification}
      confirmCloseChallenge={confirmCloseChallenge}
      navigateToChallengeManagement={navigateToChallengeManagement}
      onCreateCampaign={handleCreateCampaign}
      isClosing={closeCampaign.isPending}
    />
  ) : (
    <DesktopCampaignsView
      onCompleteVerification={handleCompleteVerification}
      confirmCloseChallenge={confirmCloseChallenge}
      navigateToChallengeManagement={navigateToChallengeManagement}
      onCreateCampaign={handleCreateCampaign}
      isClosing={closeCampaign.isPending}
    />
  )
}
