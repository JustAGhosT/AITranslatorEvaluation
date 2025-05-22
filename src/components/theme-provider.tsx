"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  // Ensure theme is applied after hydration to avoid mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Apply a class to the body to indicate the component is mounted
  useEffect(() => {
    if (mounted) {
      document.body.classList.add("theme-mounted")
    }
  }, [mounted])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="theme-preference"
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
