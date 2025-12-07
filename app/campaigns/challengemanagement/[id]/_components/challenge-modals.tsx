import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface AutoPayoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function AutoPayoutModal({ open, onOpenChange, onConfirm }: AutoPayoutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle>Confirm Auto Payout</DialogTitle>
          <DialogDescription>
            Are you sure you want to initiate auto payout? All approved creators will receive their rewards
            automatically.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-full">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-[#B125F9] hover:bg-[#B125F9]/90 rounded-full">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface DeclineModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  reason: string
  onReasonChange: (reason: string) => void
}

export function DeclineModal({ open, onOpenChange, onConfirm, reason, onReasonChange }: DeclineModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle>Decline Reward</DialogTitle>
          <DialogDescription>Please provide a reason for declining this creator's reward.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Reason for Decline</Label>
            <Textarea
              placeholder="Enter reason..."
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-full">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!reason.trim()}
            className="bg-red-500 hover:bg-red-600 rounded-full"
          >
            Send Decline Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface CreatorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  creator: any
  onApprove: (creatorId: number) => void
  onDecline: (creator: any) => void
  platforms: string[]
  renderSocialMediaIcon: (platform: string, url: string) => React.ReactNode
}

export function CreatorModal({
  open,
  onOpenChange,
  creator,
  onApprove,
  onDecline,
  platforms,
  renderSocialMediaIcon,
}: CreatorModalProps) {
  if (!creator) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg max-w-2xl">
        <DialogHeader>
          <DialogTitle>{creator.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Social Media Links</h3>
            <div className="flex space-x-4">
              {platforms.map(
                (platform) =>
                  creator[platform] && (
                    <div key={platform}>{renderSocialMediaIcon(platform, creator[platform])}</div>
                  ),
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Views Generated</p>
              <p className="text-lg font-semibold">{creator.views.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Reward Earned</p>
              <p className="text-lg font-semibold">₦{creator.reward.toLocaleString()}</p>
            </div>
          </div>
        </div>
        {creator.status === "pending" && (
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => {
                onDecline(creator)
                onOpenChange(false)
              }}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full w-full"
            >
              Decline
            </Button>
            <Button
              onClick={() => {
                onApprove(creator.id)
                onOpenChange(false)
              }}
              className="bg-[#B125F9] hover:bg-[#B125F9]/90 rounded-full w-full"
            >
              Approve
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

