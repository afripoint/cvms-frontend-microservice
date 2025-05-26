

// import { authService } from "../../auth/services"
// import type { UserData, TeamMember } from "../types/index"

// export const SET_ACTIVE_TAB = "settings/SET_ACTIVE_TAB"
// export const UPDATE_USER_DATA = "settings/UPDATE_USER_DATA"
// export const SUBMIT_NIN = "settings/SUBMIT_NIN"
// export const SUBMIT_CAC = "settings/SUBMIT_CAC"
// export const ADD_TEAM_MEMBER = "settings/ADD_TEAM_MEMBER"
// export const UPDATE_TEAM_MEMBER = "settings/UPDATE_TEAM_MEMBER"
// export const DELETE_TEAM_MEMBER = "settings/DELETE_TEAM_MEMBER"
// export const UPDATE_PROFILE = "settings/UPDATE_PROFILE"
// export const CREATE_SUB_ACCOUNT_START = "settings/CREATE_SUB_ACCOUNT_START"
// export const CREATE_SUB_ACCOUNT_SUCCESS = "settings/CREATE_SUB_ACCOUNT_SUCCESS"
// export const CREATE_SUB_ACCOUNT_ERROR = "settings/CREATE_SUB_ACCOUNT_ERROR"
// export const FETCH_SUB_ACCOUNTS_START = "settings/FETCH_SUB_ACCOUNTS_START"
// export const FETCH_SUB_ACCOUNTS_SUCCESS = "settings/FETCH_SUB_ACCOUNTS_SUCCESS"
// export const FETCH_SUB_ACCOUNTS_ERROR = "settings/FETCH_SUB_ACCOUNTS_ERROR"
// export const FETCH_SUB_ACCOUNT_DETAILS_START = 'settings/FETCH_SUB_ACCOUNT_DETAILS_START';
// export const FETCH_SUB_ACCOUNT_DETAILS_SUCCESS = 'settings/FETCH_SUB_ACCOUNT_DETAILS_SUCCESS';
// export const FETCH_SUB_ACCOUNT_DETAILS_ERROR = 'settings/FETCH_SUB_ACCOUNT_DETAILS_ERROR';

// export const UPDATE_SUB_ACCOUNT_START = 'settings/UPDATE_SUB_ACCOUNT_START';
// export const UPDATE_SUB_ACCOUNT_SUCCESS = 'settings/UPDATE_SUB_ACCOUNT_SUCCESS';
// export const UPDATE_SUB_ACCOUNT_ERROR = 'settings/UPDATE_SUB_ACCOUNT_ERROR';

// export const TOGGLE_SUB_ACCOUNT_STATUS_START = 'settings/TOGGLE_SUB_ACCOUNT_STATUS_START';
// export const TOGGLE_SUB_ACCOUNT_STATUS_SUCCESS = 'settings/TOGGLE_SUB_ACCOUNT_STATUS_SUCCESS';
// export const TOGGLE_SUB_ACCOUNT_STATUS_ERROR = 'settings/TOGGLE_SUB_ACCOUNT_STATUS_ERROR';

// export const setActiveTab = (tab: string) => ({
//   type: SET_ACTIVE_TAB,
//   payload: tab,
// })

// export const updateUserData = (userData: Partial<UserData>) => ({
//   type: UPDATE_USER_DATA,
//   payload: userData,
// })

// export const submitNin = (nin: string) => ({
//   type: SUBMIT_NIN,
//   payload: nin,
// })

// export const addTeamMember = (member: TeamMember) => ({
//   type: ADD_TEAM_MEMBER,
//   payload: member,
// })

// export const updateTeamMember = (member: TeamMember) => ({
//   type: UPDATE_TEAM_MEMBER,
//   payload: member,
// })

// export const deleteTeamMember = (id: number) => ({
//   type: DELETE_TEAM_MEMBER,
//   payload: id,
// })

// // Enhanced fetchSubAccounts action with better error handling
// export const fetchSubAccounts = () => async (dispatch: any) => {
//   dispatch({ type: FETCH_SUB_ACCOUNTS_START })

//   try {
//     console.log("Calling API to fetch sub-accounts...")
//     const members = await authService.listSubAccounts()
//     console.log("API response - sub-accounts:", members)

//     dispatch({
//       type: FETCH_SUB_ACCOUNTS_SUCCESS,
//       payload: members,
//     })

//     return members
//   } catch (error: any) {
//     console.error("Error fetching sub-accounts:", error)

//     let errorMessage = "Failed to fetch sub-accounts"

//     if (error?.response?.status === 401) {
//       errorMessage = "Authentication failed. Please log in again."
//     } else if (error?.response?.status === 403) {
//       errorMessage = "You do not have permission to view team members."
//     } else if (error?.response?.data?.message) {
//       errorMessage = error.response.data.message
//     } else if (error?.message) {
//       errorMessage = error.message
//     }

//     dispatch({
//       type: FETCH_SUB_ACCOUNTS_ERROR,
//       payload: errorMessage,
//     })

//     throw new Error(errorMessage)
//   }
// }

