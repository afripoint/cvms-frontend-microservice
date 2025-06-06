// // features/wallet/walletSlice.ts
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import axios from "axios"
// import { AppThunk, RootState } from "../../../../core/store"


// interface WalletState {
//   balance: number
//   isLoading: boolean
//   error: string | null
// }

// const initialState: WalletState = {
//   balance: 0,
//   isLoading: false,
//   error: null
// }

// export const fetchWalletBalance = createAsyncThunk(
//   'wallet/fetchBalance',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('https://cvms-microservice.afripointdev.com/vin/wallet-balance-detail/', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('access_token')}`
//         }
//       })
//       return response.data.balance as number
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         return rejectWithValue(error.response?.data?.message || 'Failed to fetch wallet balance')
//       }
//       return rejectWithValue('An unknown error occurred')
//     }
//   }
// )

// export const processWalletPayment = createAsyncThunk(
//   'wallet/processPayment',
//   async ({ amount, items }: { amount: number; items: string[] }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('https://cvms-microservice.afripointdev.com/vin/wallet-payment/', {
//         amount,
//         items
//       }, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('access_token')}`
//         }
//       })
//       return {
//         newBalance: response.data.new_balance as number,
//         reference: response.data.reference as string
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         return rejectWithValue(error.response?.data?.message || 'Payment failed')
//       }
//       return rejectWithValue('An unknown error occurred')
//     }
//   }
// )

// const walletSlice = createSlice({
//   name: 'wallet',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWalletBalance.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(fetchWalletBalance.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.balance = action.payload
//       })
//       .addCase(fetchWalletBalance.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload as string
//       })
//       .addCase(processWalletPayment.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(processWalletPayment.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.balance = action.payload.newBalance
//       })
//       .addCase(processWalletPayment.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload as string
//       })
//   }
// })

// // Thunk actions
// export const checkWalletBalance = (): AppThunk => async (dispatch) => {
//   await dispatch(fetchWalletBalance())
// }

// export const makeWalletPayment = (amount: number, items: string[]): AppThunk => async (dispatch) => {
//   await dispatch(processWalletPayment({ amount, items }))
// }

// // Selectors
// export const selectWallet = (state: RootState) => state.wallet

// export default walletSlice.reducer



// features/wallet/walletSlice.ts
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import axios from "axios"
// import { AppThunk, RootState } from "../../../../core/store"

// interface WalletState {
//   balance: number
//   isLoading: boolean
//   error: string | null
//   hasWallet: boolean // Add this property
// }

// const initialState: WalletState = {
//   balance: 0,
//   isLoading: false,
//   error: null,
//   hasWallet: false // Initialize as false
// }

// export const fetchWalletBalance = createAsyncThunk(
//   'wallet/fetchBalance',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('https://cvms-microservice.afripointdev.com/vin/wallet-balance-detail/', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('access_token')}`
//         }
//       })
//       return {
//         balance: response.data.balance as number,
//         hasWallet: true // Set to true when wallet data is successfully fetched
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         // If it's a 404 or wallet not found error, user doesn't have a wallet
//         if (error.response?.status === 404) {
//           return rejectWithValue({ message: 'Wallet not found', hasWallet: false })
//         }
//         return rejectWithValue({ message: error.response?.data?.message || 'Failed to fetch wallet balance', hasWallet: false })
//       }
//       return rejectWithValue({ message: 'An unknown error occurred', hasWallet: false })
//     }
//   }
// )

// export const processWalletPayment = createAsyncThunk(
//   'wallet/processPayment',
//   async ({ amount, items }: { amount: number; items: string[] }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('https://cvms-microservice.afripointdev.com/vin/wallet-payment/', {
//         amount,
//         items
//       }, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('access_token')}`
//         }
//       })
//       return {
//         newBalance: response.data.new_balance as number,
//         reference: response.data.reference as string
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         return rejectWithValue(error.response?.data?.message || 'Payment failed')
//       }
//       return rejectWithValue('An unknown error occurred')
//     }
//   }
// )

