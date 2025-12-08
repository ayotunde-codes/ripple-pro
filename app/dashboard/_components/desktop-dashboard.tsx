import { Plus, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProfileBanner } from "@/components/profile-banner"
import { Overview } from "@/components/overview"
import { OnboardingModal } from "@/components/onboarding-modal"
import { VerificationPrompt } from "@/components/verification-prompt"
import { ThemeToggle } from "@/components/theme-toggle"
import { useModalStore, useDashboardStore } from "@/stores"
import { DashboardStats } from "./dashboard-stats"
import { QuickActions } from "./quick-actions"
import { RecentChallenges } from "./recent-challenges"
import {
  FundWalletModal,
  WithdrawalModal,
  OtpVerificationModal,
  SuccessModal,
} from "./dashboard-modals"

interface DesktopDashboardProps {
  onCompleteVerification: () => void
  onOnboardingComplete: () => void
  onCopyAccountNumber: () => void
  onWithdrawalSubmit: () => void
  onQuickAction: (action: string) => void
  onViewAllChallenges: () => void
  isWithdrawing: boolean
}

export function DesktopDashboard({
  onCompleteVerification,
  onOnboardingComplete,
  onCopyAccountNumber,
  onWithdrawalSubmit,
  onQuickAction,
  onViewAllChallenges,
  isWithdrawing,
}: DesktopDashboardProps) {
  // Get data from stores
  const { showBanner, dismissBanner } = useDashboardStore()
  const {
    showVerificationPrompt,
    closeVerificationPrompt,
    showOnboarding,
    onboardingInitialStep,
    showFundingModal,
    closeFundingModal,
    showWithdrawalModal,
    closeWithdrawalModal,
    withdrawalAmount,
    setWithdrawalAmount,
    showOtpModal,
    closeOtpModal,
    otp,
    setOtp,
    otpError,
    showSuccessModal,
    closeSuccessModal,
    copied,
  } = useModalStore()

  return (
    <>
      {showBanner && <ProfileBanner onDismiss={dismissBanner} />}

      <DashboardHeader heading="Dashboard" text="Welcome back! Here's an overview of your account.">
        <div className="flex space-x-2">
          <ThemeToggle />
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button onClick={() => onQuickAction("newChallenge")}>
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>
      </DashboardHeader>

      <DashboardStats />

      {/* Quick Actions Section */}
      <QuickActions onAction={onQuickAction} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Performance Overview */}
        <Card className="lg:col-span-2 border shadow-sm">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>

        {/* Recent Challenges */}
        <RecentChallenges onViewAll={onViewAllChallenges} />
      </div>

      {/* Verification Prompt */}
      <VerificationPrompt
        open={showVerificationPrompt}
        onOpenChange={closeVerificationPrompt}
        onComplete={onCompleteVerification}
      />

      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal initialStep={onboardingInitialStep} onComplete={onOnboardingComplete} />
      )}

      {/* Fund Wallet Modal */}
      <FundWalletModal
        open={showFundingModal}
        onOpenChange={closeFundingModal}
        copied={copied}
        onCopyAccountNumber={onCopyAccountNumber}
      />

      {/* Withdrawal Modal */}
      <WithdrawalModal
        open={showWithdrawalModal}
        onOpenChange={closeWithdrawalModal}
        amount={withdrawalAmount}
        onAmountChange={setWithdrawalAmount}
        onSubmit={onWithdrawalSubmit}
        isLoading={isWithdrawing}
      />

      {/* OTP Verification Modal */}
      <OtpVerificationModal
        open={showOtpModal}
        onOpenChange={closeOtpModal}
        otp={otp}
        setOtp={setOtp}
        otpError={otpError}
        onSubmit={() => {}}
      />

      {/* Success Modal */}
      <SuccessModal open={showSuccessModal} onOpenChange={closeSuccessModal} />
    </>
  )
}
