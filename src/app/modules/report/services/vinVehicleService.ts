export interface VinSearchHistoryItem {
    user: {
      full_name: string;
    };
    vin: {
      vin: string;
      brand: string;
      vehicle_year: string;
      vehicle_type: string;
      payment_status: string;
      origin_country: string;
    };
    cert_num: string;
    status: string;
    qr_code_base64: string;
    slug: string;
    created_at: string;
  }
  
  // Create a service to fetch search history
  export const fetchSearchHistory = async (): Promise<VinSearchHistoryItem[]> => {
  try {
    // Get token from localStorage or your auth store
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await fetch('http://cvms-api.afripointdev.com/vin/search-history/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Add the token here
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch search history');
    }

    const data = await response.json();
    return data.Search_histories || [];
  } catch (error) {
    console.error('Error fetching search history:', error);
    throw error;
  }
};





