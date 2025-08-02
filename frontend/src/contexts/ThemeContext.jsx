import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultColors = {
  primary: '#00347d',
  secondary: '#6c757d',
  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#dc3545',
  light: '#f8f9fa',
  dark: '#212529',
  sidebarBg: '#2c3e50',
  sidebarHover: '#b89a2f',
  topbarBg: '#ffffff',
  logoColor: '#0d6efd',
};

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [colors, setColors] = useState(() => {
    const savedColors = localStorage.getItem('theme-colors');
    return savedColors ? JSON.parse(savedColors) : defaultColors;
  });

  const [logo, setLogo] = useState(() => {
    const savedLogo = localStorage.getItem('theme-logo');
    return savedLogo ? JSON.parse(savedLogo) : null;
  });

  const updateColors = (newColors) => {
    setColors(prev => ({ ...prev, ...newColors }));
  };

  const updateLogo = (logoData) => {
    setLogo(logoData);
  };

  const resetToDefault = () => {
    setColors(defaultColors);
    setLogo(null);
  };

  useEffect(() => {
    // Apply colors to CSS custom properties
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}-color`;
      root.style.setProperty(cssVar, value);
    });

    // Save to localStorage
    localStorage.setItem('theme-colors', JSON.stringify(colors));
  }, [colors]);

  useEffect(() => {
    // Save logo to localStorage
    if (logo) {
      localStorage.setItem('theme-logo', JSON.stringify(logo));
    } else {
      localStorage.removeItem('theme-logo');
    }
  }, [logo]);

  return (
    <ThemeContext.Provider value={{ colors, logo, updateColors, updateLogo, resetToDefault }}>
      {children}
    </ThemeContext.Provider>
  );
};