import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { VerificationPrompt } from "@/components/verification-prompt"
import { OnboardingModal } from "@/components/onboarding-modal"
import { DataTable } from "@/components/ui/data-table"
import { useModalStore, useCampaignStore } from "@/stores"
import { CampaignsStats } from "./campaigns-stats"
import { getCampaignsTableColumns } from "./campaigns-table-columns"
import { CloseChallengeDialog } from "./close-challenge-dialog"

interface DesktopCampaignsViewProps {
  onCompleteVerification: () => void
  confirmCloseChallenge: () => void
  navigateToChallengeManagement: (id: number) => void
  onCreateCampaign: () => void
  isClosing: boolean
}

export function DesktopCampaignsView({
  onCompleteVerification,
  confirmCloseChallenge,
  navigateToChallengeManagement,
  onCreateCampaign,
  isClosing,
}: DesktopCampaignsViewProps) {
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

  const columns = getCampaignsTableColumns({
    onManage: navigateToChallengeManagement,
    onClose: openCloseConfirmation,
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Campaigns" text="Manage your campaigns and track performance.">
        <Button onClick={onCreateCampaign}>
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </DashboardHeader>

      <CampaignsStats />

      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
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
              >
                All
              </Button>
              <Button
                variant={statusFilter === "open" ? "default" : "outline"}
                onClick={() => setStatusFilter("open")}
                size="sm"
              >
                Active
              </Button>
              <Button
                variant={statusFilter === "closed" ? "default" : "outline"}
                onClick={() => setStatusFilter("closed")}
                size="sm"
              >
                Closed
              </Button>
            </div>
          </div>

          <DataTable columns={columns} data={campaigns} isLoading={isLoadingCampaigns} />
        </CardContent>
      </Card>

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
    </DashboardShell>
  )
}
