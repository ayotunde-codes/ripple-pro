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

// Challenge Status
export type ChallengeStatus = "open" | "closed"

// User Challenge (Submission)
export interface UserChallenge {
  id: number
  challenge_id: number
  challange_name: string
  earnings: number | null
  views: number | null
  date_entered: string
  created_at: string
  status: ChallengeStatus
  redemption_status?: "pending" | "approved" | "rejected"
  social_media_links: string[]
  challenge?: {
    id: number
    campaign_name: string
    category: string
    content_type: string
    challenge_pool: string
    end_date: string
    status: string
    views?: number
    social_media_links?: string[]
  }
}

// Join Challenge Request
export interface JoinChallengeRequest {
  social_media_links: string[]
}

// Get My Submissions Params
export interface GetMySubmissionsParams {
  search?: string
  length?: number
  status?: string
  page?: number
}

// Redemption Request
export interface RedemptionRequestResponse {
  id: number
  amount: number
  status: "pending" | "approved" | "rejected"
  created_at: string
  challenge: {
    id: number
    challange_name: string
    earnings: number
    views: number
    date_entered: string
    status: string
    social_media_links: string[]
  }
  user: {
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
}

