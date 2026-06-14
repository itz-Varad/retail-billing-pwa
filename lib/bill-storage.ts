import type { BillItem } from "@/components/billing-form"

export interface SavedBill {
  id: string
  customerName: string
  items: BillItem[]
  total: number
  date: string
}

const STORAGE_KEY = "patil-electricals-bills"

export function saveBill(bill: SavedBill): void {
  const bills = getBills()
  bills.unshift(bill) // Add new bill at the beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bills))
}

export function getBills(): SavedBill[] {
  if (typeof window === "undefined") return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    return JSON.parse(stored) as SavedBill[]
  } catch {
    return []
  }
}

export function deleteBill(id: string): void {
  const bills = getBills()
  const filtered = bills.filter((bill) => bill.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function getBillById(id: string): SavedBill | undefined {
  const bills = getBills()
  return bills.find((bill) => bill.id === id)
}
