import { duration, easing } from "../styles/design-tokens"
import { cubicBezier } from "./numeric-utils"

/**
 * Standard animation durations
 */
export const animationDuration = {
  extraFast: duration[75], // 75ms
  fast: duration[150], // 150ms
  normal: duration[300], // 300ms
  slow: duration[500], // 500ms
  extraSlow: duration[1000], // 1000ms
}

/**
 * Standard animation easings
 */
export const animationEasing = {
  linear: easing.linear,
  easeIn: easing.in,
  easeOut: easing.out,
  easeInOut: easing.inOut,
  // Additional custom easings
  bounce: cubicBezier(0.175, 0.885, 0.32, 1.275),
  elastic: cubicBezier(0.68, -0.55, 0.265, 1.55),
}

/**
 * Creates a CSS transition string
 * @param properties CSS properties to animate
 * @param durationValue Animation duration
 * @param easingValue Animation easing
 * @param delay Animation delay in ms
 * @returns CSS transition string
 */
export function transition(
  properties: string | string[],
  durationValue: keyof typeof animationDuration = "normal",
  easingValue: keyof typeof animationEasing = "easeInOut",
  delay = 0,
): string {
  const props = Array.isArray(properties) ? properties.join(", ") : properties
  const duration = animationDuration[durationValue]
  const easing = animationEasing[easingValue]
  const delayStr = delay > 0 ? ` ${delay}ms` : ""

  return `${props} ${duration} ${easing}${delayStr}`
}

/**
 * Creates a CSS animation string
 * @param name Animation name
 * @param durationValue Animation duration
 * @param easingValue Animation easing
 * @param delay Animation delay in ms
 * @param iterationCount Animation iteration count
 * @param direction Animation direction
 * @param fillMode Animation fill mode
 * @returns CSS animation string
 */
export function animation(
  name: string,
  durationValue: keyof typeof animationDuration = "normal",
  easingValue: keyof typeof animationEasing = "easeInOut",
  delay = 0,
  iterationCount: number | "infinite" = 1,
  direction: "normal" | "reverse" | "alternate" | "alternate-reverse" = "normal",
  fillMode: "none" | "forwards" | "backwards" | "both" = "none",
): string {
  const duration = animationDuration[durationValue]
  const easing = animationEasing[easingValue]
  const delayStr = delay > 0 ? ` ${delay}ms` : ""

  return `${name} ${duration} ${easing}${delayStr} ${iterationCount} ${direction} ${fillMode}`
}

/**
 * Creates a CSS transform string
 * @param transforms Object with transform properties
 * @returns CSS transform string
 */
export function transform(transforms: {
  translateX?: string | number
  translateY?: string | number
  translateZ?: string | number
  scale?: number
  scaleX?: number
  scaleY?: number
  rotate?: string | number
  skewX?: string | number
  skewY?: string | number
}): string {
  const transformStrings = []

  if (transforms.translateX !== undefined) {
    const value = typeof transforms.translateX === "number" ? `${transforms.translateX}px` : transforms.translateX
    transformStrings.push(`translateX(${value})`)
  }

  if (transforms.translateY !== undefined) {
    const value = typeof transforms.translateY === "number" ? `${transforms.translateY}px` : transforms.translateY
    transformStrings.push(`translateY(${value})`)
  }

  if (transforms.translateZ !== undefined) {
    const value = typeof transforms.translateZ === "number" ? `${transforms.translateZ}px` : transforms.translateZ
    transformStrings.push(`translateZ(${value})`)
  }

  if (transforms.scale !== undefined) {
    transformStrings.push(`scale(${transforms.scale})`)
  }

  if (transforms.scaleX !== undefined) {
    transformStrings.push(`scaleX(${transforms.scaleX})`)
  }

  if (transforms.scaleY !== undefined) {
    transformStrings.push(`scaleY(${transforms.scaleY})`)
  }

  if (transforms.rotate !== undefined) {
    const value = typeof transforms.rotate === "number" ? `${transforms.rotate}deg` : transforms.rotate
    transformStrings.push(`rotate(${value})`)
  }

  if (transforms.skewX !== undefined) {
    const value = typeof transforms.skewX === "number" ? `${transforms.skewX}deg` : transforms.skewX
    transformStrings.push(`skewX(${value})`)
  }

  if (transforms.skewY !== undefined) {
    const value = typeof transforms.skewY === "number" ? `${transforms.skewY}deg` : transforms.skewY
    transformStrings.push(`skewY(${value})`)
  }

  return transformStrings.join(" ")
}
