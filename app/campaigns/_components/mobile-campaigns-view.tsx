import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MobileHeader } from "@/components/mobile-header"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { VerificationPrompt } from "@/components/verification-prompt"
import { OnboardingModal } from "@/components/onboarding-modal"
import { MobileCampaignsStats } from "./campaigns-stats"
import { CloseChallengeDialog } from "./close-challenge-dialog"

interface MobileCampaignsViewProps {
  isVerified: boolean
  showVerificationPrompt: boolean
  setShowVerificationPrompt: (show: boolean) => void
  showOnboarding: boolean
  setShowOnboarding: (show: boolean) => void
  setIsVerified: (verified: boolean) => void
  initialStep: number
  setInitialStep: (step: number) => void
  showCloseConfirmation: boolean
  setShowCloseConfirmation: (show: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  filteredChallenges: any[]
  navigateToChallengeManagement: (id: number) => void
  handleCompleteVerification: () => void
  confirmCloseChallenge: () => void
  onCreateCampaign: () => void
}

export function MobileCampaignsView({
  isVerified,
  showVerificationPrompt,
  setShowVerificationPrompt,
  showOnboarding,
  setShowOnboarding,
  setIsVerified,
  initialStep,
  setInitialStep,
  showCloseConfirmation,
  setShowCloseConfirmation,
  searchQuery,
  setSearchQuery,
  filteredChallenges,
  navigateToChallengeManagement,
  handleCompleteVerification,
  confirmCloseChallenge,
  onCreateCampaign,
}: MobileCampaignsViewProps) {
  return (
    <div className="pb-20">
      <MobileHeader />
      <div className="px-4 py-6">
        <div>
          <h1 className="text-2xl font-bold">My Campaigns</h1>
          <p className="text-gray-500">Manage and track your campaign performance.</p>
        </div>

        <Button
          onClick={onCreateCampaign}
          className="mt-4 bg-[#B125F9] hover:bg-[#B125F9]/90 text-white rounded-full py-6 px-8"
        >
          Create campaign
        </Button>

        <MobileCampaignsStats />

        <h2 className="text-xl font-bold mt-8 mb-4">All campaigns</h2>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search campaigns"
            className="pl-10 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="border-b pb-4"
              onClick={() => navigateToChallengeManagement(challenge.id)}
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">{challenge.name}</h3>
                <p className="font-bold">₦{challenge.pool.toLocaleString()}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <p>{challenge.views.toLocaleString()} views generated</p>
                <p>{challenge.participants} participants</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MobileBottomNav />

      {/* Verification Prompt */}
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

      {/* Close Confirmation Dialog */}
      <CloseChallengeDialog
        open={showCloseConfirmation}
        onOpenChange={setShowCloseConfirmation}
        onConfirm={confirmCloseChallenge}
        isMobile
      />
    </div>
  )
}

