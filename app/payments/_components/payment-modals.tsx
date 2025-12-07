import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Copy, Check, X } from "lucide-react"
import { virtualAccount } from "./payments-data"

interface FundWalletModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FundWalletModal({ open, onOpenChange }: FundWalletModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(virtualAccount.accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-lg p-0 overflow-hidden">
        <div className="bg-[#FDF8FF] dark:bg-[#0E0E0E] py-4 px-6 flex justify-between items-center border-b">
          <DialogTitle className="text-xl font-semibold dark:text-white">Fund Your Wallet</DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-[#A9A9A9] dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 dark:text-[#FAFAFA] mb-6">
            Transfer funds to the virtual account below to fund your wallet.
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-[#FAFAFA] font-medium">Bank name</Label>
              <div className="flex h-14 w-full rounded-full border border-gray-200 bg-background px-4 py-3 text-gray-700 dark:text-[#FAFAFA]">
                {virtualAccount.bankName}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-[#FAFAFA] font-medium">Account number</Label>
              <div className="flex h-14 w-full rounded-full border border-gray-200 bg-background px-4 py-3 text-gray-700 dark:text-[#FAFAFA] relative">
                {virtualAccount.accountNumber}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B125F9]"
                  onClick={handleCopyAccountNumber}
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-[#FAFAFA] font-medium">Account name</Label>
              <div className="flex h-14 w-full rounded-full border border-gray-200 bg-background px-4 py-3 text-gray-700 dark:text-[#FAFAFA]">
                {virtualAccount.accountName}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface WithdrawalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: () => void
  amount: string
  onAmountChange: (amount: string) => void
}

export function WithdrawalModal({ open, onOpenChange, onSubmit, amount, onAmountChange }: WithdrawalModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-lg p-0 overflow-hidden">
        <div className="bg-[#FDF8FF] dark:bg-[#0E0E0E] py-4 px-6 flex justify-between items-center border-b">
          <DialogTitle className="text-xl font-semibold dark:text-white">Withdraw Funds</DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-[#A9A9A9] dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 dark:text-[#FAFAFA] mb-6">
            Enter the amount you want to withdraw to your settlement account.
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-[#FAFAFA] font-medium">Amount (₦)</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => onAmountChange(e.target.value)}
                className="rounded-full h-14 px-4 border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-[#FAFAFA] font-medium">Settlement Account</Label>
              <div className="rounded-lg bg-[#FDF8FF] dark:bg-[#0E0E0E] p-4 text-[#B125F9] dark:text-[#FAFAFA]">
                <p className="font-semibold text-lg">John Doe</p>
                <p>Guaranty Trust Bank • 0123456789</p>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button
                type="button"
                onClick={onSubmit}
                disabled={!amount || Number.parseFloat(amount) <= 0}
                className="w-full bg-[#B125F9] hover:bg-[#B125F9]/90 rounded-full py-6 text-white font-medium"
              >
                Withdraw
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full rounded-full py-6 border-gray-200 text-red-500 font-medium hover:bg-transparent hover:text-red-600"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface OtpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: () => void
  otp: string
  onOtpChange: (otp: string) => void
  error?: string
  isMobile?: boolean
}

export function OtpModal({ open, onOpenChange, onSubmit, otp, onOtpChange, error, isMobile = false }: OtpModalProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isMobile) {
      e.preventDefault()
      e.stopPropagation()
    }
    onOtpChange(e.target.value)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isMobile) {
      e.target.scrollIntoView(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle>Verify Withdrawal</DialogTitle>
          <DialogDescription>Enter the OTP sent to your email to complete the withdrawal.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>OTP</Label>
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={6}
              className="rounded-full"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>
        <DialogFooter className={isMobile ? "flex flex-col gap-3 sm:flex-row" : ""}>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className={`rounded-full ${isMobile ? "w-full" : ""}`}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={!otp || otp.length !== 6}
            className={`bg-[#B125F9] hover:bg-[#B125F9]/90 rounded-full ${isMobile ? "w-full" : ""}`}
          >
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface SuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SuccessModal({ open, onOpenChange }: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-lg">
        <div className="flex flex-col items-center justify-center py-6">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <DialogTitle className="mb-2">Withdrawal Request Successful</DialogTitle>
          <DialogDescription className="text-center">
            Your withdrawal request has been submitted successfully. It will be processed within 24 hours.
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  )
}

