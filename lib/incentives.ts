/**
 * ME Incentives:
 * - Social Media Management: ₹100 (1st month), then ₹40/mo
 * - Meta Ads: ₹100 (1st month), then ₹40/mo
 * - Video Creation, Chatbot, GMB: ₹50 (1st month), then ₹20/mo
 * 
 * SM Incentives (from ME performance):
 * - Social Media Manager: ₹40 (1st month), then ₹20/mo
 * - Meta Ads: ₹40 (1st month), then ₹20/mo
 * - GMB, Video Creation, Chatbot: ₹30 (1st month), then ₹15/mo
 */

export const SERVICE_SLUGS = {
  SMM: ['social-media-management', 'social-media-manager'],
  META: ['meta-ads', 'facebook-ads', 'instagram-ads'],
  OTHER: ['video-creation', 'chatbot', 'gmb', 'video-shoot', 'google-maps-business']
};

export function calculateMEIncentive(serviceSlug: string, isFirstMonth: boolean) {
  const slug = serviceSlug.toLowerCase();
  
  if (SERVICE_SLUGS.SMM.some(s => slug.includes(s)) || SERVICE_SLUGS.META.some(s => slug.includes(s))) {
    return isFirstMonth ? 100 : 40;
  }
  
  if (SERVICE_SLUGS.OTHER.some(s => slug.includes(s))) {
    return isFirstMonth ? 50 : 20;
  }

  return 0;
}

export function calculateSMIncentive(serviceSlug: string, isFirstMonth: boolean) {
  const slug = serviceSlug.toLowerCase();
  
  if (SERVICE_SLUGS.SMM.some(s => slug.includes(s)) || SERVICE_SLUGS.META.some(s => slug.includes(s))) {
    return isFirstMonth ? 40 : 20;
  }
  
  if (SERVICE_SLUGS.OTHER.some(s => slug.includes(s))) {
    return isFirstMonth ? 30 : 15;
  }

  return 0;
}
