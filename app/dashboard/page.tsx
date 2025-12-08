"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useCurrentUser } from "@/services/auth"
import { useWallet, useWithdraw } from "@/services/wallet"
import { useCampaigns } from "@/services/campaign"
import { useMySubmissions } from "@/services/challenge"
import { DashboardShell } from "@/components/dashboard-shell"
import { MobileDashboard } from "./_components/mobile-dashboard"
import { DesktopDashboard } from "./_components/desktop-dashboard"

export default function DashboardPage() {
  const router = useRouter()
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
  const [initialStep, setInitialStep] = useState(0)
  const [isMobileView, setIsMobileView] = useState(false)

  // API hooks
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser()
  const { data: walletData, isLoading: isLoadingWallet } = useWallet(currentUser?.id || 0)
  const { data: campaignsData, isLoading: isLoadingCampaigns } = useCampaigns({ length: 5 })
  const { data: submissionsData, isLoading: isLoadingSubmissions } = useMySubmissions({ length: 5 })
  const withdrawMutation = useWithdraw()

  // Determine if user is verified
  const isVerified = currentUser?.kyc_status === "approved" || currentUser?.is_email_verified

  // Calculate stats from real data
  const stats = {
    walletBalance: Number(walletData?.data?.balance || 0),
    totalEarnings: submissionsData?.data?.reduce((sum, sub) => sum + (sub.earnings || 0), 0) || 0,
    activeChallenges: campaignsData?.meta?.total || 0,
    totalViews: submissionsData?.data?.reduce((sum, sub) => sum + (sub.views || 0), 0) || 0,
  }

  const recentChallenges = campaignsData?.data?.slice(0, 5) || []
  const virtualAccount = walletData?.data?.virtual_accounts?.[0] || null

  useEffect(() => {
    // Check screen size
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    // Show banner if user is not verified
    if (currentUser && !isVerified) {
      setShowBanner(true)
    }

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [currentUser, isVerified])

  const handleBannerDismiss = () => {
    setShowBanner(false)
    // Set a temporary dismissal in session storage
    sessionStorage.setItem("bannerDismissed", "true")
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
  }

  const handleCopyAccountNumber = () => {
    if (virtualAccount?.account_number) {
      navigator.clipboard.writeText(virtualAccount.account_number)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copied!",
        description: "Account number copied to clipboard",
      })
    }
  }

  const handleWithdrawalSubmit = () => {
    if (!withdrawalAmount || Number(withdrawalAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive",
      })
      return
    }

    const amount = Number(withdrawalAmount)
    const balance = Number(walletData?.data?.balance || 0)

    if (amount > balance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive",
      })
      return
    }

    withdrawMutation.mutate(
      { amount: amount.toString() },
      {
        onSuccess: () => {
          setShowWithdrawalModal(false)
          setShowSuccessModal(true)
          setWithdrawalAmount("")
          toast({
            title: "Withdrawal successful",
            description: "Your withdrawal has been processed",
          })
          setTimeout(() => {
            setShowSuccessModal(false)
          }, 3000)
        },
        onError: (error: any) => {
          toast({
            title: "Withdrawal failed",
            description: error?.response?.data?.message || "Failed to process withdrawal",
            variant: "destructive",
          })
        },
      }
    )
  }

  const handleOtpSubmit = () => {
    // OTP validation removed - withdrawal happens directly via API
    setShowOtpModal(false)
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

  const isLoading = isLoadingUser || isLoadingWallet || isLoadingCampaigns || isLoadingSubmissions

  return (
    <DashboardShell>
      <div className="pb-16 md:pb-0">
        {isMobileView ? (
          <MobileDashboard
            isVerified={isVerified}
            stats={stats}
            recentChallenges={recentChallenges}
            virtualAccount={virtualAccount}
            isLoading={isLoading}
            onDismissBanner={handleBannerDismiss}
            onViewAllChallenges={handleViewAllChallenges}
            onQuickAction={handleQuickAction}
          />
        ) : (
          <DesktopDashboard
            showBanner={showBanner}
            stats={stats}
            recentChallenges={recentChallenges}
            virtualAccount={virtualAccount}
            isLoading={isLoading}
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
            isWithdrawing={withdrawMutation.isPending}
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
