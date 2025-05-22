// import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
// import type { CartItem } from "../../types"

// interface CartState {
//   items: CartItem[]
//   subtotal: number
//   discount: number
//   total: number
// }

// const initialState: CartState = {
//   items: [],
//   subtotal: 0,
//   discount: 0,
//   total: 0,
// }

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const existingItem = state.items.find(
//         (item) => item.type === action.payload.type && item.vin === action.payload.vin,
//       )

//       if (!existingItem) {
//         state.items.push(action.payload)
//       }

//       // Recalculate totals
//       state.subtotal = state.items.reduce((sum, item) => sum + item.price, 0)
//       state.total = state.subtotal - state.discount
//     },
//     removeFromCart: (state, action: PayloadAction<{ type: string; vin: string }>) => {
//       state.items = state.items.filter(
//         (item) => !(item.type === action.payload.type && item.vin === action.payload.vin),
//       )

//       // Recalculate totals
//       state.subtotal = state.items.reduce((sum, item) => sum + item.price, 0)
//       state.total = state.subtotal - state.discount
//     },
//     applyDiscount: (state, action: PayloadAction<number>) => {
//       state.discount = action.payload
//       state.total = state.subtotal - state.discount
//     },
//     clearCart: (state) => {
//       state.items = []
//       state.subtotal = 0
//       state.discount = 0
//       state.total = 0
//     },
//   },
// })

// export const { addToCart, removeFromCart, applyDiscount, clearCart } = cartSlice.actions
// export default cartSlice.reducer

