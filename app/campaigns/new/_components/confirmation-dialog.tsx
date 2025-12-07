import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CampaignFormData } from "./campaign-data"

interface ConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: CampaignFormData
  onSubmit: () => void
}

export function ConfirmationDialog({ open, onOpenChange, formData, onSubmit }: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle>Confirm Challenge Details</DialogTitle>
          <DialogDescription>Please review your challenge details before proceeding to payment.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-sm font-medium">Challenge Name:</div>
          <div className="text-sm">{formData.name}</div>

          <div className="text-sm font-medium">Content Type:</div>
          <div className="text-sm">{formData.contentType}</div>

          <div className="text-sm font-medium">Category:</div>
          <div className="text-sm">{formData.category}</div>

          <div className="text-sm font-medium">Challenge Pool:</div>
          <div className="text-sm">
            {formData.currency} {formData.budget}
          </div>

          <div className="text-sm font-medium">Reward Rate:</div>
          <div className="text-sm">
            {formData.rewardAmount} per {formData.viewsThreshold} views
          </div>

          <div className="text-sm font-medium">Maximum Payout:</div>
          <div className="text-sm">
            {formData.currency} {formData.maxPayout}
          </div>

          <div className="text-sm font-medium">End Date:</div>
          <div className="text-sm">{formData.endDate}</div>

          <div className="text-sm font-medium">Asset Links:</div>
          <div className="text-sm">{formData.assetLinks || "None"}</div>

          <div className="text-sm font-medium">Requirements:</div>
          <div className="text-sm">{formData.requirements || "None"}</div>

          <div className="text-sm font-medium">Additional Notes:</div>
          <div className="text-sm">{formData.notes || "None"}</div>
        </div>
        <Button className="w-full bg-[#B125F9] hover:bg-[#B125F9]/90 rounded-full py-6 mt-4" onClick={onSubmit}>
          Proceed to Fund Challenge Pool
        </Button>
      </DialogContent>
    </Dialog>
  )
}

