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
    console.log("Submission data:", data)
    setShowSuccess(true)

    setTimeout(() => {
      setShowSuccess(false)
      router.push("/challenges")
    }, 3000)
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
