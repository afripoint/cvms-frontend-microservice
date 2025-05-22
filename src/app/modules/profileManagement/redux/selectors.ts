// src/modules/settings/redux/selectors.ts

import { RootState } from "../../../core/store";


export const selectUserData = (state: RootState) => state.settings.userData;
export const selectWalletData = (state: RootState) => state.settings.walletData;
export const selectHistoryData = (state: RootState) => state.settings.historyData;
export const selectTeamsData = (state: RootState) => state.settings.teamsData;
export const selectActiveTab = (state: RootState) => state.settings.activeTab;
export const selectIsBusinessAccount = (state: RootState) => 
  state.settings.userData.accountType !== 'Individual User';
export const selectNinSubmitted = (state: RootState) => state.settings.ninSubmitted;
export const selectCacSubmitted = (state: RootState) => state.settings.cacSubmitted;