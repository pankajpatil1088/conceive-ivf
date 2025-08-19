import React, { useState, useEffect } from 'react';
import { Save, X, User, Heart, Calendar, Phone, Mail, MapPin } from 'lucide-react';

export const AddPatientModal = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bloodGroup: '',
    allergies: '',
    currentMedications: '',
    previousSurgeries: '',
    reasonForTreatment: '',
    previousIVFAttempts: '',
    partnerAge: '',
    menstrualCycle: '',
    lastMenstrualPeriod: '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    doctor: '',
    treatmentType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Pre-fill form when editing
  useEffect(() => {
    if (initialData) {
      const [firstName, ...lastNameParts] = (initialData.name || '').split(' ');
      setFormData({
        ...formData,
        firstName: firstName || '',
        lastName: lastNameParts.join(' ') || '',
        dateOfBirth: initialData.dateOfBirth || '',
        gender: initialData.gender || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        city: initialData.city || '',
        state: initialData.state || '',
        zipCode: initialData.zipCode || '',
        bloodGroup: initialData.bloodGroup || '',
        allergies: initialData.allergies || '',
        currentMedications: initialData.currentMedications || '',
        previousSurgeries: initialData.previousSurgeries || '',
        reasonForTreatment: initialData.reasonForTreatment || '',
        previousIVFAttempts: initialData.previousIVFAttempts || '',
        partnerAge: initialData.partnerAge || '',
        menstrualCycle: initialData.menstrualCycle || '',
        lastMenstrualPeriod: initialData.lastMenstrualPeriod || '',
        emergencyName: initialData.emergencyContact?.name || '',
        emergencyPhone: initialData.emergencyContact?.phone || '',
        emergencyRelation: initialData.emergencyContact?.relation || '',
        doctor: initialData.doctor || '',
        treatmentType: initialData.treatmentType || ''
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const patientData = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      emergencyContact: {
        name: formData.emergencyName,
        phone: formData.emergencyPhone,
        relation: formData.emergencyRelation
      }
    };

    await onSave(patientData);
    setIsSubmitting(false);
  };

  const treatmentTypes = [
    'IVF (In Vitro Fertilization)',
    'IUI (Intrauterine Insemination)',
    'ICSI (Intracytoplasmic Sperm Injection)',
    'Egg Freezing',
    'Sperm Freezing',
    'Embryo Freezing',
    'Fertility Assessment',
    'Hormone Therapy',
    'Surgery',
    'Consultation'
  ];

  const doctors = [
    'Dr. Smith',
    'Dr. Johnson',
    'Dr. Brown',
    'Dr. Wilson',
    'Dr. Davis'
  ];

  return (
    <div className="card card-body shadow-sm">
      <h5 className="mb-4 d-flex align-items-center">
        <User size={20} className="me-2" />
        {initialData ? 'Edit Patient' : 'Add New Patient'}
        <button
          type="button"
          className="btn-close ms-auto"
          aria-label="Close"
          onClick={onClose}
        />
      </h5>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <h6 className="mb-3 border-bottom pb-1 d-flex align-items-center">
          <User size={18} className="me-2" />
          Personal Information
        </h6>
        
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name vv*</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name *</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Date of Birth *</label>
            <input
              type="date"
              className="form-control"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Gender *</label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Blood Group</label>
            <select
              className="form-select"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">
              <Mail size={16} className="me-1" />
              Email *
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">
              <Phone size={16} className="me-1" />
              Phone *
            </label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">
            <MapPin size={16} className="me-1" />
            Address
          </label>
          <textarea
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={2}
          />
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">ZIP Code</label>
            <input
              type="text"
              className="form-control"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="d-flex justify-content-end border-top pt-3 mt-4">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={onClose}
          >
            <X size={16} className="me-1" />
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} className="me-1" />
                {initialData ? 'Update Patient' : 'Add Patient'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
