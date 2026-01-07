"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { VerificationPrompt } from "@/components/verification-prompt"
import { OnboardingModal } from "@/components/onboarding-modal"
import { ChallengeDetailsView } from "./_components/challenge-details-view"
import { SubmissionFormView } from "./_components/submission-form-view"
import { SuccessModal } from "./_components/success-modal"
// import { availableChallenges } from "./_components/challenge-data" // COMMENTED OUT: Using API data now
import { useJoinChallenge, useAvailableChallenges } from "@/services/challenge"
import { toast } from "@/components/ui/use-toast"
import type { SubmissionFormData } from "./_components/submission-schema"

export default function JoinChallengePage() {
  const router = useRouter()
  const params = useParams()
  const challengeId = Number.parseInt(params.id as string)

  const [challenge, setChallenge] = useState(null)
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isVerified, setIsVerified] = useState(true)
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [initialStep, setInitialStep] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  // API hooks
  const joinChallenge = useJoinChallenge()
  const { data: challengesData, isLoading: isLoadingChallenges } = useAvailableChallenges({
    page: 1,
    length: 100,
  })

  useEffect(() => {
    setMounted(true)

    // Find the challenge by ID from API data
    if (challengesData?.data) {
      const foundChallenge = challengesData.data.find((c: any) => c.id === challengeId)
      if (foundChallenge) {
        // Transform API campaign to challenge format for UI compatibility
        setChallenge({
          id: foundChallenge.id,
          title: foundChallenge.campaign_name,
          creator: "Brand", // Not available in API
          category: foundChallenge.category,
          totalPool: foundChallenge.challenge_pool,
          paidOut: 0, // Not available in API
          views: 0, // Not available in API
          participants: 0, // Not available in API
          rewardRate: foundChallenge.reward_rate_amount,
          maxPayout: foundChallenge.max_payout,
          platforms: foundChallenge.social_media_platforms,
          requirements: foundChallenge.content_requirement || "No specific requirements",
          endDate: foundChallenge.end_date,
          hasProfilePic: false,
          assetLinks: [], // Not available in API
          additionalNotes: foundChallenge.content_requirement || "",
        } as any)
      }
    }

    // Check verification status
    const loggedInEmail = localStorage.getItem("userEmail")
    if (loggedInEmail === "joshuaolugbode12+1@gmail.com") {
      setIsVerified(false)
    }
  }, [challengeId, challengesData])

  const handleJoinChallenge = () => {
    if (!isVerified) {
      setInitialStep(0)
      setShowVerificationPrompt(true)
    } else {
      setShowSubmissionForm(true)
    }
  }

  const handleSubmitLinks = async (data: SubmissionFormData) => {
    // Transform form data to API format
    const socialMediaLinks: string[] = []
    
    // Add links from the form data
    if (data.instagram) {
      socialMediaLinks.push(data.instagram)
    }
    if (data.facebook) {
      socialMediaLinks.push(data.facebook)
    }
    if (data.twitter) {
      socialMediaLinks.push(data.twitter)
    }
    if (data.youtube) {
      socialMediaLinks.push(data.youtube)
    }
    if (data.tiktok) {
      socialMediaLinks.push(data.tiktok)
    }

    // Call API
    joinChallenge.mutate(
      {
        challengeId,
        data: {
          social_media_links: socialMediaLinks,
        },
      },
      {
        onSuccess: () => {
          setShowSuccess(true)
          toast({
            title: "Success!",
            description: "You've successfully joined the challenge.",
          })

          setTimeout(() => {
            setShowSuccess(false)
            router.push("/challenges")
          }, 3000)
        },
        onError: (error: any) => {
          toast({
            title: "Submission failed",
            description: error?.response?.data?.message || "Failed to join challenge",
            variant: "destructive",
          })
        },
      }
    )
  }

  const handleCompleteVerification = () => {
    setShowVerificationPrompt(false)
    setShowOnboarding(true)
  }

  if (!mounted || isLoadingChallenges || !challenge) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-lg">Loading challenge details...</p>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      {!showSubmissionForm ? (
        <ChallengeDetailsView
          challenge={challenge}
          onClose={() => router.push("/challenges")}
          onJoin={handleJoinChallenge}
        />
      ) : (
        <SubmissionFormView
          challenge={challenge}
          onBack={() => setShowSubmissionForm(false)}
          onSubmit={handleSubmitLinks}
          isSubmitting={joinChallenge.isPending}
        />
      )}

      {/* Success Modal */}
      <SuccessModal open={showSuccess} onOpenChange={setShowSuccess} />

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
