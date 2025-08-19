import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, Edit, Trash2, Phone, Mail, Calendar, User, Eye, FileText } from 'lucide-react';

const PlanningDetails = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [planningDate, setPlanningDate] = useState('');
  const [treatmentType, setTreatmentType] = useState('');
  const [planningNotes, setPlanningNotes] = useState('');
  const [activeTab, setActiveTab] = useState('all-planning'); // Default to 'all-planning'

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch('https://687a64bcabb83744b7eca95c.mockapi.io/IVFApp/patientlist');
      const data = await response.json();
      setPatients(data);
    };
    fetchPatients();
  }, []);

  const handlePatientChange = (event) => {
    setSelectedPatient(event.target.value);
  };

  const handlePlanningDateChange = (event) => {
    setPlanningDate(event.target.value);
  };

  const handleTreatmentChange = (event) => {
    setTreatmentType(event.target.value);
  };

  const handleNotesChange = (event) => {
    setPlanningNotes(event.target.value);
  };

  const handleSave = () => {
    alert(`Planning details saved for patient ${selectedPatient}`);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderPatientsList = (status) => {
    return patients
      .filter(patient => status === 'all' || patient.status === status)
      .map(patient => (
        <tr key={patient.id}>
          <td>{patient.firstName} {patient.lastName}</td>
          <td>{patient.status}</td>
        </tr>
      ));
  };

  return (
    <div className="planning-details">
      {/* Planning Form Section */}
      <div className="form-section">
        <div className="form-group">
          <label>Patient: *</label>
          <select
            className="form-control"
            value={selectedPatient}
            onChange={handlePatientChange}
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.firstName} {patient.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Planning Date: *</label>
          <input
            type="date"
            className="form-control"
            value={planningDate}
            onChange={handlePlanningDateChange}
          />
        </div>

        <div className="form-group">
          <label>Treatment Type: *</label>
          <select
            className="form-control"
            value={treatmentType}
            onChange={handleTreatmentChange}
          >
            <option value="">Select Treatment Type</option>
            <option value="IVF">IVF (In Vitro Fertilization)</option>
            <option value="IUI">IUI (Intrauterine Insemination)</option>
            <option value="ICSI">ICSI (Intracytoplasmic Sperm Injection)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Planning Notes:</label>
          <textarea
            className="form-control"
            value={planningNotes}
            onChange={handleNotesChange}
            placeholder="Enter planning and preparation notes..."
          />
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => {
              setSelectedPatient('');
              setPlanningDate('');
              setTreatmentType('');
              setPlanningNotes('');
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>

      {/* Tabs below the save button */}
      <div className="patients-tabs mb-4 border-top pt-4 mt-4 d-flex gap-4">
        <div
          className={`tab-item ${activeTab === 'all-planning' ? 'active' : ''}`}
          onClick={() => handleTabChange('all-planning')}
        >
          All Patient Planning
        </div>
        <div
          className={`tab-item ${activeTab === 'active-planning' ? 'active' : ''}`}
          onClick={() => handleTabChange('active-planning')}
        >
          Active Planning Patient
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'all-planning' && (
        <div>
          <h5>All Patient Planning</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {renderPatientsList('all')}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'active-planning' && (
        <div>
          <h5>Active Planning Patients</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {renderPatientsList('active')}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PlanningDetails;
