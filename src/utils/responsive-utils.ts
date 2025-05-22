import { breakpoints } from "../styles/design-tokens"

/**
 * Creates a media query string for min-width
 * @param breakpoint Breakpoint name or value in pixels
 * @returns Media query string
 */
export function minWidth(breakpoint: keyof typeof breakpoints | number): string {
  const value = typeof breakpoint === "number" ? breakpoint : breakpoints[breakpoint]
  return `@media (min-width: ${value}px)`
}

/**
 * Creates a media query string for max-width
 * @param breakpoint Breakpoint name or value in pixels
 * @returns Media query string
 */
export function maxWidth(breakpoint: keyof typeof breakpoints | number): string {
  const value = typeof breakpoint === "number" ? breakpoint : breakpoints[breakpoint]
  return `@media (max-width: ${value - 0.1}px)`
}

/**
 * Creates a media query string for a range between two breakpoints
 * @param minBreakpoint Minimum breakpoint name or value in pixels
 * @param maxBreakpoint Maximum breakpoint name or value in pixels
 * @returns Media query string
 */
export function betweenWidths(
  minBreakpoint: keyof typeof breakpoints | number,
  maxBreakpoint: keyof typeof breakpoints | number,
): string {
  const minValue = typeof minBreakpoint === "number" ? minBreakpoint : breakpoints[minBreakpoint]
  const maxValue = typeof maxBreakpoint === "number" ? maxBreakpoint : breakpoints[maxBreakpoint]

  return `@media (min-width: ${minValue}px) and (max-width: ${maxValue - 0.1}px)`
}

/**
 * Creates a media query string for device orientation
 * @param orientation Device orientation
 * @returns Media query string
 */
export function orientation(orientation: "portrait" | "landscape"): string {
  return `@media (orientation: ${orientation})`
}

/**
 * Creates a media query string for high-resolution displays
 * @param dppx Device pixels per CSS pixel (default: 2)
 * @returns Media query string
 */
export function highDPI(dppx = 2): string {
  return `@media (min-resolution: ${dppx}dppx)`
}

/**
 * Creates a media query string for reduced motion preference
 * @returns Media query string
 */
export function prefersReducedMotion(): string {
  return "@media (prefers-reduced-motion: reduce)"
}

/**
 * Creates a media query string for dark mode preference
 * @returns Media query string
 */
export function prefersDarkMode(): string {
  return "@media (prefers-color-scheme: dark)"
}

/**
 * Creates a media query string for light mode preference
 * @returns Media query string
 */
export function prefersLightMode(): string {
  return "@media (prefers-color-scheme: light)"
}

/**
 * Creates a media query string for hover capability
 * @returns Media query string
 */
export function hasHoverCapability(): string {
  return "@media (hover: hover)"
}

/**
 * Creates a media query string for no hover capability
 * @returns Media query string
 */
export function noHoverCapability(): string {
  return "@media (hover: none)"
}
