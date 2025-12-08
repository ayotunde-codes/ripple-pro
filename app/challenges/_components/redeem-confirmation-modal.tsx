import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle } from "lucide-react"

interface RedeemConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isLoading: boolean
  challengeName?: string
  earnings?: number
}

export function RedeemConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
  challengeName = "this challenge",
  earnings = 0,
}: RedeemConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-blue-600" />
            </div>
            <DialogTitle>Redeem Reward</DialogTitle>
          </div>
          <DialogDescription className="pt-4">
            Are you sure you want to redeem your reward for <strong>{challengeName}</strong>?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Earnings Amount:</span>
              <span className="text-lg font-bold text-green-600">
                ₦{earnings.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>
              Your redemption request will be sent to the brand for approval. Once approved, 
              the funds will be transferred to your wallet.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Processing..." : "Confirm Redemption"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

