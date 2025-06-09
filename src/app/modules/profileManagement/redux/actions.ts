import axios from "axios"
import authService from "../../auth/services/authService" // Add this import
import type { UserData, TeamMember } from "../types/index"
import { AppThunk } from "../../../core/store"

export const SET_ACTIVE_TAB = "settings/SET_ACTIVE_TAB"
export const UPDATE_USER_DATA = "settings/UPDATE_USER_DATA"
export const SUBMIT_NIN = "settings/SUBMIT_NIN"
export const SUBMIT_CAC = "settings/SUBMIT_CAC"
export const ADD_TEAM_MEMBER = "settings/ADD_TEAM_MEMBER"
export const UPDATE_TEAM_MEMBER = "settings/UPDATE_TEAM_MEMBER"
export const DELETE_TEAM_MEMBER = "settings/DELETE_TEAM_MEMBER"
export const UPDATE_PROFILE = "settings/UPDATE_PROFILE"
export const CREATE_SUB_ACCOUNT_START = "settings/CREATE_SUB_ACCOUNT_START"
export const CREATE_SUB_ACCOUNT_SUCCESS = "settings/CREATE_SUB_ACCOUNT_SUCCESS"
export const CREATE_SUB_ACCOUNT_ERROR = "settings/CREATE_SUB_ACCOUNT_ERROR"
export const FETCH_SUB_ACCOUNTS_START = "settings/FETCH_SUB_ACCOUNTS_START"
export const FETCH_SUB_ACCOUNTS_SUCCESS = "settings/FETCH_SUB_ACCOUNTS_SUCCESS"
export const FETCH_SUB_ACCOUNTS_ERROR = "settings/FETCH_SUB_ACCOUNTS_ERROR"
export const FETCH_SUB_ACCOUNT_DETAILS_START = 'settings/FETCH_SUB_ACCOUNT_DETAILS_START';
export const FETCH_SUB_ACCOUNT_DETAILS_SUCCESS = 'settings/FETCH_SUB_ACCOUNT_DETAILS_SUCCESS';
export const FETCH_SUB_ACCOUNT_DETAILS_ERROR = 'settings/FETCH_SUB_ACCOUNT_DETAILS_ERROR';

export const UPDATE_SUB_ACCOUNT_START = 'settings/UPDATE_SUB_ACCOUNT_START';
export const UPDATE_SUB_ACCOUNT_SUCCESS = 'settings/UPDATE_SUB_ACCOUNT_SUCCESS';
export const UPDATE_SUB_ACCOUNT_ERROR = 'settings/UPDATE_SUB_ACCOUNT_ERROR';

export const TOGGLE_SUB_ACCOUNT_STATUS_START = 'settings/TOGGLE_SUB_ACCOUNT_STATUS_START';
export const TOGGLE_SUB_ACCOUNT_STATUS_SUCCESS = 'settings/TOGGLE_SUB_ACCOUNT_STATUS_SUCCESS';
export const TOGGLE_SUB_ACCOUNT_STATUS_ERROR = 'settings/TOGGLE_SUB_ACCOUNT_STATUS_ERROR';

export const FETCH_HISTORY_START = 'settings/FETCH_HISTORY_START';
export const FETCH_HISTORY_SUCCESS = 'settings/FETCH_HISTORY_SUCCESS';
export const FETCH_HISTORY_ERROR = 'settings/FETCH_HISTORY_ERROR';


export const setActiveTab = (tab: string) => ({
  type: SET_ACTIVE_TAB,
  payload: tab,
})

export const updateUserData = (userData: Partial<UserData>) => ({
  type: UPDATE_USER_DATA,
  payload: userData,
})

export const submitNin = (nin: string) => ({
  type: SUBMIT_NIN,
  payload: nin,
})

export const addTeamMember = (member: TeamMember) => ({
  type: ADD_TEAM_MEMBER,
  payload: member,
})

export const updateTeamMember = (member: TeamMember) => ({
  type: UPDATE_TEAM_MEMBER,
  payload: member,
})

export const deleteTeamMember = (id: number) => ({
  type: DELETE_TEAM_MEMBER,
  payload: id,
})

export const fetchSubAccounts = () => async (dispatch: any) => {
  dispatch({ type: FETCH_SUB_ACCOUNTS_START })

  try {
    console.log("Calling API to fetch sub-accounts...")
    const members = await authService.listSubAccounts()
    console.log("API response - sub-accounts:", members)

    dispatch({
      type: FETCH_SUB_ACCOUNTS_SUCCESS,
      payload: members,
    })

    return members
  } catch (error: any) {
    console.error("Error fetching sub-accounts:", error)

    let errorMessage = "Failed to fetch sub-accounts"

    if (error?.response?.status === 401) {
      errorMessage = "Authentication failed. Please log in again."
    } else if (error?.response?.status === 403) {
      errorMessage = "You do not have permission to view team members."
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error?.message) {
      errorMessage = error.message
    }

    dispatch({
      type: FETCH_SUB_ACCOUNTS_ERROR,
      payload: errorMessage,
    })

    throw new Error(errorMessage)
  }
}

// Updated createSubAccount action creator in actions.ts
// Fixed version of the error handling section in createSubAccount
// Replace your createSubAccount action in actions.ts with this version:

