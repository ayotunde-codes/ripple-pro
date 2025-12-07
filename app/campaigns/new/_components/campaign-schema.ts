import { z } from "zod"

export const campaignSchema = z.object({
  // Step 1: Challenge details
  name: z.string().min(1, "Campaign name is required"),
  contentType: z.string().min(1, "Content type is required"),
  category: z.string().min(1, "Category is required"),
  platforms: z.array(z.string()).min(1, "Please select at least one platform"),
  
  // Step 2: Reward Setup
  budget: z.string().min(1, "Challenge pool is required"),
  currency: z.string().default("NGN"),
  endDate: z.string().min(1, "End date is required"),
  rewardAmount: z.string().min(1, "Reward amount is required"),
  viewsThreshold: z.string().min(1, "Views threshold is required"),
  maxPayout: z.string().min(1, "Maximum payout is required"),
  
  // Step 3: Content Requirements
  assetLinks: z.string().optional(),
  requirements: z.string().optional(),
  
  // Step 4: Additional Notes
  notes: z.string().optional(),
})

export type CampaignFormData = z.infer<typeof campaignSchema>

export const initialFormData: CampaignFormData = {
  name: "",
  contentType: "",
  category: "",
  budget: "",
  currency: "NGN",
  rewardAmount: "1",
  viewsThreshold: "1000",
  maxPayout: "",
  endDate: "",
  assetLinks: "",
  requirements: "",
  notes: "",
  platforms: [],
}

