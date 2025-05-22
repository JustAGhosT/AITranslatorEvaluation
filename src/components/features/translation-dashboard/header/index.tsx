"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Bell, User, ChevronDown, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/src/components/theme-toggle"
import styles from "./header.module.css"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const resourcesRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
        setIsResourcesOpen(false)
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleResources = () => {
    setIsResourcesOpen(!isResourcesOpen)
    setIsUserMenuOpen(false)
  }
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
    setIsResourcesOpen(false)
  }

  if (!mounted) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logoSection}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <span className={styles.logoText}>TS</span>
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <div className={styles.placeholder} />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        {/* Logo and Title */}
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <div className={styles.logoIcon} role="img" aria-label="Translation Service Logo">
              <span className={styles.logoText}>TS</span>
            </div>
          </div>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Translation Service Analysis</h1>
            <p className={styles.subtitle}>Comprehensive comparison of leading translation providers</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} role="navigation" aria-label="Main navigation">
          <a href="#dashboard" className={`${styles.navLink} ${styles.active}`} aria-current="page">
            Dashboard
          </a>
          <a href="#providers" className={styles.navLink}>
            Providers
          </a>
          <a href="#reports" className={styles.navLink}>
            Reports
          </a>
          <div className={styles.dropdown} ref={resourcesRef}>
            <button
              className={styles.dropdownTrigger}
              onClick={toggleResources}
              aria-expanded={isResourcesOpen}
              aria-haspopup="true"
              id="resources-button"
            >
              Resources
              <ChevronDown className={`${styles.chevron} ${isResourcesOpen ? styles.chevronOpen : ""}`} />
            </button>
            {isResourcesOpen && (
              <div className={styles.dropdownMenu} role="menu" aria-labelledby="resources-button">
                <a href="#documentation" className={styles.dropdownItem} role="menuitem">
                  Documentation
                </a>
                <a href="#api" className={styles.dropdownItem} role="menuitem">
                  API Reference
                </a>
                <a href="#support" className={styles.dropdownItem} role="menuitem">
                  Support
                </a>
                <a href="#changelog" className={styles.dropdownItem} role="menuitem">
                  Changelog
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.actionButton} aria-label="Search" title="Search">
            <Search size={18} />
          </button>
          <button className={styles.actionButton} aria-label="Notifications" title="Notifications">
            <Bell size={18} />
            <span className={styles.notificationBadge} aria-label="3 unread notifications">
              3
            </span>
          </button>

          <div className={styles.userMenu} ref={userMenuRef}>
            <button
              className={styles.userButton}
              onClick={toggleUserMenu}
              aria-expanded={isUserMenuOpen}
              aria-haspopup="true"
              id="user-menu-button"
            >
              <div className={styles.userAvatar} role="img" aria-label="User avatar">
                <User size={16} />
              </div>
              <span className={styles.userName}>User</span>
              <ChevronDown className={`${styles.chevron} ${isUserMenuOpen ? styles.chevronOpen : ""}`} />
            </button>
            {isUserMenuOpen && (
              <div className={styles.userDropdown} role="menu" aria-labelledby="user-menu-button">
                <div className={styles.userInfo}>
                  <div className={styles.userAvatarLarge} role="img" aria-label="User avatar">
                    <User size={20} />
                  </div>
                  <div>
                    <div className={styles.userNameLarge}>John Doe</div>
                    <div className={styles.userEmail}>john@example.com</div>
                  </div>
                </div>
                <hr className={styles.divider} />
                <a href="#profile" className={styles.dropdownItem} role="menuitem">
                  Profile Settings
                </a>
                <a href="#preferences" className={styles.dropdownItem} role="menuitem">
                  Preferences
                </a>
                <a href="#billing" className={styles.dropdownItem} role="menuitem">
                  Billing
                </a>
                <hr className={styles.divider} />
                <a href="#logout" className={styles.dropdownItem} role="menuitem">
                  Sign Out
                </a>
              </div>
            )}
          </div>

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={styles.mobileNav} id="mobile-navigation" role="navigation" aria-label="Mobile navigation">
          <div className={styles.mobileNavContent}>
            <a href="#dashboard" className={`${styles.mobileNavLink} ${styles.active}`} aria-current="page">
              Dashboard
            </a>
            <a href="#providers" className={styles.mobileNavLink}>
              Providers
            </a>
            <a href="#reports" className={styles.mobileNavLink}>
              Reports
            </a>
            <div className={styles.mobileDropdown}>
              <button
                className={styles.mobileDropdownTrigger}
                onClick={toggleResources}
                aria-expanded={isResourcesOpen}
                aria-haspopup="true"
              >
                Resources
                <ChevronDown className={`${styles.chevron} ${isResourcesOpen ? styles.chevronOpen : ""}`} />
              </button>
              {isResourcesOpen && (
                <div className={styles.mobileDropdownMenu} role="menu">
                  <a href="#documentation" className={styles.mobileDropdownItem} role="menuitem">
                    Documentation
                  </a>
                  <a href="#api" className={styles.mobileDropdownItem} role="menuitem">
                    API Reference
                  </a>
                  <a href="#support" className={styles.mobileDropdownItem} role="menuitem">
                    Support
                  </a>
                  <a href="#changelog" className={styles.mobileDropdownItem} role="menuitem">
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
