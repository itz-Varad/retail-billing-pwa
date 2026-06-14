"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface BillItem {
  id: string
  name: string
  price: number
}

interface BillingFormProps {
  customerName: string
  setCustomerName: (name: string) => void
  items: BillItem[]
  setItems: (items: BillItem[]) => void
  onGenerateBill: () => void
}

export function BillingForm({
  customerName,
  setCustomerName,
  items,
  setItems,
  onGenerateBill,
}: BillingFormProps) {
  const [itemName, setItemName] = useState("")
  const [itemPrice, setItemPrice] = useState("")

  const total = items.reduce((sum, item) => sum + item.price, 0)

  const handleAddItem = () => {
    if (!itemName.trim() || !itemPrice) return

    const newItem: BillItem = {
      id: crypto.randomUUID(),
      name: itemName.trim(),
      price: parseFloat(itemPrice),
    }

    setItems([...items, newItem])
    setItemName("")
    setItemPrice("")
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddItem()
    }
  }

  const canGenerateBill = customerName.trim() && items.length > 0

  return (
    <div className="space-y-6">
      {/* Customer Details */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground">
            Customer Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="h-12 text-base"
          />
        </CardContent>
      </Card>

      {/* Add Item */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground">
            Add Items
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onKeyDown={handleKeyPress}
              className="h-12 flex-1 text-base"
            />
            <Input
              type="number"
              placeholder="Price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              onKeyDown={handleKeyPress}
              min="0"
              step="0.01"
              className="h-12 w-full text-base sm:w-32"
            />
            <Button
              onClick={handleAddItem}
              disabled={!itemName.trim() || !itemPrice}
              className="h-12 gap-2 px-6"
            >
              <Plus className="h-5 w-5" />
              <span className="sm:hidden">Add Item</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Items List */}
      {items.length > 0 && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground">
              Items ({items.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg bg-muted/50 p-4"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.name}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-foreground">
                    ₹{item.price.toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.id)}
                    className="h-9 w-9 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-lg font-semibold text-foreground">
                Total
              </span>
              <span className="text-2xl font-bold text-primary">
                ₹{total.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generate Bill Button */}
      <Button
        onClick={onGenerateBill}
        disabled={!canGenerateBill}
        className="h-14 w-full text-lg font-semibold"
        size="lg"
      >
        Generate Bill
      </Button>
    </div>
  )
}
