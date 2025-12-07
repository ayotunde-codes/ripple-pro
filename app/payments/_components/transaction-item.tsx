import { ChevronRight, ArrowUpRight, ArrowDownLeft, Gift } from "lucide-react"
import { cn } from "@/lib/utils"
import { getStatusColor, getTypeColor } from "./payments-utils"

interface Transaction {
  id: string
  date: string
  amount: number
  type: string
  source: string
  reference: string
  status: string
  balance: number
}

interface TransactionItemProps {
  transaction: Transaction
  onClick: (transaction: Transaction) => void
}

export function TransactionItem({ transaction, onClick }: TransactionItemProps) {
  return (
    <div key={transaction.id} className="flex items-center border-b pb-4 cursor-pointer" onClick={() => onClick(transaction)}>
      <div className="flex items-center flex-1">
        {transaction.type.toLowerCase() === "funding" ? (
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
            <ArrowUpRight className="h-5 w-5 text-green-500" />
          </div>
        ) : transaction.type.toLowerCase() === "withdrawal" ? (
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
            <ArrowDownLeft className="h-5 w-5 text-red-500" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <Gift className="h-5 w-5 text-blue-500" />
          </div>
        )}
        <div>
          <p className="font-semibold">₦{transaction.amount.toLocaleString()}</p>
          <p className="text-sm text-gray-500">
            {new Date(transaction.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className={cn("font-medium", getStatusColor(transaction.status))}>{transaction.status}</p>
        <p className={cn("text-sm", getTypeColor(transaction.type))}>{transaction.type}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400 ml-3" />
    </div>
  )
}

