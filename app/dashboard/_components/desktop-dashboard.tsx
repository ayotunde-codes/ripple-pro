import { Plus, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProfileBanner } from "@/components/profile-banner"
import { Overview } from "@/components/overview"
import { OnboardingModal } from "@/components/onboarding-modal"
import { VerificationPrompt } from "@/components/verification-prompt"
import { ThemeToggle } from "@/components/theme-toggle"
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
  showBanner: boolean
  onDismissBanner: () => void
  showVerificationPrompt: boolean
  setShowVerificationPrompt: (show: boolean) => void
  showOnboarding: boolean
  initialStep: number
  onCompleteVerification: () => void
  onOnboardingComplete: () => void
  showFundingModal: boolean
  setShowFundingModal: (show: boolean) => void
  showWithdrawalModal: boolean
  setShowWithdrawalModal: (show: boolean) => void
  showOtpModal: boolean
  setShowOtpModal: (show: boolean) => void
  showSuccessModal: boolean
  setShowSuccessModal: (show: boolean) => void
  withdrawalAmount: string
  setWithdrawalAmount: (amount: string) => void
  otp: string
  setOtp: (otp: string) => void
  otpError: string
  copied: boolean
  onCopyAccountNumber: () => void
  onWithdrawalSubmit: () => void
  onOtpSubmit: () => void
  onQuickAction: (action: string) => void
  onViewAllChallenges: () => void
}

export function DesktopDashboard({
  showBanner,
  onDismissBanner,
  showVerificationPrompt,
  setShowVerificationPrompt,
  showOnboarding,
  initialStep,
  onCompleteVerification,
  onOnboardingComplete,
  showFundingModal,
  setShowFundingModal,
  showWithdrawalModal,
  setShowWithdrawalModal,
  showOtpModal,
  setShowOtpModal,
  showSuccessModal,
  setShowSuccessModal,
  withdrawalAmount,
  setWithdrawalAmount,
  otp,
  setOtp,
  otpError,
  copied,
  onCopyAccountNumber,
  onWithdrawalSubmit,
  onOtpSubmit,
  onQuickAction,
  onViewAllChallenges,
}: DesktopDashboardProps) {
  return (
    <>
      {showBanner && <ProfileBanner onDismiss={onDismissBanner} />}

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
          <CardContent>
            <Overview />
          </CardContent>
        </Card>

        {/* Recent Challenges */}
        <RecentChallenges onViewAll={onViewAllChallenges} />
      </div>

      {/* Fund Wallet Modal */}
      <FundWalletModal
        open={showFundingModal}
        onOpenChange={setShowFundingModal}
        copied={copied}
        onCopyAccountNumber={onCopyAccountNumber}
      />

      {/* Withdrawal Modal */}
      <WithdrawalModal
        open={showWithdrawalModal}
        onOpenChange={setShowWithdrawalModal}
        withdrawalAmount={withdrawalAmount}
        setWithdrawalAmount={setWithdrawalAmount}
        onSubmit={onWithdrawalSubmit}
      />

      {/* OTP Verification Modal */}
      <OtpVerificationModal
        open={showOtpModal}
        onOpenChange={setShowOtpModal}
        otp={otp}
        setOtp={setOtp}
        otpError={otpError}
        onSubmit={onOtpSubmit}
      />

      {/* Success Modal */}
      <SuccessModal open={showSuccessModal} onOpenChange={setShowSuccessModal} />

      {/* Verification Prompt Modal */}
      <VerificationPrompt
        open={showVerificationPrompt}
        onOpenChange={setShowVerificationPrompt}
        onComplete={onCompleteVerification}
      />

      {showOnboarding && <OnboardingModal initialStep={initialStep} onComplete={onOnboardingComplete} />}
    </>
  )
}

