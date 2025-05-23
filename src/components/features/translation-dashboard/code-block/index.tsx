"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { useTheme } from "next-themes"
import { useMounted } from "../../../../hooks/use-mounted"
import styles from "./code-block.module.css"

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const isMounted = useMounted()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isMounted) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading code block...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      <div className={styles.header}>
        <span className={styles.language}>{language}</span>
        <button onClick={copyToClipboard} className={styles.copyButton} aria-label="Copy code" type="button">
          {copied ? <Check className={styles.checkIcon} /> : <Copy className={styles.copyIcon} />}
          <span className={styles.buttonText}>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre className={styles.pre}>
        <code className={styles.code}>{code}</code>
      </pre>
    </div>
  )
}
