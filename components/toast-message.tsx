"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastMessageProps {
  message: string
  show: boolean
  onHide: () => void
  duration?: number
}

export function ToastMessage({
  message,
  show,
  onHide,
  duration = 3000,
}: ToastMessageProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onHide, 300) // Wait for animation to complete
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration, onHide])

  if (!show && !visible) return null

  return (
    <div
      className={cn(
        "no-print fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
      )}
    >
      <div className="flex items-center gap-3 rounded-xl bg-foreground px-6 py-4 text-background shadow-lg">
        <CheckCircle2 className="h-5 w-5 text-green-400" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  )
}
