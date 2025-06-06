// interface ApiResult {
//   vin: string;
//   ref_number: string;
//   status: string;
// }

// interface ApiResponse {
//   message: string;
//   results: ApiResult[];
// }

// interface SearchHistory {
//   user: {
//     full_name: string;
//     address?: string;
//   };
//   vin: VinInfo | string;
//   cert_num: string;
//   reference_num: string;
//   status: string;
//   qr_code_base64: string;
//   slug: string;
//   created_at: string;
// }

// interface VinInfo {
//   vin: string | null;
//   brand: string | null;
//   make: string | null;
//   vehicle_year: string | null;
//   vehicle_type: string | null;
//   payment_status: string | null;
//   origin_country: string | null;
// }

// const API_BASE_URL = 'https://cvms-microservice.afripointdev.com/vin';

// export const vinApiService = {
//   async getAuthHeader() {
//     const accessToken = localStorage.getItem('access_token');
//     if (!accessToken) {
//       throw new Error('No access token found');
//     }
//     return {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     };
//   },

//   async getVinInfo(vins?: string[]): Promise<ApiResponse> {
//     try {
//       const headers = await this.getAuthHeader();
//       const method = vins ? 'POST' : 'GET';
//       const body = vins ? JSON.stringify({ vins }) : undefined;

//       const response = await fetch(`${API_BASE_URL}/vin-check/`, {
//         method,
//         headers,
//         body,
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch VIN info: ${response.status}`);
//       }

//       return response.json();
//     } catch (error) {
//       console.error('Error fetching VIN info:', error);
//       throw error;
//     }
//   },
// };



export interface ApiVehicleResult {
  vin: string;
  make?: string;
  model?: string;
  vehicle_year?: string;
  engine_type?: string;
  vreg?: string;
  vehicle_type?: string;
  origin_country?: string;
  payment_status?: string;
  ref_number: string;
  status: string;
}

export interface ApiResponse {
  message: string;
  results: ApiVehicleResult[];
}

const API_BASE_URL = 'https://cvms-staging.afripointdev.com/vin';

export const vinApiService = {
  async getAuthHeader() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
  },

  async getVinCheck(): Promise<ApiResponse> {
    try {
      const headers = await this.getAuthHeader();
      const response = await fetch(`${API_BASE_URL}/vin-check/`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch VIN check: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching VIN check:', error);
      throw error;
    }
  },

  async getVinDetails(vins: string[]): Promise<ApiResponse> {
    try {
      const headers = await this.getAuthHeader();
      const response = await fetch(`${API_BASE_URL}/vin-check/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ vins }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch VIN details: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching VIN details:', error);
      throw error;
    }
  }
};