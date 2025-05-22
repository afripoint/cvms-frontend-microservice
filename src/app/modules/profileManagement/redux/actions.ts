// src/modules/settings/redux/actions.ts
import {
  UserData,
  // WalletData,
  // HistoryItem,
  TeamMember,
  // SettingsState
} from '../types/index';


export const SET_ACTIVE_TAB = 'settings/SET_ACTIVE_TAB';
export const UPDATE_USER_DATA = 'settings/UPDATE_USER_DATA';
export const SUBMIT_NIN = 'settings/SUBMIT_NIN';
export const SUBMIT_CAC = 'settings/SUBMIT_CAC';
export const ADD_TEAM_MEMBER = 'settings/ADD_TEAM_MEMBER';
export const UPDATE_TEAM_MEMBER = 'settings/UPDATE_TEAM_MEMBER';
export const DELETE_TEAM_MEMBER = 'settings/DELETE_TEAM_MEMBER';
export const UPDATE_PROFILE = 'settings/UPDATE_PROFILE';

export const setActiveTab = (tab: string) => ({
  type: SET_ACTIVE_TAB,
  payload: tab
});

export const updateUserData = (userData: Partial<UserData>) => ({
  type: UPDATE_USER_DATA,
  payload: userData
});

export const submitNin = (nin: string) => ({
  type: SUBMIT_NIN,
  payload: nin
});

// export const submitCac = (cacFile: string) => ({
//   type: SUBMIT_CAC,
//   payload: cacFile
// });

export const addTeamMember = (member: Omit<TeamMember, 'id'>) => ({
  type: ADD_TEAM_MEMBER,
  payload: member
});

export const updateTeamMember = (member: TeamMember) => ({
  type: UPDATE_TEAM_MEMBER,
  payload: member
});

export const deleteTeamMember = (id: number) => ({
  type: DELETE_TEAM_MEMBER,
  payload: id
});

