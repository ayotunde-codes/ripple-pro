import apiClient from "../core/apiClient"
import {
  ApiResponse,
  PaginatedResponse,
  UserChallenge,
  JoinChallengeRequest,
  GetMySubmissionsParams,
  RedemptionRequestResponse,
} from "./types"

/**
 * Challenge API Service
 * All challenge-related API calls (Creator side)
 */
export const challengeApi = {
  /**
   * Join a challenge
   * POST /challenges/:challengeId
   */
  joinChallenge: async (
    challengeId: number,
    data: JoinChallengeRequest
  ): Promise<ApiResponse<UserChallenge>> => {
    const response = await apiClient.post<ApiResponse<UserChallenge>>(
      `/challenges/${challengeId}`,
      data
    )
    return response.data
  },

  /**
   * Get my challenge submissions
   * GET /challenges/my-submissions
   */
  getMySubmissions: async (
    params?: GetMySubmissionsParams
  ): Promise<PaginatedResponse<UserChallenge>> => {
    const response = await apiClient.get<PaginatedResponse<UserChallenge>>(
      "/challenges/my-submissions",
      { params }
    )
    return response.data
  },

  /**
   * Redeem reward for a challenge
   * GET /challenges/redeem-reward/:challengeId
   */
  redeemReward: async (
    challengeId: number
  ): Promise<ApiResponse<RedemptionRequestResponse>> => {
    const response = await apiClient.get<
      ApiResponse<RedemptionRequestResponse>
    >(`/challenges/redeem-reward/${challengeId}`)
    return response.data
  },

  /**
   * Approve redemption (Brand side)
   * GET /challenges/approve-redemption/:redemptionId
   */
  approveRedemption: async (
    redemptionId: number
  ): Promise<ApiResponse<RedemptionRequestResponse>> => {
    const response = await apiClient.get<
      ApiResponse<RedemptionRequestResponse>
    >(`/challenges/approve-redemption/${redemptionId}`)
    return response.data
  },
}

