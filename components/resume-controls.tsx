"use client"

import * as React from "react"
import { Printer, Shield } from "lucide-react"
import { useAdminStore } from "@/lib/store/admin-store"
import { ThemeToggle } from "./theme-toggle"

export function ResumeControls() {
  const { isAdminMode, toggleAdminMode } = useAdminStore()

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed top-4 right-4 print:hidden flex items-center gap-2">
      {/* Admin Mode Toggle */}
      <button
        onClick={toggleAdminMode}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          isAdminMode
            ? 'bg-primary text-primary-foreground'
            : 'bg-transparent hover:bg-muted text-foreground'
        }`}
        aria-label="Toggle admin mode"
        title={isAdminMode ? "Admin mode enabled" : "Admin mode disabled"}
      >
        <Shield className="h-4 w-4" />
      </button>

      {/* Print Button (only in admin mode) */}
      {isAdminMode && (
        <button
          onClick={handlePrint}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent hover:bg-muted text-foreground transition-colors"
          aria-label="Print resume"
          title="Print resume (Cmd+P)"
        >
          <Printer className="h-4 w-4" />
        </button>
      )}

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  )
}
