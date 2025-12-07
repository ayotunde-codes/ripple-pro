import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface CloseChallengDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isMobile?: boolean
}

export function CloseChallengeDialog({ open, onOpenChange, onConfirm, isMobile = false }: CloseChallengDialogProps) {
  if (isMobile) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="rounded-lg">
          <DialogHeader>
            <DialogTitle>Confirm Challenge Closure</DialogTitle>
            <DialogDescription>
              Are you sure you want to close this challenge? Any remaining balance will be refunded to your wallet.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-full py-6 w-full"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="bg-[#B125F9] hover:bg-[#B125F9]/90 rounded-full py-6 w-full"
            >
              Close Challenge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle>Confirm Challenge Closure</DialogTitle>
          <DialogDescription>
            Are you sure you want to close this challenge? Any remaining balance will be refunded to your wallet.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-full">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-[#B125F9] hover:bg-[#B125F9]/90 rounded-full">
            Close Challenge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

