import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { VehicleDetails } from "../../../vin"
import { cartService } from "../../service/cartService"
import { loadCartFromLocalStorage, saveCartToLocalStorage } from "../../storage/cartStorage"

// Cart Item Interface
export interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
  type: string
  vin?: string
}

// Cart State Interface
interface CartState {
  items: CartItem[]
  totalPrice: number
  promoCode: string | null
  discount: number
  isLoading: boolean
  error: string | null
  removingVin: string | null // Track which VIN is being removed
}

// Initial State
// const initialState: CartState = {
//   items: [],
//   totalPrice: 0,
//   promoCode: null,
//   discount: 0,
//   isLoading: false,
//   error: null,
//   removingVin: null,


// }




// Async thunk for adding VINs to cart via API
export const addVinsToCartAsync = createAsyncThunk(
  'cart/addVinsToCart',
  async (vehicles: VehicleDetails[], { rejectWithValue }) => {
    try {
      const response = await cartService.addVinsToCart(vehicles)
      
      if (!response.success) {
        return rejectWithValue(response.message)
      }
      
      // Convert vehicles to cart items for local state
      const cartItems: CartItem[] = vehicles.map(vehicle => ({
        id: vehicle.vin,
        name: `VIN: ${vehicle.vin}`,
        quantity: 1,
        price: 7500, // Standard price for CVMS report
        type: "CVMS Standard Report",
        vin: vehicle.vin,
      }))
      
      return { cartItems, apiResponse: response.data }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add VINs to cart')
    }
  }
)

// // Async thunk for removing VIN from cart via API
export const removeVinFromCartAsync = createAsyncThunk(
  'cart/removeVinFromCart',
  async (vin: string, { rejectWithValue }) => {
    try {
      const response = await cartService.removeVinFromCart(vin)
      
      if (!response.success) {
        return rejectWithValue(response.message)
      }
      
      return { vin, apiResponse: response.data }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to remove VIN from cart')
    }
  }
)

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const existingItem = state.items.find((item) => item.id === action.payload.id)

//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity
//       } else {
//         state.items.push(action.payload)
//       }

//       state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
//       state.error = null // Clear any previous errors
//     },
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter((item) => item.id !== action.payload)
//       state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
//     },
//     updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
//       const item = state.items.find((item) => item.id === action.payload.id)

//       if (item) {
//         item.quantity = action.payload.quantity
//         state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
//       }
//     },
//     clearCart: (state) => {
//       state.items = []
//       state.totalPrice = 0
//       state.promoCode = null
//       state.discount = 0
//       state.error = null
//       state.removingVin = null
//     },
//     clearError: (state) => {
//       state.error = null
//     },
//     applyPromoCode: (state, action: PayloadAction<string>) => {
//       // This is a simplified promo code handler
//       // In a real app, you'd validate the promo code against a backend
//       const validPromoCodes: { [key: string]: number } = {
//         SAVE10: 500,
//         FIRST50: 1000,
//         WELCOME: 1500,
//       }

//       const promoCode = action.payload.toUpperCase()

//       if (validPromoCodes[promoCode]) {
//         state.promoCode = promoCode
//         state.discount = validPromoCodes[promoCode]
//       } else {
//         state.promoCode = null
//         state.discount = 0
//       }
//     },
//     clearPromoCode: (state) => {
//       state.promoCode = null
//       state.discount = 0
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handle addVinsToCartAsync
//       .addCase(addVinsToCartAsync.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(addVinsToCartAsync.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.error = null
        
//         // Add the cart items to the state
//         action.payload.cartItems.forEach(cartItem => {
//           const existingItem = state.items.find((item) => item.id === cartItem.id)
          
//           if (existingItem) {
//             existingItem.quantity += cartItem.quantity
//           } else {
//             state.items.push(cartItem)
//           }
//         })
        
//         // Recalculate total price
//         state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
//       })
//       .addCase(addVinsToCartAsync.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload as string
//       })
//       // Handle removeVinFromCartAsync
//       .addCase(removeVinFromCartAsync.pending, (state, action) => {
//         state.removingVin = action.meta.arg
//         state.error = null
//       })
//       .addCase(removeVinFromCartAsync.fulfilled, (state, action) => {
//         state.removingVin = null
//         state.error = null
        
//         // Remove the VIN from local state
//         state.items = state.items.filter((item) => item.id !== action.payload.vin)
        
//         // Recalculate total price
//         state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
//       })
//       .addCase(removeVinFromCartAsync.rejected, (state, action) => {
//         state.removingVin = null
//         state.error = action.payload as string
//       })

      
//   },
// })

