import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDashboardStore } from "@/stores"

interface FundWalletModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  copied: boolean
  onCopyAccountNumber: () => void
}

export function FundWalletModal({ open, onOpenChange, copied, onCopyAccountNumber }: FundWalletModalProps) {
  const { virtualAccount } = useDashboardStore()
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md dark:bg-background-dark">
        <DialogHeader>
          <DialogTitle className="dark:text-[#FAFAFA]">Fund Your Wallet</DialogTitle>
          <DialogDescription className="dark:text-[#FAFAFA]/80">
            Transfer funds to the virtual account below to fund your wallet.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {virtualAccount ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-[#FAFAFA]">Bank Name</label>
                <div className="flex h-10 w-full rounded-md border border-input bg-background dark:bg-background-dark dark:border-gray-700 px-3 py-2 text-sm dark:text-[#FAFAFA]">
                  {virtualAccount.bank_name || "N/A"}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-[#FAFAFA]">Account Number</label>
                <div className="flex h-10 w-full rounded-md border border-input bg-background dark:bg-background-dark dark:border-gray-700 px-3 py-2 text-sm relative dark:text-[#FAFAFA]">
                  {virtualAccount.account_number || "N/A"}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 px-2 dark:text-[#FAFAFA]"
                    onClick={onCopyAccountNumber}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-[#FAFAFA]">Account Name</label>
                <div className="flex h-10 w-full rounded-md border border-input bg-background dark:bg-background-dark dark:border-gray-700 px-3 py-2 text-sm dark:text-[#FAFAFA]">
                  {virtualAccount.account_name || "N/A"}
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No virtual account available. Please complete your profile setup.
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="dark:text-[#FAFAFA] dark:border-gray-700"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface WithdrawalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: string
  onAmountChange: (amount: string) => void
  onSubmit: () => void
  isLoading?: boolean
}

export function WithdrawalModal({
  open,
  onOpenChange,
  amount,
  onAmountChange,
  onSubmit,
  isLoading = false,
}: WithdrawalModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>Enter the amount you want to withdraw to your settlement account.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount (₦)</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Settlement Account</label>
            <div className="rounded-md border border-input bg-background p-3 text-sm">
              <p className="font-medium">John Doe</p>
              <p className="text-muted-foreground">Guaranty Trust Bank • 0123456789</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={!withdrawalAmount || Number.parseFloat(withdrawalAmount) <= 0}
          >
            Withdraw
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface OtpVerificationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  otp: string
  setOtp: (otp: string) => void
  otpError: string
  onSubmit: () => void
}

export function OtpVerificationModal({
  open,
  onOpenChange,
  otp,
  setOtp,
  otpError,
  onSubmit,
}: OtpVerificationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Withdrawal</DialogTitle>
          <DialogDescription>Enter the OTP sent to your email to complete the withdrawal.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">OTP</label>
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
            {otpError && <p className="text-sm text-red-500">{otpError}</p>}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={onSubmit} disabled={!otp || otp.length !== 6}>
            Verify
          </Button>
        </div>
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
      <DialogContent className="sm:max-w-md">
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

