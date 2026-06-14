"use client"

import { useState, useCallback, useEffect } from "react"
import { Header, type View } from "@/components/header"
import { BillingForm, type BillItem } from "@/components/billing-form"
import { InvoicePreview } from "@/components/invoice-preview"
import { BillHistory } from "@/components/bill-history"
import { ToastMessage } from "@/components/toast-message"
import {
  saveBill,
  getBills,
  deleteBill,
  type SavedBill,
} from "@/lib/bill-storage"

function generateInvoiceId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = "INV-"
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export default function BillingApp() {
  const [currentView, setCurrentView] = useState<View>("billing")
  const [customerName, setCustomerName] = useState("")
  const [items, setItems] = useState<BillItem[]>([])
  const [invoiceId, setInvoiceId] = useState("")
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date())
  const [showInvoiceTab, setShowInvoiceTab] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("Bill Generated Successfully!")
  const [savedBills, setSavedBills] = useState<SavedBill[]>([])

  // Load bills from localStorage on mount
  useEffect(() => {
    setSavedBills(getBills())
  }, [])

  const handleGenerateBill = useCallback(() => {
    const newInvoiceId = generateInvoiceId()
    const newDate = new Date()
    const total = items.reduce((sum, item) => sum + item.price, 0)

    // Save bill to localStorage
    const newBill: SavedBill = {
      id: newInvoiceId,
      customerName,
      items,
      total,
      date: newDate.toISOString(),
    }
    saveBill(newBill)
    setSavedBills(getBills())

    setInvoiceId(newInvoiceId)
    setInvoiceDate(newDate)
    setShowInvoiceTab(true)
    setCurrentView("invoice")
    setToastMessage("Bill Generated Successfully!")
    setShowToast(true)
  }, [customerName, items])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const handleNewBill = useCallback(() => {
    setCustomerName("")
    setItems([])
    setInvoiceId("")
    setShowInvoiceTab(false)
    setCurrentView("billing")
  }, [])

  const handleHideToast = useCallback(() => {
    setShowToast(false)
  }, [])

  const handleViewBill = useCallback((bill: SavedBill) => {
    setCustomerName(bill.customerName)
    setItems(bill.items)
    setInvoiceId(bill.id)
    setInvoiceDate(new Date(bill.date))
    setShowInvoiceTab(true)
    setCurrentView("invoice")
  }, [])

  const handleDeleteBill = useCallback((id: string) => {
    deleteBill(id)
    setSavedBills(getBills())
    setToastMessage("Bill Deleted")
    setShowToast(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        showInvoiceTab={showInvoiceTab}
      />

      <main className="mx-auto max-w-2xl px-4 py-6">
        {currentView === "billing" && (
          <BillingForm
            customerName={customerName}
            setCustomerName={setCustomerName}
            items={items}
            setItems={setItems}
            onGenerateBill={handleGenerateBill}
          />
        )}
        {currentView === "invoice" && (
          <InvoicePreview
            invoiceId={invoiceId}
            customerName={customerName}
            items={items}
            date={invoiceDate}
            onPrint={handlePrint}
            onNewBill={handleNewBill}
          />
        )}
        {currentView === "history" && (
          <BillHistory
            bills={savedBills}
            onViewBill={handleViewBill}
            onDeleteBill={handleDeleteBill}
          />
        )}
      </main>

      <ToastMessage
        message={toastMessage}
        show={showToast}
        onHide={handleHideToast}
      />
    </div>
  )
}
