"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { VerificationPrompt } from "@/components/verification-prompt"
import { OnboardingModal } from "@/components/onboarding-modal"
import { ChallengeDetailsView } from "./_components/challenge-details-view"
import { SubmissionFormView } from "./_components/submission-form-view"
import { SuccessModal } from "./_components/success-modal"
import { availableChallenges } from "./_components/challenge-data"
import { useJoinChallenge } from "@/services/challenge"
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
  
  // API hook
  const joinChallenge = useJoinChallenge()

  useEffect(() => {
    setMounted(true)

    // Find the challenge by ID
    const foundChallenge = availableChallenges.find((c) => c.id === challengeId)
    setChallenge(foundChallenge)

    // Check verification status
    const loggedInEmail = localStorage.getItem("userEmail")
    if (loggedInEmail === "joshuaolugbode12+1@gmail.com") {
      setIsVerified(false)
    }
  }, [challengeId])

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
    
    // Add links in order based on platform selection
    if (data.platform === "instagram" || data.platform === "all") {
      socialMediaLinks.push(data.instagramLink || "")
    }
    if (data.platform === "facebook" || data.platform === "all") {
      socialMediaLinks.push(data.facebookLink || "")
    }
    if (data.platform === "twitter" || data.platform === "all") {
      socialMediaLinks.push(data.twitterLink || "")
    }
    if (data.platform === "youtube" || data.platform === "all") {
      socialMediaLinks.push(data.youtubeLink || "")
    }
    if (data.platform === "tiktok" || data.platform === "all") {
      socialMediaLinks.push(data.tiktokLink || "")
    }

    // Call API
    joinChallenge.mutate(
      {
        challengeId,
        data: {
          social_media_links: socialMediaLinks.filter(link => link !== ""),
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

  if (!challenge || !mounted) {
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
          onClose={() => setShowSubmissionForm(false)}
          onSubmit={handleSubmitLinks}
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
