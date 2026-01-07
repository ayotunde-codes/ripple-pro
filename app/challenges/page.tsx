"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { VerificationPrompt } from "@/components/verification-prompt"
import { OnboardingModal } from "@/components/onboarding-modal"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { MobileChallengesView } from "./_components/mobile-challenges-view"
import { DesktopChallengesView } from "./_components/desktop-challenges-view"
import { RedeemConfirmationModal } from "./_components/redeem-confirmation-modal"
// import { availableChallenges } from "./_components/challenges-data" // COMMENTED OUT: Using API data now
import { useAvailableChallenges, useMySubmissions, useRedeemReward } from "@/services/challenge"
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
  const [showRedeemModal, setShowRedeemModal] = useState(false)
  const [selectedChallengeForRedeem, setSelectedChallengeForRedeem] = useState<any>(null)
  
  // API hooks
  // NOTE: useAvailableChallenges wraps the campaigns API (GET /campaigns) 
  // since there's no dedicated GET /challenges endpoint yet.
  // See services/challenge/queries.ts for details.
  const { data: challengesData, isLoading: isLoadingChallenges } = useAvailableChallenges({
    page: 1,
    length: 50,
  })
  const { data: mySubmissionsData, isLoading: isLoadingSubmissions } = useMySubmissions({
    page: 1,
    length: 50,
  })
  const redeemReward = useRedeemReward()

  // Use API data
  const apiChallenges = challengesData?.data || []
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

  // Use API data only - REMOVED FALLBACK TO MOCK DATA
  const allChallenges = transformedChallenges
  // const allChallenges = transformedChallenges.length > 0 ? transformedChallenges : availableChallenges

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

  // Check if profile is complete
  const [profileComplete, setProfileComplete] = useState<boolean | null>(null)
  
  useEffect(() => {
    const complete = localStorage.getItem("profileComplete") === "true"
    setProfileComplete(complete)
  }, [])

  // Update the handleJoinChallenge function to navigate to the dedicated page
  const handleJoinChallenge = (challenge: any) => {
    // Check profile completion first
    if (profileComplete === false) {
      toast({
        title: "Profile incomplete",
        description: "Please complete your profile before joining challenges.",
        variant: "destructive",
      })
      router.push("/profile/information")
      return
    }
    
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

  const handleRedeemClick = (challengeId: number) => {
    // Find the challenge details
    const challenge = mySubmissions.find((c) => c.challenge_id === challengeId)
    setSelectedChallengeForRedeem(challenge)
    setShowRedeemModal(true)
  }

  const handleConfirmRedeem = () => {
    if (!selectedChallengeForRedeem) return

    redeemReward.mutate(selectedChallengeForRedeem.challenge_id, {
      onSuccess: (response) => {
        toast({
          title: "Redemption Request Submitted",
          description: "Your redemption request has been sent to the brand for approval.",
        })
        setShowRedeemModal(false)
        setSelectedChallengeForRedeem(null)
      },
      onError: (error: any) => {
        toast({
          title: "Redemption Failed",
          description: error?.response?.data?.message || "Failed to submit redemption request",
          variant: "destructive",
        })
      },
    })
  }

  return (
    <DashboardShell>
      {/* Profile Completion Prompt */}
      {profileComplete === false && (
        <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950 mb-6">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-orange-600 dark:text-orange-400">
              <strong>Complete your profile</strong> to join challenges and start earning.
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
      
      {isMobileView ? (
        <MobileChallengesView
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          filteredAvailableChallenges={filteredAvailableChallenges}
          mySubmissions={mySubmissions}
          isLoadingSubmissions={isLoadingSubmissions}
          onJoinChallenge={handleJoinChallenge}
          onRedeem={handleRedeemClick}
          isRedeeming={redeemReward.isPending}
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
          isLoadingSubmissions={isLoadingSubmissions}
          onJoinChallenge={handleJoinChallenge}
          onRedeem={handleRedeemClick}
          isRedeeming={redeemReward.isPending}
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

      {/* Redeem Confirmation Modal */}
      <RedeemConfirmationModal
        open={showRedeemModal}
        onOpenChange={setShowRedeemModal}
        onConfirm={handleConfirmRedeem}
        isLoading={redeemReward.isPending}
        challengeName={selectedChallengeForRedeem?.challenge?.campaign_name || selectedChallengeForRedeem?.challange_name}
        earnings={Number(selectedChallengeForRedeem?.earnings || 0)}
      />
    </DashboardShell>
  )
}