// const walletSlice = createSlice({
//   name: 'wallet',
//   initialState,
//   reducers: {
//     resetWalletState: (state) => {
//       state.balance = 0
//       state.hasWallet = false
//       state.error = null
//       state.isLoading = false
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWalletBalance.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(fetchWalletBalance.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.balance = action.payload.balance
//         state.hasWallet = action.payload.hasWallet
//       })
//       .addCase(fetchWalletBalance.rejected, (state, action) => {
//         state.isLoading = false
//         const payload = action.payload as any
//         if (typeof payload === 'object' && payload.hasWallet !== undefined) {
//           state.hasWallet = payload.hasWallet
//           state.error = payload.message
//         } else {
//           state.error = payload as string
//           state.hasWallet = false
//         }
//       })
//       .addCase(processWalletPayment.pending, (state) => {
//         state.isLoading = true
//         state.error = null
//       })
//       .addCase(processWalletPayment.fulfilled, (state, action) => {
//         state.isLoading = false
//         state.balance = action.payload.newBalance
//       })
//       .addCase(processWalletPayment.rejected, (state, action) => {
//         state.isLoading = false
//         state.error = action.payload as string
//       })
//   }
// })

// // Export actions
// export const { resetWalletState } = walletSlice.actions

// // Thunk actions
// export const checkWalletBalance = (): AppThunk => async (dispatch) => {
//   await dispatch(fetchWalletBalance())
// }

// export const makeWalletPayment = (amount: number, items: string[]): AppThunk => async (dispatch) => {
//   await dispatch(processWalletPayment({ amount, items }))
// }

// // Selectors
// export const selectWallet = (state: RootState) => state.wallet

// export default walletSlice.reducer


// features/wallet/walletSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { AppThunk, RootState } from "../../../../core/store"

interface WalletState {
  balance: number
  isLoading: boolean
  error: string | null
  hasWallet: boolean
}

const initialState: WalletState = {
  balance: 0,
  isLoading: false,
  error: null,
  hasWallet: false
}

export const fetchWalletBalance = createAsyncThunk(
  'wallet/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://cvms-microservice.afripointdev.com/vin/wallet-balance-detail/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      
      // If we get a successful response, the user has a wallet
      return {
        balance: response.data.wallet_balance || response.data.balance || 0,
        hasWallet: true
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Only set hasWallet to false for specific "wallet not found" errors
        if (error.response?.status === 404 || 
            error.response?.data?.message?.toLowerCase().includes('wallet not found') ||
            error.response?.data?.message?.toLowerCase().includes('no wallet')) {
          return rejectWithValue({ message: 'Wallet not found', hasWallet: false })
        }
        // For other errors, we can't determine wallet status
        return rejectWithValue({ 
          message: error.response?.data?.message || 'Failed to fetch wallet balance', 
          hasWallet: false 
        })
      }
      return rejectWithValue({ message: 'An unknown error occurred', hasWallet: false })
    }
  }
)

export const processWalletPayment = createAsyncThunk(
  'wallet/processPayment',
  async ({ amount, items }: { amount: number; items: string[] }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://cvms-microservice.afripointdev.com/vin/wallet-payment/', {
        amount,
        items
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      return {
        newBalance: response.data.new_balance as number,
        reference: response.data.reference as string
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Payment failed')
      }
      return rejectWithValue('An unknown error occurred')
    }
  }
)

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    resetWalletState: (state) => {
      state.balance = 0
      state.hasWallet = false
      state.error = null
      state.isLoading = false
    },
    // Add action to manually set wallet status if you have the data from elsewhere
    setWalletData: (state, action) => {
      state.balance = action.payload.balance || 0
      state.hasWallet = true
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletBalance.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchWalletBalance.fulfilled, (state, action) => {
        state.isLoading = false
        state.balance = action.payload.balance
        state.hasWallet = action.payload.hasWallet
        state.error = null
      })
      .addCase(fetchWalletBalance.rejected, (state, action) => {
        state.isLoading = false
        const payload = action.payload as any
        if (typeof payload === 'object' && payload.hasWallet !== undefined) {
          state.hasWallet = payload.hasWallet
          state.error = payload.message
        } else {
          state.error = payload as string
          state.hasWallet = false
        }
      })
      .addCase(processWalletPayment.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(processWalletPayment.fulfilled, (state, action) => {
        state.isLoading = false
        state.balance = action.payload.newBalance
      })
      .addCase(processWalletPayment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  }
})

// Export actions
export const { resetWalletState, setWalletData } = walletSlice.actions

// Thunk actions
export const checkWalletBalance = (): AppThunk => async (dispatch) => {
  await dispatch(fetchWalletBalance())
}

export const makeWalletPayment = (amount: number, items: string[]): AppThunk => async (dispatch) => {
  await dispatch(processWalletPayment({ amount, items }))
}

// Selectors
export const selectWallet = (state: RootState) => state.wallet

export default walletSlice.reducer