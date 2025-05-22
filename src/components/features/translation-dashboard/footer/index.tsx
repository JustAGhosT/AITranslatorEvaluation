import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import styles from "./footer.module.css"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Translation Service Analysis</h3>
          <p className={styles.footerDescription}>
            Comprehensive analysis and comparison of leading translation service providers. Make informed decisions
            based on performance, accuracy, and cost metrics.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li>
              <Link href="/" className={styles.footerLink}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/providers" className={styles.footerLink}>
                Providers
              </Link>
            </li>
            <li>
              <Link href="/reports" className={styles.footerLink}>
                Reports
              </Link>
            </li>
            <li>
              <Link href="/documentation" className={styles.footerLink}>
                Documentation
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Resources</h4>
          <ul className={styles.footerLinks}>
            <li>
              <Link href="/api" className={styles.footerLink}>
                API
              </Link>
            </li>
            <li>
              <Link href="/support" className={styles.footerLink}>
                Support
              </Link>
            </li>
            <li>
              <Link href="/faq" className={styles.footerLink}>
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.footerLink}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Connect</h4>
          <div className={styles.socialLinks}>
            <Link href="https://github.com" className={styles.socialLink} aria-label="GitHub">
              <Github size={20} />
            </Link>
            <Link href="https://twitter.com" className={styles.socialLink} aria-label="Twitter">
              <Twitter size={20} />
            </Link>
            <Link href="https://linkedin.com" className={styles.socialLink} aria-label="LinkedIn">
              <Linkedin size={20} />
            </Link>
          </div>
          <p className={styles.footerContact}>
            Email:{" "}
            <a href="mailto:info@translation-analysis.com" className={styles.footerContactLink}>
              info@translation-analysis.com
            </a>
          </p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyright}>© {currentYear} Translation Service Analysis. All rights reserved.</p>
        <div className={styles.footerBottomLinks}>
          <Link href="/privacy" className={styles.footerBottomLink}>
            Privacy Policy
          </Link>
          <Link href="/terms" className={styles.footerBottomLink}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}
