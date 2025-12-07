"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Lock, ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useResetPassword } from "@/services/auth"
import { toast } from "sonner"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""
  const email = searchParams.get("email") || ""

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
  })

  const { mutate: resetPassword, isPending } = useResetPassword()

  const updatePasswordCriteria = (password: string) => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    })
  }

  const isPasswordValid = Object.values(passwordCriteria).every(Boolean)
  const passwordsMatch = password === confirmPassword && password.length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!token || !email) {
      toast.error("Invalid reset link. Please request a new password reset.")
      return
    }

    if (!isPasswordValid) {
      toast.error("Please ensure your password meets all requirements")
      return
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match")
      return
    }

    resetPassword(
      {
        email,
        token,
        password,
        password_confirmation: confirmPassword,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message || "Password reset successfully!")
          // useResetPassword hook will automatically redirect to login
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message || "Failed to reset password. Link may have expired."
          toast.error(errorMessage)
        },
      }
    )
  }

  const CriteriaItem = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center space-x-2 text-sm">
      {met ? (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      ) : (
        <XCircle className="h-4 w-4 text-gray-400" />
      )}
      <span className={met ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
        {text}
      </span>
    </div>
  )

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
              Reset Your Password
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Enter your new password below
              {email && (
                <>
                  {" "}
                  for <span className="font-medium text-gray-900 dark:text-white">{email}</span>
                </>
              )}
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">
                  New Password
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className="pl-10 pr-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      updatePasswordCriteria(e.target.value)
                    }}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Eye className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Criteria */}
                {password && (
                  <div className="mt-3 space-y-1">
                    <CriteriaItem met={passwordCriteria.length} text="At least 8 characters" />
                    <CriteriaItem met={passwordCriteria.uppercase} text="One uppercase letter" />
                    <CriteriaItem met={passwordCriteria.lowercase} text="One lowercase letter" />
                    <CriteriaItem met={passwordCriteria.number} text="One number" />
                    <CriteriaItem met={passwordCriteria.symbol} text="One special character" />
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Confirm New Password
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className="pl-10 pr-10"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Eye className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-dashboard-purple hover:bg-dashboard-purple/90"
                  disabled={isPending || !isPasswordValid || !passwordsMatch}
                >
                  {isPending ? "Resetting Password..." : "Reset Password"}
                </Button>
              </div>
            </form>
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
              <h1 className="text-4xl font-bold mb-4">Secure Password Reset</h1>
              <p className="text-xl">Create a strong password to keep your account safe and secure.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

