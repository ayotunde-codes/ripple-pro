import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { walletApi } from "./api"
import {
  InitializeFundingRequest,
  CompleteCreditRequest,
  WithdrawRequest,
} from "./types"

/**
 * React Query hooks for wallet operations
 */

// Query keys
export const walletKeys = {
  all: ["wallet"] as const,
  detail: (userId: number) => [...walletKeys.all, "detail", userId] as const,
  balance: (userId: number) => [...walletKeys.all, "balance", userId] as const,
}

/**
 * Get wallet details query
 */
export const useWallet = (userId: number) => {
  return useQuery({
    queryKey: walletKeys.detail(userId),
    queryFn: () => walletApi.getWallet(userId),
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!userId,
  })
}

/**
 * Initialize funding mutation
 * Returns Paystack authorization URL
 */
export const useInitializeFunding = () => {
  return useMutation({
    mutationFn: (data: InitializeFundingRequest) =>
      walletApi.initializeFunding(data),
    onSuccess: (response) => {
      if (response.success && response.data.data.authorization_url) {
        // Redirect to Paystack checkout
        window.location.href = response.data.data.authorization_url
      }
    },
    onError: (error: any) => {
      console.error("Failed to initialize funding:", error)
    },
  })
}

/**
 * Complete credit mutation
 * Called after Paystack redirect
 */
export const useCompleteCredit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CompleteCreditRequest) => walletApi.completeCredit(data),
    onSuccess: (response) => {
      // Invalidate wallet queries to refetch balance
      queryClient.invalidateQueries({ queryKey: walletKeys.all })
      console.log("Wallet credited:", response.message)
    },
    onError: (error: any) => {
      console.error("Failed to complete credit:", error)
    },
  })
}

/**
 * Withdraw mutation
 */
export const useWithdraw = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: WithdrawRequest) => walletApi.withdraw(data),
    onSuccess: (response) => {
      // Invalidate wallet queries to refetch balance
      queryClient.invalidateQueries({ queryKey: walletKeys.all })
      console.log("Withdrawal initiated:", response.message)
    },
    onError: (error: any) => {
      console.error("Withdrawal failed:", error)
    },
  })
}

