import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { challengeApi } from "./api"
import { JoinChallengeRequest, GetMySubmissionsParams } from "./types"
import { useCampaigns } from "../campaign"
import type { GetCampaignsParams } from "../campaign/types"

/**
 * React Query hooks for challenge operations (Creator side)
 */

// Query keys
export const challengeKeys = {
  all: ["challenge"] as const,
  submissions: () => [...challengeKeys.all, "submissions"] as const,
  mySubmissions: (params?: GetMySubmissionsParams) =>
    [...challengeKeys.all, "submissions", "mine", params] as const,
  available: (params?: GetCampaignsParams) =>
    [...challengeKeys.all, "available", params] as const,
}

/**
 * Get available challenges query
 * 
 * NOTE: Backend doesn't have a dedicated GET /challenges endpoint yet.
 * This wraps the campaigns endpoint (GET /campaigns) since campaigns ARE challenges
 * from the creator's perspective. See BACKEND_MISSING_ENDPOINTS.md line 145-196.
 * 
 * When backend adds GET /challenges/available, we can update this hook.
 */
export const useAvailableChallenges = (params?: GetCampaignsParams) => {
  // Default to only showing open campaigns (available to join)
  const queryParams: GetCampaignsParams = {
    ...params,
    status: params?.status || "open",
  }
  
  return useCampaigns(queryParams)
}

/**
 * Get my submissions query
 */
export const useMySubmissions = (params?: GetMySubmissionsParams) => {
  return useQuery({
    queryKey: challengeKeys.mySubmissions(params),
    queryFn: () => challengeApi.getMySubmissions(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Join challenge mutation
 */
export const useJoinChallenge = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      challengeId,
      data,
    }: {
      challengeId: number
      data: JoinChallengeRequest
    }) => challengeApi.joinChallenge(challengeId, data),
    onSuccess: (response) => {
      // Invalidate submissions list
      queryClient.invalidateQueries({ queryKey: challengeKeys.submissions() })

      console.log("Challenge joined:", response.message)

      // Redirect to challenges page
      router.push("/challenges")
    },
    onError: (error: any) => {
      console.error("Failed to join challenge:", error)
    },
  })
}

/**
 * Redeem reward mutation
 */
export const useRedeemReward = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (challengeId: number) => challengeApi.redeemReward(challengeId),
    onSuccess: (response) => {
      // Invalidate submissions to update status
      queryClient.invalidateQueries({ queryKey: challengeKeys.submissions() })

      console.log("Reward redemption requested:", response.message)
    },
    onError: (error: any) => {
      console.error("Failed to redeem reward:", error)
    },
  })
}

/**
 * Approve redemption mutation (Brand side)
 */
export const useApproveRedemption = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (redemptionId: number) =>
      challengeApi.approveRedemption(redemptionId),
    onSuccess: (response) => {
      // Invalidate campaign redemptions
      queryClient.invalidateQueries({ queryKey: ["campaign", "redemptions"] })

      console.log("Redemption approved:", response.message)
    },
    onError: (error: any) => {
      console.error("Failed to approve redemption:", error)
    },
  })
}

