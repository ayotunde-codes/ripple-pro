"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useCurrentUser } from "@/services/auth"
import { useWallet, useWithdraw } from "@/services/wallet"
import { VerificationPrompt } from "@/components/verification-prompt"
import { OnboardingModal } from "@/components/onboarding-modal"
import { MobilePaymentsView } from "./_components/mobile-payments-view"
import { DesktopPaymentsView } from "./_components/desktop-payments-view"

export default function PaymentsPage() {
  const router = useRouter()
  const [isMobileView, setIsMobileView] = useState(false)
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [initialStep, setInitialStep] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)

  // Get current user and wallet data
  const { data: currentUser } = useCurrentUser()
  const { data: walletData, isLoading: isLoadingWallet } = useWallet(currentUser?.id || 0)
  const withdrawMutation = useWithdraw()

  const isVerified = currentUser?.kyc_status === "approved" || currentUser?.status === "active"

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
    } else if (action === "withdraw") {
      setShowWithdrawModal(true)
    }
  }

  const handleCompleteVerification = () => {
    setShowVerificationPrompt(false)
    setShowOnboarding(true)
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
  }

  const handleTransactionClick = (transaction: any) => {
    if (isMobileView) {
      // Navigate to transaction details page on mobile
      router.push(`/payments/transaction/${transaction.id}`)
    }
  }

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive",
      })
      return
    }

    const balance = parseFloat(walletData?.data?.balance || "0")
    const amount = parseFloat(withdrawAmount)

    if (amount > balance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough balance to withdraw this amount",
        variant: "destructive",
      })
      return
    }

    withdrawMutation.mutate(
      { amount: withdrawAmount },
      {
        onSuccess: () => {
          toast({
            title: "Withdrawal initiated",
            description: "Your withdrawal request has been submitted successfully",
          })
          setShowWithdrawModal(false)
          setWithdrawAmount("")
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

  // Mock transactions (API doesn't have transaction history endpoint yet)
  const transactions: any[] = []
  
  // Extract wallet balance and virtual account
  const walletBalance = parseFloat(walletData?.data?.balance || "0")
  const virtualAccount = walletData?.data?.virtual_accounts?.[0]

  // Mobile view
  if (isMobileView) {
    return (
      <>
        <MobilePaymentsView
          walletBalance={walletBalance}
          virtualAccount={virtualAccount}
          transactions={transactions}
          isLoadingWallet={isLoadingWallet}
          onTransactionClick={handleTransactionClick}
          onPaymentAction={handlePaymentAction}
          withdrawAmount={withdrawAmount}
          onWithdrawAmountChange={setWithdrawAmount}
          onWithdraw={handleWithdraw}
          showWithdrawModal={showWithdrawModal}
          onWithdrawModalChange={setShowWithdrawModal}
          isWithdrawing={withdrawMutation.isPending}
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
        walletBalance={walletBalance}
        virtualAccount={virtualAccount}
        transactions={transactions}
        isLoadingWallet={isLoadingWallet}
        onTransactionClick={handleTransactionClick}
        onPaymentAction={handlePaymentAction}
        withdrawAmount={withdrawAmount}
        onWithdrawAmountChange={setWithdrawAmount}
        onWithdraw={handleWithdraw}
        showWithdrawModal={showWithdrawModal}
        onWithdrawModalChange={setShowWithdrawModal}
        isWithdrawing={withdrawMutation.isPending}
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
