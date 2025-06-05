// index.ts
export interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
  type: string
  vin?: string
}

export interface Plan {
  name: string
  description: string
  price: string
  numericPrice: number
  subText: string
}

export type PaymentMethod = "oneTime" | "purchase" | "wallet"