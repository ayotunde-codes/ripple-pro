import { Check, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"

interface PaymentStatusDialogProps {
  status: "loading" | "success" | "error" | null
  onClose: () => void
}

export function PaymentStatusDialog({ status, onClose }: PaymentStatusDialogProps) {
  return (
    <Dialog open={status !== null} onOpenChange={() => status !== "loading" && onClose()}>
      <DialogContent className="max-w-md rounded-lg">
        {status === "loading" && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-[#B125F9] mb-4" />
            <DialogTitle>Processing Payment</DialogTitle>
            <DialogDescription>Please wait while we process your payment...</DialogDescription>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <DialogTitle>Payment Successful!</DialogTitle>
            <DialogDescription>Your challenge has been created successfully and is now live.</DialogDescription>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-red-100 p-3 mb-4">
              <X className="h-12 w-12 text-red-600" />
            </div>
            <DialogTitle>Payment Failed</DialogTitle>
            <DialogDescription>There was an error processing your payment. Please try again.</DialogDescription>
            <Button className="w-full bg-[#B125F9] hover:bg-[#B125F9]/90 rounded-full py-6 mt-4" onClick={onClose}>
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

