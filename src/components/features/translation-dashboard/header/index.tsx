"use client"

import { useState } from "react"
import { Search, Bell, User, ChevronDown, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/src/components/theme-toggle"
import styles from "./header.module.css"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleResources = () => setIsResourcesOpen(!isResourcesOpen)
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo and Title */}
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <span className={styles.logoText}>TS</span>
            </div>
          </div>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Translation Service Analysis</h1>
            <p className={styles.subtitle}>Comprehensive comparison of leading translation providers</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <a href="#dashboard" className={`${styles.navLink} ${styles.active}`}>
            Dashboard
          </a>
          <a href="#providers" className={styles.navLink}>
            Providers
          </a>
          <a href="#reports" className={styles.navLink}>
            Reports
          </a>
          <div className={styles.dropdown}>
            <button className={styles.dropdownTrigger} onClick={toggleResources} aria-expanded={isResourcesOpen}>
              Resources
              <ChevronDown className={`${styles.chevron} ${isResourcesOpen ? styles.chevronOpen : ""}`} />
            </button>
            {isResourcesOpen && (
              <div className={styles.dropdownMenu}>
                <a href="#documentation" className={styles.dropdownItem}>
                  Documentation
                </a>
                <a href="#api" className={styles.dropdownItem}>
                  API Reference
                </a>
                <a href="#support" className={styles.dropdownItem}>
                  Support
                </a>
                <a href="#changelog" className={styles.dropdownItem}>
                  Changelog
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.actionButton} aria-label="Search">
            <Search size={18} />
          </button>
          <button className={styles.actionButton} aria-label="Notifications">
            <Bell size={18} />
            <span className={styles.notificationBadge}>3</span>
          </button>

          <div className={styles.userMenu}>
            <button className={styles.userButton} onClick={toggleUserMenu} aria-expanded={isUserMenuOpen}>
              <div className={styles.userAvatar}>
                <User size={16} />
              </div>
              <span className={styles.userName}>User</span>
              <ChevronDown className={`${styles.chevron} ${isUserMenuOpen ? styles.chevronOpen : ""}`} />
            </button>
            {isUserMenuOpen && (
              <div className={styles.userDropdown}>
                <div className={styles.userInfo}>
                  <div className={styles.userAvatarLarge}>
                    <User size={20} />
                  </div>
                  <div>
                    <div className={styles.userNameLarge}>John Doe</div>
                    <div className={styles.userEmail}>john@example.com</div>
                  </div>
                </div>
                <hr className={styles.divider} />
                <a href="#profile" className={styles.dropdownItem}>
                  Profile Settings
                </a>
                <a href="#preferences" className={styles.dropdownItem}>
                  Preferences
                </a>
                <a href="#billing" className={styles.dropdownItem}>
                  Billing
                </a>
                <hr className={styles.divider} />
                <a href="#logout" className={styles.dropdownItem}>
                  Sign Out
                </a>
              </div>
            )}
          </div>

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button className={styles.mobileMenuButton} onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={styles.mobileNav}>
          <div className={styles.mobileNavContent}>
            <a href="#dashboard" className={`${styles.mobileNavLink} ${styles.active}`}>
              Dashboard
            </a>
            <a href="#providers" className={styles.mobileNavLink}>
              Providers
            </a>
            <a href="#reports" className={styles.mobileNavLink}>
              Reports
            </a>
            <div className={styles.mobileDropdown}>
              <button className={styles.mobileDropdownTrigger} onClick={toggleResources}>
                Resources
                <ChevronDown className={`${styles.chevron} ${isResourcesOpen ? styles.chevronOpen : ""}`} />
              </button>
              {isResourcesOpen && (
                <div className={styles.mobileDropdownMenu}>
                  <a href="#documentation" className={styles.mobileDropdownItem}>
                    Documentation
                  </a>
                  <a href="#api" className={styles.mobileDropdownItem}>
                    API Reference
                  </a>
                  <a href="#support" className={styles.mobileDropdownItem}>
                    Support
                  </a>
                  <a href="#changelog" className={styles.mobileDropdownItem}>
                    Changelog
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
