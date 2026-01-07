import { z } from "zod"

// Personal Information Schema
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  countryId: z.coerce.number().positive("Please select a country"),
})

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>

// BVN Schema
export const bvnSchema = z.object({
  bvn: z.string().length(11, "BVN must be exactly 11 digits").regex(/^\d+$/, "BVN must contain only numbers"),
})

export type BVNFormData = z.infer<typeof bvnSchema>

// Bank Account Schema
export const bankAccountSchema = z.object({
  bankCode: z.string().min(1, "Please select a bank"),
  accountNumber: z.string().length(10, "Account number must be exactly 10 digits").regex(/^\d+$/, "Account number must contain only numbers"),
  accountName: z.string().min(1, "Account name is required"),
})

export type BankAccountFormData = z.infer<typeof bankAccountSchema>

// Social Media Schema
export const socialMediaSchema = z.object({
  social_instagram: z.string().optional(),
  social_facebook: z.string().optional(),
  social_twitter: z.string().optional(),
  social_tiktok: z.string().optional(),
  social_youtube: z.string().optional(),
}).refine(
  (data) => {
    // At least one social media link must be provided
    return Object.values(data).some((value) => value && value.trim().length > 0)
  },
  {
    message: "Please add at least one social media link",
  }
)

export type SocialMediaFormData = z.infer<typeof socialMediaSchema>

// Combined Profile Schema (for reference)
export const profileSchema = personalInfoSchema
  .merge(bvnSchema)
  .merge(bankAccountSchema)
  .merge(socialMediaSchema)

export type ProfileFormData = z.infer<typeof profileSchema>

