import { z } from "zod"

export const submissionSchema = z.object({
  instagram: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  facebook: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  youtube: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  tiktok: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
})

export type SubmissionFormData = z.infer<typeof submissionSchema>

export const getInitialSubmissionData = (platforms: string[]): SubmissionFormData => {
  const data: any = {}
  platforms.forEach((platform) => {
    data[platform] = ""
  })
  return data
}

// Validate that at least one platform link is provided
export const validateSubmissionLinks = (platforms: string[], data: SubmissionFormData) => {
  return platforms.some((platform) => data[platform as keyof SubmissionFormData])
}

