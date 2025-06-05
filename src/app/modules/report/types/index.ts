// export interface ReportItem {
//   id: string;
//   title: string;
//   description: string;
//   status: 'available' | 'processing';
//   actionLabel: string;
//   actionColor: string;
// }

// export interface Report {
//   id: number;
//   title: string;
//   vin: string;
//   action: 'download' | 'view';
//   downloadUrl?: string;
//   viewUrl?: string;
//   isCertificate?: boolean;
// }

// export interface ReportState {
//   reports: Report[];
//   loading: boolean;
//   error: string | null;
// }




// export interface ReportItem {
//   id: string;
//   title: string;
//   description: string;
//   status: 'available' | 'processing';
//   actionLabel: string;
//   actionColor: string;
// }

// export interface VehicleDetails {
//   brand?: string;
//   model?: string;
//   vehicle_year?: string;
//   color?: string;
//   chassis_number?: string;
// }

// export interface Report {
//   id: number;
//   title: string;
//   vin: string;
//   action: 'download' | 'view';
//   downloadUrl?: string;
//   viewUrl?: string;
//   isCertificate?: boolean;
//   vehicleDetails?: VehicleDetails;
// }

// export interface ReportState {
//   reports: Report[];
//   loading: boolean;
//   error: string | null;
// }

// export interface UserProfile {
//   id?: string;
//   fullName: string;
//   email?: string;
//   address: string;
//   phone?: string;
// }

// export interface AuthState {
//   user: UserProfile | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   error: string | null;
// }

// export interface VehicleCertificateData{
//   vin: string;
//   make: string;
//   model: string;
//   year: string;
//   certificateNumber: string;
//   ownerName: string;  
//   ownerAddress: string; 
//   date: Date;
   
// };




// export interface ReportItem {
//   id: string;
//   title: string;
//   description: string;
//   status: 'available' | 'processing';
//   actionLabel: string;
//   actionColor: string;
// }

// export interface VehicleDetails {
//   brand?: string;
//   model?: string;
//   vehicle_year?: string;
//   color?: string;
//   chassis_number?: string;
// }

// export interface Report {
//   id: number | string; // Allow both number and string for flexibility
//   title: string;
//   vin: string;
//   action: 'download' | 'view';
//   downloadUrl?: string;
//   viewUrl?: string;
//   isCertificate?: boolean;
//   vehicleDetails?: VehicleDetails;
// }

// export interface ReportState {
//   reports: Report[];
//   loading: boolean;
//   error: string | null;
// }

// export interface UserProfile {
//   id?: string;
//   fullName: string;
//   email?: string;
//   address: string;
//   phone?: string;
// }

// export interface AuthState {
//   user: UserProfile | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   error: string | null;
// }

// export interface VehicleCertificateData {
//   vin: string;
//   makeModel: string; // Changed from separate make/model to makeModel to match usage
//   model: string;
//   year: string;
//   certificateNumber: string;
//   ownerName: string;  
//   ownerAddress: string; 
//   date: string; // Changed from Date to string since you're formatting it
//   qrCodeBase64?: string; // Made optional and added this field
// }




// Updated index.ts - Fixed type definitions
export interface ReportItem {
  id: string;
  title: string;
  description: string;
  status: 'available' | 'processing';
  actionLabel: string;
  actionColor: string;
}

export interface VehicleDetails {
  brand?: string;
  model?: string;
  vehicle_year?: string;
  color?: string;
  chassis_number?: string;
}

export interface Report {
  id: number | string;
  title: string;
  vin: string;
  action: 'download' | 'view';
  downloadUrl?: string;
  viewUrl?: string;
  isCertificate?: boolean;
  vehicleDetails?: VehicleDetails;
}

export interface ReportState {
  reports: Report[];
  loading: boolean;
  error: string | null;
}

export interface UserProfile {
  id?: string;
  fullName: string;
  email?: string;
  address: string;
  phone?: string;
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface VehicleCertificateData {
  vin: string;
  makeModel: string;
  model: string;
  year: string;
  certificateNumber: string;
  ownerName: string;  
  ownerAddress: string; 
  date: string;
  qrCodeBase64?: string;
}

// Fixed API interfaces for CertificatePage.tsx
export interface VinInfo {
  vin: string | null;
  brand: string | null;
  make: string | null;
  vehicle_year: string | null;
  vehicle_type: string | null;
  payment_status: string | null;
  origin_country: string | null;
}

export interface User {
  full_name: string;
  address?: string;
}

export interface SearchHistory {
  user: User;
  vin: VinInfo | string;
  cert_num: string;
  reference_num: string;
  status: string;
  qr_code_base64: string;
  slug: string;
  created_at: string;
}

export interface ApiResult {
  vin: string;
  ref_number: string;
  status: string;
  user?: User; // Added optional user property
}

export interface ApiResponse {
  message: string;
  results: ApiResult[];
}

export interface VinItem {
  id: string;
}

// Type guard functions to help with type checking
export function isVinInfoObject(vin: VinInfo | string): vin is VinInfo {
  return typeof vin === 'object' && vin !== null;
}

export function hasUserProperty(result: ApiResult): result is ApiResult & { user: User } {
  return 'user' in result && result.user !== undefined;
}



