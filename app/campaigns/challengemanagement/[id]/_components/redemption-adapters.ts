import type { RedemptionRequest } from "@/services/campaign"

/**
 * Transform redemption request to creator format for UI compatibility
 */
export function transformRedemptionToCreator(redemption: RedemptionRequest) {
  return {
    id: redemption.id, // Use redemption ID for approve/decline
    name: `${redemption.user.first_name} ${redemption.user.last_name}`,
    email: redemption.user.email,
    // Social media links from challenge submission
    instagram: redemption.challenge.social_media_links[0],
    facebook: redemption.challenge.social_media_links[1],
    twitter: redemption.challenge.social_media_links[2],
    youtube: redemption.challenge.social_media_links[3],
    tiktok: redemption.challenge.social_media_links[4],
    views: redemption.challenge.views,
    reward: parseFloat(redemption.amount),
    status: redemption.status, // "pending" | "approved" | "rejected"
    earnings: redemption.challenge.earnings,
    dateEntered: redemption.challenge.date_entered,
    challengeStatus: redemption.challenge.status,
    // Original redemption for reference
    _redemption: redemption,
  }
}

/**
 * Transform array of redemptions to creators
 */
export function transformRedemptionsToCreators(redemptions: RedemptionRequest[]) {
  return redemptions.map(transformRedemptionToCreator)
}

