import apiClient from "../core/apiClient"
import {
  ApiResponse,
  Wallet,
  InitializeFundingRequest,
  InitializeFundingResponse,
  CompleteCreditRequest,
  WithdrawRequest,
} from "./types"

/**
 * Wallet API Service
 * All wallet and payment-related API calls
 */
export const walletApi = {
  /**
   * Get wallet details
   * GET /wallets/:userId
   */
  getWallet: async (userId: number): Promise<ApiResponse<Wallet>> => {
    const response = await apiClient.get<ApiResponse<Wallet>>(
      `/wallets/${userId}`
    )
    return response.data
  },

  /**
   * Initialize wallet funding (via Paystack)
   * POST /wallets/credit/initialize
   */
  initializeFunding: async (
    data: InitializeFundingRequest
  ): Promise<ApiResponse<InitializeFundingResponse>> => {
    const response = await apiClient.post<
      ApiResponse<InitializeFundingResponse>
    >("/wallets/credit/initialize", data)
    return response.data
  },

  /**
   * Complete wallet credit after Paystack payment
   * POST /wallets/credit
   */
  completeCredit: async (
    data: CompleteCreditRequest
  ): Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(
      "/wallets/credit",
      data
    )
    return response.data
  },

  /**
   * Withdraw from wallet
   * POST /wallets/withdraw
   */
  withdraw: async (data: WithdrawRequest): Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(
      "/wallets/withdraw",
      data
    )
    return response.data
  },
}

