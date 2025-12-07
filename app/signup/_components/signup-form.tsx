import { Eye, EyeOff, Mail, Lock, Building } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { signupSchema, type SignupFormData } from "./signup-schema"
import { useState } from "react"

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => Promise<void>
  isLoading: boolean
  error: string
}

export function SignupForm({ onSubmit, isLoading, error }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      accountType: "brand",
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  })

  const accountType = watch("accountType")
  const agreeTerms = watch("agreeTerms")

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <RadioGroup
          defaultValue="brand"
          value={accountType}
          onValueChange={(value) => setValue("accountType", value as "brand" | "creator")}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="brand" id="brand" />
            <Label htmlFor="brand" className="dark:text-white">
              Brand
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="creator" id="creator" />
            <Label htmlFor="creator" className="dark:text-white">
              Creator
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-white">
            First Name
          </Label>
          <div className="mt-1">
            <Input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="John"
              {...register("firstName")}
            />
          </div>
          {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>}
        </div>

        <div>
          <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-white">
            Last Name
          </Label>
          <div className="mt-1">
            <Input
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Doe"
              {...register("lastName")}
            />
          </div>
          {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      {accountType === "brand" && (
        <div>
          <Label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-white">
            Brand Name
          </Label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <Input
              id="companyName"
              type="text"
              className="pl-10"
              placeholder="Your Company Ltd"
              {...register("companyName")}
            />
          </div>
          {errors.companyName && <p className="text-sm text-red-600 mt-1">{errors.companyName.message}</p>}
        </div>
      )}

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
            type="email"
            autoComplete="email"
            className="pl-10"
            placeholder="you@example.com"
            {...register("email")}
          />
        </div>
        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
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
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            className="pl-10 pr-10"
            placeholder="••••••••"
            {...register("password")}
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
        {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-white">
          Confirm Password
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
            {...register("confirmPassword")}
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
        {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center">
        <Checkbox
          id="terms"
          checked={agreeTerms}
          onCheckedChange={(checked) => setValue("agreeTerms", checked as boolean)}
        />
        <Label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-white">
          I agree to the{" "}
          <Link href="#" className="font-medium text-dashboard-purple hover:text-dashboard-purple/90">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="font-medium text-dashboard-purple hover:text-dashboard-purple/90">
            Privacy Policy
          </Link>
        </Label>
      </div>
      {errors.agreeTerms && <p className="text-sm text-red-600">{errors.agreeTerms.message}</p>}

      <div>
        <Button
          type="submit"
          className="w-full bg-dashboard-purple hover:bg-dashboard-purple/90"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </div>
    </form>
  )
}
