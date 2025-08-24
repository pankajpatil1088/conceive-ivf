import React, { useState, useEffect } from 'react';
import { Plus, User, Phone, Mail, Search, Download, FileText } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PlanningDetails = () => {
  const [allPatients, setAllPatients] = useState([]);
  const [planningPatients, setPlanningPatients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDropdownPatient, setSelectedDropdownPatient] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchAllPatients();
  }, []);

  const fetchAllPatients = async () => {
    const res = await fetch('https://687a64bcabb83744b7eca95c.mockapi.io/IVFApp/patientlist');
    const data = await res.json();
    setAllPatients(data);
  };

  const handleAddSelectedPatient = () => {
    if (!selectedDropdownPatient) return;
    const exists = planningPatients.find(p => p.id === selectedDropdownPatient);
    if (!exists) {
      const patient = allPatients.find(p => p.id === selectedDropdownPatient);
      if (patient) {
        setPlanningPatients(prev => [patient, ...prev]);
      }
    }
    setShowAddModal(false);
    setSelectedDropdownPatient('');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  const exportToExcel = () => {
    const exportData = planningPatients.map(patient => ({
      'Name': `${patient.firstName} ${patient.lastName}`,
      'Phone': patient.phone,
      'Email': patient.email,
      'Doctor': patient.doctor,
      'Status': patient.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PlanningPatients');
    XLSX.writeFile(workbook, `planning_patients_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Planning Patients Report', 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    const rows = planningPatients.map(patient => [
      `${patient.firstName} ${patient.lastName}`,
      patient.phone,
      patient.email,
      patient.doctor,
      patient.status,
    ]);

    doc.autoTable({
      head: [['Name', 'Phone', 'Email', 'Doctor', 'Status']],
      body: rows,
      startY: 40,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [13, 110, 253], textColor: 255 },
      alternateRowStyles: { fillColor: [248, 249, 250] }
    });

    doc.save(`planning_patients_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const renderTable = () => {
    const filtered = planningPatients.filter((p) => {
      const matchesTab = activeTab === 'all' || p.status?.toLowerCase() === 'active';
      const matchesStatus = statusFilter === 'all' || p.status?.toLowerCase() === statusFilter.toLowerCase();
      const matchesSearch =
        p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone.includes(searchTerm);
      return matchesTab && matchesStatus && matchesSearch;
    });

    return (
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Patient Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Doctor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan="5" className="text-center">No patients found</td></tr>
          ) : (
            filtered.map((p) => (
              <tr key={p.id}>
                <td><User size={14} className="me-1 text-muted" /> {p.firstName} {p.lastName}</td>
                <td><Phone size={14} className="me-1 text-muted" /> {p.phone}</td>
                <td><Mail size={14} className="me-1 text-muted" /> {p.email}</td>
                <td>{p.doctor}</td>
                <td>
                  <span className={`badge ${p.status?.toLowerCase() === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                    {p.status || 'N/A'}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div className="planning-details container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold d-flex align-items-center">
          <User className="me-2" /> Planning Details
        </h4>
        <div className="d-flex gap-2">
          <div className="dropdown">
            <button className="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown">
              <Download size={16} className="me-1" /> Export Data
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={exportToExcel}><FileText size={14} className="me-2" /> Export to Excel</button></li>
              <li><button className="dropdown-item" onClick={exportToPDF}><FileText size={14} className="me-2" /> Export to PDF</button></li>
            </ul>
          </div>
          <button className="btn btn-primary d-flex align-items-center" onClick={() => setShowAddModal(true)}>
            <Plus size={16} className="me-1" /> Add New Patient
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="d-flex gap-2 mb-3">
        <div className="input-group flex-grow-1">
          <span className="input-group-text"><Search size={16} /></span>
          <input
            type="text"
            className="form-control"
            placeholder="Search patients by name, email, or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="form-select w-auto"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className="btn btn-outline-secondary" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {/* Tabs */}
      <div className="nav nav-tabs mb-3">
        <button
          className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Planning
        </button>
        <button
          className={`nav-link ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active Planning
        </button>
      </div>

      {renderTable()}

      {/* Modal */}
      {showAddModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Patient</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                <select
                  className="form-select"
                  value={selectedDropdownPatient}
                  onChange={(e) => setSelectedDropdownPatient(e.target.value)}
                >
                  <option value="">Select Patient</option>
                  {allPatients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.firstName} {p.lastName} ({p.phone})
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleAddSelectedPatient}>Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanningDetails;
