// import axios from 'axios';

// // Base API configuration
// const API_BASE_URL =  'https://your-api-base-url.com';

// // Create axios instance with interceptors
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add token to requests
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Handle token expiration
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token expired or invalid
//       localStorage.removeItem('authToken');
//       sessionStorage.removeItem('authToken');
//       // Redirect to login or show auth modal
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export interface CreateSubAccountPayload {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone?: string;
//   role?: string;
// }

// export interface SubAccountResponse {
//   id: number;
//   slug: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone?: string;
//   role: string;
//   status: 'Active' | 'Inactive';
//   lastLogin?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data: T;
// }

// class TeamApiService {
//   // Create new team member
//   async createSubAccount(payload: CreateSubAccountPayload): Promise<ApiResponse<SubAccountResponse>> {
//     try {
//       const response = await apiClient.post('/auth/create/sub-account', payload);
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || 'Failed to create team member');
//     }
//   }

//   // Get team member details by slug
//   async getSubAccountDetails(slug: string): Promise<ApiResponse<SubAccountResponse>> {
//     try {
//       const response = await apiClient.get(`/auth/detail/sub-account/${slug}`);
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || 'Failed to fetch team member details');
//     }
//   }

//   // Deactivate/Activate team member
//   async toggleSubAccountStatus(slug: string): Promise<ApiResponse<SubAccountResponse>> {
//     try {
//       const response = await apiClient.patch(`/auth/deactivate-activate/sub-account/${slug}`);
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || 'Failed to update team member status');
//     }
//   }

//   // Get all team members (assuming this endpoint exists)
//   async getAllSubAccounts(): Promise<ApiResponse<SubAccountResponse[]>> {
//     try {
//       const response = await apiClient.get('/auth/sub-accounts');
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || 'Failed to fetch team members');
//     }
//   }
// }

// export const teamApiService = new TeamApiService();
// export default teamApiService;