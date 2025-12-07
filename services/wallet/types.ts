// Base API Response structure
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
}

// Virtual Account
export interface VirtualAccount {
  account_number: string
  account_name: string
  bank: string
  user_id: number
}

// Wallet
export interface Wallet {
  id: number
  currency: string
  balance: string
  virtual_accounts: VirtualAccount[]
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

// Initialize Funding Request
export interface InitializeFundingRequest {
  amount: number
}

// Initialize Funding Response (Paystack)
export interface InitializeFundingResponse {
  status: boolean
  message: string
  data: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

// Complete Credit Request
export interface CompleteCreditRequest {
  reference: string
}

// Withdraw Request
export interface WithdrawRequest {
  amount: string
}

// Transaction (not in API but useful for frontend)
export interface Transaction {
  id: string
  type: "credit" | "debit"
  amount: string
  description: string
  status: "success" | "pending" | "failed"
  reference: string
  created_at: string
}

