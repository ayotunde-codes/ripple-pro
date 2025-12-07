import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentChallenges = [
  { name: "Summer Collection", budget: "$2,500", creators: 45, avatar: "SC" },
  { name: "Tech Launch", budget: "$4,750", creators: 28, avatar: "TL" },
  { name: "Fitness Bootcamp", budget: "$3,200", creators: 67, avatar: "FB" },
  { name: "Travel Vlog Series", budget: "$5,000", creators: 32, avatar: "TV" },
]

export function RecentChallenges() {
  return (
    <div className="space-y-8">
      {recentChallenges.map((challenge) => (
        <div key={challenge.name} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg" alt={challenge.name} />
            <AvatarFallback>{challenge.avatar}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{challenge.name}</p>
            <p className="text-sm text-muted-foreground">
              {challenge.budget} • {challenge.creators} creators
            </p>
          </div>
          <div className="ml-auto font-medium">{challenge.budget}</div>
        </div>
      ))}
    </div>
  )
}
