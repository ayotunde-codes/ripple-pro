"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useVerifyEmail, useResendCode } from "@/services/auth"
import { toast } from "sonner"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  
  const [code, setCode] = useState("")
  const [resendCountdown, setResendCountdown] = useState(0)

  const { mutate: verifyEmail, isPending: isVerifying } = useVerifyEmail()
  const { mutate: resendCode, isPending: isResending } = useResendCode()

  // Countdown timer for resend button
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCountdown])

  const handleVerify = () => {
    if (code.length !== 6) {
      toast.error("Please enter a 6-digit code")
      return
    }

    verifyEmail(
      { email, code },
      {
        onSuccess: (response) => {
          toast.success(response.message || "Email verified successfully!")
          // useVerifyEmail hook will automatically redirect to login
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.message || "Invalid verification code"
          toast.error(errorMessage)
          setCode("") // Clear the code on error
        },
      }
    )
  }

  const handleResend = () => {
    if (!email) {
      toast.error("Email address not found")
      return
    }

    resendCode(
      { email },
      {
        onSuccess: (response) => {
          toast.success(response.message || "Verification code resent!")
          setResendCountdown(60) // 60 second cooldown
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.message || "Failed to resend code"
          toast.error(errorMessage)
        },
      }
    )
  }

  // Auto-verify when code is complete
  useEffect(() => {
    if (code.length === 6 && !isVerifying) {
      handleVerify()
    }
  }, [code])

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex justify-center mb-8">
            <Image src="/images/ripple-pro-logo.png" alt="RipplePro" width={200} height={70} className="h-auto" />
          </div>

          <div>
            <Link
              href="/login"
              className="inline-flex items-center text-sm font-medium text-dashboard-purple hover:text-dashboard-purple/90 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to login
            </Link>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Verify your email
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              We've sent a verification code to{" "}
              <span className="font-medium text-gray-900 dark:text-white">{email || "your email"}</span>
            </p>
          </div>

          <div className="mt-8">
            <div className="space-y-6">
              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-3">
                  Enter verification code
                </label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={setCode}
                    disabled={isVerifying}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="h-14 w-12" />
                      <InputOTPSlot index={1} className="h-14 w-12" />
                      <InputOTPSlot index={2} className="h-14 w-12" />
                      <InputOTPSlot index={3} className="h-14 w-12" />
                      <InputOTPSlot index={4} className="h-14 w-12" />
                      <InputOTPSlot index={5} className="h-14 w-12" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
                  Code will be verified automatically when complete
                </p>
              </div>

              {/* Verify Button */}
              <Button
                onClick={handleVerify}
                className="w-full bg-dashboard-purple hover:bg-dashboard-purple/90"
                disabled={isVerifying || code.length !== 6}
              >
                {isVerifying ? "Verifying..." : "Verify Email"}
              </Button>

              {/* Resend Code */}
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Didn't receive the code?{" "}
                  {resendCountdown > 0 ? (
                    <span className="font-medium text-gray-900 dark:text-white">
                      Resend in {resendCountdown}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={isResending}
                      className="font-medium text-dashboard-purple hover:text-dashboard-purple/90 disabled:opacity-50"
                    >
                      {isResending ? "Sending..." : "Resend code"}
                    </button>
                  )}
                </p>
              </div>

              {/* Info Box */}
              <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Mail className="h-5 w-5 text-blue-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Check your spam folder if you don't see the email in your inbox.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-dashboard-purple to-dashboard-pink">
          <div className="flex h-full items-center justify-center">
            <div className="max-w-2xl px-8 text-center text-white">
              <Image
                src="/images/ripple-pro-icon.png"
                alt="RipplePro Icon"
                width={150}
                height={150}
                className="mx-auto mb-8"
              />
              <h1 className="text-4xl font-bold mb-4">Almost There!</h1>
              <p className="text-xl">
                Just one more step to unlock the power of RipplePro. Verify your email to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

