

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Report, ReportState } from '../../types';

const initialState: ReportState = {
  reports: [],
  loading: false,
  error: null,
};

// Async thunk for fetching reports
export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async (_, { rejectWithValue }) => {
    try {
      const accesstoken = localStorage.getItem("access_token");
      if (!accesstoken) {
        throw new Error('No access token found');
      }
      
      const response = await fetch('https://afridev.com.ng/vin/search-history/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accesstoken}`
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch reports: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform the API response to match our Report type
      if (data?.Search_histories) {
        return data.Search_histories.map((record: any) => ({
          id: record.id || Math.random().toString(36).substr(2, 9),
          title: 'VIN Search',
          vin: record.vin?.vin || record.slug || '',
          action: 'download',
          downloadUrl: `/api/reports/${record.id}/download`,
          isCertificate: true,
          vehicleDetails: {
            brand: record.vin?.brand || 'Not available',
            model: record.vin?.vehicle_type || 'Not available',
            vehicle_year: record.vin?.vehicle_year || 'Not available',
            color: 'Not available',
            chassis_number: record.vin?.vin || ''
          }
        }));
      }
      
      return [];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch reports');
    }
  }
);

// Async thunk for downloading a report
export const downloadReport = createAsyncThunk(
  'reports/downloadReport',
  async (reportId: number, { rejectWithValue }) => {
    try {
      // This should be replaced with actual download functionality
      // For now we just return the ID to acknowledge the action
      return reportId;
    } catch (error) {
      return rejectWithValue(`Failed to download report ${reportId}`);
    }
  }
);

// Async thunk for downloading a certificate
export const downloadCertificate = createAsyncThunk(
  'reports/downloadCertificate',
  async (reportId: number, { rejectWithValue }) => {
    try {
      // This should be replaced with actual download functionality
      // For now we just return the ID to acknowledge the action
      return reportId;
    } catch (error) {
      return rejectWithValue(`Failed to download certificate ${reportId}`);
    }
  }
);

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    addReport: (state, action: PayloadAction<Report>) => {
      state.reports.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
        state.reports = action.payload;
        state.loading = false;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(downloadReport.fulfilled, (_state, action) => {
        console.log(`Successfully downloaded report ${action.payload}`);
      })
      .addCase(downloadCertificate.fulfilled, (_state, action) => {
        console.log(`Successfully downloaded certificate ${action.payload}`);
      });
  },
});

export const { addReport } = reportSlice.actions;
export default reportSlice.reducer;