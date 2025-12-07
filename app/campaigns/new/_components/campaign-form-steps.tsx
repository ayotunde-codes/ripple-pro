import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { UseFormReturn } from "react-hook-form"
import { platforms, calculateMinimumViews } from "./campaign-data"
import type { CampaignFormData } from "./campaign-schema"

interface FormStepProps {
  form: UseFormReturn<CampaignFormData>
  budgetError?: string
  walletBalance?: number
}

export function Step1ChallengeDetails({ form }: FormStepProps) {
  const { register, setValue, watch, formState: { errors } } = form
  const selectedPlatforms = watch("platforms") || []

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-base font-medium">Campaign name</Label>
        <Input
          placeholder="Enter campaign name"
          className="rounded-full h-14"
          {...register("name")}
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-base font-medium">Content type</Label>
        <Select onValueChange={(value) => setValue("contentType", value)}>
          <SelectTrigger className="rounded-full h-14">
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="story">Story</SelectItem>
          </SelectContent>
        </Select>
        {errors.contentType && <p className="text-sm text-red-600 mt-1">{errors.contentType.message}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-base font-medium">Category</Label>
        <Select onValueChange={(value) => setValue("category", value)}>
          <SelectTrigger className="rounded-full h-14">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-base font-medium">Social media platforms</Label>
        <div className="space-y-3 mt-2">
          {platforms.map((platform) => {
            const Icon = typeof platform.icon === "string" ? null : platform.icon
            const isSelected = selectedPlatforms.includes(platform.id)
            
            return (
              <div
                key={platform.id}
                className={cn(
                  "flex items-center space-x-3 rounded-full border p-4 cursor-pointer",
                  isSelected ? "border-[#B125F9] bg-[#B125F9]/5" : "border-gray-200",
                )}
                onClick={() => {
                  const newPlatforms = isSelected
                    ? selectedPlatforms.filter((id) => id !== platform.id)
                    : [...selectedPlatforms, platform.id]
                  setValue("platforms", newPlatforms, { shouldValidate: true })
                }}
              >
                <Checkbox
                  checked={isSelected}
                  className={cn(
                    "h-5 w-5 rounded-sm",
                    isSelected && "bg-[#B125F9] text-white border-[#B125F9]",
                  )}
                />
                <div className="flex items-center gap-2">
                  {Icon ? (
                    <Icon className="h-4 w-4" />
                  ) : (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 11-2.88-2.89v-3.44a6.32 6.32 0 00-1.76.25A6.34 6.34 0 004 15.26a6.34 6.34 0 1011.65-3.43V8.37a8.16 8.16 0 004.77 1.47V6.69z" />
                    </svg>
                  )}
                  <span>{platform.name}</span>
                </div>
              </div>
            )
          })}
        </div>
        {errors.platforms && <p className="text-sm text-red-600 mt-2">{errors.platforms.message}</p>}
      </div>
    </div>
  )
}

export function Step2RewardSetup({ form, budgetError, walletBalance = 750000 }: FormStepProps) {
  const { register, watch, formState: { errors } } = form
  const budget = watch("budget")
  const rewardAmount = watch("rewardAmount")
  const viewsThreshold = watch("viewsThreshold")
  const minViews = calculateMinimumViews(budget, rewardAmount, viewsThreshold)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-base font-medium">Challenge pool</Label>
          <span className="text-sm text-muted-foreground">Wallet Balance: ₦{walletBalance.toLocaleString()}</span>
        </div>
        <div className="flex rounded-full border overflow-hidden">
          <div className="relative flex-1">
            <Input
              type="number"
              placeholder="Enter amount"
              className={cn("border-0 rounded-none h-14 pl-8", budgetError ? "border-red-500" : "")}
              {...register("budget")}
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-muted-foreground">₦</span>
            </div>
          </div>
          <div className="w-[100px] h-14 flex items-center justify-center bg-[#080808] border-l border-gray-700 text-white">
            <span>NGN</span>
          </div>
        </div>
        {budgetError && <p className="text-sm text-red-500">{budgetError}</p>}
        {errors.budget && <p className="text-sm text-red-500">{errors.budget.message}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-base font-medium">End date</Label>
        <div className="relative">
          <Input
            type="date"
            className="rounded-full h-14 pl-4 pr-12"
            {...register("endDate")}
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        {errors.endDate && <p className="text-sm text-red-500 mt-1">{errors.endDate.message}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-base font-medium">Reward rate</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Amount"
            className="w-24 rounded-full h-14"
            {...register("rewardAmount")}
          />
          <span className="px-2">per</span>
          <Input
            type="number"
            placeholder="Views"
            className="w-32 rounded-full h-14"
            {...register("viewsThreshold")}
          />
          <span className="px-2">views</span>
        </div>
        {errors.rewardAmount && <p className="text-sm text-red-500 mt-1">{errors.rewardAmount.message}</p>}
        {errors.viewsThreshold && <p className="text-sm text-red-500 mt-1">{errors.viewsThreshold.message}</p>}
      </div>
      {minViews && (
        <div className="p-4 bg-[#000000] rounded-lg text-white border border-gray-800">
          <p className="text-sm font-medium">Minimum Number of Views</p>
          <p className="text-lg font-bold">{minViews.toLocaleString()} Views</p>
          <p className="text-xs text-gray-400 mt-1">
            This is the minimum number of views you can get with your challenge pool and reward rate.
          </p>
        </div>
      )}
      <div className="space-y-2">
        <Label className="text-base font-medium">Maximum payout per submission</Label>
        <div className="relative">
          <Input
            type="number"
            placeholder="Enter maximum payout"
            className="rounded-full h-14 pl-8"
            {...register("maxPayout")}
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="text-muted-foreground">₦</span>
          </div>
        </div>
        {errors.maxPayout && <p className="text-sm text-red-500 mt-1">{errors.maxPayout.message}</p>}
      </div>
    </div>
  )
}

export function Step3ContentRequirements({ form }: FormStepProps) {
  const { register } = form

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-base font-medium">Asset Links</Label>
        <Input
          placeholder="Enter asset links (e.g Google drive folders)"
          className="rounded-full h-14"
          {...register("assetLinks")}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-base font-medium">Content Requirements</Label>
        <Textarea
          placeholder="Enter content requirement"
          className="min-h-[200px] rounded-lg"
          {...register("requirements")}
        />
      </div>
    </div>
  )
}

export function Step4AdditionalNotes({ form }: FormStepProps) {
  const { register } = form

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-base font-medium">Additional Notes</Label>
        <Textarea
          placeholder="Add any additional notes for participants"
          className="min-h-[200px] rounded-lg"
          {...register("notes")}
        />
      </div>
    </div>
  )
}
