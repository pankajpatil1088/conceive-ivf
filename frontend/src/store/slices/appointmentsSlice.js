import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [
    {
      id: 1,
      patientName: 'Sarah Johnson',
      patientEmail: 'sarah.johnson@email.com',
      patientPhone: '+1 (555) 123-4567',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'Consultation',
      doctor: 'Dr. Smith',
      status: 'confirmed',
      notes: 'Initial consultation for IVF treatment',
      isPatient: false
    },
    {
      id: 2,
      patientName: 'Emily Davis',
      patientEmail: 'emily.davis@email.com',
      patientPhone: '+1 (555) 234-5678',
      date: '2024-01-20',
      time: '2:30 PM',
      type: 'Follow-up',
      doctor: 'Dr. Johnson',
      status: 'pending',
      notes: 'Follow-up after first IVF cycle',
      isPatient: false
    }
  ],
  loading: false,
  error: null,
  searchTerm: '',
  filterStatus: 'all',
  filterDate: '',
  selectedAppointments: [],
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter(a => a.id !== action.payload);
    },
    markAsPatient: (state, action) => {
      const appointment = state.appointments.find(a => a.id === action.payload);
      if (appointment) {
        appointment.isPatient = true;
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    setFilterDate: (state, action) => {
      state.filterDate = action.payload;
    },
    setSelectedAppointments: (state, action) => {
      state.selectedAppointments = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.filterStatus = 'all';
      state.filterDate = '';
      state.selectedAppointments = [];
    },
  },
});

export const {
  setLoading,
  setError,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  markAsPatient,
  setSearchTerm,
  setFilterStatus,
  setFilterDate,
  setSelectedAppointments,
  clearFilters,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;