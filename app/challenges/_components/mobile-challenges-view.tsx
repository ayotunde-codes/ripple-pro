import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileChallengesStats } from "./challenges-stats"
import { ChallengesTabs, CategoryFilter } from "./challenges-tabs"
import { MobileChallengeCard } from "./challenge-card"
import { availableChallenges, userChallenges } from "./challenges-data"

interface MobileChallengesViewProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  categories: string[]
  filteredAvailableChallenges: any[]
  mySubmissions: any[]
  isLoadingSubmissions: boolean
  onJoinChallenge: (challenge: any) => void
  onRedeem: (challengeId: number) => void
  isRedeeming: boolean
}

export function MobileChallengesView({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  categories,
  filteredAvailableChallenges,
  mySubmissions,
  isLoadingSubmissions,
  onJoinChallenge,
  onRedeem,
  isRedeeming,
}: MobileChallengesViewProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(4)
  const [userCurrentPage, setUserCurrentPage] = useState(1)
  const [userItemsPerPage] = useState(4)

  // Calculate pagination for available challenges
  const totalPages = Math.ceil(filteredAvailableChallenges.length / itemsPerPage)
  const paginatedChallenges = filteredAvailableChallenges.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  // Calculate pagination for user challenges
  const userTotalPages = Math.ceil(mySubmissions.length / userItemsPerPage)
  const paginatedUserChallenges = mySubmissions.slice(
    (userCurrentPage - 1) * userItemsPerPage,
    userCurrentPage * userItemsPerPage,
  )

  return (
    <div className="space-y-6 pb-16">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Challenges</h1>
        <p className="text-sm text-muted-foreground dark:text-[#A9A9A9]">
          Discover and participate in creator challenges.
        </p>
      </div>

      <MobileChallengesStats />

      {/* Tabs */}
      <ChallengesTabs activeTab={activeTab} setActiveTab={setActiveTab} isMobile={true} />

      {/* Category Filter */}
      {activeTab === "explore" && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isMobile={true}
        />
      )}

      {/* Challenge Cards */}
      {activeTab === "explore" ? (
        <div className="space-y-4">
          {paginatedChallenges.length > 0 ? (
            <>
              {paginatedChallenges.map((challenge) => (
                <MobileChallengeCard key={challenge.id} challenge={challenge} onJoinChallenge={onJoinChallenge} />
              ))}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No challenges found.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {isLoadingSubmissions ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading submissions...</p>
            </div>
          ) : mySubmissions.length > 0 ? (
            <>
              {paginatedUserChallenges.map((challenge) => {
                const earnings = Number(challenge.earnings || 0)
                const views = Number(challenge.views || 0)
                const canRedeem = earnings > 0 && (!challenge.redemption_status || challenge.redemption_status === "rejected")
                
                return (
                  <div key={challenge.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">
                        {challenge.challenge?.campaign_name || challenge.challange_name || "N/A"}
                      </h3>
                      {challenge.redemption_status ? (
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            challenge.redemption_status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : challenge.redemption_status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {challenge.redemption_status === "pending"
                            ? "Pending"
                            : challenge.redemption_status === "approved"
                            ? "Approved"
                            : "Rejected"}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-gray-500">Earnings</p>
                        <p className="text-lg font-medium">₦{earnings.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Views</p>
                        <p className="text-lg font-medium">{views.toLocaleString()}</p>
                      </div>
                    </div>
                    {canRedeem && (
                      <Button
                        size="sm"
                        onClick={() => onRedeem(challenge.challenge_id)}
                        disabled={isRedeeming}
                        className="w-full"
                      >
                        {isRedeeming ? "Processing..." : "Redeem Reward"}
                      </Button>
                    )}
                    {challenge.redemption_status === "pending" && (
                      <p className="text-sm text-gray-500 text-center">Awaiting brand approval</p>
                    )}
                    {challenge.redemption_status === "approved" && (
                      <p className="text-sm text-green-600 text-center">Reward paid out</p>
                    )}
                  </div>
                )
              })}

              {/* Pagination Controls for My Challenges */}
              {userTotalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setUserCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={userCurrentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {userCurrentPage} of {userTotalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setUserCurrentPage((prev) => Math.min(prev + 1, userTotalPages))}
                    disabled={userCurrentPage === userTotalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No submissions found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

