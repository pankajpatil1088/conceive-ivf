import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Save, RotateCcw, Palette, Eye, Upload, X } from 'lucide-react';

export const ThemeConfiguration = ({ onClose }) => {
  const { colors, logo, updateColors, updateLogo, resetToDefault } = useTheme();
  const [tempColors, setTempColors] = useState(colors);
  const [tempLogo, setTempLogo] = useState(logo);
  const [previewMode, setPreviewMode] = useState(false);

  const handleColorChange = (colorKey, value) => {
    setTempColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
    
    if (previewMode) {
      updateColors({ [colorKey]: value });
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const logoData = {
          url: event.target.result,
          name: file.name,
          size: file.size
        };
        setTempLogo(logoData);
        
        if (previewMode) {
          updateLogo(logoData);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setTempLogo(null);
    if (previewMode) {
      updateLogo(null);
    }
  };

  const handleSave = () => {
    updateColors(tempColors);
    updateLogo(tempLogo);
    onClose();
  };

  const handleReset = () => {
    resetToDefault();
    setTempColors(colors);
    setTempLogo(logo);
  };

  const colorFields = [
    { key: 'primary', label: 'Primary Color', description: 'Main brand color' },
    { key: 'secondary', label: 'Secondary Color', description: 'Secondary brand color' },
    { key: 'success', label: 'Success Color', description: 'Success messages and indicators' },
    { key: 'info', label: 'Info Color', description: 'Information messages' },
    { key: 'warning', label: 'Warning Color', description: 'Warning messages' },
    { key: 'danger', label: 'Danger Color', description: 'Error messages and alerts' },
    { key: 'sidebarBg', label: 'Sidebar Background', description: 'Sidebar background color' },
    { key: 'sidebarHover', label: 'Sidebar Hover', description: 'Sidebar hover state' },
    { key: 'topbarBg', label: 'Topbar Background', description: 'Topbar background color' },
    { key: 'logoColor', label: 'Logo Color', description: 'Logo and brand text color' },
  ];

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <Palette size={20} className="me-2" />
              Theme Configuration
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <div className="modal-body">
            <div className="theme-config">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h6>Customize Your Theme</h6>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="previewMode"
                    checked={previewMode}
                    onChange={(e) => setPreviewMode(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="previewMode">
                    <Eye size={16} className="me-1" />
                    Live Preview
                  </label>
                </div>
              </div>

              <div className="row">
                {/* Logo Upload Section */}
                <div className="col-md-4 mb-4">
                  <div className="logo-upload-section">
                    <h6 className="mb-3">Logo Settings</h6>
                    
                    <div className="logo-preview">
                      {tempLogo ? (
                        <div className="current-logo">
                          <img 
                            src={tempLogo.url} 
                            alt="Logo Preview" 
                            className="logo-image"
                          />
                          <div className="logo-info">
                            <small className="text-muted d-block">{tempLogo.name}</small>
                            <small className="text-muted">{(tempLogo.size / 1024).toFixed(1)} KB</small>
                          </div>
                          <button 
                            type="button" 
                            className="btn btn-sm btn-outline-danger mt-2"
                            onClick={handleRemoveLogo}
                          >
                            <X size={14} className="me-1" />
                            Remove Logo
                          </button>
                        </div>
                      ) : (
                        <div className="no-logo">
                          <Palette size={48} className="text-muted mb-2" />
                          <p className="text-muted">No logo uploaded</p>
                        </div>
                      )}
                    </div>

                    <div className="logo-upload">
                      <input
                        type="file"
                        id="logoUpload"
                        className="d-none"
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                      <label htmlFor="logoUpload" className="btn btn-outline-primary w-100">
                        <Upload size={16} className="me-2" />
                        Upload Logo
                      </label>
                      <small className="text-muted d-block mt-2">
                        Recommended: PNG, JPG, SVG (Max 2MB)
                      </small>
                    </div>
                  </div>
                </div>

                {/* Color Settings */}
                <div className="col-md-8">
                  <h6 className="mb-3">Color Settings</h6>
                  <div className="row">
                    {colorFields.map((field) => (
                      <div key={field.key} className="col-md-6 mb-3">
                        <div className="color-picker">
                          <label className="form-label">{field.label}</label>
                          <div className="d-flex align-items-center gap-2">
                            <input
                              type="color"
                              className="form-control form-control-color"
                              value={tempColors[field.key]}
                              onChange={(e) => handleColorChange(field.key, e.target.value)}
                            />
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={tempColors[field.key]}
                              onChange={(e) => handleColorChange(field.key, e.target.value)}
                              style={{ maxWidth: '100px' }}
                            />
                          </div>
                        </div>
                        <small className="text-muted">{field.description}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="preview-section mt-4">
                <h6>Preview</h6>
                <div className="theme-preview">
                  <div className="preview-sidebar">
                    <div className="preview-logo">
                      {tempLogo ? (
                        <img src={tempLogo.url} alt="Logo" className="preview-logo-img" />
                      ) : (
                        <span style={{ color: tempColors.logoColor }}>IVF Clinic</span>
                      )}
                    </div>
                  </div>
                  <div className="preview-content">
                    <div className="d-flex gap-2 mb-3">
                      <button className="btn btn-primary btn-sm" style={{ backgroundColor: tempColors.primary, borderColor: tempColors.primary }}>
                        Primary
                      </button>
                      <button className="btn btn-secondary btn-sm" style={{ backgroundColor: tempColors.secondary, borderColor: tempColors.secondary }}>
                        Secondary
                      </button>
                      <button className="btn btn-success btn-sm" style={{ backgroundColor: tempColors.success, borderColor: tempColors.success }}>
                        Success
                      </button>
                      <button className="btn btn-warning btn-sm" style={{ backgroundColor: tempColors.warning, borderColor: tempColors.warning }}>
                        Warning
                      </button>
                      <button className="btn btn-danger btn-sm" style={{ backgroundColor: tempColors.danger, borderColor: tempColors.danger }}>
                        Danger
                      </button>
                    </div>
                    <div className="preview-card" style={{ backgroundColor: tempColors.topbarBg }}>
                      <h6>Sample Card</h6>
                      <p className="mb-0">This is how your theme will look in the application.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={handleReset}>
              <RotateCcw size={16} className="me-2" />
              Reset to Default
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              <Save size={16} className="me-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};