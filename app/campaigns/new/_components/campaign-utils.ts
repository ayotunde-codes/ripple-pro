import type { CampaignFormData } from "./campaign-schema"
import type { CreateCampaignRequest } from "@/services/campaign"

/**
 * Transform form data to API request format
 */
export function transformCampaignToAPI(
  formData: CampaignFormData
): CreateCampaignRequest {
  // Parse asset links (comma or newline separated)
  const assetLinks = formData.assetLinks
    ? formData.assetLinks
        .split(/[,\n]/)
        .map((link) => link.trim())
        .filter(Boolean)
    : []

  return {
    campaign_name: formData.name,
    category: formData.category,
    content_type: formData.contentType,
    social_media_platforms: formData.platforms,
    challenge_pool: formData.budget,
    end_date: formData.endDate, // YYYY-MM-DD format
    reward_rate_amount: formData.rewardAmount,
    reward_rate_views: formData.viewsThreshold,
    max_payout: formData.maxPayout,
    asset_links: assetLinks,
    content_requirement: formData.requirements || "",
    additional_notes: formData.notes || "",
  }
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount)
}

