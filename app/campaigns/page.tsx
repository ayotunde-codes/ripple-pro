"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { MobileCampaignsView } from "./_components/mobile-campaigns-view"
import { DesktopCampaignsView } from "./_components/desktop-campaigns-view"
import { challenges } from "./_components/campaigns-data"

export default function CampaignsPage() {
  const router = useRouter()
  const [isVerified, setIsVerified] = useState(true)
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [initialStep, setInitialStep] = useState(0)
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

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
    // Check if all creators have been paid out or declined
    const allCreatorsHandled = true // This should be a real check in your actual implementation
    if (allCreatorsHandled) {
      setSelectedChallenge(challenge)
      setShowCloseConfirmation(true)
    } else {
      toast({
        title: "Error",
        description: "Please approve or decline rewards for all users before closing the challenge.",
        variant: "destructive",
      })
    }
  }

  const confirmCloseChallenge = () => {
    // Implement the logic to close the challenge and refund the balance
    toast({
      title: "Challenge Closed",
      description: "The challenge has been closed and any remaining balance has been refunded to your wallet.",
    })
    setShowCloseConfirmation(false)
  }

  // Navigate to challenge management page
  const navigateToChallengeManagement = (challengeId: number) => {
    router.push(`/campaigns/challengemanagement/${challengeId}`)
  }

  // Filter challenges based on search query
  const filteredChallenges = challenges.filter((challenge) =>
    challenge.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
        showVerificationPrompt={showVerificationPrompt}
        setShowVerificationPrompt={setShowVerificationPrompt}
        showOnboarding={showOnboarding}
        setShowOnboarding={setShowOnboarding}
        setIsVerified={setIsVerified}
        initialStep={initialStep}
        setInitialStep={setInitialStep}
        showCloseConfirmation={showCloseConfirmation}
        setShowCloseConfirmation={setShowCloseConfirmation}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredChallenges={filteredChallenges}
        navigateToChallengeManagement={navigateToChallengeManagement}
        handleCompleteVerification={handleCompleteVerification}
        confirmCloseChallenge={confirmCloseChallenge}
        onCreateCampaign={handleCreateCampaign}
      />
    )
  }

  // Desktop view
  return (
    <DesktopCampaignsView
      isVerified={isVerified}
      showVerificationPrompt={showVerificationPrompt}
      setShowVerificationPrompt={setShowVerificationPrompt}
      showOnboarding={showOnboarding}
      setShowOnboarding={setShowOnboarding}
      setIsVerified={setIsVerified}
      initialStep={initialStep}
      setInitialStep={setInitialStep}
      showCloseConfirmation={showCloseConfirmation}
      setShowCloseConfirmation={setShowCloseConfirmation}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      filteredChallenges={filteredChallenges}
      navigateToChallengeManagement={navigateToChallengeManagement}
      handleCloseChallenge={handleCloseChallenge}
      handleCompleteVerification={handleCompleteVerification}
      confirmCloseChallenge={confirmCloseChallenge}
      onCreateCampaign={handleCreateCampaign}
    />
  )
}
