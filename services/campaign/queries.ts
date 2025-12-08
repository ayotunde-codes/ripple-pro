import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { campaignApi } from "./api"
import { CreateCampaignRequest, GetCampaignsParams } from "./types"

/**
 * React Query hooks for campaign operations (Brand side)
 */

// Query keys
export const campaignKeys = {
  all: ["campaign"] as const,
  lists: () => [...campaignKeys.all, "list"] as const,
  list: (params?: GetCampaignsParams) =>
    [...campaignKeys.all, "list", params] as const,
  summary: () => [...campaignKeys.all, "summary"] as const,
  redemptions: (campaignId: number) =>
    [...campaignKeys.all, "redemptions", campaignId] as const,
}

/**
 * Get campaigns query with pagination
 */
export const useCampaigns = (params?: GetCampaignsParams) => {
  return useQuery({
    queryKey: campaignKeys.list(params),
    queryFn: () => campaignApi.getCampaigns(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Get campaign summary query
 */
export const useCampaignSummary = () => {
  return useQuery({
    queryKey: campaignKeys.summary(),
    queryFn: () => campaignApi.getCampaignSummary(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}

/**
 * Get redemption requests for a campaign
 */
export const useRedemptionRequests = (campaignId: number) => {
  return useQuery({
    queryKey: campaignKeys.redemptions(campaignId),
    queryFn: () => campaignApi.getRedemptionRequests(campaignId),
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!campaignId,
  })
}

/**
 * Create campaign mutation
 */
export const useCreateCampaign = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCampaignRequest) =>
      campaignApi.createCampaign(data),
    onSuccess: (response) => {
      // Invalidate campaigns list
      queryClient.invalidateQueries({ queryKey: campaignKeys.lists() })
      queryClient.invalidateQueries({ queryKey: campaignKeys.summary() })

      console.log("Campaign created:", response.message)

      // Redirect to campaigns page
      router.push("/campaigns")
    },
    onError: (error: any) => {
      console.error("Failed to create campaign:", error)
    },
  })
}

/**
 * Close campaign mutation
 */
export const useCloseCampaign = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (campaignId: number) => campaignApi.closeCampaign(campaignId),
    onSuccess: (response) => {
      // Invalidate campaigns list and summary
      queryClient.invalidateQueries({ queryKey: campaignKeys.lists() })
      queryClient.invalidateQueries({ queryKey: campaignKeys.summary() })

      console.log("Campaign closed:", response.message)
    },
    onError: (error: any) => {
      console.error("Failed to close campaign:", error)
    },
  })
}

/**
 * Approve redemption request mutation
 */
export const useApproveRedemption = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (redemptionId: number) =>
      campaignApi.approveRedemption(redemptionId),
    onSuccess: (response) => {
      // Invalidate redemption requests to refetch
      queryClient.invalidateQueries({ queryKey: campaignKeys.all })
      console.log("Redemption approved:", response.message)
    },
    onError: (error: any) => {
      console.error("Failed to approve redemption:", error)
    },
  })
}

