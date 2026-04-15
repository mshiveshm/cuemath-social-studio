// Brand configuration
export const BRAND = {
  colors: {
    primary: "#FF6B35",
    secondary: "#6B4EFF",
    dark: "#1A1A2E",
    white: "#FFFFFF",
    lightGray: "#F8F9FA",
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  name: "Cuemath",
  tagline: "Learn. Grow. Excel.",
  tone: "warm, educational, parent-focused",
};

// Content formats
export const FORMATS = [
  {
    id: "carousel",
    label: "Carousel",
    ratio: "4:5",
    description:
      "Multi-slide carousel format perfect for telling stories and educational sequences on Instagram",
    defaultSlideCount: 5,
  },
  {
    id: "post",
    label: "Instagram Post",
    ratio: "1:1",
    description: "Square format for standard Instagram feed posts with maximum visibility",
    defaultSlideCount: 1,
  },
  {
    id: "story",
    label: "Instagram Story",
    ratio: "9:16",
    description:
      "Full-screen vertical format for time-limited stories with high engagement potential",
    defaultSlideCount: 1,
  },
];

// Gradient style options
export const GRADIENT_STYLES = [
  {
    id: "warmSunset",
    name: "Warm Sunset",
    tailwindClass: "from-orange-500 via-orange-400 to-purple-500",
    textColor: "light",
  },
  {
    id: "purpleBlaze",
    name: "Purple Blaze",
    tailwindClass: "from-purple-600 via-purple-500 to-orange-500",
    textColor: "light",
  },
  {
    id: "darkMystery",
    name: "Dark Mystery",
    tailwindClass: "from-slate-900 via-purple-900 to-slate-800",
    textColor: "light",
  },
  {
    id: "softBreathe",
    name: "Soft Breathe",
    tailwindClass: "from-slate-50 via-gray-100 to-orange-50",
    textColor: "dark",
  },
  {
    id: "citrusVibe",
    name: "Citrus Vibe",
    tailwindClass: "from-orange-400 via-yellow-300 to-orange-500",
    textColor: "dark",
  },
  {
    id: "royalGlow",
    name: "Royal Glow",
    tailwindClass: "from-purple-700 via-purple-600 to-pink-500",
    textColor: "light",
  },
];

// Layout style options
export const LAYOUT_STYLES = [
  {
    id: "center",
    name: "Center",
    description: "Content centered with balanced spacing for focused messaging",
  },
  {
    id: "split",
    name: "Split",
    description: "Text on left side with image or visual on right for comparison",
  },
  {
    id: "iconTop",
    name: "Icon Top",
    description: "Icon or image at the top followed by headline and supporting text",
  },
  {
    id: "bigText",
    name: "Big Text",
    description: "Large headline as focal point with minimal supporting text below",
  },
];

// Slide count options
export const SLIDE_COUNT_OPTIONS = [3, 5, 7];
