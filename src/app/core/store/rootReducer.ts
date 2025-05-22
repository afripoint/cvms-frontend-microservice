import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../../modules/auth/redux/slices/authSlice"
import passwordResetReducer from "../../modules/auth/redux/slices/passwordResetSlice"
import uiReducer from "../../modules/auth/redux/slices/uiSlice"
import vinReducer from "../../modules/vin/redux/slices/vinSlice"
import cartReducer from "../../modules/cart/redux/slices/cartSlice"
import reportReducer from "../../modules/report/redux/slices/certificateSlice"
import agencyReducer from "../../modules/accredify/redux/slices/agencySlice"
import trackingReducer from "../../modules/status-tracker/redux/slices/trackingSlice"
import settingsReducer from '../../modules/profileManagement/redux/reducer';

// Import our new reducers
// import fileReducer from "../../modules/profileManagement/redux/slices/fileSlice"
// import teamReducer from "../../modules/profileManagement/redux/slices/teamSlice"
// import walletReducer from "../../modules/profileManagement/redux/slices/walletSlice"
// import historyReducer from "../../modules/profileManagement/redux/slices/historySlice"

const rootReducer = combineReducers({
  // Existing reducers
  auth: authReducer,
  ui: uiReducer,
  passwordReset: passwordResetReducer,
  vin: vinReducer,
  cart: cartReducer,
  reports: reportReducer,
  agencies: agencyReducer,
  tracking: trackingReducer,
  settings: settingsReducer,
  

  // New reducers
  // files: fileReducer,
  // teams: teamReducer,
  // wallet: walletReducer,
  // history: historyReducer,
})

export default rootReducer
