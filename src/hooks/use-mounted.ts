"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook to handle component mounting state
 * Prevents hydration mismatch by only rendering after component is mounted
 *
 * @returns {boolean} isMounted - Whether the component is mounted
 */
export function useMounted(): boolean {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  return isMounted
}
