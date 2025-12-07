import { Card, CardContent } from "@/components/ui/card"
import { availableChallenges, userChallenges } from "./challenges-data"

export function ChallengesStats() {
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
              {userChallenges.filter((c) => c.status === "active").length}
            </p>
            <p className="text-sm text-[#B125F9]">Currently participating</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-primary-light dark:bg-[#0E0E0E] border-none">
        <CardContent className="pt-6 px-6 pb-4">
          <div className="space-y-1">
            <p className="text-gray-600 dark:text-[#A9A9A9]">Total earnings</p>
            <p className="text-3xl font-bold dark:text-white">₦1,512,400</p>
            <p className="text-sm text-[#B125F9]">From all challenges</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-primary-light dark:bg-[#0E0E0E] border-none">
        <CardContent className="pt-6 px-6 pb-4">
          <div className="space-y-1">
            <p className="text-gray-600 dark:text-[#A9A9A9]">Total views</p>
            <p className="text-3xl font-bold dark:text-white">117.5K</p>
            <p className="text-sm text-[#B125F9]">Across all submissions</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function MobileChallengesStats() {
  return (
    <>
      {/* Total Earnings Card */}
      <Card className="bg-primary-light dark:bg-[#0E0E0E] border-none">
        <CardContent className="p-4">
          <div className="space-y-1">
            <p className="text-gray-600 dark:text-[#A9A9A9]">Total earnings</p>
            <p className="text-3xl font-bold dark:text-white">₦1,512,400</p>
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
                {userChallenges.filter((c) => c.status === "active").length}
              </p>
              <p className="text-sm text-[#B125F9]">Currently participating</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

