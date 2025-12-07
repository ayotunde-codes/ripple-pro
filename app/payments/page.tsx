"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { VerificationPrompt } from "@/components/verification-prompt"
import { OnboardingModal } from "@/components/onboarding-modal"
import { MobilePaymentsView } from "./_components/mobile-payments-view"
import { DesktopPaymentsView } from "./_components/desktop-payments-view"
import { transactions } from "./_components/payments-data"

export default function PaymentsPage() {
  const router = useRouter()
  const [isMobileView, setIsMobileView] = useState(false)
  const [isVerified, setIsVerified] = useState(true)
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [initialStep, setInitialStep] = useState(0)

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

    // Check if the logged-in user is the verified account or unverified test account
    const loggedInEmail = localStorage.getItem("userEmail")
    if (loggedInEmail === "joshuaolugbode12+1@gmail.com") {
      // This is our test unverified user
      setIsVerified(false)
    }

    return () => {
      window.removeEventListener("resize", checkScreenSize)
      clearTimeout(timeoutId)
    }
  }, [])

  const handlePaymentAction = (action: string) => {
    if (!isVerified) {
      // Always start from step 1 (index 0) of the onboarding modal
      setInitialStep(0)
      setShowVerificationPrompt(true)
    }
  }

  const handleCompleteVerification = () => {
    setShowVerificationPrompt(false)
    setShowOnboarding(true)
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setIsVerified(true)
  }

  const handleTransactionClick = (transaction: any) => {
    if (isMobileView) {
      // Navigate to transaction details page on mobile
      router.push(`/payments/transaction/${transaction.id}`)
    }
  }

  // Mobile view
  if (isMobileView) {
    return (
      <>
        <MobilePaymentsView
          transactions={transactions}
          onTransactionClick={handleTransactionClick}
          onPaymentAction={handlePaymentAction}
        />

        {/* Verification Prompt Modal */}
        <VerificationPrompt
          open={showVerificationPrompt}
          onOpenChange={setShowVerificationPrompt}
          onComplete={handleCompleteVerification}
        />

        {/* Onboarding Modal */}
        {showOnboarding && <OnboardingModal initialStep={initialStep} onComplete={handleOnboardingComplete} />}
      </>
    )
  }

  // Desktop view
  return (
    <>
      <DesktopPaymentsView
        transactions={transactions}
        onTransactionClick={handleTransactionClick}
        onPaymentAction={handlePaymentAction}
      />

      {/* Verification Prompt Modal */}
      <VerificationPrompt
        open={showVerificationPrompt}
        onOpenChange={setShowVerificationPrompt}
        onComplete={handleCompleteVerification}
      />

      {/* Onboarding Modal */}
      {showOnboarding && <OnboardingModal initialStep={initialStep} onComplete={handleOnboardingComplete} />}
    </>
  )
}
