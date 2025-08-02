import React, { useState } from 'react';
import { Users, Search, Plus, Edit, Trash2, Phone, Mail, Calendar, User, Eye, Download, FileText } from 'lucide-react';
import { AddPatientModal } from './AddPatientModal';
import { PatientInsuranceForm } from './PatientInsuranceForm';
import { PatientDocumentForm } from './PatientDocumentForm';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const PatientsList = ({ patients = [], onAddPatient, onEditPatient, onDeletePatient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('patient-details');

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.doctor?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || patient.status?.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handleSelectPatient = (id) => {
    setSelectedPatients(prev => 
      prev.includes(id) 
        ? prev.filter(patientId => patientId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedPatients.length === filteredPatients.length) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(filteredPatients.map(patient => patient.id));
    }
  };

  const exportToExcel = () => {
    const exportData = filteredPatients.map(patient => ({
      'Patient Name': patient.name,
      'Email': patient.email,
      'Phone': patient.phone,
      'Registration Date': patient.registrationDate,
      'Status': patient.status,
      'Last Visit': patient.lastVisit,
      'Treatment Type': patient.treatmentType,
      'Doctor': patient.doctor
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Patients');
    
    // Auto-size columns
    const colWidths = [];
    const headers = Object.keys(exportData[0] || {});
    headers.forEach((header, index) => {
      const maxLength = Math.max(
        header.length,
        ...exportData.map(row => String(row[header] || '').length)
      );
      colWidths[index] = { wch: Math.min(maxLength + 2, 50) };
    });
    ws['!cols'] = colWidths;

    XLSX.writeFile(wb, `patients_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Patients Report', 14, 22);
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32);
    
    // Prepare table data
    const tableData = filteredPatients.map(patient => [
      patient.name,
      patient.email,
      patient.phone,
      patient.registrationDate,
      patient.status,
      patient.lastVisit || 'N/A',
      patient.doctor || 'N/A'
    ]);

    // Add table
    doc.autoTable({
      head: [['Name', 'Email', 'Phone', 'Reg. Date', 'Status', 'Last Visit', 'Doctor']],
      body: tableData,
      startY: 40,
      styles: {
        fontSize: 9,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [13, 110, 253],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [248, 249, 250]
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 35 },
        2: { cellWidth: 25 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 },
        6: { cellWidth: 25 }
      }
    });

    // Add summary
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total Patients: ${filteredPatients.length}`, 14, finalY);

    doc.save(`patients_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-success',
      inactive: 'bg-secondary',
      treatment: 'bg-info',
      completed: 'bg-primary'
    };
    
    return `badge ${statusClasses[status?.toLowerCase()] || 'bg-secondary'}`;
  };

  const handleAddPatient = (patientData) => {
    if (onAddPatient) {
      onAddPatient(patientData);
    }
    setShowAddModal(false);
  };

  return (
    <div className="patients-list fade-in">
      {/* Header */}
      <div className="patients-header">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <h2 className="page-title mb-0">
            <Users size={28} className="me-2" />
            Patients Management
          </h2>
          <div className="d-flex flex-column flex-sm-row gap-2">
            <div className="dropdown">
              <button 
                className="btn btn-outline-success dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Download size={16} className="me-2" />
                Export Data
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={exportToExcel}>
                    <FileText size={16} className="me-2" />
                    Export to Excel
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={exportToPDF}>
                    <FileText size={16} className="me-2" />
                    Export to PDF
                  </button>
                </li>
              </ul>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={16} className="me-2" />
              Add New Patient
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="patients-filters">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="search-box">
                <div className="input-group">
                  <span className="input-group-text">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search patients by name, email, or doctor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="treatment">In Treatment</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="col-md-3">
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="row mt-4">
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <div className="stat-number">{filteredPatients.length}</div>
              <div className="stat-label">Total Patients</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <div className="stat-number text-success">
                {filteredPatients.filter(patient => patient.status?.toLowerCase() === 'active').length}
              </div>
              <div className="stat-label">Active</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <div className="stat-number text-info">
                {filteredPatients.filter(patient => patient.status?.toLowerCase() === 'treatment').length}
              </div>
              <div className="stat-label">In Treatment</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <div className="stat-number text-primary">
                {filteredPatients.filter(patient => patient.status?.toLowerCase() === 'completed').length}
              </div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
        </div>
      </div>



{/* Tabs Section */}
<div className="patients-tabs mb-4 border-bottom d-flex gap-4">
  <div
    className={`tab-item ${activeTab === 'patient-details' ? 'active' : ''}`}
    onClick={() => setActiveTab('patient-details')}
  >
    Patient's Details <span className="badge bg-primary ms-1">1</span>
  </div>
  <div
    className={`tab-item ${activeTab === 'patient-insurance' ? 'active' : ''}`}
    onClick={() => setActiveTab('patient-insurance')}
  >
     Patient's Insurance
  </div>
  <div
    className={`tab-item ${activeTab === 'patient-documents' ? 'active' : ''}`}
    onClick={() => setActiveTab('patient-documents')}
  >
     Patient's Documents
  </div>
   <div
    className={`tab-item ${activeTab === 'relation-mapping' ? 'active' : ''}`}
    onClick={() => setActiveTab('relation-mapping')}
  >
    Relation Mapping
  </div>
</div>

{activeTab === 'patient-details' && (
  <div className="patients-table-container">
    {showAddModal && (
      <AddPatientModal
        onClose={() => setShowAddModal(false)}
        onSave={handleAddPatient}
      />
    )}

    {!showAddModal && (
      <div className="table-responsive">
          <table className="table table-hover patients-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedPatients.length === filteredPatients.length && filteredPatients.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Patient Name</th>
                <th>Contact Information</th>
                <th>Registration Date</th>
                <th>Status</th>
                <th>Last Visit</th>
                <th>Treatment Type</th>
                <th>Doctor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-5">
                    <Users size={48} className="text-muted mb-3" />
                    <h5>No patients found</h5>
                    <p className="text-muted">
                      {patients.length === 0 
                        ? "No patients registered yet. Add patients from appointments or register new ones."
                        : "Try adjusting your search criteria."
                      }
                    </p>
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className={selectedPatients.includes(patient.id) ? 'table-active' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedPatients.includes(patient.id)}
                        onChange={() => handleSelectPatient(patient.id)}
                      />
                    </td>
                    <td>
                      <div className="patient-info">
                        <div className="patient-name">{patient.name}</div>
                        <small className="text-muted">ID: {patient.id}</small>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div className="d-flex align-items-center mb-1">
                          <Phone size={14} className="me-1 text-muted" />
                          <small>{patient.phone}</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <Mail size={14} className="me-1 text-muted" />
                          <small className="text-truncate" style={{ maxWidth: '150px' }}>
                            {patient.email}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Calendar size={14} className="me-1 text-muted" />
                        {patient.registrationDate}
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadge(patient.status)}>
                        {patient.status}
                      </span>
                    </td>
                    <td>
                      {patient.lastVisit ? (
                        <div className="d-flex align-items-center">
                          <Calendar size={14} className="me-1 text-muted" />
                          {patient.lastVisit}
                        </div>
                      ) : (
                        <span className="text-muted">No visits</span>
                      )}
                    </td>
                    <td>
                      <span className="treatment-badge">
                        {patient.treatmentType || 'Not specified'}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <User size={14} className="me-1 text-muted" />
                        {patient.doctor || 'Not assigned'}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-sm btn-outline-info me-1" title="View Details">
                          <Eye size={14} />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-primary me-1" 
                          title="Edit"
                          onClick={() => onEditPatient && onEditPatient(patient)}
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => onDeletePatient && onDeletePatient(patient.id)}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
    )}
  </div>
)}


{activeTab === 'patient-insurance' && (
  <PatientInsuranceForm
    onSave={(data) => {
      console.log('Saved Insurance:', data);
      // You can update patient data or state here
    }}
    onCancel={() => setActiveTab('patient-details')}
  />
)}


{activeTab === 'patient-documents' && (
  <PatientDocumentForm />
)}

      {/* Patients Table */}
     

      {/* Add Patient Modal */}
      {/* {showAddModal && (
        <AddPatientModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddPatient}
        />
      )} */}
    </div>
  );
};