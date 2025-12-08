import apiClient from "../core/apiClient"
import {
  ApiResponse,
  PaginatedResponse,
  Campaign,
  CreateCampaignRequest,
  CampaignSummary,
  GetCampaignsParams,
  RedemptionRequest,
} from "./types"

/**
 * Campaign API Service
 * All campaign-related API calls (Brand side)
 */
export const campaignApi = {
  /**
   * Create a new campaign
   * POST /campaigns
   */
  createCampaign: async (
    data: CreateCampaignRequest
  ): Promise<ApiResponse<Campaign>> => {
    const response = await apiClient.post<ApiResponse<Campaign>>(
      "/campaigns",
      data
    )
    return response.data
  },

  /**
   * Get all campaigns with pagination
   * GET /campaigns
   */
  getCampaigns: async (
    params?: GetCampaignsParams
  ): Promise<PaginatedResponse<Campaign>> => {
    const response = await apiClient.get<PaginatedResponse<Campaign>>(
      "/campaigns",
      { params }
    )
    return response.data
  },

  /**
   * Get campaign summary stats
   * GET /campaigns/summary
   */
  getCampaignSummary: async (): Promise<ApiResponse<CampaignSummary>> => {
    const response = await apiClient.get<ApiResponse<CampaignSummary>>(
      "/campaigns/summary"
    )
    return response.data
  },

  /**
   * Close a campaign
   * GET /campaigns/close/:campaignId
   */
  closeCampaign: async (campaignId: number): Promise<ApiResponse<Campaign>> => {
    const response = await apiClient.get<ApiResponse<Campaign>>(
      `/campaigns/close/${campaignId}`
    )
    return response.data
  },

  /**
   * Get redemption requests for a campaign
   * GET /campaigns/:campaignId/redemption-requests
   */
  getRedemptionRequests: async (
    campaignId: number
  ): Promise<ApiResponse<RedemptionRequest[]>> => {
    const response = await apiClient.get<ApiResponse<RedemptionRequest[]>>(
      `/campaigns/${campaignId}/redemption-requests`
    )
    return response.data
  },

  /**
   * Approve redemption request
   * GET /challenges/approve-redemption/:redemptionId
   */
  approveRedemption: async (
    redemptionId: number
  ): Promise<ApiResponse<RedemptionRequest>> => {
    const response = await apiClient.get<ApiResponse<RedemptionRequest>>(
      `/challenges/approve-redemption/${redemptionId}`
    )
    return response.data
  },
}

