/**
 * Services Index
 * Central export point for all services
 * 
 * Usage:
 * import { authApi, useLogin, campaignApi, useCampaigns } from '@/services'
 */

// Core
export { default as apiClient } from "./core/apiClient"

// Auth Service
export * from "./auth"

// Profile Service
export * from "./profile"

// Wallet Service
export * from "./wallet"

// Campaign Service
export * from "./campaign"

// Challenge Service
export * from "./challenge"

