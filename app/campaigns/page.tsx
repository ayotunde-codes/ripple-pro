"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
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
  const statusFilter = campaignStoreData?.statusFilter || ""
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
    status: statusFilter || undefined,
  })
  const { data: summaryData, isLoading: isLoadingSummary } = useCampaignSummary()
  const closeCampaign = useCloseCampaign()

  const isVerified = currentUser?.kyc_status === "approved" || currentUser?.status === "active"
  
  // Check if profile is complete
  const [profileComplete, setProfileComplete] = useState<boolean | null>(null)
  
  useEffect(() => {
    const complete = localStorage.getItem("profileComplete") === "true"
    setProfileComplete(complete)
  }, [])

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
    // Check profile completion first
    if (profileComplete === false) {
      toast({
        title: "Profile incomplete",
        description: "Please complete your profile before creating campaigns.",
        variant: "destructive",
      })
      router.push("/profile/information")
      return
    }
    
    if (!isVerified) {
      useModalStore.getState().openVerificationPrompt()
    } else {
      router.push("/campaigns/new")
    }
  }

  // Render based on screen size
  return (
    <>
      {/* Profile Completion Prompt */}
      {profileComplete === false && (
        <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950 mb-6">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-orange-600 dark:text-orange-400">
              <strong>Complete your profile</strong> to create and manage campaigns.
            </span>
            <Button
              onClick={() => router.push("/profile/information")}
              className="ml-4 bg-orange-600 hover:bg-orange-700 text-white"
              size="sm"
            >
              Complete Profile
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      {isMobile ? (
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
      )}
    </>
  )
}
