import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patients: [],
  loading: false,
  error: null,
  searchTerm: '',
  filterStatus: 'all',
  selectedPatients: [],
};

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addPatient: (state, action) => {
      state.patients.push(action.payload);
    },
    updatePatient: (state, action) => {
      const index = state.patients.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
    deletePatient: (state, action) => {
      state.patients = state.patients.filter(p => p.id !== action.payload);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    setSelectedPatients: (state, action) => {
      state.selectedPatients = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.filterStatus = 'all';
      state.selectedPatients = [];
    },
  },
});

export const {
  setLoading,
  setError,
  addPatient,
  updatePatient,
  deletePatient,
  setSearchTerm,
  setFilterStatus,
  setSelectedPatients,
  clearFilters,
} = patientsSlice.actions;

export default patientsSlice.reducer;