"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2, Mail } from "lucide-react"
import { useForgotPassword } from "@/services/auth"
import { toast } from "sonner"

interface ForgotPasswordModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ForgotPasswordModal({ open, onOpenChange }: ForgotPasswordModalProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState("")

  const { mutate: forgotPassword, isPending } = useForgotPassword()

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault()

    forgotPassword(
      { email },
      {
        onSuccess: (response) => {
          setStep(2)
          toast.success(response.message || "Password reset email sent!")
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.message || "Failed to send reset email"
          toast.error(errorMessage)
        },
      }
    )
  }

  const handleClose = () => {
    // Reset the state when closing the modal
    setStep(1)
    setEmail("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{step === 1 ? "Forgot Password" : "Check Your Email"}</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Enter your registered email address and we'll send you a link to reset your password."
              : "We've sent a password reset link to your email address."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <form onSubmit={handleSubmitEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-dashboard-purple hover:bg-dashboard-purple/90"
                disabled={isPending || !email}
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Reset Link
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex flex-col items-center py-6">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-3 mb-4">
                <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Check Your Email</h3>
              <p className="text-center text-sm text-muted-foreground mb-4 px-4">
                We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>
              </p>
              <div className="rounded-lg bg-blue-50 dark:bg-blue-900/10 p-4 w-full">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  • Click the link in the email to reset your password
                  <br />
                  • The link will expire in 1 hour
                  <br />• Check your spam folder if you don't see the email
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button className="w-full bg-dashboard-purple hover:bg-dashboard-purple/90" onClick={handleClose}>
                Back to Login
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setStep(1)
                  setEmail("")
                }}
                className="w-full"
              >
                Try Different Email
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
