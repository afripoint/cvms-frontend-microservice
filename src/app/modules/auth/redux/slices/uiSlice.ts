// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface UiState {
//   currentStep: number;
//   showServiceModal: boolean;
// }

// const initialState: UiState = {
//   currentStep: 1,
//   showServiceModal: false
// };

// const uiSlice = createSlice({
//   name: 'ui',
//   initialState,
//   reducers: {
//     setCurrentStep: (state, action: PayloadAction<number>) => {
//       state.currentStep = action.payload;
//     },
//     nextStep: (state) => {
//       state.currentStep += 1;
//     },
//     previousStep: (state) => {
//       state.currentStep = Math.max(1, state.currentStep - 1);
//     },
//     setShowServiceModal: (state, action: PayloadAction<boolean>) => {
//       state.showServiceModal = action.payload;
//     }
//   }
// });

// export const { 
//   setCurrentStep, 
//   nextStep, 
//   previousStep, 
//   setShowServiceModal 
// } = uiSlice.actions;

// export default uiSlice.reducer;









import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UiState {
  currentStep: number
  showServiceModal: boolean
}

const initialState: UiState = {
  currentStep: 1,
  showServiceModal: false,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    nextStep: (state) => {
      state.currentStep += 1
    },
    previousStep: (state) => {
      state.currentStep = Math.max(1, state.currentStep - 1)
    },
    setShowServiceModal: (state, action: PayloadAction<boolean>) => {
      state.showServiceModal = action.payload
    },
  },
})

export const { setCurrentStep, nextStep, previousStep, setShowServiceModal } = uiSlice.actions

export default uiSlice.reducer

