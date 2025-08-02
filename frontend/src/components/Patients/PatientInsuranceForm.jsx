import React, { useState } from 'react';
import { Save, X, CreditCard } from 'lucide-react';

export const PatientInsuranceForm = ({ onSave, onCancel }) => {
  const [insuranceData, setInsuranceData] = useState({
    company: '',
    amountCovered: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInsuranceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(insuranceData);
  };

  return (
    <div className="card card-body shadow-sm mb-4">
      <h5 className="mb-4 d-flex align-items-center">
        <CreditCard size={20} className="me-2" />
        Patient Insurance
        <button
          type="button"
          className="btn-close ms-auto"
          onClick={onCancel}
          aria-label="Close"
        />
      </h5>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Insurance Company</label>
            <input
              type="text"
              className="form-control"
              name="company"
              value={insuranceData.company}
              onChange={handleChange}
              placeholder="e.g. Blue Cross, Aetna..."
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Amount Covered ($)</label>
            <input
              type="number"
              className="form-control"
              name="amountCovered"
              value={insuranceData.amountCovered}
              onChange={handleChange}
              placeholder="e.g. 10000"
              required
            />
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
            <X size={16} className="me-1" />
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Save size={16} className="me-1" />
            Save Insurance
          </button>
        </div>
      </form>
    </div>
  );
};
