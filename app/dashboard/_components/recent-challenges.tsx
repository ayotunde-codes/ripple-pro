import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { recentChallenges } from "./dashboard-data"

interface RecentChallengesProps {
  onViewAll: () => void
  isMobile?: boolean
}

export function RecentChallenges({ onViewAll, isMobile = false }: RecentChallengesProps) {
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
          {recentChallenges.slice(0, 3).map((challenge) => (
            <Card key={challenge.name} className="border shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8">
                    {challenge.hasImage ? (
                      <AvatarImage src={challenge.avatar || "/placeholder.svg"} alt={challenge.name} />
                    ) : (
                      <AvatarFallback className="bg-primary text-white">{challenge.name.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="ml-3 space-y-0.5 flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none truncate">{challenge.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {challenge.budget} • {challenge.creators} creators
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
          {recentChallenges.slice(0, 3).map((challenge) => (
            <div key={challenge.name} className="flex items-center">
              <Avatar className="h-9 w-9">
                {challenge.hasImage ? (
                  <AvatarImage src={challenge.avatar || "/placeholder.svg"} alt={challenge.name} />
                ) : (
                  <AvatarFallback className="bg-primary text-white">{challenge.name.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
              <div className="ml-4 space-y-1 flex-1">
                <p className="text-sm font-medium leading-none">{challenge.name}</p>
                <p className="text-sm text-muted-foreground">
                  {challenge.budget} • {challenge.creators} creators
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

