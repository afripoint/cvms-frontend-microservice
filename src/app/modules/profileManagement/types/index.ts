// export type AccountType = 'Individual User' | 'Agent' | 'Company';
// export interface Transaction {
//     id: number;
//     type: string;
//     amount: string;
//     date: string;
//     status: 'Successful' | 'Failed';
//   }
  
//   export interface HistoryItem {
//     id: number;
//     type: string;
//     amount: string;
//     date: string;
//     status: 'Successful' | 'Failed';
//   }
  
//   // export interface TeamMember {
//   //   id: number;
//   //   name: string;
//   //   role: string;
//   //   email: string;
//   //   status: string;
//   //   lastLogin?: string;
//   //   initials?: string;
//   // }



//   export interface TeamMember {
//     id: number;
//     name: string;
//     role: string;
//     email: string;
//     phone?: string;
//     status: string;
//     lastLogin?: string;
//     initials?: string;
//   }
  
  
//   export interface UserData {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     accountType: AccountType;
//     address: string;
//     nin: string;
//     cac: string;
//     profilePicture: string | null;
//   }
  
//   export interface WalletData {
//     tier: string;
//     balance: string;
//     vinSearches: number;
//     vinSearchLimit: string;
//     transactions: Transaction[];
//   }
  
//   export interface SettingsState {
//     userData: UserData;
//     walletData: WalletData;
//     historyData: HistoryItem[];
//     teamsData: TeamMember[];
//     activeTab: string;
//     ninSubmitted: boolean;
//     cacSubmitted: boolean;
//   }




// export type AccountType = 'Individual User' | 'Agent' | 'Company';
// export interface Transaction {
//     id: number;
//     type: string;
//     amount: string;
//     date: string;
//     status: 'Successful' | 'Failed';
//   }
  
//   export interface HistoryItem {
//     id: number;
//     type: string;
//     amount: string;
//     date: string;
//     status: 'Successful' | 'Failed';
//   }
  
//   // export interface TeamMember {
//   //   id: number;
//   //   name: string;
//   //   role: string;
//   //   email: string;
//   //   status: string;
//   //   lastLogin?: string;
//   //   initials?: string;
//   // }



//   export interface TeamMember {
//     id: number;
//     name: string;
//     role: string;
//     email: string;
//     phone?: string;
//     status: string;
//     lastLogin?: string;
//     initials?: string;
//   }
  
  
//   export interface UserData {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     accountType: AccountType;
//     address: string;
//     nin: string;
//     cac: string;
//     profilePicture: string | null;
//   }
  
//   export interface WalletData {
//     tier: string;
//     balance: string;
//     vinSearches: number;
//     vinSearchLimit: string;
//     transactions: Transaction[];
//   }
  
//   export interface SettingsState {
//     userData: UserData;
//     walletData: WalletData;
//     historyData: HistoryItem[];
//     teamsData: TeamMember[];
//     activeTab: string;
//     ninSubmitted: boolean;
//     cacSubmitted: boolean;
//   }


export type AccountType = 'Individual User' | 'Agent' | 'Company';

  export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    accountType: AccountType;
    address: string;
    nin: string;
    cac: string;
    profilePicture: string | null;
  }
  
export interface WalletData {
  tier: string;
  balance: string;
  vinSearches: number;
  vinSearchLimit: string;
  transactions: Transaction[];
}

export interface Transaction {
  id: number;
  type: string;
  amount: string;
  date: string;
  status: string;
}

export interface HistoryItem {
  id: number;
  type: string;
  amount: string;
  date: string;
  status: string;
}

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin?: string;
  initials: string;
  slug?: string; // Added for API integration
}

export interface LoadingState {
  teamMembers: boolean;
  addingMember: boolean;
  updatingMember: boolean;
  togglingStatus: boolean;
  fetchingDetails: boolean;
}

export interface ErrorState {
  teamMembers: string | null;
  addMember: string | null;
  updateMember: string | null;
  toggleStatus: string | null;
  fetchDetails: string | null;
}

export interface SettingsState {
  activeTab: string;
  userData: UserData;
  walletData: WalletData;
  historyData: HistoryItem[];
  teamsData: TeamMember[];
  ninSubmitted: boolean;
  cacSubmitted: boolean;
  loading: LoadingState;
  errors: ErrorState;
}