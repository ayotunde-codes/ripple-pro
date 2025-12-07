import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DataTable } from "@/components/ui/data-table"
import { SearchInput } from "@/components/shared/search-input"
import { TransactionDetailsModal } from "@/components/transaction-details-modal"
import { PaymentsStats } from "./payments-stats"
import { FundWalletModal, WithdrawalModal, OtpModal, SuccessModal } from "./payment-modals"
import { formatCurrency, getStatusBadge, getTypeIcon } from "./payments-utils"

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

interface DesktopPaymentsViewProps {
  transactions: Transaction[]
  onTransactionClick: (transaction: Transaction) => void
  onPaymentAction: (action: string) => void
}

export function DesktopPaymentsView({ transactions, onTransactionClick, onPaymentAction }: DesktopPaymentsViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFundingModal, setShowFundingModal] = useState(false)
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false)
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [showTransactionModal, setShowTransactionModal] = useState(false)

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handlePaymentActionClick = (action: string) => {
    onPaymentAction(action)
    if (action === "fund") {
      setShowFundingModal(true)
    } else if (action === "withdraw") {
      setShowWithdrawalModal(true)
    }
  }

  const handleWithdrawalSubmit = () => {
    setShowWithdrawalModal(false)
    setShowOtpModal(true)
  }

  const handleOtpSubmit = () => {
    if (otp === "123456") {
      setShowOtpModal(false)
      setShowSuccessModal(true)
      setTimeout(() => {
        setShowSuccessModal(false)
      }, 3000)
    } else {
      setOtpError("Invalid OTP. Please try again.")
    }
  }

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setShowTransactionModal(true)
    onTransactionClick(transaction)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Payments" text="Manage your transactions and wallet." />

      <div className="flex space-x-3 mb-6">
        <Button
          className="bg-[#B125F9] hover:bg-[#B125F9]/90 text-white rounded-full"
          onClick={() => handlePaymentActionClick("withdraw")}
        >
          Withdraw
        </Button>
        <Button
          variant="outline"
          className="rounded-full border-gray-300 text-gray-700"
          onClick={() => handlePaymentActionClick("fund")}
        >
          Fund wallet
        </Button>
      </div>

      <PaymentsStats isMobile={false} />

      <Card className="border-none shadow-sm">
        <CardHeader className="bg-gradient-to-r from-[#F9F0FC] to-[#F9F0FC]/50 dark:from-[#0E0E0E] dark:to-[#0E0E0E]/50 rounded-t-lg flex flex-row justify-between items-center">
          <CardTitle className="dark:text-white">Transaction History</CardTitle>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search transactions"
            className="w-64"
          />
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              {
                accessorFn: (row) =>
                  new Date(row.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                header: "Date & Time",
                id: "date",
              },
              {
                accessorFn: (row) => formatCurrency(row.amount),
                header: "Amount",
                id: "amount",
                cell: ({ row }) => {
                  const isDebit = ["withdrawal", "reward split"].includes(row.original.type.toLowerCase())
                  return (
                    <span className={`font-medium ${isDebit ? "text-red-600" : "text-green-600"}`}>
                      {isDebit ? "-" : "+"}
                      {formatCurrency(row.original.amount)}
                    </span>
                  )
                },
              },
              {
                accessorKey: "type",
                header: "Transaction Type",
                cell: ({ row }) => (
                  <div className="flex items-center gap-2">
                    {getTypeIcon(row.original.type)}
                    {row.original.type}
                  </div>
                ),
              },
              {
                accessorKey: "source",
                header: "Source",
              },
              {
                accessorKey: "reference",
                header: "Reference",
              },
              {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => getStatusBadge(row.original.status),
              },
              {
                accessorFn: (row) => formatCurrency(row.balance),
                header: "Balance",
                id: "balance",
                cell: ({ row }) => <div className="text-right font-medium">{formatCurrency(row.original.balance)}</div>,
              },
            ]}
            data={filteredTransactions}
            searchKey="source"
            onRowClick={(row) => handleTransactionClick(row.original)}
          />
        </CardContent>
      </Card>

      <FundWalletModal open={showFundingModal} onOpenChange={setShowFundingModal} />

      <WithdrawalModal
        open={showWithdrawalModal}
        onOpenChange={setShowWithdrawalModal}
        onSubmit={handleWithdrawalSubmit}
        amount={withdrawalAmount}
        onAmountChange={setWithdrawalAmount}
      />

      <OtpModal
        open={showOtpModal}
        onOpenChange={setShowOtpModal}
        onSubmit={handleOtpSubmit}
        otp={otp}
        onOtpChange={setOtp}
        error={otpError}
        isMobile={false}
      />

      <SuccessModal open={showSuccessModal} onOpenChange={setShowSuccessModal} />

      <TransactionDetailsModal
        open={showTransactionModal}
        onOpenChange={setShowTransactionModal}
        transaction={selectedTransaction}
      />
    </DashboardShell>
  )
}

