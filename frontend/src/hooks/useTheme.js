import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateColors, updateLogo, resetToDefault, toggleSidebar, setSidebarCollapsed } from '../store/slices/themeSlice';

export const useTheme = () => {
  const dispatch = useDispatch();
  const { colors, logo, sidebarCollapsed } = useSelector((state) => state.theme);

  const handleUpdateColors = (newColors) => {
    dispatch(updateColors(newColors));
  };

  const handleUpdateLogo = (logoData) => {
    dispatch(updateLogo(logoData));
  };

  const handleResetToDefault = () => {
    dispatch(resetToDefault());
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleSetSidebarCollapsed = (collapsed) => {
    dispatch(setSidebarCollapsed(collapsed));
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

  return {
    colors,
    logo,
    sidebarCollapsed,
    updateColors: handleUpdateColors,
    updateLogo: handleUpdateLogo,
    resetToDefault: handleResetToDefault,
    toggleSidebar: handleToggleSidebar,
    setSidebarCollapsed: handleSetSidebarCollapsed,
  };
};