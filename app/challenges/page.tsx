"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { VerificationPrompt } from "@/components/verification-prompt"
import { OnboardingModal } from "@/components/onboarding-modal"
import { MobileChallengesView } from "./_components/mobile-challenges-view"
import { DesktopChallengesView } from "./_components/desktop-challenges-view"
import { availableChallenges } from "./_components/challenges-data"

export default function ChallengesPage() {
  const router = useRouter()
  const [isVerified, setIsVerified] = useState(true)
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [initialStep, setInitialStep] = useState(0)
  const [isMobileView, setIsMobileView] = useState(false)
  const [activeTab, setActiveTab] = useState("explore")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Extract unique categories for filtering
  const categories = ["all", ...new Set(availableChallenges.map((challenge) => challenge.category))]

  // Filter challenges based on category
  const filteredAvailableChallenges = availableChallenges.filter((challenge) => {
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
