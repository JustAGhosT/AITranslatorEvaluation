/**
 * Utility functions for handling numerical values consistently
 */

/**
 * Converts pixels to rem
 * @param px Pixel value
 * @param baseFontSize Base font size in pixels (default: 16)
 * @returns Rem value as string
 */
export function pxToRem(px: number, baseFontSize = 16): string {
  return `${px / baseFontSize}rem`
}

/**
 * Converts rem to pixels
 * @param rem Rem value
 * @param baseFontSize Base font size in pixels (default: 16)
 * @returns Pixel value as number
 */
export function remToPx(rem: number, baseFontSize = 16): number {
  return rem * baseFontSize
}

/**
 * Calculates a percentage value
 * @param part The part value
 * @param whole The whole value
 * @returns Percentage as string with % suffix
 */
export function percentage(part: number, whole: number): string {
  return `${(part / whole) * 100}%`
}

/**
 * Clamps a value between a minimum and maximum
 * @param value The value to clamp
 * @param min Minimum value
 * @param max Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Rounds a number to a specified precision
 * @param value The value to round
 * @param precision The precision (decimal places)
 * @returns Rounded value
 */
export function round(value: number, precision = 0): number {
  const multiplier = Math.pow(10, precision)
  return Math.round(value * multiplier) / multiplier
}

/**
 * Calculates a value based on viewport width
 * @param minSize Minimum size in pixels
 * @param maxSize Maximum size in pixels
 * @param minWidth Minimum viewport width in pixels
 * @param maxWidth Maximum viewport width in pixels
 * @returns CSS calc function as string
 */
export function fluidSize(minSize: number, maxSize: number, minWidth = 320, maxWidth = 1280): string {
  const slope = (maxSize - minSize) / (maxWidth - minWidth)
  const yAxisIntersection = -minWidth * slope + minSize

  return `clamp(${minSize}px, ${yAxisIntersection}px + ${slope * 100}vw, ${maxSize}px)`
}

/**
 * Creates a CSS cubic-bezier function
 * @param x1 First control point x value
 * @param y1 First control point y value
 * @param x2 Second control point x value
 * @param y2 Second control point y value
 * @returns CSS cubic-bezier function as string
 */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number): string {
  return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`
}

/**
 * Predefined easing functions
 */
export const easings = {
  linear: "linear",
  easeIn: cubicBezier(0.4, 0, 1, 1),
  easeOut: cubicBezier(0, 0, 0.2, 1),
  easeInOut: cubicBezier(0.4, 0, 0.2, 1),
  // Additional custom easings
  easeInQuad: cubicBezier(0.55, 0.085, 0.68, 0.53),
  easeOutQuad: cubicBezier(0.25, 0.46, 0.45, 0.94),
  easeInOutQuad: cubicBezier(0.455, 0.03, 0.515, 0.955),
}

/**
 * Converts a color to rgba format
 * @param r Red component (0-255)
 * @param g Green component (0-255)
 * @param b Blue component (0-255)
 * @param a Alpha component (0-1)
 * @returns RGBA color as string
 */
export function rgba(r: number, g: number, b: number, a: number): string {
  // Ensure values are within valid ranges
  const validR = clamp(Math.round(r), 0, 255)
  const validG = clamp(Math.round(g), 0, 255)
  const validB = clamp(Math.round(b), 0, 255)
  const validA = clamp(a, 0, 1)

  return `rgba(${validR}, ${validG}, ${validB}, ${validA})`
}

/**
 * Calculates aspect ratio dimensions
 * @param width Width value
 * @param ratio Aspect ratio as string (e.g., "16:9")
 * @returns Height value
 */
export function aspectRatioHeight(width: number, ratio: string): number {
  const [w, h] = ratio.split(":").map(Number)
  return (width * h) / w
}
