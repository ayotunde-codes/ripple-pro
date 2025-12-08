import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useDashboardStore } from "@/stores"

interface RecentChallengesProps {
  onViewAll: () => void
  isMobile?: boolean
}

export function RecentChallenges({ onViewAll, isMobile = false }: RecentChallengesProps) {
  const { recentChallenges, isLoading } = useDashboardStore()
  const displayChallenges = recentChallenges.slice(0, 3)

  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Recent challenges</h2>
          <Button variant="ghost" size="sm" className="text-primary" onClick={onViewAll}>
            View all
          </Button>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="border shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-center">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="ml-3 space-y-1 flex-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : displayChallenges.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No recent challenges</p>
          ) : (
            displayChallenges.map((challenge) => (
              <Card key={challenge.id} className="border shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-white">
                        {challenge.campaign_name?.charAt(0) || "C"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3 space-y-0.5 flex-1 min-w-0">
                      <p className="text-sm font-medium leading-none truncate">{challenge.campaign_name}</p>
                      <p className="text-xs text-muted-foreground">
                        ₦{challenge.challenge_pool?.toLocaleString() || 0} • {challenge.status}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    )
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Recent Challenges</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary" onClick={onViewAll}>
            View all
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="ml-4 space-y-1 flex-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))
          ) : displayChallenges.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No recent challenges</p>
          ) : (
            displayChallenges.map((challenge) => (
              <div key={challenge.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary text-white">
                    {challenge.campaign_name?.charAt(0) || "C"}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1 flex-1">
                  <p className="text-sm font-medium leading-none">{challenge.campaign_name}</p>
                  <p className="text-sm text-muted-foreground">
                    ₦{challenge.challenge_pool?.toLocaleString() || 0} • {challenge.status}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