// // Enhanced createSubAccount action
// export const createSubAccount =
//   (subAccountData: {
//     first_name: string
//     last_name: string
//     email: string
//     phone_number: string
//     role?: string
//   }) =>
//   async (dispatch: any) => {
//     dispatch({ type: CREATE_SUB_ACCOUNT_START })

//     try {
//       console.log("Creating sub-account with data:", subAccountData)
//       const response = await authService.createSubAccount(subAccountData)

//       const newMember: TeamMember = {
//         id: response.id,
//         name: `${subAccountData.first_name} ${subAccountData.last_name}`,
//         email: subAccountData.email,
//         phone_number: subAccountData.phone_number || "",
//         role: subAccountData.role || "Team Member",
//         status: "Active",
//         initials: `${subAccountData.first_name[0]}${subAccountData.last_name[0]}`.toUpperCase(),
//         lastLogin: "Never",
//       }

//       dispatch({ type: CREATE_SUB_ACCOUNT_SUCCESS })
//       dispatch(addTeamMember(newMember))

//       return newMember
//     } catch (error: any) {
//       console.error("Error creating sub-account:", error)

//       let errorMessage = "Failed to create sub-account"

//       if (error?.response?.status === 403) {
//         errorMessage = "You do not have permission to create sub-accounts."
//       } else if (error?.response?.data?.message) {
//         errorMessage = error.response.data.message
//       } else if (error?.message) {
//         errorMessage = error.message
//       }

//       dispatch({
//         type: CREATE_SUB_ACCOUNT_ERROR,
//         payload: errorMessage,
//       })

//       throw new Error(errorMessage)
//     }
//   }




// // Action to update sub-account
// export const updateSubAccount = (slug: string, updateData: {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   role?: string;
// }) => async (dispatch: any) => {
//   dispatch({ type: UPDATE_SUB_ACCOUNT_START });
  
//   try {
//     const updatedMember = await authService.updateSubAccount(slug, updateData);
//     dispatch({ 
//       type: UPDATE_SUB_ACCOUNT_SUCCESS,
//       payload: updatedMember
//     });
//     return updatedMember;
//   } catch (error: any) {
//     const errorMessage = error?.message || 'Failed to update sub-account';
//     dispatch({ 
//       type: UPDATE_SUB_ACCOUNT_ERROR,
//       payload: errorMessage
//     });
//     throw error;
//   }
// };

// // Action to toggle sub-account status
// export const toggleSubAccountStatus = (slug: string) => async (dispatch: any) => {
//   dispatch({ type: TOGGLE_SUB_ACCOUNT_STATUS_START });
  
//   try {
//     const result = await authService.toggleSubAccountStatus(slug);
//     dispatch({ 
//       type: TOGGLE_SUB_ACCOUNT_STATUS_SUCCESS,
//       payload: { slug, is_active: result.is_active }
//     });
//     return result;
//   } catch (error: any) {
//     const errorMessage = error?.message || 'Failed to toggle sub-account status';
//     dispatch({ 
//       type: TOGGLE_SUB_ACCOUNT_STATUS_ERROR,
//       payload: errorMessage
//     });
//     throw error;
//   }
// };

import { authService } from "../../auth/services"
import type { UserData, TeamMember } from "../types/index"

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

export const createSubAccount =
  (subAccountData: {
    first_name: string
    last_name: string
    email: string
    phone_number: string
    role?: string
  }) =>
  async (dispatch: any) => {
    dispatch({ type: CREATE_SUB_ACCOUNT_START })

    try {
      console.log("Creating sub-account with data:", subAccountData)
      const response = await authService.createSubAccount(subAccountData)

      const newMember: TeamMember = {
        id: response.id,
        name: `${subAccountData.first_name} ${subAccountData.last_name}`,
        email: subAccountData.email,
        phone_number: subAccountData.phone_number || "",
        role: subAccountData.role || "Team Member",
        status: "Active",
        initials: `${subAccountData.first_name[0]}${subAccountData.last_name[0]}`.toUpperCase(),
        lastLogin: "Never",
      }

      dispatch({ type: CREATE_SUB_ACCOUNT_SUCCESS })
      dispatch(addTeamMember(newMember))

      return newMember
    } catch (error: any) {
      console.error("Error creating sub-account:", error)

      let errorMessage = "Failed to create sub-account"

      if (error?.response?.status === 403) {
        errorMessage = "You do not have permission to create sub-accounts."
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error?.message) {
        errorMessage = error.message
      }

      dispatch({
        type: CREATE_SUB_ACCOUNT_ERROR,
        payload: errorMessage,
      })

      throw new Error(errorMessage)
    }
  }

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


// export const toggleSubAccountStatus = (slug: string) => async (dispatch: any) => {
//   dispatch({ type: TOGGLE_SUB_ACCOUNT_STATUS_START });
  
//   try {
//     const result = await authService.toggleSubAccountStatus(slug);
//     dispatch({ 
//       type: TOGGLE_SUB_ACCOUNT_STATUS_SUCCESS,
//       payload: { slug, is_active: result.is_active }
//     });
//     return result;
//   } catch (error: any) {
//     const errorMessage = error?.message || 'Failed to toggle sub-account status';
//     dispatch({ 
//       type: TOGGLE_SUB_ACCOUNT_STATUS_ERROR,
//       payload: errorMessage
//     });
//     throw error;
//   }
// };