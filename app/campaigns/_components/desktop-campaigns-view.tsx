import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { VerificationPrompt } from "@/components/verification-prompt"
import { OnboardingModal } from "@/components/onboarding-modal"
import { DataTable } from "@/components/ui/data-table"
import { CampaignsStats } from "./campaigns-stats"
import { getCampaignsTableColumns } from "./campaigns-table-columns"
import { CloseChallengeDialog } from "./close-challenge-dialog"

interface DesktopCampaignsViewProps {
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
  handleCloseChallenge: (challenge: any) => void
  handleCompleteVerification: () => void
  confirmCloseChallenge: () => void
  onCreateCampaign: () => void
}

export function DesktopCampaignsView({
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
  handleCloseChallenge,
  handleCompleteVerification,
  confirmCloseChallenge,
  onCreateCampaign,
}: DesktopCampaignsViewProps) {
  const columns = getCampaignsTableColumns({ navigateToChallengeManagement, handleCloseChallenge })

  return (
    <DashboardShell>
      <DashboardHeader heading="My Campaigns" text="Manage and track your campaign performance.">
        <Button onClick={onCreateCampaign} className="bg-[#B125F9] hover:bg-[#B125F9]/90 rounded-full">
          <Plus className="mr-2 h-4 w-4" />
          Create campaign
        </Button>
      </DashboardHeader>

      <CampaignsStats />

      <Card className="bg-white border border-gray-200 shadow-sm mt-6">
        <CardHeader className="bg-gradient-to-r from-[#F9F0FC] to-[#F9F0FC]/50 dark:from-[#0E0E0E] dark:to-[#0E0E0E]/50 rounded-t-lg flex flex-row justify-between items-center">
          <CardTitle className="flex items-center">
            <span className="mr-2">📊</span> All Campaigns
          </CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search campaigns"
              className="pl-10 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={filteredChallenges} searchKey="name" searchValue={searchQuery} />
        </CardContent>
      </Card>

      <VerificationPrompt
        open={showVerificationPrompt}
        onOpenChange={setShowVerificationPrompt}
        onComplete={handleCompleteVerification}
      />

      {showOnboarding && (
        <OnboardingModal
          initialStep={initialStep}
          onComplete={() => {
            setShowOnboarding(false)
            setIsVerified(true)
          }}
        />
      )}

      <CloseChallengeDialog
        open={showCloseConfirmation}
        onOpenChange={setShowCloseConfirmation}
        onConfirm={confirmCloseChallenge}
      />
    </DashboardShell>
  )
}

