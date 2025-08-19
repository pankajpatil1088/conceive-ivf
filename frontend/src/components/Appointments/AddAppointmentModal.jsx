import React, { useEffect, useState } from 'react';
import { Save, X, Search, User, Calendar, Clock } from 'lucide-react';

export const AddAppointmentModal = ({ onClose, onSave,defaultValues  }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    patientAltPhone: '',
    date: '',
    time: '',
    type: '',
    doctor: '',
    notes: ''
  });


  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues);
    }
  }, [defaultValues]);

  const [patientSearch, setPatientSearch] = useState('');
  const [showPatientSearch, setShowPatientSearch] = useState(false);

  const dataurl = 'https://687a64bcabb83744b7eca95c.mockapi.io/IVFApp/appointmentList';

  // Save appointment to API
  const saveAppointmentToApi = async (appointment) => {
    try {
      const response = await fetch(dataurl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment)
      });
      if (!response.ok) throw new Error('Failed to save appointment');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Override handleSubmit to use API
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      defaultValues ? `${dataurl}/${defaultValues.id}` : dataurl,
      {
        method: defaultValues ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }
    );
    if (!response.ok) throw new Error('Failed to save appointment');
    const saved = await response.json();
    onSave(saved);
    onClose(); // Close after save
  } catch (error) {
    console.error(error);
  }
};


  // Mock patient data for search
  const mockPatients = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '+1 (555) 123-4567' },
    { id: 2, name: 'Emily Davis', email: 'emily.davis@email.com', phone: '+1 (555) 234-5678' },
    { id: 3, name: 'Lisa Wilson', email: 'lisa.wilson@email.com', phone: '+1 (555) 345-6789' },
    { id: 4, name: 'Maria Garcia', email: 'maria.garcia@email.com', phone: '+1 (555) 456-7890' },
    { id: 5, name: 'Jennifer Lee', email: 'jennifer.lee@email.com', phone: '+1 (555) 567-8901' }
  ];

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    patient.email.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePatientSelect = (patient) => {
    setFormData(prev => ({
      ...prev,
      patientName: patient.name,
      patientEmail: patient.email,
      patientPhone: patient.phone,
      patientAltPhone: patient.patientAltPhone
    }));
    setShowPatientSearch(false);
    setPatientSearch('');
  };

  // Removed duplicate handleSubmit to fix redeclaration error.

  const appointmentTypes = [
    'Consultation',
    'Follow-up',
    'Treatment',
    'Monitoring',
    'Surgery',
    'Lab Work',
    'Counseling'
  ];

  const doctors = [
    'Dr. Chetan Rao',
    'Dr. Johnson',
    'Dr. Brown',
    'Dr. Wilson',
    'Dr. Davis'
  ];

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <Calendar size={20} className="me-2" />
              Add New Appointment
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Patient Information */}
              <div className="form-section">
                <h6 className="section-title">
                  <User size={18} className="me-2" />
                  Patient Information
                </h6>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Patient Name *</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        placeholder="Enter patient name or search existing"
                        required
                      />
                      {/* <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPatientSearch(!showPatientSearch)}
                      >
                        <Search size={16} />
                      </button> */}
                    </div>
                    
                    {showPatientSearch && (
                      <div className="patient-search-dropdown">
                        <div className="search-input mb-2">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Search patients..."
                            value={patientSearch}
                            onChange={(e) => setPatientSearch(e.target.value)}
                          />
                        </div>
                        <div className="patient-list">
                          {filteredPatients.map(patient => (
                            <div
                              key={patient.id}
                              className="patient-item"
                              onClick={() => handlePatientSelect(patient)}
                            >
                              <div className="patient-name">{patient.name}</div>
                              <div className="patient-contact">
                                <small className="text-muted">{patient.email} • {patient.phone}</small>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                   <div className="col-md-6 mb-3">
                    <label className="form-label">Phone *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="patientPhone"
                      value={formData.patientPhone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="patientEmail"
                      value={formData.patientEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Alternate Phone Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="patientAltPhone"
                      value={formData.patientAltPhone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="form-section">
                <h6 className="section-title">
                  <Clock size={18} className="me-2" />
                  Appointment Details
                </h6>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Time *</label>
                    <input
                      type="time"
                      className="form-control"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Appointment Type *</label>
                    <select
                      className="form-select"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Type</option>
                      {appointmentTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Doctor *</label>
                    <select
                      className="form-select"
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleInputChange}
                      required 
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map(doctor => (
                        <option key={doctor} value={doctor}>{doctor}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Notes</label>
                  <textarea
                    className="form-control"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Additional notes or special instructions..."
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                <X size={16} className="me-2" />
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Save size={16} className="me-2" />
                Save Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};