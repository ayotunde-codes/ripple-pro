import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { MobileHeader } from "@/components/mobile-header"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { SearchInput } from "@/components/shared/search-input"
import { PaginationControls } from "@/components/shared/pagination-controls"
import { ChallengeStats, ChallengeDetailsCard } from "./challenge-stats"
import { CreatorCard } from "./creator-card"
import { AutoPayoutModal, DeclineModal, CreatorModal } from "./challenge-modals"
import { renderSocialMediaIcon } from "./social-media-icons"

interface MobileChallengeManagementProps {
  challenge: any
  creators: any[]
  isLoading: boolean
  onApprove: (redemptionId: number) => void
  onDecline: (creator: any) => void
  onAutoPayout: () => void
  isApproving: boolean
}

export function MobileChallengeManagement({
  challenge,
  creators,
  isLoading,
  onApprove,
  onDecline,
  onAutoPayout,
  isApproving,
}: MobileChallengeManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [showAutoPayoutModal, setShowAutoPayoutModal] = useState(false)
  const [showDeclineModal, setShowDeclineModal] = useState(false)
  const [declineReason, setDeclineReason] = useState("")
  const [selectedCreator, setSelectedCreator] = useState<any>(null)
  const [showCreatorModal, setShowCreatorModal] = useState(false)

  // Filter creators
  const filteredCreators = creators.filter((creator) =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredCreators.length / itemsPerPage)
  const paginatedCreators = filteredCreators.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleAutoPayout = () => {
    setShowAutoPayoutModal(false)
    onAutoPayout()
  }

  const handleDeclineConfirm = () => {
    if (selectedCreator) {
      onDecline(selectedCreator)
    }
    setShowDeclineModal(false)
    setDeclineReason("")
  }

  const handleDeclineClick = (creator: any) => {
    setSelectedCreator(creator)
    setShowDeclineModal(true)
    if (showCreatorModal) {
      setShowCreatorModal(false)
    }
  }

  const openCreatorModal = (creator: any) => {
    setSelectedCreator(creator)
    setShowCreatorModal(true)
  }

  return (
    <div className="pb-20">
      <MobileHeader />
      <div className="px-4 py-4">
        <div className="flex items-center mb-4">
          <Link href="/campaigns" className="mr-3">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold">{challenge.title}</h1>
            <p className="text-xs text-gray-500">Manage your challenge and view creator performance.</p>
          </div>
        </div>

        <Button
          onClick={() => setShowAutoPayoutModal(true)}
          className="bg-[#B125F9] hover:bg-[#B125F9]/90 text-white rounded-full mb-4 w-full"
        >
          Auto payout
        </Button>

        <div className="space-y-4">
          <ChallengeStats challenge={challenge} isMobile={true} />

          {/* Challenge Details */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Challenge details</h2>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Owner</span>
                <span className="text-sm font-medium">{challenge.creator}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Reward Rate</span>
                <span className="text-sm font-medium">₦{challenge.rewardRate} per 1k views</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Max Payout</span>
                <span className="text-sm font-medium">₦{challenge.maxPayout.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">End Date</span>
                <span className="text-sm font-medium">{challenge.endDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Requirements</span>
                <span className="text-sm font-medium text-right max-w-[60%]">{challenge.requirements}</span>
              </div>
              {challenge.additionalNotes && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Additional Notes</span>
                  <span className="text-sm font-medium text-right max-w-[60%]">{challenge.additionalNotes}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Amount Paid Out</span>
                <span className="text-sm font-medium">₦{challenge.paidOut.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Number of Participants</span>
                <span className="text-sm font-medium">{challenge.participants}</span>
              </div>
            </div>
          </div>

          {/* Participating Creators */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Participating Creators</h2>
              <Link href="#" className="text-[#B125F9] text-sm">
                View all <ChevronRight className="h-4 w-4 inline" />
              </Link>
            </div>

            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search creators"
              className="mb-4"
            />

            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8 text-gray-500">Loading redemptions...</div>
              ) : paginatedCreators.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No redemption requests found</div>
              ) : (
                paginatedCreators.map((creator) => (
                  <div key={creator.id}>
                    <CreatorCard
                      creator={creator}
                      platforms={challenge.platforms}
                      onApprove={onApprove}
                      onDecline={handleDeclineClick}
                      onClick={openCreatorModal}
                      challengeStatus={challenge.status}
                    />
                  </div>
                ))
              )}
            </div>

            {!isLoading && paginatedCreators.length > 0 && (
              <>
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="mt-6"
                  isMobile={true}
                />

                <div className="text-center text-sm text-gray-500 mt-2">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredCreators.length)} of {filteredCreators.length} entries
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <MobileBottomNav />

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

      <CreatorModal
        open={showCreatorModal}
        onOpenChange={setShowCreatorModal}
        creator={selectedCreator}
        onApprove={onApprove}
        onDecline={handleDeclineClick}
        platforms={challenge.platforms}
        renderSocialMediaIcon={renderSocialMediaIcon}
      />
    </div>
  )
}

