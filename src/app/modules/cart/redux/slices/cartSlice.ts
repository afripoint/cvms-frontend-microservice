import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

// Cart Item Interface
export interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
  type: string
}

// Cart State Interface
interface CartState {
  items: CartItem[]
  totalPrice: number
  promoCode: string | null
  discount: number
}

// Initial State
const initialState: CartState = {
  items: [],
  totalPrice: 0,
  promoCode: null,
  discount: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }

      state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id)

      if (item) {
        item.quantity = action.payload.quantity
        state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
      }
    },
    clearCart: (state) => {
      state.items = []
      state.totalPrice = 0
      state.promoCode = null
      state.discount = 0
    },
    applyPromoCode: (state, action: PayloadAction<string>) => {
      // This is a simplified promo code handler
      // In a real app, you'd validate the promo code against a backend
      const validPromoCodes: { [key: string]: number } = {
        SAVE10: 500,
        FIRST50: 1000,
        WELCOME: 1500,
      }

      const promoCode = action.payload.toUpperCase()

      if (validPromoCodes[promoCode]) {
        state.promoCode = promoCode
        state.discount = validPromoCodes[promoCode]
      } else {
        state.promoCode = null
        state.discount = 0
      }
    },
    clearPromoCode: (state) => {
      state.promoCode = null
      state.discount = 0
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, applyPromoCode, clearPromoCode } =
  cartSlice.actions
export default cartSlice.reducer

