import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Report, ReportState } from '../../types';
import { vinApiService } from '../../services/vinVehicleService';

const initialState: ReportState = {
  reports: [],
  loading: false,
  error: null,
};

export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async (_, { rejectWithValue }) => {
    try {
      const response = await vinApiService.getVinCheck();
      
      if (response?.results && Array.isArray(response.results)) {
        return response.results.map((record): Report => ({
          id: record.ref_number || Math.random().toString(36).substr(2, 9),
          title: 'VIN Search',
          vin: record.vin,
          action: 'download',
          downloadUrl: `/api/reports/${record.ref_number}/download`,
          isCertificate: true,
          vehicleDetails: {
            brand: record.make || 'Not available',
            model: record.model || 'Not available',
            vehicle_year: record.vehicle_year || 'Not available',
            color: 'Not available',
            chassis_number: record.vin
          }
        }));
      }
      
      return [];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch reports'
      );
    }
  }
);

// Async thunk for downloading a report
export const downloadReport = createAsyncThunk(
  'reports/downloadReport',
  async (reportId: number | string, { rejectWithValue }) => { // Updated to accept string or number
    try {
      return reportId;
    } catch (error) {
      return rejectWithValue(`Failed to download report ${reportId}`);
    }
  }
);

// Async thunk for downloading a certificate
export const downloadCertificate = createAsyncThunk(
  'reports/downloadCertificate',
  async (reportId: number | string, { rejectWithValue }) => { // Updated to accept string or number
    try {
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