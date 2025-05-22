export type AccountType = 'Individual User' | 'Agent' | 'Company';
export interface Transaction {
    id: number;
    type: string;
    amount: string;
    date: string;
    status: 'Successful' | 'Failed';
  }
  
  export interface HistoryItem {
    id: number;
    type: string;
    amount: string;
    date: string;
    status: 'Successful' | 'Failed';
  }
  
  // export interface TeamMember {
  //   id: number;
  //   name: string;
  //   role: string;
  //   email: string;
  //   status: string;
  //   lastLogin?: string;
  //   initials?: string;
  // }



  export interface TeamMember {
    id: number;
    name: string;
    role: string;
    email: string;
    phone?: string;
    status: string;
    lastLogin?: string;
    initials?: string;
  }
  
  
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
  
  export interface SettingsState {
    userData: UserData;
    walletData: WalletData;
    historyData: HistoryItem[];
    teamsData: TeamMember[];
    activeTab: string;
    ninSubmitted: boolean;
    cacSubmitted: boolean;
  }