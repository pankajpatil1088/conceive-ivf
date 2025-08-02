import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { Login } from './components/Auth/Login';
import { Sidebar } from './components/Layout/Sidebar';
import { Topbar } from './components/Layout/Topbar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { PatientRegistration } from './components/IVFRegistration/PatientRegistration';
import { AppointmentList } from './components/Appointments/AppointmentList';
import { PatientsList } from './components/Patients/PatientsList';
import { ThemeConfiguration } from './components/Admin/ThemeConfiguration';
import { Day2Evaluation } from './components/Evaluation/Day2Evaluation';
import { ROUTES } from './constants';

// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />;
};

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const { sidebarCollapsed, toggleSidebar } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showThemeConfig, setShowThemeConfig] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [patients, setPatients] = useState([]);
  const location = useLocation();

  // Update active item based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === ROUTES.DASHBOARD) setActiveItem('dashboard');
    else if (path === ROUTES.PATIENTS) setActiveItem('patients');
    else if (path === ROUTES.REGISTER) setActiveItem('register');
    else if (path === ROUTES.APPOINTMENTS) setActiveItem('appointments');
    else if (path === ROUTES.DAY2_EVALUATION) setActiveItem('day2-evaluation');
    else if (path === ROUTES.REPORTS) setActiveItem('reports');
    else if (path === ROUTES.ANALYTICS) setActiveItem('analytics');
    else if (path === ROUTES.SETTINGS) setActiveItem('settings');
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    // Close mobile menu when item is clicked
    if (window.innerWidth <= 768 && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const handleAddToPatients = (patientData) => {
    setPatients(prev => [...prev, patientData]);
  };

  const handleAddPatient = (patientData) => {
    setPatients(prev => [...prev, patientData]);
  };

  const handleEditPatient = (patientData) => {
    setPatients(prev => prev.map(p => p.id === patientData.id ? patientData : p));
  };

  const handleDeletePatient = (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(prev => prev.filter(p => p.id !== patientId));
    }
  };

  const getPageTitle = () => {
    switch (activeItem) {
      case 'dashboard': return 'Dashboard';
      case 'patients': return 'Patients Management';
      case 'register': return 'Patient Registration';
      case 'appointments': return 'Appointments Management';
      case 'day2-evaluation': return 'Day 2 Evaluation';
      case 'reports': return 'Reports';
      case 'analytics': return 'Analytics';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    );
  }

  return (
    <div className="app">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        activeItem={activeItem}
        onItemClick={handleItemClick}
        isMobileOpen={mobileMenuOpen}
        onMobileToggle={toggleMobileMenu}
      />
      
      <Topbar
        isCollapsed={sidebarCollapsed}
        pageTitle={getPageTitle()}
        onThemeConfig={() => setShowThemeConfig(true)}
        onMobileToggle={toggleMobileMenu}
      />
      
      <main className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
     <Routes>
  <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
  <Route path={ROUTES.DASHBOARD} element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } />
  <Route path={ROUTES.PATIENTS} element={
    <ProtectedRoute>
      <PatientsList 
        patients={patients}
        onAddPatient={handleAddPatient}
        onEditPatient={handleEditPatient}
        onDeletePatient={handleDeletePatient}
      />
    </ProtectedRoute>
  } />
  <Route path={ROUTES.REGISTER} element={
    <ProtectedRoute>
      <PatientRegistration />
    </ProtectedRoute>
  } />
  <Route path={ROUTES.APPOINTMENTS} element={
    <ProtectedRoute>
      <AppointmentList onAddToPatients={handleAddToPatients} />
    </ProtectedRoute>
  } />
  <Route path={ROUTES.DAY2_EVALUATION} element={
    <ProtectedRoute>
      <Day2Evaluation />
    </ProtectedRoute>
  } />
  <Route path={ROUTES.REPORTS} element={
    <ProtectedRoute>
      <div className="fade-in">
        <h3>Reports</h3>
        <p>Report generation features coming soon...</p>
      </div>
    </ProtectedRoute>
  } />
  <Route path={ROUTES.ANALYTICS} element={
    <ProtectedRoute>
      <div className="fade-in">
        <h3>Analytics</h3>
        <p>Analytics dashboard coming soon...</p>
      </div>
    </ProtectedRoute>
  } />
  <Route path={ROUTES.SETTINGS} element={
    <ProtectedRoute>
      <div className="fade-in">
        <h3>Settings</h3>
        <p>Settings panel coming soon...</p>
      </div>
    </ProtectedRoute>
  } />
  <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
</Routes>

      </main>

      {showThemeConfig && (
        <ThemeConfiguration onClose={() => setShowThemeConfig(false)} />
      )}
    </div>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;