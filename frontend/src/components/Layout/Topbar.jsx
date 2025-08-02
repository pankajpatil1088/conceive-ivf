import React from 'react';
import { Bell, Search, User, Settings, LogOut, Palette, Menu, X, Check, AlertCircle, Info, Calendar } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

export const Topbar = ({ 
  isCollapsed, 
  pageTitle, 
  onThemeConfig,
  onMobileToggle
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { logo } = useSelector((state) => state.theme); // ✅ Moved inside component

  const handleLogout = () => dispatch(logout());

  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      type: 'appointment',
      title: 'New Appointment Scheduled',
      message: 'Sarah Johnson has scheduled an appointment for tomorrow at 10:00 AM',
      time: '5 minutes ago',
      read: false,
      icon: 'calendar'
    },
    {
      id: 2,
      type: 'patient',
      title: 'Patient Registration',
      message: 'Emily Davis has been successfully registered as a new patient',
      time: '15 minutes ago',
      read: false,
      icon: 'user'
    },
    {
      id: 3,
      type: 'system',
      title: 'System Update',
      message: 'The system will undergo maintenance tonight from 2:00 AM to 4:00 AM',
      time: '1 hour ago',
      read: true,
      icon: 'info'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Lab Results Ready',
      message: 'Lab results for Lisa Wilson are now available for review',
      time: '2 hours ago',
      read: true,
      icon: 'alert'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment': return <Calendar size={16} className="text-primary" />;
      case 'patient': return <User size={16} className="text-success" />;
      case 'alert': return <AlertCircle size={16} className="text-warning" />;
      case 'system': return <Info size={16} className="text-info" />;
      default: return <Bell size={16} className="text-secondary" />;
    }
  };

  return (
    <div className={`topbar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="topbar-content">
        <div className="d-flex align-items-center">
          <button 
            className="btn btn-link d-md-none me-2 mobile-toggle"
            onClick={onMobileToggle}
            title="Open menu"
          >
            <Menu size={20} />
          </button>
          <h1 className="page-title">{pageTitle}</h1>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="search-box d-none d-lg-block">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <Search size={16} />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="dropdown notification-dropdown">
            <button 
              className="btn btn-outline-secondary btn-sm position-relative"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                  {unreadCount}
                </span>
              )}
            </button>

            <div className="dropdown-menu dropdown-menu-end notification-menu">
              <div className="notification-header">
                <h6 className="mb-0">Notifications</h6>
                {unreadCount > 0 && (
                  <button 
                    className="btn btn-sm btn-link p-0"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="notification-list">
                {notifications.length === 0 ? (
                  <div className="notification-item text-center py-3">
                    <Bell size={24} className="text-muted mb-2" />
                    <p className="text-muted mb-0">No notifications</p>
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${!notification.read ? 'unread' : ''}`}
                    >
                      <div className="notification-content">
                        <div className="notification-icon">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="notification-text">
                          <div className="notification-title">{notification.title}</div>
                          <div className="notification-message">{notification.message}</div>
                          <div className="notification-time">{notification.time}</div>
                        </div>
                        <div className="notification-actions">
                          {!notification.read && (
                            <button 
                              className="btn btn-sm btn-link p-0 me-2"
                              onClick={() => markAsRead(notification.id)}
                              title="Mark as read"
                            >
                              <Check size={14} />
                            </button>
                          )}
                          <button 
                            className="btn btn-sm btn-link p-0"
                            onClick={() => removeNotification(notification.id)}
                            title="Remove"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <div className="notification-footer">
                  <button className="btn btn-sm btn-link w-100">
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="dropdown user-menu">
            <button
              className="dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="user-avatar">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <span className="d-none d-md-inline">{user?.name}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  <User size={16} className="me-2" />
                  Profile
                </a>
              </li>
              <li>
                <button className="dropdown-item" onClick={onThemeConfig}>
                  <Palette size={16} className="me-2" />
                  Theme Settings
                </button>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <Settings size={16} className="me-2" />
                  Settings
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  <LogOut size={16} className="me-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
