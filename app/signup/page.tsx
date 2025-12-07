"use client"

import Link from "next/link"
import Image from "next/image"
import { SignupForm } from "./_components/signup-form"
import { SignupHero } from "./_components/signup-hero"
import { transformSignupDataToAPI } from "./_components/signup-utils"
import { useRegister } from "@/services/auth"
import type { SignupFormData } from "./_components/signup-schema"
import { toast } from "sonner"

export default function SignupPage() {
  const { mutate: register, isPending, error: apiError } = useRegister()

  const handleSignup = async (data: SignupFormData) => {
    try {
      // Transform UI data to API format
      const apiData = transformSignupDataToAPI(data)
      
      // Call the API
      register(apiData, {
        onSuccess: (response) => {
          toast.success(response.message || "Account created successfully!")
          // useRegister hook will automatically redirect to verify-email page
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.message || "An error occurred. Please try again."
          toast.error(errorMessage)
        }
      })
    } catch (err) {
      toast.error("An error occurred. Please try again.")
    }
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
            <h2 className="mt-6 text-3xl font-bold tracking-tight dark:text-white text-[#111827]">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-white">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-dashboard-purple hover:text-dashboard-purple/90">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <SignupForm 
                onSubmit={handleSignup} 
                isLoading={isPending} 
                error={apiError?.message || ""} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <SignupHero />
    </div>
  )
}
