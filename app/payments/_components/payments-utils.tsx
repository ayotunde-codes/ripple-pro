import { ArrowUpRight, ArrowDownLeft, Gift, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "successful":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Successful</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
    case "failed":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
    case "awaiting approval":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Awaiting Approval</Badge>
    case "declined":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Declined</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "successful":
      return "text-green-600"
    case "pending":
      return "text-orange-600"
    case "failed":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

export const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "funding":
      return <ArrowUpRight className="h-5 w-5 text-green-500" />
    case "withdrawal":
      return <ArrowDownLeft className="h-5 w-5 text-red-500" />
    case "reward":
      return <Gift className="h-5 w-5 text-blue-500" />
    case "reward split":
      return <DollarSign className="h-5 w-5 text-orange-500" />
    case "pool funding":
      return <DollarSign className="h-5 w-5 text-purple-500" />
    case "pool balance refund":
      return <ArrowUpRight className="h-5 w-5 text-orange-500" />
    default:
      return null
  }
}

export const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "funding":
      return "text-purple-400"
    case "withdrawal":
      return "text-purple-400"
    case "reward":
      return "text-purple-400"
    default:
      return "text-purple-400"
  }
}

