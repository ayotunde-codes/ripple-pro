import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MobileHeader } from "@/components/mobile-header"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { VerificationPrompt } from "@/components/verification-prompt"
import { OnboardingModal } from "@/components/onboarding-modal"
import { useModalStore, useCampaignStore } from "@/stores"
import { MobileCampaignsStats } from "./campaigns-stats"
import { CloseChallengeDialog } from "./close-challenge-dialog"

interface MobileCampaignsViewProps {
  onCompleteVerification: () => void
  confirmCloseChallenge: () => void
  navigateToChallengeManagement: (id: number) => void
  onCreateCampaign: () => void
  isClosing: boolean
}

export function MobileCampaignsView({
  onCompleteVerification,
  confirmCloseChallenge,
  navigateToChallengeManagement,
  onCreateCampaign,
  isClosing,
}: MobileCampaignsViewProps) {
  // Get state from stores
  const {
    campaigns,
    isLoadingCampaigns,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    showCloseConfirmation,
    closeCloseConfirmation,
    openCloseConfirmation,
  } = useCampaignStore()

  const {
    showVerificationPrompt,
    closeVerificationPrompt,
    showOnboarding,
    closeOnboarding,
    onboardingInitialStep,
  } = useModalStore()

  return (
    <>
      <MobileHeader title="Campaigns" />

      <div className="p-4 space-y-6 pb-24">
        {/* Stats */}
        <MobileCampaignsStats />

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={statusFilter === undefined ? "default" : "outline"}
              onClick={() => setStatusFilter(undefined)}
              size="sm"
              className="flex-1"
            >
              All
            </Button>
            <Button
              variant={statusFilter === "open" ? "default" : "outline"}
              onClick={() => setStatusFilter("open")}
              size="sm"
              className="flex-1"
            >
              Active
            </Button>
            <Button
              variant={statusFilter === "closed" ? "default" : "outline"}
              onClick={() => setStatusFilter("closed")}
              size="sm"
              className="flex-1"
            >
              Closed
            </Button>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          {isLoadingCampaigns ? (
            <div className="text-center py-8 text-gray-500">Loading campaigns...</div>
          ) : campaigns.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No campaigns found. Create your first campaign!
            </div>
          ) : (
            campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="border rounded-lg p-4 space-y-3 cursor-pointer hover:border-primary transition-colors"
                onClick={() => navigateToChallengeManagement(campaign.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{campaign.campaign_name}</h3>
                    <p className="text-sm text-gray-500">{campaign.category}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      campaign.status === "open"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Pool</p>
                    <p className="font-medium">₦{Number(campaign.challenge_pool).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Views</p>
                    <p className="font-medium">{campaign.views.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigateToChallengeManagement(campaign.id)
                    }}
                    className="flex-1"
                  >
                    Manage
                  </Button>
                  {campaign.status === "open" && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        openCloseConfirmation(campaign)
                      }}
                      className="flex-1"
                    >
                      Close
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create Campaign Button */}
        <Button onClick={onCreateCampaign} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Create New Campaign
        </Button>
      </div>

      <MobileBottomNav />

      {/* Verification Prompt Modal */}
      <VerificationPrompt
        open={showVerificationPrompt}
        onOpenChange={closeVerificationPrompt}
        onComplete={onCompleteVerification}
      />

      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal initialStep={onboardingInitialStep} onComplete={closeOnboarding} />
      )}

      {/* Close Challenge Dialog */}
      <CloseChallengeDialog
        open={showCloseConfirmation}
        onOpenChange={closeCloseConfirmation}
        onConfirm={confirmCloseChallenge}
        isLoading={isClosing}
      />
    </>
  )
}
