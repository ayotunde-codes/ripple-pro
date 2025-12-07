import { DashboardHeader } from "@/components/dashboard-header"
import { GridPagination } from "@/components/ui/grid-pagination"
import { ChallengesStats } from "./challenges-stats"
import { ChallengesTabs, CategoryFilter } from "./challenges-tabs"
import { DesktopChallengeCard } from "./challenge-card"
import { UserChallengesTable } from "./user-challenges-table"
import { availableChallenges, funEmojis } from "./challenges-data"

interface DesktopChallengesViewProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  categories: string[]
  filteredAvailableChallenges: any[]
  onJoinChallenge: (challenge: any) => void
}

export function DesktopChallengesView({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  categories,
  filteredAvailableChallenges,
  onJoinChallenge,
}: DesktopChallengesViewProps) {
  return (
    <>
      <DashboardHeader heading="Challenges" text="Discover and participate in creator challenges." />

      <ChallengesStats />

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
                const index = availableChallenges.findIndex((c) => c.id === challenge.id)
                return (
                  <DesktopChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    onJoinChallenge={onJoinChallenge}
                    funEmoji={funEmojis[index % funEmojis.length]}
                  />
                )
              }}
            />
          </div>
        ) : (
          <UserChallengesTable />
        )}
      </div>
    </>
  )
}

