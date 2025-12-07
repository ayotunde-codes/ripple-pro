"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"

export function VerificationPrompt({ open, onOpenChange, onComplete }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center py-6">
          <div className="rounded-full bg-yellow-100 p-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-center">Account Verification Required</DialogTitle>
            <DialogDescription className="text-center mt-2">
              Please complete your profile setup to access this feature
            </DialogDescription>
          </DialogHeader>
          <Button className="mt-6 bg-dashboard-purple hover:bg-dashboard-purple/90" onClick={onComplete}>
            Complete Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
