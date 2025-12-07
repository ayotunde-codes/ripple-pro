import { Plus, BarChart2, Wallet, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuickActionsProps {
  onAction: (action: string) => void
}

export function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <div className="mt-8 mb-6">
      <h3 className="text-lg font-medium mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button
          variant="outline"
          className="h-auto py-3 flex flex-col items-center gap-2 hover:bg-primary-light hover:border-primary group"
          onClick={() => onAction("newChallenge")}
        >
          <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center group-hover:bg-primary/20">
            <Plus className="h-4 w-4 text-primary" />
          </div>
          <div className="text-center">
            <div className="text-sm font-medium">Create Campaign</div>
            <div className="text-xs text-muted-foreground">Create a campaign</div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto py-3 flex flex-col items-center gap-2 hover:bg-primary-light hover:border-primary group"
          onClick={() => onAction("myChallenges")}
        >
          <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center group-hover:bg-primary/20">
            <BarChart2 className="h-4 w-4 text-primary" />
          </div>
          <div className="text-center">
            <div className="text-sm font-medium">My Challenges</div>
            <div className="text-xs text-muted-foreground">View your campaigns</div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto py-3 flex flex-col items-center gap-2 hover:bg-primary-light hover:border-primary group dark:text-[#FAFAFA]"
          onClick={() => onAction("fundWallet")}
        >
          <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center group-hover:bg-primary/20">
            <Wallet className="h-4 w-4 text-primary" />
          </div>
          <div className="text-center">
            <div className="text-sm font-medium">Fund Wallet</div>
            <div className="text-xs text-muted-foreground dark:text-[#FAFAFA]/70">Add money to wallet</div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto py-3 flex flex-col items-center gap-2 hover:bg-primary-light hover:border-primary group"
          onClick={() => onAction("withdraw")}
        >
          <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center group-hover:bg-primary/20">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <div className="text-center">
            <div className="text-sm font-medium">Withdraw</div>
            <div className="text-xs text-muted-foreground">Cash out funds</div>
          </div>
        </Button>
      </div>
    </div>
  )
}

