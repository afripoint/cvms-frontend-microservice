import {
  SettingsState,
  // UserData,
  // WalletData,
  // HistoryItem,
  // TeamMember
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
      { 
        id: 1, 
        type: 'Silver plan subscription purchase', 
        amount: '₦25,000', 
        date: '12/04/2025, 10:20 AM', 
        status: 'Successful' 
      },
      { 
        id: 2, 
        type: 'Silver plan subscription purchase', 
        amount: '₦25,000', 
        date: '12/04/2025, 10:20 AM', 
        status: 'Successful' 
      },
      { 
        id: 3, 
        type: 'Silver plan subscription purchase', 
        amount: '₦25,000', 
        date: '12/04/2025, 10:20 AM', 
        status: 'Failed' 
      }
    ]
  },
  historyData: [
    { 
      id: 1, 
      type: 'VIN Search - 87153873877901313', 
      amount: '₦25,000', 
      date: '12/04/2025, 10:20 AM',
      status: 'Successful'
    },
    { 
      id: 2, 
      type: 'VIN Search - 87153873877901313', 
      amount: '₦25,000', 
      date: '12/04/2025, 10:20 AM',
      status: 'Successful'
    },
    { 
      id: 3, 
      type: 'Accredify', 
      amount: '₦25,000', 
      date: '12/04/2025, 10:20 AM',
      status: 'Successful'
    },
    { 
      id: 4, 
      type: 'VIN Search - 87153873877901313', 
      amount: '₦25,000', 
      date: '12/04/2025, 10:20 AM',
      status: 'Failed'
    },
    { 
      id: 5, 
      type: 'VIN Search - 87153873877901313', 
      amount: '₦25,000', 
      date: '12/04/2025, 10:20 AM',
      status: 'Failed'
    }
  ],
  teamsData: [
    {
      id: 1,
      name: 'John Smith',
      role: 'Administrator',
      email: 'john.smith@example.com',
      phone: '803 456 7890',
      status: 'Active',
      lastLogin: 'Today, 10:30 AM',
      initials: 'JS'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Team Member',
      email: 'sarah.johnson@example.com',
      phone: '901 234 5678',
      status: 'Active',
      lastLogin: 'Yesterday, 2:45 PM',
      initials: 'SJ'
    },
    {
      id: 3,
      name: 'Michael Brown',
      role: 'Team Member',
      email: 'michael.brown@example.com',
      phone: '703 890 1234',
      status: 'Inactive',
      lastLogin: 'Last week',
      initials: 'MB'
    }
  ],
  ninSubmitted: false,
  cacSubmitted: false
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
      
    // case actions.SUBMIT_CAC:
    //   return { 
    //     ...state, 
    //     userData: { ...state.userData, cac: action.payload },
    //     cacSubmitted: true 
    //   };

      
      
      case actions.ADD_TEAM_MEMBER:
const newMember = {
  ...action.payload,
  id: Math.max(0, ...state.teamsData.map(m => m.id)) + 1,
  initials: action.payload.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase(),
  status: action.payload.status || 'Active'
};
return { 
  ...state, 
  teamsData: [...state.teamsData, newMember] 
};
      
    case actions.UPDATE_TEAM_MEMBER:
      return { 
        ...state, 
        teamsData: state.teamsData.map(member => 
          member.id === action.payload.id ? action.payload : member
        ) 
      };
      
      


    case actions.DELETE_TEAM_MEMBER:
      return { 
        ...state, 
        teamsData: state.teamsData.filter(member => member.id !== action.payload) 
      };
      
    default:
      return state;
  }
}