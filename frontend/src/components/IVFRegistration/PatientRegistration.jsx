import React, { useState } from 'react';
import { Save, User, Heart, Calendar } from 'lucide-react';

export const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    // Personal Information
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
    
    // Medical Information
    bloodGroup: '',
    allergies: '',
    currentMedications: '',
    previousSurgeries: '',
    
    // IVF Specific Information
    reasonForTreatment: '',
    previousIVFAttempts: '',
    partnerAge: '',
    menstrualCycle: '',
    lastMenstrualPeriod: '',
    
    // Emergency Contact
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Patient data:', formData);
    alert('Patient registered successfully!');
    setIsSubmitting(false);
  };

  return (
    <div className="ivf-registration fade-in">
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="form-section">
          <div className="section-header">
            <h3>
              <User size={24} className="me-2" />
              Personal Information
            </h3>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
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
              <label className="form-label">Email *</label>
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
              <label className="form-label">Phone *</label>
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
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
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
        </div>

        {/* Medical Information */}
        <div className="form-section">
          <div className="section-header">
            <h3>
              <Heart size={24} className="me-2" />
              Medical Information
            </h3>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Known Allergies</label>
              <textarea
                className="form-control"
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                rows={3}
                placeholder="Please list any known allergies..."
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Current Medications</label>
              <textarea
                className="form-control"
                name="currentMedications"
                value={formData.currentMedications}
                onChange={handleInputChange}
                rows={3}
                placeholder="Please list current medications..."
              />
            </div>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Previous Surgeries</label>
            <textarea
              className="form-control"
              name="previousSurgeries"
              value={formData.previousSurgeries}
              onChange={handleInputChange}
              rows={3}
              placeholder="Please list any previous surgeries..."
            />
          </div>
        </div>

        {/* IVF Specific Information */}
        <div className="form-section">
          <div className="section-header">
            <h3>
              <Calendar size={24} className="me-2" />
              IVF Treatment Information
            </h3>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Reason for Treatment *</label>
              <select
                className="form-select"
                name="reasonForTreatment"
                value={formData.reasonForTreatment}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Reason</option>
                <option value="male-factor">Male Factor Infertility</option>
                <option value="female-factor">Female Factor Infertility</option>
                <option value="unexplained">Unexplained Infertility</option>
                <option value="tubal-factor">Tubal Factor</option>
                <option value="endometriosis">Endometriosis</option>
                <option value="ovulatory-disorders">Ovulatory Disorders</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Previous IVF Attempts</label>
              <select
                className="form-select"
                name="previousIVFAttempts"
                value={formData.previousIVFAttempts}
                onChange={handleInputChange}
              >
                <option value="">Select Number</option>
                <option value="0">None</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4 or more</option>
              </select>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Partner Age</label>
              <input
                type="number"
                className="form-control"
                name="partnerAge"
                value={formData.partnerAge}
                onChange={handleInputChange}
                min="18"
                max="80"
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Menstrual Cycle Length (days)</label>
              <input
                type="number"
                className="form-control"
                name="menstrualCycle"
                value={formData.menstrualCycle}
                onChange={handleInputChange}
                min="21"
                max="35"
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Last Menstrual Period</label>
              <input
                type="date"
                className="form-control"
                name="lastMenstrualPeriod"
                value={formData.lastMenstrualPeriod}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="form-section">
          <div className="section-header">
            <h3>Emergency Contact</h3>
          </div>
          
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Contact Name *</label>
              <input
                type="text"
                className="form-control"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Contact Phone *</label>
              <input
                type="tel"
                className="form-control"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Relationship *</label>
              <select
                className="form-select"
                name="emergencyRelation"
                value={formData.emergencyRelation}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Relationship</option>
                <option value="spouse">Spouse</option>
                <option value="parent">Parent</option>
                <option value="sibling">Sibling</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-end gap-3">
          <button type="button" className="btn btn-secondary">
            Save as Draft
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="loading-spinner me-2"></span>
                Registering Patient...
              </>
            ) : (
              <>
                <Save size={16} className="me-2" />
                Register Patient
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};