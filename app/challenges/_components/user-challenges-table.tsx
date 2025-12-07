import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { userChallenges } from "./challenges-data"

export function UserChallengesTable() {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={[
              {
                accessorKey: "title",
                header: "Challenge Name",
                cell: ({ row }) => <span className="font-medium">{row.original.title}</span>,
              },
              {
                accessorFn: (row) => row.earnings.toLocaleString(),
                header: "Earnings",
                id: "earnings",
                cell: ({ row }) => <div className="text-right">₦{row.original.earnings.toLocaleString()}</div>,
              },
              {
                accessorFn: (row) => row.views.toLocaleString(),
                header: "Views",
                id: "views",
                cell: ({ row }) => <div className="text-right">{row.original.views.toLocaleString()}</div>,
              },
              {
                accessorFn: (row) => new Date(row.submissionDate).toLocaleDateString(),
                header: "Date Entered",
                id: "date",
                cell: ({ row }) => (
                  <div className="text-right">{new Date(row.original.submissionDate).toLocaleDateString()}</div>
                ),
              },
              {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => (
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        row.original.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {row.original.status}
                    </span>
                  </div>
                ),
              },
            ]}
            data={userChallenges}
          />
        </CardContent>
      </Card>
    </div>
  )
}

