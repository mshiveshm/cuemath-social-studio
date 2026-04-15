import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge classNames using clsx and tailwind-merge
 * Combines multiple classes and resolves Tailwind conflicts
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Get Tailwind gradient class based on gradient style id
 * Maps gradient1-gradient6 to predefined gradient combinations
 */
export function getGradientClass(gradientStyle: string): string {
  const gradients: Record<string, string> = {
    gradient1:
      "from-orange-500 via-orange-400 to-purple-500 bg-gradient-to-br",
    gradient2: "from-purple-600 via-purple-500 to-orange-500 bg-gradient-to-br",
    gradient3:
      "from-slate-900 via-purple-900 to-slate-800 bg-gradient-to-br",
    gradient4: "from-slate-50 via-gray-100 to-orange-50 bg-gradient-to-br",
    gradient5:
      "from-orange-400 via-yellow-300 to-orange-500 bg-gradient-to-br",
    gradient6:
      "from-purple-700 via-purple-600 to-pink-500 bg-gradient-to-br",
  };

  return gradients[gradientStyle] || gradients.gradient1;
}

/**
 * Get Tailwind layout classes based on layout style name
 * Returns appropriate flex/grid classes for different layout options
 */
export function getLayoutClass(layoutStyle: string): string {
  const layouts: Record<string, string> = {
    center: "flex items-center justify-center text-center",
    split: "grid grid-cols-2 gap-6 items-center",
    iconTop: "flex flex-col items-center text-center justify-start",
    bigText: "flex flex-col items-center justify-center text-center",
  };

  return layouts[layoutStyle] || layouts.center;
}

/**
 * Truncate text to a maximum length and add ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Format array of hashtags into a single space-separated string
 */
export function formatHashtags(hashtags: string[]): string {
  return hashtags.join(" ");
}
