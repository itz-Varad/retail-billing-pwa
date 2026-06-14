"use client"

import { Zap, FileText, Receipt, History } from "lucide-react"
import { cn } from "@/lib/utils"

export type View = "billing" | "invoice" | "history"

interface HeaderProps {
  currentView: View
  onViewChange: (view: View) => void
  showInvoiceTab: boolean
}

export function Header({ currentView, onViewChange, showInvoiceTab }: HeaderProps) {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-foreground">
                Patil Electricals
              </h1>
              <p className="text-xs text-muted-foreground">Billing System</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 rounded-lg bg-muted p-1">
            <button
              onClick={() => onViewChange("billing")}
              className={cn(
                "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all",
                currentView === "billing"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <FileText className="h-4 w-4" />
              <span>New Bill</span>
            </button>
            {showInvoiceTab && (
              <button
                onClick={() => onViewChange("invoice")}
                className={cn(
                  "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all",
                  currentView === "invoice"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Receipt className="h-4 w-4" />
                <span>Invoice</span>
              </button>
            )}
            <button
              onClick={() => onViewChange("history")}
              className={cn(
                "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all",
                currentView === "history"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <History className="h-4 w-4" />
              <span>History</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
