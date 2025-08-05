import React, { useState } from 'react';
import { Save, X, User, Heart, Calendar, Phone, Mail, MapPin } from 'lucide-react';

export const AddPatientModal = ({ onClose, onSave }) => {
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const patientData = {
      id: Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      lastVisit: null,
      treatmentType: formData.treatmentType || formData.reasonForTreatment,
      doctor: formData.doctor,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      bloodGroup: formData.bloodGroup,
      allergies: formData.allergies,
      currentMedications: formData.currentMedications,
      previousSurgeries: formData.previousSurgeries,
      reasonForTreatment: formData.reasonForTreatment,
      previousIVFAttempts: formData.previousIVFAttempts,
      partnerAge: formData.partnerAge,
      menstrualCycle: formData.menstrualCycle,
      lastMenstrualPeriod: formData.lastMenstrualPeriod,
      emergencyContact: {
        name: formData.emergencyName,
        phone: formData.emergencyPhone,
        relation: formData.emergencyRelation
      }
    };
    
    onSave(patientData);
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
<div className="card card-body shadow-sm ">
  <h5 className="mb-4 d-flex align-items-center">
    <User size={20} className="me-2" />
    Add New Patient
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
      <div className="col-md-4 mb-3">
        <label className="form-label">First Name *</label>
        <input
          type="text"
          className="form-control"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-md-4 mb-3">
        <label className="form-label">Middle Name *</label>
        <input
          type="text"
          className="form-control"
          name="middleName"
          value={formData.middleName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-md-4 mb-3">
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
        <label className="form-label">Age *</label>
        <input
          type="text"
          className="form-control"
          name="age"
          value={formData.age}
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
        <label className="form-label">Marital Status *</label>
        <select
          className="form-select"
          name="maritalStatus"
          value={formData.maritalStatus}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Marital Status</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
          <option value="widowed">Widowed</option>
        </select>
      </div>
      <div className="col-md-4 mb-3">
        <label className="form-label">Patient Type *</label>
        <select
          className="form-select"
          name="patientType"
          value={formData.patientType}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Patient Type</option>
          <option value="Normal">Normal</option>
          <option value="Package">Package</option>
          <option value="VIP">VIP</option>
          <option value="Credit">Credit</option>
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

       <div className="col-md-4 mb-3">
        <label className="form-label">
          <Phone size={16} className="me-1" />
          Phone Number*
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
       <div className="col-md-4 mb-3">
        <label className="form-label">
          <Phone size={16} className="me-1" />
          Alternate Phone Number*
        </label>
        <input
          type="tel"
          className="form-control"
          name="altphone"
          value={formData.altphone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-md-4 mb-3">
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
    </div>

    <div className="row">
      
      <div className="col-md-4 mb-3">
        
          <label className="form-label"> Adhaar Number*</label>
        <input
          type="tel"
          className="form-control"
          name="adhaar"
          value={formData.adhaar}
          onChange={handleInputChange}
          required
        />
      </div>
        <div className="col-md-4 mb-3">
      <label className="form-label">  PAN Number*</label>

        <input
          type="tel"
          className="form-control"
          name="pan"
          value={formData.pan}
          onChange={handleInputChange}
          required
        />
      </div>
<div className="col-md-4 mb-3">
        <label className="form-label">
          
          Refering Unit *
        </label>
        <input
          type="text"
          className="form-control"
          name="referingunit"
          value={formData.referingunit}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>

      <div className="row">
      
      <div className="col-md-4 mb-3">
        
          <label className="form-label"> Occupation</label>
        <input
          type="tel"
          className="form-control"
          name="occupation"
          value={formData.occupation}
          onChange={handleInputChange}
          
        />
      </div>
        <div className="col-md-4 mb-3">
      <label className="form-label">  Anniversary Date</label>

        <input
          type="date"
          className="form-control"
          name="anniversarydate"  
          value={formData.anniversarydate}
          onChange={handleInputChange}
          
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
        <label className="form-label">District</label>
        <input
          type="text"
          className="form-control"
          name="district"
          value={formData.district}
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
      <div className="col-md-4 mb-3">
  <label className="form-label">Status</label>
  <div>
    <label className="form-check-label ">
      <input
        type="radio"
        className="form-check-input me-3"
        name="status"
        value="Active"
        checked={formData.status === "Active"}
        onChange={handleInputChange}
      />
      Active
    </label>
    <label className="form-check-label ms-3">
      <input
        type="radio"
        className="form-check-input me-3"
        name="status"
        value="Inactive"
        checked={formData.status === "Inactive"}
        onChange={handleInputChange}
      />
      Inactive
    </label>
  </div>
</div>
    </div>

    {/* Continue adding your Medical Info, Treatment Info, Emergency Contact sections here using Bootstrap 5 layout, same pattern as above */}

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
            Adding Patient...
          </>
        ) : (
          <>
            <Save size={16} className="me-1" />
            Add Patient
          </>
        )}
      </button>
    </div>
  </form>
</div>

  );
};