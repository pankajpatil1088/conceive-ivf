import { createSlice } from '@reduxjs/toolkit';

// Default theme colors
const defaultColors = {
  primary: '#00347d',
  secondary: '#6c757d',
  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#dc3545',
  light: '#f8f9fa',
  dark: '#212529',
  sidebarBg: '#d8dbe3',
  sidebarHover: '#b89a2f',
  topbarBg: '#d8dbe3',
  logoColor: '#0d6efd',
};

// Try loading saved values
const savedColors = JSON.parse(localStorage.getItem('theme-colors'));
const savedLogo = JSON.parse(localStorage.getItem('theme-logo'));

const initialState = {
  colors: savedColors || defaultColors,
  logo: savedLogo || null,
  sidebarCollapsed: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateColors: (state, action) => {
      state.colors = { ...state.colors, ...action.payload };
      localStorage.setItem('theme-colors', JSON.stringify(state.colors));
    },
    updateLogo: (state, action) => {
      state.logo = action.payload;
      localStorage.setItem('theme-logo', JSON.stringify(action.payload));
    },
    resetToDefault: (state) => {
      state.colors = defaultColors;
      state.logo = null;
      localStorage.removeItem('theme-colors');
      localStorage.removeItem('theme-logo');
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const {
  updateColors,
  updateLogo,
  resetToDefault,
  toggleSidebar,
  setSidebarCollapsed,
} = themeSlice.actions;

export default themeSlice.reducer;
