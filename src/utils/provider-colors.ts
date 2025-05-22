import { rgba } from "./numeric-utils"

/**
 * Provider color definitions with standardized RGB values
 */
const PROVIDER_COLORS = {
  google: { r: 66, g: 133, b: 244 }, // #4285F4
  deepl: { r: 94, g: 114, b: 228 }, // #5e72e4
  azure: { r: 0, g: 120, b: 212 }, // #0078D4
  amazon: { r: 255, g: 153, b: 0 }, // #FF9900
  all: { r: 147, g: 51, b: 234 }, // #9333EA (purple-500)
  comparison: { r: 16, g: 185, b: 129 }, // #10B981 (green-500)
}

/**
 * Returns the color associated with a provider
 * @param provider The provider name
 * @returns The color as a hex string
 */
export function getProviderColor(provider: string): string {
  const color = PROVIDER_COLORS[provider.toLowerCase()]
  if (!color) return "#888888" // Default gray

  return rgbToHex(color.r, color.g, color.b)
}

/**
 * Returns the color associated with a provider with opacity
 * @param provider The provider name
 * @param opacity The opacity value (0-1)
 * @returns The color as an rgba string
 */
export function getProviderColorWithOpacity(provider: string, opacity: number): string {
  const color = PROVIDER_COLORS[provider.toLowerCase()]
  if (!color) return rgba(136, 136, 136, opacity) // Default gray

  return rgba(color.r, color.g, color.b, opacity)
}

/**
 * Returns the border class for a provider
 * @param provider The provider name
 * @returns The CSS class for the border
 */
export function getProviderBorderClass(provider: string): string {
  const color = getProviderColor(provider.toLowerCase())

  switch (provider.toLowerCase()) {
    case "google":
      return `border-l-4 border-l-[${color}]`
    case "deepl":
      return `border-l-4 border-l-[${color}]`
    case "azure":
      return `border-l-4 border-l-[${color}]`
    case "amazon":
      return `border-l-4 border-l-[${color}]`
    case "all":
      return "border-l-4 border-l-purple-500"
    case "comparison":
      return "border-l-4 border-l-green-500"
    default:
      return ""
  }
}

/**
 * Converts RGB values to a hex color string
 * @param r Red component (0-255)
 * @param g Green component (0-255)
 * @param b Blue component (0-255)
 * @returns Hex color string
 */
function rgbToHex(r: number, g: number, b: number): string {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

/**
 * Converts a single color component to hex
 * @param c Color component (0-255)
 * @returns Hex string
 */
function componentToHex(c: number): string {
  const hex = Math.max(0, Math.min(255, Math.round(c))).toString(16)
  return hex.length === 1 ? "0" + hex : hex
}
