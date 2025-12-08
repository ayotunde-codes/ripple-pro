"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { VerificationPrompt } from "@/components/verification-prompt"
import { OnboardingModal } from "@/components/onboarding-modal"
import { MobileChallengesView } from "./_components/mobile-challenges-view"
import { DesktopChallengesView } from "./_components/desktop-challenges-view"
import { availableChallenges } from "./_components/challenges-data"
import { useCampaigns } from "@/services/campaign"
import { useMySubmissions } from "@/services/challenge"
import { toast } from "@/components/ui/use-toast"

export default function ChallengesPage() {
  const router = useRouter()
  const [isVerified, setIsVerified] = useState(true)
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [initialStep, setInitialStep] = useState(0)
  const [isMobileView, setIsMobileView] = useState(false)
  const [activeTab, setActiveTab] = useState("explore")
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  // API hooks - Note: campaigns API can be used for browsing available challenges
  const { data: campaignsData, isLoading: isLoadingCampaigns } = useCampaigns({
    page: 1,
    limit: 50,
    status: "active", // Only show active campaigns/challenges
  })
  const { data: mySubmissionsData, isLoading: isLoadingSubmissions } = useMySubmissions({
    page: 1,
    limit: 50,
  })

  // Use API data if available, otherwise fallback to mock data
  const apiChallenges = campaignsData?.data || []
  const mySubmissions = mySubmissionsData?.data || []

  // Transform API campaigns to challenge format for UI compatibility
  const transformedChallenges = apiChallenges.map((campaign) => ({
    id: campaign.id,
    title: campaign.campaign_name,
    brand: "Brand", // Not available in API
    category: campaign.category,
    description: campaign.content_requirement || "No description available",
    reward: `₦${campaign.reward_rate_amount} per ${campaign.reward_rate_views} views`,
    maxPayout: campaign.max_payout,
    endDate: campaign.end_date,
    platforms: campaign.social_media_platforms,
    participants: 0, // Not available in API
    totalPool: campaign.challenge_pool,
    status: campaign.status,
  }))

  // Use API data if available, otherwise use mock data
  const allChallenges = transformedChallenges.length > 0 ? transformedChallenges : availableChallenges

  // Extract unique categories for filtering
  const categories = ["all", ...new Set(allChallenges.map((challenge) => challenge.category))]

  // Filter challenges based on category
  const filteredAvailableChallenges = allChallenges.filter((challenge) => {
    return selectedCategory === "all" || challenge.category === selectedCategory
  })

  useEffect(() => {
    // Check screen size with debounce to prevent frequent re-renders
    let timeoutId: NodeJS.Timeout
    const checkScreenSize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsMobileView(window.innerWidth < 768)
      }, 100)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    const loggedInEmail = localStorage.getItem("userEmail")
    if (loggedInEmail === "joshuaolugbode12+1@gmail.com") {
      setIsVerified(false)
    }

    return () => {
      window.removeEventListener("resize", checkScreenSize)
      clearTimeout(timeoutId)
    }
  }, [])

  // Reset category filter when changing tabs
  useEffect(() => {
    setSelectedCategory("all")
  }, [activeTab])

  // Update the handleJoinChallenge function to navigate to the dedicated page
  const handleJoinChallenge = (challenge: any) => {
    if (!isVerified) {
      // Always start from step 1 (index 0) of the onboarding modal
      setInitialStep(0)
      setShowVerificationPrompt(true)
    } else {
      // Navigate to the dedicated join challenge page
      router.push(`/challenges/join/${challenge.id}`)
    }
  }

  const handleCompleteVerification = () => {
    setShowVerificationPrompt(false)
    setShowOnboarding(true)
  }

  return (
    <DashboardShell>
      {isMobileView ? (
        <MobileChallengesView
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          filteredAvailableChallenges={filteredAvailableChallenges}
          mySubmissions={mySubmissions}
          isLoadingChallenges={isLoadingCampaigns}
          isLoadingSubmissions={isLoadingSubmissions}
          onJoinChallenge={handleJoinChallenge}
        />
      ) : (
        <DesktopChallengesView
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          filteredAvailableChallenges={filteredAvailableChallenges}
          mySubmissions={mySubmissions}
          isLoadingChallenges={isLoadingCampaigns}
          isLoadingSubmissions={isLoadingSubmissions}
          onJoinChallenge={handleJoinChallenge}
        />
      )}

      {/* Verification Prompt Modal */}
      <VerificationPrompt
        open={showVerificationPrompt}
        onOpenChange={setShowVerificationPrompt}
        onComplete={handleCompleteVerification}
      />

      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal
          initialStep={initialStep}
          onComplete={() => {
            setShowOnboarding(false)
            setIsVerified(true)
          }}
        />
      )}
    </DashboardShell>
  )
}