const persistedState = loadCartFromLocalStorage();
const initialState: CartState = persistedState || {
  items: [],
  totalPrice: 0,
  promoCode: null,
  discount: 0,
  isLoading: false,
  error: null,
  removingVin: null,
};

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
      state.error = null
      saveCartToLocalStorage(state); // Save to localStorage
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
      saveCartToLocalStorage(state); // Save to localStorage
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id)

      if (item) {
        item.quantity = action.payload.quantity
        state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
        saveCartToLocalStorage(state); // Save to localStorage
      }
    },
    clearCart: (state) => {
      state.items = []
      state.totalPrice = 0
      state.promoCode = null
      state.discount = 0
      state.error = null
      state.removingVin = null
      // saveCartToLocalStorage(state); // Save to localStorage
      localStorage.removeItem('cartState');
    },
    clearError: (state) => {
      state.error = null
    },
    applyPromoCode: (state, action: PayloadAction<string>) => {
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
      saveCartToLocalStorage(state); // Save to localStorage
    },
    clearPromoCode: (state) => {
      state.promoCode = null
      state.discount = 0
      saveCartToLocalStorage(state); // Save to localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addVinsToCartAsync.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addVinsToCartAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        
        action.payload.cartItems.forEach(cartItem => {
          const existingItem = state.items.find((item) => item.id === cartItem.id)
          
          if (existingItem) {
            existingItem.quantity += cartItem.quantity
          } else {
            state.items.push(cartItem)
          }
        })
        
        state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
        saveCartToLocalStorage(state); // Save to localStorage
      })
      .addCase(addVinsToCartAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(removeVinFromCartAsync.pending, (state, action) => {
        state.removingVin = action.meta.arg
        state.error = null
      })
      .addCase(removeVinFromCartAsync.fulfilled, (state, action) => {
        state.removingVin = null
        state.error = null
        
        state.items = state.items.filter((item) => item.id !== action.payload.vin)
        state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
        saveCartToLocalStorage(state); // Save to localStorage
      })
      .addCase(removeVinFromCartAsync.rejected, (state, action) => {
        state.removingVin = null
        state.error = action.payload as string
      })
  },
})



export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  clearError,
  applyPromoCode, 
  clearPromoCode 
} = cartSlice.actions

export default cartSlice.reducer



// const persistedState = loadCartFromLocalStorage();
// const initialState: CartState = persistedState || {
//   items: [],
//   totalPrice: 0,
//   promoCode: null,
//   discount: 0,
//   isLoading: false,
//   error: null,
//   removingVin: null,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const existingItem = state.items.find((item) => item.id === action.payload.id)

//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity
//       } else {
//         state.items.push(action.payload)
//       }

//       state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
//       state.error = null
//       saveCartToLocalStorage(state); // Save to localStorage
//     },
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter((item) => item.id !== action.payload)
//       state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
//       saveCartToLocalStorage(state); // Save to localStorage
//     },
//     updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
//       const item = state.items.find((item) => item.id === action.payload.id)

//       if (item) {
//         item.quantity = action.payload.quantity
//         state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
//         saveCartToLocalStorage(state); // Save to localStorage
//       }
//     },
//     clearCart: (state) => {
//       state.items = []
//       state.totalPrice = 0
//       state.promoCode = null
//       state.discount = 0
//       state.error = null
//       state.removingVin = null
//       saveCartToLocalStorage(state); // Save to localStorage
//     },
//     clearError: (state) => {
//       state.error = null
//     },
//     applyPromoCode: (state, action: PayloadAction<string>) => {
//       const validPromoCodes: { [key: string]: number } = {
//         SAVE10: 500,
//         FIRST50: 1000,
//         WELCOME: 1500,
//       }

//       const promoCode = action.payload.toUpperCase()

//       if (validPromoCodes[promoCode]) {
//         state.promoCode = promoCode
//         state.discount = validPromoCodes[promoCode]
//       } else {
//         state.promoCode = null
//         state.discount = 0
//       }
//       saveCartToLocalStorage(state); // Save to localStorage
//     },
//     clearPromoCode: (state) => {
//       state.promoCode = null
//       state.discount = 0
//       saveCartToLocalStorage(state); // Save to localStorage
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addVinsToCartAsync.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(addVinsToCartAsync.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.error = null
        
//         action.payload.cartItems.forEach(cartItem => {
//           const existingItem = state.items.find((item) => item.id === cartItem.id)
          
//           if (existingItem) {
//             existingItem.quantity += cartItem.quantity
//           } else {
//             state.items.push(cartItem)
//           }
//         })
        
//         state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
//         saveCartToLocalStorage(state); // Save to localStorage
//       })
//       .addCase(addVinsToCartAsync.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload as string
//       })
//       .addCase(removeVinFromCartAsync.pending, (state, action) => {
//         state.removingVin = action.meta.arg
//         state.error = null
//       })
//       .addCase(removeVinFromCartAsync.fulfilled, (state, action) => {
//         state.removingVin = null
//         state.error = null
        
//         state.items = state.items.filter((item) => item.id !== action.payload.vin)
//         state.totalPrice = state.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
//         saveCartToLocalStorage(state); // Save to localStorage
//       })
//       .addCase(removeVinFromCartAsync.rejected, (state, action) => {
//         state.removingVin = null
//         state.error = action.payload as string
//       })
//   },
// })