export const createSubAccount = (subAccountData: {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role?: string;
}) => async (dispatch: any) => {
  dispatch({ type: CREATE_SUB_ACCOUNT_START });

  try {
    const response = await authService.createSubAccount(subAccountData);

    const newMember: TeamMember = {
      id: response.id,
      name: `${subAccountData.first_name} ${subAccountData.last_name}`,
      email: subAccountData.email,
      phone_number: subAccountData.phone_number || "",
      role: subAccountData.role || "Team Member",
      status: "Active",
      initials: `${subAccountData.first_name[0]}${subAccountData.last_name[0]}`.toUpperCase(),
      last_Login: "null",
    }

    dispatch({ type: CREATE_SUB_ACCOUNT_SUCCESS })
    dispatch(addTeamMember(newMember))

    return newMember
  } catch (error: any) {
    console.error("Raw API error:", error);
    
    // Dispatch the raw error to maintain all response data
    dispatch({
      type: CREATE_SUB_ACCOUNT_ERROR,
      payload: error
    });

    // Re-throw the original error with all its data
    throw error;
  }
};



export const fetchSubAccountDetails = (slug: string) => async (dispatch: any) => {
  dispatch({ type: FETCH_SUB_ACCOUNT_DETAILS_START });
  
  try {
    console.log("Fetching sub-account details for slug:", slug);
    const memberDetails = await authService.getSubAccountDetails(slug);
    console.log("API response - sub-account details:", memberDetails);
    
    dispatch({ 
      type: FETCH_SUB_ACCOUNT_DETAILS_SUCCESS,
      payload: memberDetails
    });
    
    return {
      type: FETCH_SUB_ACCOUNT_DETAILS_SUCCESS,
      payload: memberDetails
    };
  } catch (error: any) {
    console.error("Error fetching sub-account details:", error);
    
    let errorMessage = "Failed to fetch member details";
    
    if (error?.response?.status === 401) {
      errorMessage = "Authentication failed. Please log in again.";
    } else if (error?.response?.status === 403) {
      errorMessage = "You do not have permission to view this member.";
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error?.message) {
      errorMessage = error.message;
    }
    
    dispatch({
      type: FETCH_SUB_ACCOUNT_DETAILS_ERROR,
      payload: errorMessage,
    });
    
    throw new Error(errorMessage);
  }
};

export const updateSubAccount = (slug: string, updateData: {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role?: string;
}) => async (dispatch: any) => {
  dispatch({ type: UPDATE_SUB_ACCOUNT_START });
  
  try {
    const updatedMember = await authService.updateSubAccount(slug, updateData);
    dispatch({ 
      type: UPDATE_SUB_ACCOUNT_SUCCESS,
      payload: updatedMember
    });
    return updatedMember;
  } catch (error: any) {
    const errorMessage = error?.message || 'Failed to update sub-account';
    dispatch({ 
      type: UPDATE_SUB_ACCOUNT_ERROR,
      payload: errorMessage
    });
    throw error;
  }
};

export const toggleSubAccountStatus = (slug: string) => async (dispatch: any) => {
  dispatch({ type: TOGGLE_SUB_ACCOUNT_STATUS_START });
  
  try {
    console.log("Toggling status for sub-account:", slug);
    const result = await authService.toggleSubAccountStatus(slug);
    
    dispatch({ 
      type: TOGGLE_SUB_ACCOUNT_STATUS_SUCCESS,
      payload: { slug, is_active: result.is_active }
    });
    
    return result;
  } catch (error: any) {
    console.error("Error toggling sub-account status:", error);
    const errorMessage = error?.message || 'Failed to toggle sub-account status';
    
    dispatch({ 
      type: TOGGLE_SUB_ACCOUNT_STATUS_ERROR,
      payload: errorMessage
    });
    
    throw error;
  }
};

// Helper function to get auth token (extracted from authService)
const getAuthToken = (): string | null => {
  // First check for direct token
  const directToken = localStorage.getItem("authToken")
  if (directToken) {
    try {
      // If it's JSON, parse it (in case it was accidentally stringified)
      return JSON.parse(directToken)
    } catch (e) {
      // If it's not JSON, just return it as is
      return directToken
    }
  }

  // Then check token data object
  const StorageKeys = {
    TOKEN_DATA: 'token_data', // Adjust this to match your actual storage key
    USER_DATA: 'user_data'
  }
  
  const tokenDataStr = localStorage.getItem(StorageKeys.TOKEN_DATA)
  if (tokenDataStr) {
    try {
      const tokenData = JSON.parse(tokenDataStr)
      return tokenData?.access_token || null
    } catch (e) {
      console.error("Error parsing token data:", e)
      return null
    }
  }

  return null
}



export const fetchHistory = (): AppThunk => async (dispatch) => {
  dispatch({ type: FETCH_HISTORY_START });
  
  try {
    // Use the local getAuthToken helper function
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await axios.get('https://cvms-microservice.afripointdev.com/vin/vin-search-history/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const formattedData = response.data.vin_searches_history.map((item: any) => ({
      vin: item.vin,
      make: item.make || 'Unknown',
      date: new Date(item.created_at).toLocaleDateString(),
      status: item.status,
      created_at: item.created_at,
      // Include all certificate data
      model: item.model,
      vehicle_year: item.vehicle_year,
      engine_type: item.engine_type,
      vreg: item.vreg,
      vehicle_type: item.vehicle_type,
      origin_country: item.origin_country,
      payment_status: item.payment_status,
      qr_code_base64: item.qr_code_base64,
      ref_number: item.ref_number
    }));
    
    dispatch({
      type: FETCH_HISTORY_SUCCESS,
      payload: formattedData
    });
    
    return formattedData;
  } catch (error: any) {
    let errorMessage = 'Failed to fetch history data';
    
    if (error?.response?.status === 401) {
      errorMessage = 'Authentication failed. Please log in again.';
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error?.message) {
      errorMessage = error.message;
    }
    
    dispatch({
      type: FETCH_HISTORY_ERROR,
      payload: errorMessage
    });
    
    throw new Error(errorMessage);
  }
};