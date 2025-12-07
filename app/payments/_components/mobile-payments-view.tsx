import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MobileHeader } from "@/components/mobile-header"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { SearchInput } from "@/components/shared/search-input"
import { PaginationControls } from "@/components/shared/pagination-controls"
import { PaymentsStats } from "./payments-stats"
import { TransactionItem } from "./transaction-item"
import { FundWalletModal, WithdrawalModal } from "./payment-modals"

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

interface VirtualAccount {
  account_number: string
  account_name: string
  bank: string
  user_id: number
}

interface MobilePaymentsViewProps {
  walletBalance: number
  virtualAccount?: VirtualAccount
  transactions: Transaction[]
  isLoadingWallet: boolean
  onTransactionClick: (transaction: Transaction) => void
  onPaymentAction: (action: string) => void
  withdrawAmount: string
  onWithdrawAmountChange: (amount: string) => void
  onWithdraw: () => void
  showWithdrawModal: boolean
  onWithdrawModalChange: (show: boolean) => void
  isWithdrawing: boolean
}

export function MobilePaymentsView({
  walletBalance,
  virtualAccount,
  transactions,
  isLoadingWallet,
  onTransactionClick,
  onPaymentAction,
  withdrawAmount,
  onWithdrawAmountChange,
  onWithdraw,
  showWithdrawModal,
  onWithdrawModalChange,
  isWithdrawing,
}: MobilePaymentsViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  const [showFundingModal, setShowFundingModal] = useState(false)

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  const handlePaymentActionClick = (action: string) => {
    onPaymentAction(action)
    if (action === "fund") {
      setShowFundingModal(true)
    }
  }

  return (
    <div className="pb-20">
      <MobileHeader />
      <div className="px-4 py-6">
        <div className="space-y-2 mb-6">
          <h1 className="text-2xl font-semibold">Payments</h1>
          <p className="text-gray-500">Manage your transactions and wallet.</p>
        </div>

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

        <PaymentsStats isMobile={true} walletBalance={walletBalance} virtualAccount={virtualAccount} isLoading={isLoadingWallet} />

        <h2 className="text-xl font-semibold mb-4">Transaction history</h2>

        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search transactions"
          className="mb-6"
        />

        {/* Transaction List */}
        <div className="space-y-4">
          {currentTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} onClick={onTransactionClick} />
          ))}
        </div>

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="mt-6"
          isMobile={true}
        />
      </div>

      <MobileBottomNav />

      <FundWalletModal open={showFundingModal} onOpenChange={setShowFundingModal} virtualAccount={virtualAccount} />

      <WithdrawalModal
        open={showWithdrawModal}
        onOpenChange={onWithdrawModalChange}
        onSubmit={onWithdraw}
        amount={withdrawAmount}
        onAmountChange={onWithdrawAmountChange}
        isLoading={isWithdrawing}
      />
    </div>
  )
}

