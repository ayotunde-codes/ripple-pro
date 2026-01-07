import { DashboardHeader } from "@/components/dashboard-header"
import { GridPagination } from "@/components/ui/grid-pagination"
import { ChallengesStats } from "./challenges-stats"
import { ChallengesTabs, CategoryFilter } from "./challenges-tabs"
import { DesktopChallengeCard } from "./challenge-card"
import { UserChallengesTable } from "./user-challenges-table"
// import { availableChallenges, funEmojis } from "./challenges-data" // COMMENTED OUT: Using API data now
import { funEmojis } from "./challenges-data"

interface DesktopChallengesViewProps {
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

export function DesktopChallengesView({
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
}: DesktopChallengesViewProps) {
  return (
    <>
      <DashboardHeader heading="Challenges" text="Discover and participate in creator challenges." />

      <ChallengesStats availableChallenges={filteredAvailableChallenges} mySubmissions={mySubmissions} />

      <div className="mt-6">
        <ChallengesTabs activeTab={activeTab} setActiveTab={setActiveTab} isMobile={false} />

        {/* Category Filter */}
        {activeTab === "explore" && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isMobile={false}
          />
        )}

        {activeTab === "explore" ? (
          <div className="space-y-4">
            <GridPagination
              items={filteredAvailableChallenges}
              pageSize={6}
              searchKey="title"
              renderItem={(challenge) => {
                // Using challenge ID to determine emoji instead of array index
                const emojiIndex = typeof challenge.id === 'number' ? challenge.id : 0
                return (
                  <DesktopChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    onJoinChallenge={onJoinChallenge}
                    funEmoji={funEmojis[emojiIndex % funEmojis.length]}
                  />
                )
              }}
            />
          </div>
        ) : (
          <UserChallengesTable
            challenges={mySubmissions}
            isLoading={isLoadingSubmissions}
            onRedeem={onRedeem}
            isRedeeming={isRedeeming}
          />
        )}
      </div>
    </>
  )
}

