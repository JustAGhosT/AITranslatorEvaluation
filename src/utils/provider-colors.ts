// Completely redesigned provider colors with maximum visual distinction for both light and dark modes

export const providerColors = {
  // DeepL: Bright purple that stands out well in both modes
  deepl: "#8b5cf6", // Adjusted purple for better light mode visibility

  // Google: Adjusted blue for better light mode contrast
  google: "#3b82f6", // Standard blue that works in both modes

  // Microsoft: Using their signature green
  microsoft: "#16a34a", // Adjusted green for better light mode visibility

  // Azure: Using a distinct teal/cyan
  azure: "#0891b2", // Adjusted cyan for better light mode visibility

  // Amazon: Kept the orange/amber color but adjusted for light mode
  amazon: "#ea580c", // Adjusted orange for better light mode visibility

  // Default fallback
  all: "#8b5cf6", // Bright violet
}

// Light mode specific colors with better contrast
export const lightModeProviderColors = {
  deepl: "#7c3aed", // Darker purple for light mode
  google: "#2563eb", // Darker blue for light mode
  microsoft: "#16a34a", // Darker green for light mode
  azure: "#0e7490", // Darker cyan for light mode
  amazon: "#c2410c", // Darker orange for light mode
  all: "#7c3aed", // Darker violet for light mode
}

export function getProviderColor(provider: string, isDark = true): string {
  const providerKey = provider.toLowerCase() as keyof typeof providerColors
  if (!isDark && providerKey in lightModeProviderColors) {
    return lightModeProviderColors[providerKey as keyof typeof lightModeProviderColors]
  }
  return providerColors[providerKey] || "#888888"
}

// Color variations for charts and UI elements
export const getProviderColorWithOpacity = (provider: string, opacity: number, isDark = true): string => {
  const color = getProviderColor(provider, isDark)
  // Convert hex to rgba
  const r = Number.parseInt(color.slice(1, 3), 16)
  const g = Number.parseInt(color.slice(3, 5), 16)
  const b = Number.parseInt(color.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

// Get contrasting text color for provider background
export const getContrastTextColor = (provider: string, isDark = true): string => {
  const color = getProviderColor(provider, isDark)
  // Simple luminance calculation
  const r = Number.parseInt(color.slice(1, 3), 16)
  const g = Number.parseInt(color.slice(3, 5), 16)
  const b = Number.parseInt(color.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? "#111827" : "#f9fafb"
}

// Get a lighter version of the provider color for hover states
export const getLighterProviderColor = (provider: string, isDark = true): string => {
  const color = getProviderColor(provider, isDark)
  // Convert hex to HSL, increase lightness, convert back to hex
  const r = Number.parseInt(color.slice(1, 3), 16) / 255
  const g = Number.parseInt(color.slice(3, 5), 16) / 255
  const b = Number.parseInt(color.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
      default:
        h = 0
    }
    h /= 6
  }

  // Increase lightness for hover state
  l = Math.min(l + 0.15, 0.9)

  // Convert back to RGB
  let r1, g1, b1
  if (s === 0) {
    r1 = g1 = b1 = l // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r1 = hue2rgb(p, q, h + 1 / 3)
    g1 = hue2rgb(p, q, h)
    b1 = hue2rgb(p, q, h - 1 / 3)
  }

  // Convert to hex
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  return `#${toHex(r1)}${toHex(g1)}${toHex(b1)}`
}

// Get a darker version of the provider color for active states
export const getDarkerProviderColor = (provider: string, isDark = true): string => {
  const color = getProviderColor(provider, isDark)
  // Convert hex to HSL, decrease lightness, convert back to hex
  const r = Number.parseInt(color.slice(1, 3), 16) / 255
  const g = Number.parseInt(color.slice(3, 5), 16) / 255
  const b = Number.parseInt(color.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
      default:
        h = 0
    }
    h /= 6
  }

  // Decrease lightness for active state
  l = Math.max(l - 0.15, 0.1)

  // Convert back to RGB
  let r1, g1, b1
  if (s === 0) {
    r1 = g1 = b1 = l // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r1 = hue2rgb(p, q, h + 1 / 3)
    g1 = hue2rgb(p, q, h)
    b1 = hue2rgb(p, q, h - 1 / 3)
  }

  // Convert to hex
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  return `#${toHex(r1)}${toHex(g1)}${toHex(b1)}`
}

// Get a glow effect color for the provider
export const getProviderGlowColor = (provider: string, isDark = true): string => {
  return getProviderColorWithOpacity(provider, 0.5, isDark)
}
