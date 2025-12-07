import { Card, CardContent } from "@/components/ui/card"
import { ProfileBanner } from "@/components/profile-banner"
import { Overview } from "@/components/overview"
import { MobileDashboardStats } from "./dashboard-stats"
import { RecentChallenges } from "./recent-challenges"

interface MobileDashboardProps {
  isVerified: boolean
  onDismissBanner: () => void
  onViewAllChallenges: () => void
}

export function MobileDashboard({ isVerified, onDismissBanner, onViewAllChallenges }: MobileDashboardProps) {
  return (
    <div className="space-y-6">
      {!isVerified && <ProfileBanner onDismiss={onDismissBanner} />}

      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Hi Oluwatobi 👋</h1>
        <p className="text-sm text-muted-foreground">Welcome back to Ripplepro</p>
      </div>

      {/* Stats Cards */}
      <MobileDashboardStats />

      {/* Performance Overview */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Performance overview</h2>
        <Card className="border-none shadow-none bg-white p-2">
          <CardContent className="p-2 flex justify-end">
            <div className="w-full">
              <Overview />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Challenges */}
      <RecentChallenges onViewAll={onViewAllChallenges} isMobile />
    </div>
  )
}

