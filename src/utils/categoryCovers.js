/**
 * Category Cover Images Mapping
 * Maps each category to a beautiful default cover image from Unsplash
 * Used when writers don't upload their own cover photo
 */

export const categoryCovers = {
  Psychology: 'https://images.unsplash.com/photo-1554080221-cbf00ca7f540?w=1200&h=700&fit=crop',
  Life: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&h=700&fit=crop',
  Technology: 'https://images.unsplash.com/photo-1518611505868-d7f96e5d3874?w=1200&h=700&fit=crop',
  Philosophy: 'https://images.unsplash.com/photo-150784272343-583f20270319?w=1200&h=700&fit=crop',
  Health: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=700&fit=crop',
  Creativity: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=700&fit=crop',
  Relationships: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=700&fit=crop',
  Travel: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=700&fit=crop',
  Productivity: 'https://images.unsplash.com/photo-1484807352052-23338dacb34d?w=1200&h=700&fit=crop',
  Culture: 'https://images.unsplash.com/photo-1493514789560-586cb221b11d?w=1200&h=700&fit=crop',
  Ideas: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=700&fit=crop',
  Design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=700&fit=crop',
  Startup: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=700&fit=crop',
  Writing: 'https://images.unsplash.com/photo-1507842212617-53f50bb35e60?w=1200&h=700&fit=crop',
  Education: 'https://images.unsplash.com/photo-1427504494785-cdab38d3a5ca?w=1200&h=700&fit=crop',
  Finance: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=1200&h=700&fit=crop',
  Science: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=1200&h=700&fit=crop',
};

/**
 * Get cover image for a category
 * Returns default cover if category exists, fallback to general image
 */
export const getCoverImage = (category, userImage) => {
  // If user provided their own image, use it
  if (userImage) return userImage;
  
  // Otherwise use category default
  return categoryCovers[category] || categoryCovers.Ideas;
};
