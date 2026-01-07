import { Card, CardContent } from "@/components/ui/card"
// import { availableChallenges, userChallenges } from "./challenges-data" // COMMENTED OUT: Using API data now

interface ChallengesStatsProps {
  availableChallenges?: any[]
  mySubmissions?: any[]
}

export function ChallengesStats({ availableChallenges = [], mySubmissions = [] }: ChallengesStatsProps) {
  // Calculate stats from API data
  const totalEarnings = mySubmissions.reduce((sum, sub) => sum + (Number(sub.earnings) || 0), 0)
  const totalViews = mySubmissions.reduce((sum, sub) => sum + (Number(sub.views) || 0), 0)
  const activeSubmissions = mySubmissions.filter((c) => !c.redemption_status || c.redemption_status === "rejected").length
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-primary-light dark:bg-[#0E0E0E] border-none">
        <CardContent className="pt-6 px-6 pb-4">
          <div className="space-y-1">
            <p className="text-gray-600 dark:text-[#A9A9A9]">Available challenges</p>
            <p className="text-3xl font-bold dark:text-white">{availableChallenges.length}</p>
            <p className="text-sm text-[#B125F9]">Open for participation</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-primary-light dark:bg-[#0E0E0E] border-none">
        <CardContent className="pt-6 px-6 pb-4">
          <div className="space-y-1">
            <p className="text-gray-600 dark:text-[#A9A9A9]">Active submissions</p>
            <p className="text-3xl font-bold dark:text-white">
              {activeSubmissions}
            </p>
            <p className="text-sm text-[#B125F9]">Currently participating</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-primary-light dark:bg-[#0E0E0E] border-none">
        <CardContent className="pt-6 px-6 pb-4">
          <div className="space-y-1">
            <p className="text-gray-600 dark:text-[#A9A9A9]">Total earnings</p>
            <p className="text-3xl font-bold dark:text-white">₦{totalEarnings.toLocaleString()}</p>
            <p className="text-sm text-[#B125F9]">From all challenges</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-primary-light dark:bg-[#0E0E0E] border-none">
        <CardContent className="pt-6 px-6 pb-4">
          <div className="space-y-1">
            <p className="text-gray-600 dark:text-[#A9A9A9]">Total views</p>
            <p className="text-3xl font-bold dark:text-white">{totalViews.toLocaleString()}</p>
            <p className="text-sm text-[#B125F9]">Across all submissions</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface MobileChallengesStatsProps {
  availableChallenges?: any[]
  mySubmissions?: any[]
}

export function MobileChallengesStats({ availableChallenges = [], mySubmissions = [] }: MobileChallengesStatsProps) {
  // Calculate stats from API data
  const totalEarnings = mySubmissions.reduce((sum, sub) => sum + (Number(sub.earnings) || 0), 0)
  const activeSubmissions = mySubmissions.filter((c) => !c.redemption_status || c.redemption_status === "rejected").length
  
  return (
    <>
      {/* Total Earnings Card */}
      <Card className="bg-primary-light dark:bg-[#0E0E0E] border-none">
        <CardContent className="p-4">
          <div className="space-y-1">
            <p className="text-gray-600 dark:text-[#A9A9A9]">Total earnings</p>
            <p className="text-3xl font-bold dark:text-white">₦{totalEarnings.toLocaleString()}</p>
            <p className="text-sm text-[#B125F9]">From all challenges</p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-primary-light dark:bg-[#0E0E0E] border-none">
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-gray-600 dark:text-[#A9A9A9]">Available challenges</p>
              <p className="text-3xl font-bold dark:text-white">{availableChallenges.length}</p>
              <p className="text-sm text-[#B125F9]">Open for participation</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary-light dark:bg-[#0E0E0E] border-none">
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-gray-600 dark:text-[#A9A9A9]">Active submissions</p>
              <p className="text-3xl font-bold dark:text-white">
                {activeSubmissions}
              </p>
              <p className="text-sm text-[#B125F9]">Currently participating</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

