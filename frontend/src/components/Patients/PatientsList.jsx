import React, { useState } from 'react';
import { Users, Search, Plus, Edit, Trash2, Phone, Mail, Calendar, User, Eye, Download, FileText } from 'lucide-react';
import { AddPatientModal } from './AddPatientModal';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export const PatientsList = ({ patients = [], onAddPatient, onEditPatient, onDeletePatient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  const filteredPatients = patients.filter(patient => {
    const name = typeof patient.name === 'string' ? patient.name.toLowerCase() : '';
    const email = typeof patient.email === 'string' ? patient.email.toLowerCase() : '';
    const doctor = typeof patient.doctor === 'string' ? patient.doctor.toLowerCase() : '';

    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      doctor.includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' ||
      (typeof patient.status === 'string' && patient.status.toLowerCase() === filterStatus.toLowerCase());

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
    const normalizedStatus = typeof status === 'string' ? status.toLowerCase() : '';
    const statusClasses = {
      active: 'bg-success',
      inactive: 'bg-secondary',
      treatment: 'bg-info',
      completed: 'bg-primary'
    };
    return `badge ${statusClasses[normalizedStatus] || 'bg-secondary'}`;
  };

  return (
    <div className="patients-list fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title d-flex align-items-center">
          <Users size={28} className="me-2" />
          Patients Management
        </h2>
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
              Export to CSV
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
          onClick={() => {
            setEditingPatient(null);
            setShowAddModal(true);
          }}
        >
          <Plus size={16} className="me-2" />
          Add New Patient
        </button>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <Search size={16} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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

      <div className="table-responsive">
        <table className="table table-hover">
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
              <th>Name</th>
              <th>Contact</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  No patients found.
                </td>
              </tr>
            ) : (
              filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedPatients.includes(patient.id)}
                      onChange={() => handleSelectPatient(patient.id)}
                    />
                  </td>
                  <td>{typeof patient.firstname === 'string' ? patient.firstname : 'Unnamed'}</td>
                  <td>
                    <div>
                      <Phone size={14} className="me-1 text-muted" />
                      {patient.phone || 'N/A'}
                    </div>
                    <div>
                      <Mail size={14} className="me-1 text-muted" />
                      {patient.email || 'N/A'}
                    </div>
                  </td>
                  <td>{typeof patient.doctor === 'string' ? patient.doctor : 'Unassigned'}</td>
                  <td>
                    <span className={getStatusBadge(patient.status)}>
                      {patient.status || 'Unknown'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => {
                        setEditingPatient(patient);
                        setShowAddModal(true);
                      }}
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDeletePatient && onDeletePatient(patient.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddPatientModal
          onClose={() => {
            setShowAddModal(false);
            setEditingPatient(null);
          }}
          onSave={(data) => {
            if (editingPatient) {
              onEditPatient(data);
            } else {
              onAddPatient(data);
            }
            setShowAddModal(false);
            setEditingPatient(null);
          }}
          existingPatient={editingPatient}
        />
      )}
    </div>
  );
};
