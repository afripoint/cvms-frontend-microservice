import {
  SettingsState,
} from '../types/index';
import * as actions from './actions';

const initialState: SettingsState = {
  activeTab: 'History',
  userData: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    phone: '9120 374 371',
    accountType: 'Individual User',
    address: '10, Deji Makinde Street, Lagos State',
    nin: '',
    cac: '',
    profilePicture: null
  },
  walletData: {
    tier: 'SILVER',
    balance: '₦25,000',
    vinSearches: 23,
    vinSearchLimit: '(12 left)',
    transactions: [
     
      
    ]
  },
  historyData: [
   
    
    
    
  ],
  teamsData: [
    
    
    
  ],
  ninSubmitted: false,
  cacSubmitted: false,
  loading: {
    teamMembers: false,
    addingMember: false,
    updatingMember: false,
    togglingStatus: false,
    fetchingDetails: false,
    creatingSubAccount: false
  },
  errors: {
    teamMembers: null,
    addMember: null,
    updateMember: null,
    toggleStatus: null,
    fetchDetails: null,
    createSubAccount: null
  }
};

export default function settingsReducer(
  state = initialState,
  action: any
): SettingsState {
  switch (action.type) {
    case actions.SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };
      
    case actions.UPDATE_USER_DATA:
      return { 
        ...state, 
        userData: { ...state.userData, ...action.payload } 
      };
      
    case actions.SUBMIT_NIN:
      return { 
        ...state, 
        userData: { ...state.userData, nin: action.payload },
        ninSubmitted: true 
      };
      
    case actions.ADD_TEAM_MEMBER:
      return {
        ...state,
        teamsData: [...state.teamsData, action.payload],
        loading: {
          ...state.loading,
          addingMember: false
        },
        errors: {
          ...state.errors,
          addMember: null
        }
      };
      
    case 'ADD_TEAM_MEMBER_START':
      return {
        ...state,
        loading: {
          ...state.loading,
          addingMember: true
        }
      };
      
    case 'ADD_TEAM_MEMBER_ERROR':
      return {
        ...state,
        loading: {
          ...state.loading,
          addingMember: false
        },
        errors: {
          ...state.errors,
          addMember: action.payload
        }
      };
      
    case actions.UPDATE_TEAM_MEMBER:
      return { 
        ...state, 
        teamsData: state.teamsData.map(member => 
          member.id === action.payload.id ? action.payload : member
        ),
        loading: {
          ...state.loading,
          updatingMember: false
        },
        errors: {
          ...state.errors,
          updateMember: null
        }
      };
      
    case 'UPDATE_TEAM_MEMBER_START':
      return {
        ...state,
        loading: {
          ...state.loading,
          updatingMember: true
        }
      };
      
    case 'UPDATE_TEAM_MEMBER_ERROR':
      return {
        ...state,
        loading: {
          ...state.loading,
          updatingMember: false
        },
        errors: {
          ...state.errors,
          updateMember: action.payload
        }
      };
      
    case actions.DELETE_TEAM_MEMBER:
      return { 
        ...state, 
        teamsData: state.teamsData.filter(member => member.id !== action.payload),
        loading: {
          ...state.loading,
          togglingStatus: false
        },
        errors: {
          ...state.errors,
          toggleStatus: null
        }
      };
      
    case 'DELETE_TEAM_MEMBER_START':
      return {
        ...state,
        loading: {
          ...state.loading,
          togglingStatus: true
        }
      };
      
    case 'DELETE_TEAM_MEMBER_ERROR':
      return {
        ...state,
        loading: {
          ...state.loading,
          togglingStatus: false
        },
        errors: {
          ...state.errors,
          toggleStatus: action.payload
        }
      };
      
    // In reducer.ts, add these cases to your existing reducer
case actions.CREATE_SUB_ACCOUNT_START:
  return {
    ...state,
    loading: {
      ...state.loading,
      creatingSubAccount: true
    }
  };
  
case actions.CREATE_SUB_ACCOUNT_SUCCESS:
  return {
    ...state,
    loading: {
      ...state.loading,
      creatingSubAccount: false
    },
    errors: {
      ...state.errors,
      createSubAccount: null
    }
  };
  
case actions.CREATE_SUB_ACCOUNT_ERROR:
  return {
    ...state,
    loading: {
      ...state.loading,
      creatingSubAccount: false
    },
    errors: {
      ...state.errors,
      createSubAccount: action.payload
    }
  };



  // Add these cases to your switch statement
case actions.FETCH_SUB_ACCOUNTS_START:
  return {
    ...state,
    loading: {
      ...state.loading,
      teamMembers: true
    }
  };
  
case actions.FETCH_SUB_ACCOUNTS_SUCCESS:
  return {
    ...state,
    teamsData: action.payload,
    loading: {
      ...state.loading,
      teamMembers: false
    },
    errors: {
      ...state.errors,
      teamMembers: null
    }
  };
  
case actions.FETCH_SUB_ACCOUNTS_ERROR:
  return {
    ...state,
    loading: {
      ...state.loading,
      teamMembers: false
    },
    errors: {
      ...state.errors,
      teamMembers: action.payload
    }
  };


  // Add these cases to your reducer switch statement

case actions.FETCH_SUB_ACCOUNT_DETAILS_START:
  return {
    ...state,
    loading: {
      ...state.loading,
      fetchingDetails: true
    }
  };
  
case actions.FETCH_SUB_ACCOUNT_DETAILS_SUCCESS:
  return {
    ...state,
    loading: {
      ...state.loading,
      fetchingDetails: false
    },
    errors: {
      ...state.errors,
      fetchDetails: null
    }
  };
  
case actions.FETCH_SUB_ACCOUNT_DETAILS_ERROR:
  return {
    ...state,
    loading: {
      ...state.loading,
      fetchingDetails: false
    },
    errors: {
      ...state.errors,
      fetchDetails: action.payload
    }
  };

case actions.UPDATE_SUB_ACCOUNT_START:
  return {
    ...state,
    loading: {
      ...state.loading,
      updatingMember: true
    }
  };
  
case actions.UPDATE_SUB_ACCOUNT_SUCCESS:
  return {
    ...state,
    teamsData: state.teamsData.map(member => 
      member.slug === action.payload.slug ? action.payload : member
    ),
    loading: {
      ...state.loading,
      updatingMember: false
    },
    errors: {
      ...state.errors,
      updateMember: null
    }
  };
  
case actions.UPDATE_SUB_ACCOUNT_ERROR:
  return {
    ...state,
    loading: {
      ...state.loading,
      updatingMember: false
    },
    errors: {
      ...state.errors,
      updateMember: action.payload
    }
  };

case actions.TOGGLE_SUB_ACCOUNT_STATUS_START:
  return {
    ...state,
    loading: {
      ...state.loading,
      togglingStatus: true
    }
  };
  
case actions.TOGGLE_SUB_ACCOUNT_STATUS_SUCCESS:
  return {
    ...state,
    teamsData: state.teamsData.map(member => 
      member.slug === action.payload.slug 
        ? { ...member, status: action.payload.is_active ? 'Active' : 'Inactive' }
        : member
    ),
    loading: {
      ...state.loading,
      togglingStatus: false
    },
    errors: {
      ...state.errors,
      toggleStatus: null
    }
  };
  
case actions.TOGGLE_SUB_ACCOUNT_STATUS_ERROR:
  return {
    ...state,
    loading: {
      ...state.loading,
      togglingStatus: false
    },
    errors: {
      ...state.errors,
      toggleStatus: action.payload
    }
  };
      
    default:
      return state;
  }
}