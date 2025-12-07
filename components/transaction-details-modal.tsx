"use client"

import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TransactionDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction: any
}

export function TransactionDetailsModal({ open, onOpenChange, transaction }: TransactionDetailsModalProps) {
  if (!transaction) return null

  const formattedDate = new Date(transaction.date).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

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

  const handleShareReceipt = () => {
    // In a real app, you would implement sharing functionality
    // For now, we'll just show an alert
    alert("Share receipt functionality would be implemented here")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle>Transaction details</DialogTitle>
        </DialogHeader>

        {/* Transaction Amount Card */}
        <div className="bg-[#F9F0FC] dark:bg-[#0E0E0E] rounded-lg p-6 mb-4 flex flex-col items-center">
          <div className={`px-4 py-1 rounded-full text-sm font-medium mb-4 ${getStatusColor(transaction.status)}`}>
            {transaction.status}
          </div>
          <p className="text-4xl font-bold">₦{transaction.amount.toLocaleString()}</p>
        </div>

        <h2 className="text-xl font-semibold mb-4">Transaction details</h2>

        {/* Transaction Details */}
        <div className="space-y-4">
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
          className="w-full bg-[#B125F9] hover:bg-[#B125F9]/90 text-white rounded-full py-6 mt-4"
          onClick={handleShareReceipt}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share receipt
        </Button>
      </DialogContent>
    </Dialog>
  )
}
