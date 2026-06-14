"use client"

import { Printer, Plus, QrCode, Phone, MapPin, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { BillItem } from "./billing-form"

interface InvoicePreviewProps {
  invoiceId: string
  customerName: string
  items: BillItem[]
  date: Date
  onPrint: () => void
  onNewBill: () => void
}

export function InvoicePreview({
  invoiceId,
  customerName,
  items,
  date,
  onPrint,
  onNewBill,
}: InvoicePreviewProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0)

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="space-y-6">
      {/* Action Buttons - Hidden when printing */}
      <div className="no-print flex gap-3">
        <Button onClick={onPrint} className="h-12 flex-1 gap-2 text-base">
          <Printer className="h-5 w-5" />
          Print Bill
        </Button>
        <Button
          onClick={onNewBill}
          variant="outline"
          className="h-12 flex-1 gap-2 text-base"
        >
          <Plus className="h-5 w-5" />
          New Bill
        </Button>
      </div>

      {/* Invoice Card */}
      <Card className="invoice-container overflow-hidden">
        <div className="bg-primary px-6 py-6 text-center text-primary-foreground">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Store className="h-6 w-6" />
            <h1 className="text-xl font-bold">Patil Electricals & Appliances</h1>
          </div>
          <div className="flex items-center justify-center gap-1 text-sm opacity-90">
            <MapPin className="h-4 w-4" />
            <span>Main Market Road</span>
          </div>
          <div className="mt-1 flex items-center justify-center gap-1 text-sm opacity-90">
            <Phone className="h-4 w-4" />
            <span>9876543210</span>
          </div>
        </div>

        <div className="p-6">
          {/* Invoice Details */}
          <div className="mb-6 rounded-lg bg-muted/50 p-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Invoice No:</span>
                <p className="font-semibold text-foreground">{invoiceId}</p>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground">Date:</span>
                <p className="font-semibold text-foreground">
                  {formatDate(date)}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Customer:</span>
                <p className="font-semibold text-foreground">{customerName}</p>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground">Time:</span>
                <p className="font-semibold text-foreground">
                  {formatTime(date)}
                </p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between border-b border-border pb-2 text-sm font-semibold text-muted-foreground">
              <span>Item</span>
              <span>Price</span>
            </div>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-foreground"
                >
                  <span>
                    {index + 1}. {item.name}
                  </span>
                  <span className="font-medium">₹{item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="rounded-lg bg-primary/10 p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-foreground">
                Total Amount
              </span>
              <span className="text-2xl font-bold text-primary">
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="mt-6 flex flex-col items-center border-t border-dashed border-border pt-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/30">
              <QrCode className="h-12 w-12 text-muted-foreground/50" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Scan for payment
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 border-t border-border pt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Thank you for your purchase!
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Visit us again for all your electrical needs
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
