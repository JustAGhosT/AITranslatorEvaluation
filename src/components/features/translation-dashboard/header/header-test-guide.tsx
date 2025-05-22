"use client"

import { useState } from "react"
import { Bell, ChevronDown, Menu, Search, User } from "lucide-react"
import { ThemeToggle } from "@/src/components/theme-toggle"
import styles from "./header.module.css"

export function HeaderTestGuide() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="rounded-lg border p-4">
        <h2 className="text-xl font-bold mb-4">Header Testing Guide</h2>
        <p className="mb-2">Follow these steps to test all header elements:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Verify the logo appears and has proper styling</li>
          <li>Check that the title and subtitle are visible and properly styled</li>
          <li>Test the theme toggle button (switches between light/dark mode)</li>
          <li>Click the notification bell icon</li>
          <li>Test the Resources dropdown menu</li>
          <li>Test the user profile dropdown menu</li>
          <li>Resize the browser to mobile width (&lt;768px) to test mobile menu</li>
        </ol>
      </div>

      <header className={styles.header}>
        <div className={styles.container}>
          {/* Logo Section */}
          <div className={styles.logoSection}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <span className={styles.logoText}>T</span>
              </div>
            </div>
            <div className={styles.titleSection}>
              <h1 className={styles.title}>Translation Dashboard</h1>
              <p className={styles.subtitle}>Analytics & Insights</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <a href="#" className={`${styles.navLink} ${styles.active}`}>
              Dashboard
            </a>
            <a href="#" className={styles.navLink}>
              Reports
            </a>
            <a href="#" className={styles.navLink}>
              Settings
            </a>

            {/* Resources Dropdown */}
            <div className={styles.dropdown}>
              <button
                className={styles.dropdownTrigger}
                onClick={() => setResourcesOpen(!resourcesOpen)}
                aria-expanded={resourcesOpen}
              >
                Resources
                <ChevronDown className={`${styles.chevron} ${resourcesOpen ? styles.chevronOpen : ""}`} />
              </button>

              {resourcesOpen && (
                <div className={styles.dropdownMenu}>
                  <a href="#" className={styles.dropdownItem}>
                    Documentation
                  </a>
                  <a href="#" className={styles.dropdownItem}>
                    API Reference
                  </a>
                  <a href="#" className={styles.dropdownItem}>
                    Support
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <button className={styles.actionButton} aria-label="Search">
              <Search size={20} />
            </button>

            <button className={styles.actionButton} aria-label="Notifications">
              <Bell size={20} />
              <span className={styles.notificationBadge}>3</span>
            </button>

            <ThemeToggle />

            {/* User Menu */}
            <div className={styles.userMenu}>
              <button
                className={styles.userButton}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-expanded={userMenuOpen}
              >
                <div className={styles.userAvatar}>
                  <User size={16} />
                </div>
                <span className={styles.userName}>Admin</span>
              </button>

              {userMenuOpen && (
                <div className={styles.userDropdown}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatarLarge}>
                      <User size={20} />
                    </div>
                    <div>
                      <div className={styles.userNameLarge}>Admin User</div>
                      <div className={styles.userEmail}>admin@example.com</div>
                    </div>
                  </div>

                  <hr className={styles.divider} />

                  <a href="#" className={styles.dropdownItem}>
                    Profile
                  </a>
                  <a href="#" className={styles.dropdownItem}>
                    Settings
                  </a>
                  <a href="#" className={styles.dropdownItem}>
                    Help
                  </a>
                  <hr className={styles.divider} />
                  <a href="#" className={styles.dropdownItem}>
                    Sign out
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={styles.mobileNav}>
            <div className={styles.mobileNavContent}>
              <a href="#" className={`${styles.mobileNavLink} ${styles.active}`}>
                Dashboard
              </a>
              <a href="#" className={styles.mobileNavLink}>
                Reports
              </a>
              <a href="#" className={styles.mobileNavLink}>
                Settings
              </a>

              <button
                className={styles.mobileDropdownTrigger}
                onClick={() => setResourcesOpen(!resourcesOpen)}
                aria-expanded={resourcesOpen}
              >
                Resources
                <ChevronDown className={resourcesOpen ? styles.chevronOpen : ""} />
              </button>

              {resourcesOpen && (
                <div className={styles.mobileDropdownMenu}>
                  <a href="#" className={styles.mobileDropdownItem}>
                    Documentation
                  </a>
                  <a href="#" className={styles.mobileDropdownItem}>
                    API Reference
                  </a>
                  <a href="#" className={styles.mobileDropdownItem}>
                    Support
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <div className="rounded-lg border p-4 mt-8">
        <h3 className="text-lg font-semibold mb-2">Expected Behaviors</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Logo should have a gradient background with a "T" in white</li>
          <li>Theme toggle should switch between light and dark modes</li>
          <li>Notification bell should show a red badge with "3"</li>
          <li>Resources dropdown should open/close when clicked</li>
          <li>User menu should show profile options when clicked</li>
          <li>On mobile, the hamburger menu should reveal navigation options</li>
          <li>All hover states should show subtle background changes</li>
        </ul>
      </div>
    </div>
  )
}
