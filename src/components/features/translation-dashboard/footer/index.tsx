"use client"

import { useState, useEffect, type CSSProperties } from "react"
import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { useTheme } from "next-themes"

export function Footer() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Footer styles
  const footerStyle: CSSProperties = {
    backgroundColor: isDark ? "#111827" : "#ffffff",
    borderTop: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
    padding: "3rem 2rem 1.5rem",
    transition: "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
  }

  const footerContentStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "2rem",
    maxWidth: "1280px",
    margin: "0 auto",
  }

  const footerSectionStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
  }

  const footerTitleStyle: CSSProperties = {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: isDark ? "#f9fafb" : "#111827",
    margin: "0 0 1rem",
    transition: "color 0.3s ease",
  }

  const footerDescriptionStyle: CSSProperties = {
    fontSize: "0.875rem",
    color: isDark ? "#d1d5db" : "#6b7280",
    margin: 0,
    lineHeight: 1.5,
    transition: "color 0.3s ease",
  }

  const footerHeadingStyle: CSSProperties = {
    fontSize: "1rem",
    fontWeight: 600,
    color: isDark ? "#f9fafb" : "#111827",
    margin: "0 0 1rem",
    transition: "color 0.3s ease",
  }

  const footerLinksStyle: CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  }

  const footerLinkStyle: CSSProperties = {
    fontSize: "0.875rem",
    color: isDark ? "#d1d5db" : "#6b7280",
    textDecoration: "none",
    transition: "color 0.2s ease",
  }

  const socialLinksStyle: CSSProperties = {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
  }

  const socialLinkStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2rem",
    height: "2rem",
    borderRadius: "9999px",
    backgroundColor: isDark ? "#374151" : "#f3f4f6",
    color: isDark ? "#f9fafb" : "#111827",
    transition: "background-color 0.2s ease, color 0.2s ease",
  }

  const footerContactStyle: CSSProperties = {
    fontSize: "0.875rem",
    color: isDark ? "#d1d5db" : "#6b7280",
    margin: 0,
    transition: "color 0.3s ease",
  }

  const footerContactLinkStyle: CSSProperties = {
    color: isDark ? "#60a5fa" : "#3b82f6",
    textDecoration: "none",
  }

  const footerBottomStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "1.5rem",
    marginTop: "2rem",
    borderTop: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
    maxWidth: "1280px",
    marginLeft: "auto",
    marginRight: "auto",
    transition: "border-color 0.3s ease",
  }

  const copyrightStyle: CSSProperties = {
    fontSize: "0.75rem",
    color: isDark ? "#9ca3af" : "#6b7280",
    margin: 0,
    transition: "color 0.3s ease",
  }

  const footerBottomLinksStyle: CSSProperties = {
    display: "flex",
    gap: "1.5rem",
  }

  const footerBottomLinkStyle: CSSProperties = {
    fontSize: "0.75rem",
    color: isDark ? "#9ca3af" : "#6b7280",
    textDecoration: "none",
    transition: "color 0.2s ease",
  }

  // Media query styles for responsive design
  const mediaStyles = `
    @media (max-width: 1024px) {
      .footerContent {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 640px) {
      .footer {
        padding: 2rem 1rem 1rem;
      }
      
      .footerContent {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .footerBottom {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
      
      .footerBottomLinks {
        gap: 1rem;
      }
    }
  `

  return (
    <>
      <style>{mediaStyles}</style>
      <footer style={footerStyle}>
        <div style={footerContentStyle} className="footerContent">
          <div style={footerSectionStyle}>
            <h3 style={footerTitleStyle}>Translation Service Analysis</h3>
            <p style={footerDescriptionStyle}>
              Comprehensive analysis and comparison of leading translation service providers. Make informed decisions
              based on performance, accuracy, and cost metrics.
            </p>
          </div>

          <div style={footerSectionStyle}>
            <h4 style={footerHeadingStyle}>Quick Links</h4>
            <ul style={footerLinksStyle}>
              <li>
                <Link
                  href="/"
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = isDark ? "#60a5fa" : "#3b82f6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isDark ? "#d1d5db" : "#6b7280"
                  }}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/providers"
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = isDark ? "#60a5fa" : "#3b82f6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isDark ? "#d1d5db" : "#6b7280"
                  }}
                >
                  Providers
                </Link>
              </li>
              <li>
                <Link
                  href="/reports"
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = isDark ? "#60a5fa" : "#3b82f6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isDark ? "#d1d5db" : "#6b7280"
                  }}
                >
                  Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation"
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = isDark ? "#60a5fa" : "#3b82f6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isDark ? "#d1d5db" : "#6b7280"
                  }}
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div style={footerSectionStyle}>
            <h4 style={footerHeadingStyle}>Resources</h4>
            <ul style={footerLinksStyle}>
              <li>
                <Link
                  href="/api"
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = isDark ? "#60a5fa" : "#3b82f6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isDark ? "#d1d5db" : "#6b7280"
                  }}
                >
                  API
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = isDark ? "#60a5fa" : "#3b82f6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isDark ? "#d1d5db" : "#6b7280"
                  }}
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = isDark ? "#60a5fa" : "#3b82f6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isDark ? "#d1d5db" : "#6b7280"
                  }}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = isDark ? "#60a5fa" : "#3b82f6"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isDark ? "#d1d5db" : "#6b7280"
                  }}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div style={footerSectionStyle}>
            <h4 style={footerHeadingStyle}>Connect</h4>
            <div style={socialLinksStyle}>
              <Link
                href="https://github.com"
                style={socialLinkStyle}
                aria-label="GitHub"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "#2563eb" : "#3b82f6"
                  e.currentTarget.style.color = "#ffffff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "#374151" : "#f3f4f6"
                  e.currentTarget.style.color = isDark ? "#f9fafb" : "#111827"
                }}
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                style={socialLinkStyle}
                aria-label="Twitter"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "#2563eb" : "#3b82f6"
                  e.currentTarget.style.color = "#ffffff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "#374151" : "#f3f4f6"
                  e.currentTarget.style.color = isDark ? "#f9fafb" : "#111827"
                }}
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                style={socialLinkStyle}
                aria-label="LinkedIn"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "#2563eb" : "#3b82f6"
                  e.currentTarget.style.color = "#ffffff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "#374151" : "#f3f4f6"
                  e.currentTarget.style.color = isDark ? "#f9fafb" : "#111827"
                }}
              >
                <Linkedin size={20} />
              </Link>
            </div>
            <p style={footerContactStyle}>
              Email:{" "}
              <a
                href="mailto:info@translation-analysis.com"
                style={footerContactLinkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = "underline"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = "none"
                }}
              >
                info@translation-analysis.com
              </a>
            </p>
          </div>
        </div>

        <div style={footerBottomStyle} className="footerBottom">
          <p style={copyrightStyle}>© {currentYear} Translation Service Analysis. All rights reserved.</p>
          <div style={footerBottomLinksStyle} className="footerBottomLinks">
            <Link
              href="/privacy"
              style={footerBottomLinkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = isDark ? "#60a5fa" : "#3b82f6"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isDark ? "#9ca3af" : "#6b7280"
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={footerBottomLinkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = isDark ? "#60a5fa" : "#3b82f6"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isDark ? "#9ca3af" : "#6b7280"
              }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
