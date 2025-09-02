import React from 'react';

import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  BarChart3,
  UserPlus,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ROUTES } from '../../constants';




const menuItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard', path: ROUTES.DASHBOARD },
  
  { id: 'appointments', icon: Calendar, label: 'Appointments', path: ROUTES.APPOINTMENTS },
  { id: 'patients', icon: Users, label: 'Patients', path: ROUTES.PATIENTS },

  { id: 'planning-details', icon: Calendar, label: 'Planning Details', path: ROUTES.PLANNING_DETAILS },
  // { id: 'register', icon: UserPlus, label: 'New Patient', path: ROUTES.REGISTER },
  // { id: 'day2-evaluation', icon: FileText, label: 'Day 2 Evaluation', path: ROUTES.DAY2_EVALUATION },
  // { id: 'reports', icon: FileText, label: 'Reports', path: ROUTES.REPORTS },
  // { id: 'analytics', icon: BarChart3, label: 'Analytics', path: ROUTES.ANALYTICS },
  // { id: 'settings', icon: Settings, label: 'Settings', path: ROUTES.SETTINGS },
];

export const Sidebar = ({
  isCollapsed,
  onToggle,
  activeItem,
  onItemClick,
  isMobileOpen,
  onMobileToggle
}) => {
const { logo } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item.id);
    }
    navigate(item.path);
    
    // Close mobile sidebar when item is clicked
    if (window.innerWidth <= 768 && isMobileOpen) {
      onMobileToggle();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="sidebar-overlay d-md-none"
          onClick={onMobileToggle}
        ></div>
      )}
      
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="d-flex align-items-center justify-content-between">
            <div className="logo">
              {logo ? (
                <img src={logo.url} alt="Logo" className="logo-image" />
              ) : (
                <span className="logo-text">
                  {isCollapsed ? 'IVF' : 'Conceive IVF'}
                </span>
              )}
            </div>
            
            {/* Toggle button next to logo */}
            <div className="toggle-buttons">
              {/* Desktop toggle */}
              <button 
                className="toggle-btn d-none d-md-block" 
                onClick={onToggle}
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? <Menu  size={16} /> : <X size={16} />}
              </button>
              
              {/* Mobile toggle */}
              <button 
                className="toggle-btn d-md-none" 
                onClick={onMobileToggle}
                title="Close menu"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item)}
                title={isCollapsed ? item.label : ''}
              >
                <Icon className="menu-icon" size={20} />
                {!isCollapsed && <span className="menu-text">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};