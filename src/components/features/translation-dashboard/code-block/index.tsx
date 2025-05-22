"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import styles from "./code-block.module.css"

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.container}>
      <div className={styles.copyButton}>
        <button onClick={copyToClipboard} className={styles.button} aria-label="Copy code" type="button">
          {copied ? <Check className={styles.checkIcon} /> : <Copy className={styles.copyIcon} />}
        </button>
      </div>
      <pre className={styles.pre}>
        <code>{code}</code>
      </pre>
    </div>
  )
}
