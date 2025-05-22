import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

interface TrackingState {
  trackingId: string
  trackingData: any | null
  searchHistory: string[]
  loading: boolean
  error: string | null
}

const initialState: TrackingState = {
  trackingId: "",
  trackingData: null,
  searchHistory: [],
  loading: false,
  error: null,
}

export const searchTracking = createAsyncThunk(
  "tracking/searchTracking",
  async (trackingId: string, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a delay and return mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demonstration, generate different vehicle details based on last character of ID
      const lastChar = trackingId.charAt(trackingId.length - 1)
      let vehicleDetails = {
        type: "Vehicle",
        description: "Red Mercedes Car"
      }
      
      // Generate different vehicle details based on tracking ID
      if (parseInt(lastChar) % 4 === 0) {
        vehicleDetails = {
          type: "Vehicle",
          description: "Red Mercedes Car"
        }
      } else if (parseInt(lastChar) % 4 === 1) {
        vehicleDetails = {
          type: "Vehicle",
          description: "Blue BMW Car"
        }
      } else if (parseInt(lastChar) % 4 === 2) {
        vehicleDetails = {
          type: "Vehicle",
          description: "Silver Toyota Car"
        }
      } else {
        vehicleDetails = {
          type: "Vehicle",
          description: "Black Ford Car"
        }
      }

      return {
        trackingId: trackingId,
        shipmentId: Math.floor(10000 + Math.random() * 90000).toString(),
        status: "In Route",
        currentStage: "Warehouse",
        sender: {
          name: "Automart Motors",
          address: "2234 Detroit Ave, Unit 17",
          city: "Appalachie",
          state: "ML",
          zip: "3561",
          country: "United States of America",
        },
        receiver: {
          name: "Habeebs Ltd",
          address: "27 Kofo Abayomi Drive",
          city: "Lekki Phase 1",
          state: "Lagos State",
          country: "Nigeria",
        },
        product: vehicleDetails,
      }
    } catch (error) {
      return rejectWithValue("Failed to fetch tracking information")
    }
  },
)

const trackingSlice = createSlice({
  name: "tracking",
  initialState,
  reducers: {
    clearTracking: (state) => {
      state.trackingId = ""
      state.trackingData = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTracking.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchTracking.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.trackingData = action.payload
        state.trackingId = action.payload.trackingId

        // Add to search history if not already there
        if (!state.searchHistory.includes(action.payload.trackingId)) {
          state.searchHistory.unshift(action.payload.trackingId)
          // Keep only the last 5 searches
          state.searchHistory = state.searchHistory.slice(0, 5)
        }
      })
      .addCase(searchTracking.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearTracking } = trackingSlice.actions
export default trackingSlice.reducer