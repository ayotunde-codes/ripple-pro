import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DataTable } from "@/components/ui/data-table"
import { SearchInput } from "@/components/shared/search-input"
import { ChallengeDetailsCard } from "./challenge-stats"
import { StatCard } from "@/components/shared/stat-card"
import { AutoPayoutModal, DeclineModal } from "./challenge-modals"
import { getCreatorsTableColumns } from "./creators-table-columns"
import { formatCurrency } from "@/lib/utils"

interface DesktopChallengeManagementProps {
  challenge: any
  creators: any[]
  onApprove: (creatorId: number) => void
  onDecline: (creator: any) => void
  onAutoPayout: () => void
}

export function DesktopChallengeManagement({
  challenge,
  creators,
  onApprove,
  onDecline,
  onAutoPayout,
}: DesktopChallengeManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAutoPayoutModal, setShowAutoPayoutModal] = useState(false)
  const [showDeclineModal, setShowDeclineModal] = useState(false)
  const [declineReason, setDeclineReason] = useState("")
  const [selectedCreator, setSelectedCreator] = useState<any>(null)

  // Filter creators
  const filteredCreators = creators.filter((creator) =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAutoPayout = () => {
    setShowAutoPayoutModal(false)
    onAutoPayout()
  }

  const handleDeclineClick = (creator: any) => {
    setSelectedCreator(creator)
    setShowDeclineModal(true)
  }

  const handleDeclineConfirm = () => {
    if (selectedCreator) {
      onDecline(selectedCreator)
    }
    setShowDeclineModal(false)
    setDeclineReason("")
  }

  const columns = getCreatorsTableColumns({
    platforms: challenge.platforms,
    onApprove,
    onDecline: handleDeclineClick,
    challengeStatus: challenge.status,
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Challenge Management: ${challenge.title}`}
        text="Manage your challenge and view creator performance."
      >
        <Button
          onClick={() => setShowAutoPayoutModal(true)}
          className="bg-[#B125F9] hover:bg-[#B125F9]/90 rounded-full"
        >
          Auto Payout
        </Button>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <StatCard label="Views Generated" value={challenge.views.toLocaleString()} />
        <StatCard label="Challenge Pool" value={`₦${(challenge.totalPool / 1000000).toFixed(0)}M`} />
        <StatCard label="Pool Balance" value={formatCurrency(challenge.totalPool - challenge.paidOut)} />
      </div>

      <Card className="mb-6 border-none shadow-sm">
        <CardHeader className="bg-gradient-to-r from-[#F9F0FC] to-[#F9F0FC]/50 dark:from-[#0E0E0E] dark:to-[#0E0E0E]/50 rounded-t-lg">
          <CardTitle>Challenge Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-sm text-gray-500">Reward Rate</p>
              <p className="font-semibold">₦{challenge.rewardRate.toLocaleString()} per 1k views</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Max Payout per Creator</p>
              <p className="font-semibold">₦{challenge.maxPayout.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Requirements</p>
              <p className="font-semibold">{challenge.requirements}</p>
            </div>
            {challenge.additionalNotes && (
              <div>
                <p className="text-sm text-gray-500">Additional Notes</p>
                <p className="font-semibold">{challenge.additionalNotes}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="font-semibold">{new Date(challenge.endDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Amount Paid Out</p>
              <p className="font-semibold">₦{challenge.paidOut.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Number of Participants</p>
              <p className="font-semibold">{challenge.participants}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="bg-gradient-to-r from-[#F9F0FC] to-[#F9F0FC]/50 dark:from-[#0E0E0E] dark:to-[#0E0E0E]/50 rounded-t-lg flex flex-row justify-between items-center">
          <CardTitle>Participating Creators</CardTitle>
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search creators" className="w-64" />
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={filteredCreators} searchKey="name" />
        </CardContent>
      </Card>

      <AutoPayoutModal
        open={showAutoPayoutModal}
        onOpenChange={setShowAutoPayoutModal}
        onConfirm={handleAutoPayout}
      />

      <DeclineModal
        open={showDeclineModal}
        onOpenChange={setShowDeclineModal}
        onConfirm={handleDeclineConfirm}
        reason={declineReason}
        onReasonChange={setDeclineReason}
      />
    </DashboardShell>
  )
}

