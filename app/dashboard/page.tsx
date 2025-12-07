"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { MobileDashboard } from "./_components/mobile-dashboard"
import { DesktopDashboard } from "./_components/desktop-dashboard"

export default function DashboardPage() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [showFundingModal, setShowFundingModal] = useState(false)
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false)
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false)
  const [isVerified, setIsVerified] = useState(true)
  const [initialStep, setInitialStep] = useState(0)
  const [isMobileView, setIsMobileView] = useState(false)

  const router = useRouter()

  useEffect(() => {
    // Check screen size
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    } else {
      // Check if the logged-in user is the verified account or unverified test account
      const loggedInEmail = localStorage.getItem("userEmail")

      if (loggedInEmail === "joshuaolugbode12+1@gmail.com") {
        // This is our test unverified user
        setIsVerified(false)
        setShowBanner(true)
      } else if (loggedInEmail !== "joshuaolugbode12@gmail.com") {
        // For any other user, check if they've completed onboarding
        const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding")
        if (!hasCompletedOnboarding) {
          setShowOnboarding(true)
        } else {
          // Check if they've completed settlement account and KYB
          const hasSettlementAccount = localStorage.getItem("hasSettlementAccount")
          const hasCompletedKYB = localStorage.getItem("hasCompletedKYB")

          if (!hasSettlementAccount || !hasCompletedKYB) {
            setShowBanner(true)
          }
        }
      }
    }

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [router])

  const handleBannerDismiss = () => {
    setShowBanner(false)
    // Set a temporary dismissal in session storage
    sessionStorage.setItem("bannerDismissed", "true")
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setIsVerified(true)
  }

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText("9876543210")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWithdrawalSubmit = () => {
    setShowWithdrawalModal(false)
    setShowOtpModal(true)
  }

  const handleOtpSubmit = () => {
    if (otp === "123456") {
      setShowOtpModal(false)
      setShowSuccessModal(true)
      setTimeout(() => {
        setShowSuccessModal(false)
      }, 3000)
    } else {
      setOtpError("Invalid OTP. Please try again.")
    }
  }

  const handleQuickAction = (action: string) => {
    if (!isVerified) {
      // Always start from step 1 (index 0) of the onboarding modal
      setInitialStep(0)
      setShowVerificationPrompt(true)
    } else {
      // Execute the action for verified users
      switch (action) {
        case "newChallenge":
          router.push("/campaigns/new")
          break
        case "myChallenges":
          router.push("/challenges?tab=my-challenges")
          break
        case "fundWallet":
          setShowFundingModal(true)
          break
        case "withdraw":
          setShowWithdrawalModal(true)
          break
      }
    }
  }

  const handleCompleteVerification = () => {
    setShowVerificationPrompt(false)
    setShowOnboarding(true)
  }

  const handleViewAllChallenges = () => {
    handleQuickAction("myChallenges")
  }

  return (
    <DashboardShell>
      <div className="pb-16 md:pb-0">
        {isMobileView ? (
          <MobileDashboard
            isVerified={isVerified}
            onDismissBanner={handleBannerDismiss}
            onViewAllChallenges={handleViewAllChallenges}
          />
        ) : (
          <DesktopDashboard
            showBanner={showBanner}
            onDismissBanner={handleBannerDismiss}
            showVerificationPrompt={showVerificationPrompt}
            setShowVerificationPrompt={setShowVerificationPrompt}
            showOnboarding={showOnboarding}
            initialStep={initialStep}
            onCompleteVerification={handleCompleteVerification}
            onOnboardingComplete={handleOnboardingComplete}
            showFundingModal={showFundingModal}
            setShowFundingModal={setShowFundingModal}
            showWithdrawalModal={showWithdrawalModal}
            setShowWithdrawalModal={setShowWithdrawalModal}
            showOtpModal={showOtpModal}
            setShowOtpModal={setShowOtpModal}
            showSuccessModal={showSuccessModal}
            setShowSuccessModal={setShowSuccessModal}
            withdrawalAmount={withdrawalAmount}
            setWithdrawalAmount={setWithdrawalAmount}
            otp={otp}
            setOtp={setOtp}
            otpError={otpError}
            copied={copied}
            onCopyAccountNumber={handleCopyAccountNumber}
            onWithdrawalSubmit={handleWithdrawalSubmit}
            onOtpSubmit={handleOtpSubmit}
            onQuickAction={handleQuickAction}
            onViewAllChallenges={handleViewAllChallenges}
          />
        )}
      </div>
    </DashboardShell>
  )
}
