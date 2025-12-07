"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileHeader } from "@/components/mobile-header"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { useTheme } from "@/components/theme-provider"

// Mock transaction data - in a real app, you would fetch this based on the ID
const getTransactionById = (id) => {
  const transactions = [
    {
      id: "TRX-010",
      date: "2024-03-18T11:45:00",
      amount: 250000,
      type: "Pool Balance Refund",
      source: "Tech Gadget Review Challenge",
      reference: "RF-12345678",
      status: "Successful",
      balance: 750000,
    },
    {
      id: "TRX-001",
      date: "2024-03-15T14:30:00",
      amount: 250000,
      type: "Funding",
      source: "Bank Transfer",
      reference: "FND-12345678",
      status: "Successful",
      balance: 625000,
    },
    {
      id: "TRX-002",
      date: "2024-03-14T10:15:00",
      amount: 250000,
      type: "Withdrawal",
      source: "Bank Account",
      reference: "WTH-87654321",
      status: "Pending",
      balance: 375000,
    },
    {
      id: "TRX-003",
      date: "2024-03-12T16:45:00",
      amount: 250000,
      type: "Reward",
      source: "Summer Collection Challenge",
      reference: "RWD-23456789",
      status: "Failed",
      balance: 525000,
    },
    {
      id: "TRX-004",
      date: "2024-03-10T09:20:00",
      amount: 250000,
      type: "Funding",
      source: "Bank Transfer",
      reference: "FND-34567890",
      status: "Successful",
      balance: 510000,
    },
    {
      id: "TRX-005",
      date: "2024-03-08T13:50:00",
      amount: 250000,
      type: "Funding",
      source: "Tech Launch Challenge",
      reference: "RWD-45678901",
      status: "Successful",
      balance: 510000,
    },
  ]

  return transactions.find((t) => t.id === id) || transactions[0]
}

export default function TransactionDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [transaction, setTransaction] = useState(null)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // In a real app, you would fetch the transaction data from an API
    const transactionData = getTransactionById(params.id)
    setTransaction(transactionData)
  }, [params.id])

  const handleShareReceipt = () => {
    // In a real app, you would implement sharing functionality
    // For now, we'll just show an alert
    alert("Share receipt functionality would be implemented here")
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "successful":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!transaction) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading transaction details...</p>
      </div>
    )
  }

  const formattedDate = new Date(transaction.date).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="pb-20">
      <MobileHeader />
      <div className="px-4 py-6">
        <div className="flex items-center mb-4">
          <Link href="/payments" className="mr-3">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">Transaction details</h1>
            <p className="text-gray-500">Manage your transactions and wallet.</p>
          </div>
        </div>

        {/* Transaction Amount Card */}
        <div
          className={`rounded-lg p-6 mb-8 flex flex-col items-center ${mounted && theme === "dark" ? "bg-[#0E0E0E]" : "bg-[#F9F0FC]"}`}
        >
          <div className={`px-4 py-1 rounded-full text-sm font-medium mb-4 ${getStatusColor(transaction.status)}`}>
            {transaction.status}
          </div>
          <p className="text-4xl font-bold">₦{transaction.amount.toLocaleString()}</p>
        </div>

        <h2 className="text-xl font-semibold mb-6">Transaction details</h2>

        {/* Transaction Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-gray-500">Source</span>
            <div className="text-right">
              <p className="font-medium">{transaction.type}</p>
              <p className="text-sm">{transaction.source}</p>
            </div>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-gray-500">Reference number</span>
            <span className="font-medium">{transaction.reference}</span>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-gray-500">Transaction date & time</span>
            <span className="font-medium">{formattedDate}</span>
          </div>
        </div>

        {/* Share Receipt Button */}
        <Button
          className="w-full bg-[#B125F9] hover:bg-[#B125F9]/90 text-white rounded-full py-6 mt-8"
          onClick={handleShareReceipt}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share receipt
        </Button>
      </div>

      <MobileBottomNav />
    </div>
  )
}
