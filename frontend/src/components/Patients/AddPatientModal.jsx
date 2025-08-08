import React, { useEffect, useState } from 'react';
import { Save, X, User } from 'lucide-react';
import './AddPatientModal.css';
export const AddPatientModal = ({ onClose, onSave, existingPatient }) => {
  const [formData, setFormData] = useState({    
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    phonenumber: '',
    alternatePhone: '',
    date_of_birth: '',
    age: '',
    gender: '',
    bloodgroup: '',
    adharnumber: '',
    pannumber: '',
    refunit: '',
    occupation: '',
    anniversarydate: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    patienttype: '',
    marritalstatus: '',
    district: '',
    doctor: '',
    treatmentType: '',
    status: 'Active'
  });

  useEffect(() => {
    if (existingPatient) {
      setFormData(existingPatient);
    }
  }, [existingPatient]);

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

    const fullName = `${formData.firstname || ''} ${formData.middlename || ''} ${formData.lastname || ''}`.trim();

    const patientData = {
      ...formData,
      name: fullName,
      registrationDate: existingPatient?.registrationDate || new Date().toISOString().split('T')[0],
    };

    onSave(patientData);
    setIsSubmitting(false);
  };

  return (
    <div className="custom-modal-backdrop">
         <div className="card card-body shadow">
      <h5 className="d-flex align-items-center">
        <User size={20} className="me-2" />
        {existingPatient ? 'Edit Patient' : 'Add New Patient'}
        <button
          type="button"
          className="btn-close ms-auto"
          onClick={onClose}
          aria-label="Close"
        />
      </h5>
     <form onSubmit={handleSubmit}>
      {/* === Personal Information === */}
      <h6 className="mb-3 border-bottom pb-1 text-primary fw-bold">Personal Information</h6>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">First Name *</label>
          <input type="text" className="form-control" name="firstname" value={formData.firstname} onChange={handleInputChange} required />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Middle Name</label>
          <input type="text" className="form-control" name="middlename" value={formData.middlename} onChange={handleInputChange} />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Last Name *</label>
          <input type="text" className="form-control" name="lastname" value={formData.lastname} onChange={handleInputChange} required />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Date of Birth</label>
          <input type="date" className="form-control" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" name="age" value={formData.age} onChange={handleInputChange} />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Gender</label>
          <select className="form-select" name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Blood Group</label>
          <select className="form-select" name="bloodgroup" value={formData.bloodgroup} onChange={handleInputChange}>
            <option value="">Select</option>
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
          <label className="form-label">Marital Status</label>
          <select className="form-select" name="marritalstatus" value={formData.marritalstatus} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Anniversary Date</label>
          <input type="date" className="form-control" name="anniversarydate" value={formData.anniversarydate} onChange={handleInputChange} />
        </div>
      </div>

      {/* === Contact Information === */}
      <h6 className="mb-3 border-bottom pb-1 text-primary fw-bold">Contact Information</h6>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Phone *</label>
          <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleInputChange} required />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Alternate Phone</label>
          <input type="tel" className="form-control" name="alternatePhone" value={formData.alternatePhone} onChange={handleInputChange} />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Email *</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Address</label>
          <input type="text" className="form-control" name="address" value={formData.address} onChange={handleInputChange} />
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">City</label>
          <input type="text" className="form-control" name="city" value={formData.city} onChange={handleInputChange} />
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">District</label>
          <input type="text" className="form-control" name="district" value={formData.district} onChange={handleInputChange} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">State</label>
          <input type="text" className="form-control" name="state" value={formData.state} onChange={handleInputChange} />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">PIN Code</label>
          <input type="text" className="form-control" name="pincode" value={formData.pincode} onChange={handleInputChange} />
        </div>
      </div>

      {/* === Identification & Other === */}
      <h6 className="mb-3 border-bottom pb-1 text-primary fw-bold">Other Details</h6>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Aadhar Number</label>
          <input type="text" className="form-control" name="adharnumber" value={formData.adharnumber} onChange={handleInputChange} />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">PAN Number</label>
          <input type="text" className="form-control" name="pannumber" value={formData.pannumber} onChange={handleInputChange} />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Referring Unit</label>
          <input type="text" className="form-control" name="refunit" value={formData.refunit} onChange={handleInputChange} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Occupation</label>
          <input type="text" className="form-control" name="occupation" value={formData.occupation} onChange={handleInputChange} />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Patient Type</label>
          <select className="form-select" name="patienttype" value={formData.patienttype} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Normal">Normal</option>
            <option value="Package">Package</option>
            <option value="VIP">VIP</option>
          </select>
        </div>
      </div>

    {/* === Identification & Other === */}
      <h6 className="mb-3 border-bottom pb-1 text-primary fw-bold">Treatment Details</h6>
      <div className="row">       
        <div className="col-md-4 mb-3">
          <label className="form-label">Doctor</label>
          <input type="text" className="form-control" name="doctor" value={formData.doctor} onChange={handleInputChange} />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Treatment Type</label>
          <select className="form-select" name="treatmentType" value={formData.treatmentType} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="IVF">IVF</option>          
            <option value="IUI">IUI</option>
            <option value="ICSI">ICSI</option>
            <option value="FET">FET</option>
            <option value="Other">Other</option>        
          </select>   
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Status</label>
          <select className="form-select" name="status" value={formData.status} onChange={handleInputChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div> 
      </div>

     

      {/* === Submit === */}
      <div className="d-flex justify-content-end border-top pt-3 mt-4">
        <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
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
              Save Patient
            </>
          )}
        </button>
      </div>
    </form>

    </div>
    </div>
   
  );
};
