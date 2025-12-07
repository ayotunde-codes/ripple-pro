import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CampaignsTableColumnsProps {
  navigateToChallengeManagement: (id: number) => void
  handleCloseChallenge: (challenge: any) => void
}

export function getCampaignsTableColumns({ navigateToChallengeManagement, handleCloseChallenge }: CampaignsTableColumnsProps) {
  return [
    {
      header: "Challenge Name",
      id: "name",
      cell: ({ row }: any) => (
        <div
          className="font-medium flex items-center gap-2 cursor-pointer"
          onClick={() => navigateToChallengeManagement(row.original.id)}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={row.original.name} />
            <AvatarFallback className="bg-[#F9F0FC] text-[#B125F9]">
              {["🚀", "🎯", "🎮", "🎨", "🎭"][Math.floor(Math.random() * 5)]}
            </AvatarFallback>
          </Avatar>
          {row.original.name}
        </div>
      ),
    },
    {
      accessorFn: (row: any) => `₦${row.pool.toLocaleString()}`,
      header: "Challenge Pool",
      id: "pool",
      cell: ({ row }: any) => <div className="text-right">₦{row.original.pool.toLocaleString()}</div>,
    },
    {
      accessorFn: (row: any) => row.views.toLocaleString(),
      header: "Views Generated",
      id: "views",
      cell: ({ row }: any) => <div className="text-right">{row.original.views.toLocaleString()}</div>,
    },
    {
      accessorKey: "participants",
      header: "Participants",
      cell: ({ row }: any) => <div className="text-right">{row.original.participants}</div>,
    },
    {
      accessorFn: (row: any) => `₦${row.rewardRate}`,
      header: "Reward Rate",
      id: "rewardRate",
      cell: ({ row }: any) => <div className="text-right">₦{row.original.rewardRate} per 1k views</div>,
    },
    {
      id: "actions",
      cell: ({ row }: any) => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-lg">
              <DropdownMenuItem onClick={() => navigateToChallengeManagement(row.original.id)}>
                Manage
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCloseChallenge(row.original)}>Close</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]
}

