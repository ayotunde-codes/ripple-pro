import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MobileHeader } from "@/components/mobile-header"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { VerificationPrompt } from "@/components/verification-prompt"
import { OnboardingModal } from "@/components/onboarding-modal"
import { MobileCampaignsStats } from "./campaigns-stats"
import { CloseChallengeDialog } from "./close-challenge-dialog"
import type { Campaign, CampaignSummary } from "@/services/campaign"

interface MobileCampaignsViewProps {
  isVerified: boolean
  campaigns: Campaign[]
  summary?: CampaignSummary
  isLoadingCampaigns: boolean
  isLoadingSummary: boolean
  showVerificationPrompt: boolean
  setShowVerificationPrompt: (show: boolean) => void
  showOnboarding: boolean
  setShowOnboarding: (show: boolean) => void
  initialStep: number
  setInitialStep: (step: number) => void
  showCloseConfirmation: boolean
  setShowCloseConfirmation: (show: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  statusFilter?: "open" | "closed"
  setStatusFilter: (filter?: "open" | "closed") => void
  navigateToChallengeManagement: (id: number) => void
  handleCompleteVerification: () => void
  confirmCloseChallenge: () => void
  onCreateCampaign: () => void
  isClosing: boolean
}

export function MobileCampaignsView({
  isVerified,
  campaigns,
  summary,
  isLoadingCampaigns,
  isLoadingSummary,
  showVerificationPrompt,
  setShowVerificationPrompt,
  showOnboarding,
  setShowOnboarding,
  initialStep,
  setInitialStep,
  showCloseConfirmation,
  setShowCloseConfirmation,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  navigateToChallengeManagement,
  handleCompleteVerification,
  confirmCloseChallenge,
  onCreateCampaign,
  isClosing,
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

        <MobileCampaignsStats summary={summary} isLoading={isLoadingSummary} />

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
          {isLoadingCampaigns ? (
            <div className="text-center py-8 text-gray-500">Loading campaigns...</div>
          ) : campaigns.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No campaigns found</div>
          ) : (
            campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="border-b pb-4"
                onClick={() => navigateToChallengeManagement(campaign.id)}
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">{campaign.campaign_name}</h3>
                  <p className="font-bold">₦{parseFloat(campaign.challenge_pool).toLocaleString()}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <p>{campaign.views.toLocaleString()} views generated</p>
                  <p className="capitalize">{campaign.status}</p>
                </div>
              </div>
            ))
          )}
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
        isLoading={isClosing}
        isMobile
      />
    </div>
  )
}

