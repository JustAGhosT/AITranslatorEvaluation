"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  FileText,
  Code,
  MessageCircle,
} from "lucide-react"
import { useTheme } from "next-themes"

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const resourcesRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!mounted) {
    return null
  }

  const headerStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 50,
    width: "100%",
    backgroundColor: isDark ? "#111827" : "#ffffff",
    borderBottom: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease, border-color 0.3s ease",
  }

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 1.5rem",
    maxWidth: "1280px",
    margin: "0 auto",
  }

  const logoSectionStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  }

  const logoStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.5rem",
    height: "2.5rem",
    backgroundColor: "#4f46e5",
    borderRadius: "0.5rem",
    color: "#ffffff",
    fontWeight: 700,
    fontSize: "1.25rem",
  }

  const titleSectionStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
  }

  const titleStyle: React.CSSProperties = {
    fontSize: "1.125rem",
    fontWeight: 700,
    color: isDark ? "#f9fafb" : "#111827",
    margin: 0,
    transition: "color 0.3s ease",
  }

  const subtitleStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    color: isDark ? "#9ca3af" : "#6b7280",
    margin: 0,
    transition: "color 0.3s ease",
  }

  const desktopNavStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    marginLeft: "2rem",
  }

  const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
    fontSize: "0.875rem",
    fontWeight: 500,
    color: isActive ? (isDark ? "#60a5fa" : "#3b82f6") : isDark ? "#f9fafb" : "#111827",
    textDecoration: "none",
    transition: "color 0.2s ease",
  })

  const dropdownStyle: React.CSSProperties = {
    position: "relative",
  }

  const dropdownTriggerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: isDark ? "#f9fafb" : "#111827",
    background: "none",
    border: "none",
    padding: "0.25rem 0",
    cursor: "pointer",
    transition: "color 0.2s ease",
  }

  const dropdownMenuStyle: React.CSSProperties = {
    position: "absolute",
    top: "calc(100% + 0.5rem)",
    right: 0,
    width: "12rem",
    backgroundColor: isDark ? "#1f2937" : "#ffffff",
    borderRadius: "0.375rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
    padding: "0.5rem",
    zIndex: 10,
    transition: "background-color 0.3s ease, border-color 0.3s ease",
  }

  const dropdownItemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 0.75rem",
    fontSize: "0.875rem",
    color: isDark ? "#f9fafb" : "#111827",
    textDecoration: "none",
    borderRadius: "0.25rem",
    transition: "background-color 0.2s ease",
  }

  const actionsStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  }

  const actionButtonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2rem",
    height: "2rem",
    borderRadius: "0.375rem",
    backgroundColor: "transparent",
    color: isDark ? "#f9fafb" : "#111827",
    border: "none",
    cursor: "pointer",
    position: "relative",
    transition: "background-color 0.2s ease, color 0.2s ease",
  }

  const notificationBadgeStyle: React.CSSProperties = {
    position: "absolute",
    top: "-0.25rem",
    right: "-0.25rem",
    width: "1rem",
    height: "1rem",
    borderRadius: "9999px",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    fontSize: "0.625rem",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const userMenuStyle: React.CSSProperties = {
    position: "relative",
  }

  const userButtonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.25rem 0.5rem",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "0.375rem",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  }

  const userAvatarStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.75rem",
    height: "1.75rem",
    borderRadius: "9999px",
    backgroundColor: isDark ? "#374151" : "#e5e7eb",
    color: isDark ? "#f9fafb" : "#111827",
    transition: "background-color 0.3s ease, color 0.3s ease",
  }

  const userNameStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: isDark ? "#f9fafb" : "#111827",
    transition: "color 0.3s ease",
  }

  const chevronStyle = (isOpen: boolean): React.CSSProperties => ({
    transition: "transform 0.2s ease",
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
  })

  const userDropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "calc(100% + 0.5rem)",
    right: 0,
    width: "16rem",
    backgroundColor: isDark ? "#1f2937" : "#ffffff",
    borderRadius: "0.375rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
    padding: "0.75rem",
    zIndex: 10,
    transition: "background-color 0.3s ease, border-color 0.3s ease",
  }

  const userInfoStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.5rem 0.25rem",
  }

  const userAvatarLargeStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "9999px",
    backgroundColor: isDark ? "#374151" : "#e5e7eb",
    color: isDark ? "#f9fafb" : "#111827",
    transition: "background-color 0.3s ease, color 0.3s ease",
  }

  const userNameLargeStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: isDark ? "#f9fafb" : "#111827",
    transition: "color 0.3s ease",
  }

  const userEmailStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    color: isDark ? "#9ca3af" : "#6b7280",
    transition: "color 0.3s ease",
  }

  const dividerStyle: React.CSSProperties = {
    height: "1px",
    backgroundColor: isDark ? "#374151" : "#e5e7eb",
    border: "none",
    margin: "0.5rem 0",
    transition: "background-color 0.3s ease",
  }

  const mobileMenuButtonStyle: React.CSSProperties = {
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "0.375rem",
    backgroundColor: "transparent",
    color: isDark ? "#f9fafb" : "#111827",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease, color 0.2s ease",
  }

  const mobileNavStyle: React.CSSProperties = {
    display: "block",
    position: "fixed",
    top: "4rem",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isDark ? "rgba(17, 24, 39, 0.95)" : "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(4px)",
    zIndex: 40,
    transition: "background-color 0.3s ease",
  }

  const mobileNavContentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem",
    gap: "1rem",
  }

  const mobileNavLinkStyle = (isActive: boolean): React.CSSProperties => ({
    fontSize: "1rem",
    fontWeight: 500,
    color: isActive ? (isDark ? "#60a5fa" : "#3b82f6") : isDark ? "#f9fafb" : "#111827",
    textDecoration: "none",
    padding: "0.75rem 0",
    borderBottom: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
    transition: "color 0.2s ease, border-color 0.3s ease",
  })

  const mobileDropdownStyle: React.CSSProperties = {
    borderBottom: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
    transition: "border-color 0.3s ease",
  }

  const mobileDropdownTriggerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    fontSize: "1rem",
    fontWeight: 500,
    color: isDark ? "#f9fafb" : "#111827",
    background: "none",
    border: "none",
    padding: "0.75rem 0",
    cursor: "pointer",
    transition: "color 0.2s ease",
  }

  const mobileDropdownMenuStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "0.5rem 0 0.75rem 1rem",
  }

  const mobileDropdownItemStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    color: isDark ? "#d1d5db" : "#4b5563",
    textDecoration: "none",
    padding: "0.5rem 0",
    transition: "color 0.2s ease",
  }

  const mobileThemeToggleStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 0",
    borderBottom: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
    transition: "border-color 0.3s ease",
  }

  // Media query styles for mobile
  const mediaStyles = `
    @media (max-width: 768px) {
      .desktopNav {
        display: none;
      }
      .mobileMenuButton {
        display: flex;
      }
    }
  `

  return (
    <>
      <style>{mediaStyles}</style>
      <header style={headerStyle}>
        <div style={containerStyle}>
          {/* Logo Section */}
          <div style={logoSectionStyle}>
            <div style={logoStyle}>
              <span>T</span>
            </div>
            <div style={titleSectionStyle}>
              <h1 style={titleStyle}>Translation Dashboard</h1>
              <p style={subtitleStyle}>Analytics & Insights</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav style={desktopNavStyle} className="desktopNav">
            <a href="#" style={navLinkStyle(true)}>
              Dashboard
            </a>
            <a href="#" style={navLinkStyle(false)}>
              Reports
            </a>
            <a href="#" style={navLinkStyle(false)}>
              Settings
            </a>

            {/* Resources Dropdown */}
            <div style={dropdownStyle} ref={resourcesRef}>
              <button
                style={dropdownTriggerStyle}
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                aria-expanded={isResourcesOpen}
              >
                Resources
                <ChevronDown style={chevronStyle(isResourcesOpen)} size={16} />
              </button>
              {isResourcesOpen && (
                <div style={dropdownMenuStyle}>
                  <a href="#" style={dropdownItemStyle}>
                    <FileText size={16} />
                    Documentation
                  </a>
                  <a href="#" style={dropdownItemStyle}>
                    <Code size={16} />
                    API Reference
                  </a>
                  <a href="#" style={dropdownItemStyle}>
                    <MessageCircle size={16} />
                    Support
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Action Buttons */}
          <div style={actionsStyle}>
            <button style={actionButtonStyle} aria-label="Search">
              <Search size={20} />
            </button>

            <button style={actionButtonStyle} aria-label="Notifications">
              <Bell size={20} />
              <span style={notificationBadgeStyle}>3</span>
            </button>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* User Menu */}
            <div style={userMenuStyle} ref={userMenuRef}>
              <button
                style={userButtonStyle}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-expanded={isUserMenuOpen}
              >
                <div style={userAvatarStyle}>
                  <User size={16} />
                </div>
                <span style={userNameStyle}>John Doe</span>
                <ChevronDown style={chevronStyle(isUserMenuOpen)} size={16} />
              </button>

              {isUserMenuOpen && (
                <div style={userDropdownStyle}>
                  <div style={userInfoStyle}>
                    <div style={userAvatarLargeStyle}>
                      <User size={20} />
                    </div>
                    <div>
                      <div style={userNameLargeStyle}>John Doe</div>
                      <div style={userEmailStyle}>john.doe@example.com</div>
                    </div>
                  </div>
                  <hr style={dividerStyle} />
                  <a href="#" style={dropdownItemStyle}>
                    <User size={16} />
                    Profile
                  </a>
                  <a href="#" style={dropdownItemStyle}>
                    <Settings size={16} />
                    Settings
                  </a>
                  <a href="#" style={dropdownItemStyle}>
                    <HelpCircle size={16} />
                    Help
                  </a>
                  <hr style={dividerStyle} />
                  <a href="#" style={dropdownItemStyle}>
                    <LogOut size={16} />
                    Sign out
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              style={mobileMenuButtonStyle}
              className="mobileMenuButton"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div style={mobileNavStyle}>
          <div style={mobileNavContentStyle}>
            <a href="#" style={mobileNavLinkStyle(true)}>
              Dashboard
            </a>
            <a href="#" style={mobileNavLinkStyle(false)}>
              Reports
            </a>
            <a href="#" style={mobileNavLinkStyle(false)}>
              Settings
            </a>

            <div style={mobileDropdownStyle}>
              <button style={mobileDropdownTriggerStyle} onClick={() => setIsResourcesOpen(!isResourcesOpen)}>
                Resources
                <ChevronDown style={chevronStyle(isResourcesOpen)} size={16} />
              </button>
              {isResourcesOpen && (
                <div style={mobileDropdownMenuStyle}>
                  <a href="#" style={mobileDropdownItemStyle}>
                    Documentation
                  </a>
                  <a href="#" style={mobileDropdownItemStyle}>
                    API Reference
                  </a>
                  <a href="#" style={mobileDropdownItemStyle}>
                    Support
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Theme Toggle */}
            <div style={mobileThemeToggleStyle}>
              <span style={{ color: isDark ? "#f9fafb" : "#111827", transition: "color 0.3s ease" }}>Theme:</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
