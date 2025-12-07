// Base API Response structure
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
}

// Paginated Response
export interface PaginatedResponse<T> {
  data: T[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    per_page: number
    to: number
    total: number
  }
}

// Campaign Status
export type CampaignStatus = "open" | "closed"

// Campaign
export interface Campaign {
  id: number
  campaign_name: string
  category: string
  content_type: string
  challenge_pool: string
  end_date: string
  created_at: string
  status: CampaignStatus
  reward_rate_amount: string
  reward_rate_views: number
  max_payout: string
  paid_out: string
  balance: number
  views: number
  asset_links: string[]
  content_requirement: string
  additional_notes: string
  social_media_platforms: string[]
}

// Create Campaign Request
export interface CreateCampaignRequest {
  campaign_name: string
  category: string
  content_type: string
  social_media_platforms: string[]
  challenge_pool: string
  end_date: string // YYYY-MM-DD
  reward_rate_amount: string
  reward_rate_views: string
  max_payout: string
  asset_links: string[]
  content_requirement: string
  additional_notes: string
}

// Campaign Summary
export interface CampaignSummary {
  total_campaigns: number
  active_campaigns: number
  total_spend: number
  total_views: string | number
}

// Get Campaigns Params
export interface GetCampaignsParams {
  length?: number
  search?: string
  status?: CampaignStatus
  page?: number
}

// Redemption Request Status
export type RedemptionStatus = "pending" | "approved" | "rejected"

// Challenge in Redemption
export interface ChallengeInRedemption {
  id: number
  challange_name: string
  earnings: number
  views: number
  date_entered: string
  status: string
  social_media_links: string[]
}

// User in Redemption
export interface UserInRedemption {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string
  status: string
  kyc_status: string
  is_email_verified: boolean
  rejection_reason: string | null
  created_at: string
  updated_at: string
}

// Redemption Request
export interface RedemptionRequest {
  id: number
  amount: string
  status: RedemptionStatus
  created_at: string
  challenge: ChallengeInRedemption
  user: UserInRedemption
}

