"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ForgotPasswordModal } from "@/components/forgot-password-modal"
import { useLogin } from "@/services/auth"
import { toast } from "sonner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const { mutate: login, isPending } = useLogin()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    login(
      { email, password },
      {
        onSuccess: (response) => {
          toast.success("Login successful!")
          // useLogin hook automatically redirects to dashboard and stores token
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message || "Invalid email or password"
          toast.error(errorMessage)
        },
      }
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex justify-center mb-8">
            <Image src="/images/ripple-pro-logo.png" alt="RipplePro" width={200} height={70} className="h-auto" />
          </div>
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Or{" "}
              <Link href="/signup" className="font-medium text-dashboard-purple hover:text-dashboard-purple/90">
                create a new account
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
                    Email address
                  </Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="pl-10"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">
                    Password
                  </Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="pl-10 pr-10"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                </div>


                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-white">
                      Remember me
                    </Label>
                  </div>

                  <div className="text-sm">
                    <button
                      type="button"
                      className="font-medium text-dashboard-purple hover:text-dashboard-purple/90"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot your password?
                    </button>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full bg-dashboard-purple hover:bg-dashboard-purple/90"
                    disabled={isPending}
                  >
                    {isPending ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </form>
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
              <h1 className="text-4xl font-bold mb-4">Connect with Creators</h1>
              <p className="text-xl">Launch campaigns, engage with creators, and track performance all in one place.</p>
            </div>
          </div>
        </div>
      </div>

      <ForgotPasswordModal open={showForgotPassword} onOpenChange={setShowForgotPassword} />
    </div>
  )
}
