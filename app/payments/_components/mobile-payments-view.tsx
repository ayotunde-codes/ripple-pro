import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MobileHeader } from "@/components/mobile-header"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { SearchInput } from "@/components/shared/search-input"
import { PaginationControls } from "@/components/shared/pagination-controls"
import { PaymentsStats } from "./payments-stats"
import { TransactionItem } from "./transaction-item"
import { FundWalletModal, WithdrawalModal, OtpModal, SuccessModal } from "./payment-modals"

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

interface MobilePaymentsViewProps {
  transactions: Transaction[]
  onTransactionClick: (transaction: Transaction) => void
  onPaymentAction: (action: string) => void
}

export function MobilePaymentsView({ transactions, onTransactionClick, onPaymentAction }: MobilePaymentsViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  const [showFundingModal, setShowFundingModal] = useState(false)
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false)
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

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

        <PaymentsStats isMobile={true} />

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
        isMobile={true}
      />

      <SuccessModal open={showSuccessModal} onOpenChange={setShowSuccessModal} />
    </div>
  )
}

