// export type AccountType = 'Individual User' | 'Agent' | 'Company';

// export interface UserData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   accountType: AccountType;
//   address: string;
//   nin: string;
//   cac: string;
//   profilePicture: string | null;
// }

// export interface WalletData {
//   tier: string;
//   balance: string;
//   vinSearches: number;
//   vinSearchLimit: string;
//   transactions: Transaction[];
// }

// export interface Transaction {
//   id: number;
//   type: string;
//   amount: string;
//   date: string;
//   status: string;
// }

// export interface HistoryItem {
//   vin: string;
//   make: string;
//   date: string;
//   status: string;
//   created_at: string; // Add this line
//   amount?: string; // Make this optional since it might not always be present
// }

// export interface TeamMember {
//   id: number;
//   name: string;
//   email: string;
//   phone_number: string;
//   role: string;
//   status: 'Active' | 'Inactive';
//   last_Login?: string;
//   initials: string;
//   slug?: string;
//   is_active?: boolean;
//   first_name?: string;
//   last_name?: string;
// }

// export interface LoadingState {
//   teamMembers: boolean;
//   addingMember: boolean;
//   updatingMember: boolean;
//   togglingStatus: boolean;
//   fetchingDetails: boolean;
//   creatingSubAccount: boolean;
//   history: boolean; // Add this
// }

// export interface ErrorState {
//   teamMembers: string | null;
//   addMember: string | null;
//   updateMember: string | null;
//   toggleStatus: string | null;
//   fetchDetails: string | null;
//   createSubAccount: string | null;
//   history: string | null; // Add this
// }

// export interface SettingsState {
//   activeTab: string;
//   userData: UserData;
//   walletData: WalletData;
//   historyData: HistoryItem[];
//   teamsData: TeamMember[];
//   ninSubmitted: boolean;
//   cacSubmitted: boolean;
//   loading: LoadingState;
//   errors: ErrorState;
// }





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
  vin: string;
  make: string;
  date: string;
  status: string;
  created_at: string;
  amount?: string;
  // Additional fields for certificate generation
  model?: string;
  vehicle_year?: string;
  engine_type?: string;
  vreg?: string;
  vehicle_type?: string;
  origin_country?: string;
  payment_status?: string;
  qr_code_base64?: string;
  ref_number?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  status: 'Active' | 'Inactive';
  last_Login?: string;
  initials: string;
  slug?: string;
  is_active?: boolean;
  first_name?: string;
  last_name?: string;
}

export interface LoadingState {
  teamMembers: boolean;
  addingMember: boolean;
  updatingMember: boolean;
  togglingStatus: boolean;
  fetchingDetails: boolean;
  creatingSubAccount: boolean;
  history: boolean;
}

export interface ErrorState {
  teamMembers: string | null;
  addMember: string | null;
  updateMember: string | null;
  toggleStatus: string | null;
  fetchDetails: string | null;
  createSubAccount: string | null;
  history: string | null;
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