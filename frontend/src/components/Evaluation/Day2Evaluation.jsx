import React, { useState } from 'react';
import { Search, Plus, RotateCcw, FileText, Eye, Edit, Trash2, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const Day2Evaluation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('planningNo');
  const [selectedPatients, setSelectedPatients] = useState([]);

  // Mock data based on the image
  const [evaluationData] = useState([
    {
      id: 1,
      srNo: 1,
      patient: 'Mrs NAINA BHANUDAS PATIL',
      age: '37 yrs',
      gender: 'Female',
      patientType: 'NORMAL',
      mobileNo: '9087937671',
      uhid: 'P87025697412',
      referringUnit: 'DIRECT',
      latestPlanningTreatmentName: 'SELF OOCYTE FRESH SELF SEMEN OPU IVF/ICSI',
      planningNo: 'PICACFW/TT/523/1',
      latestLMPDate: '20/Apr/2023',
      latestOCPLDDate: '31/May/2023',
      status: 'Active',
      comments: '',
      auditLog: 'View'
    },
    {
      id: 2,
      srNo: 2,
      patient: 'Miss TEST T TESTING TESTING',
      age: '28 yrs',
      gender: 'Female',
      patientType: 'NORMAL',
      mobileNo: '9985623569B',
      uhid: '789425697412',
      referringUnit: 'DR REFERENCE',
      latestPlanningTreatmentName: 'SELF OOCYTE FRESH SELF SEMEN OPU IVF/ICSI',
      planningNo: 'PICACFW/TT/523/1',
      latestLMPDate: '20/Apr/2023',
      latestOCPLDDate: '31/May/2023',
      status: 'Active',
      comments: '',
      auditLog: 'View'
    },
    {
      id: 3,
      srNo: 3,
      patient: 'Mrs SHALINI KANIM',
      age: '33 yrs',
      gender: 'Female',
      patientType: 'NORMAL',
      mobileNo: '9889999888',
      uhid: '0000010893',
      referringUnit: 'DIRECT',
      latestPlanningTreatmentName: 'SELF OOCYTE FRESH SELF SEMEN OPU IVF/ICSI',
      planningNo: 'PICACFW/SK/523/1',
      latestLMPDate: '21/Oct/2022',
      latestOCPLDDate: '24/Oct/2022',
      status: 'Active',
      comments: '',
      auditLog: 'View'
    },
    {
      id: 4,
      srNo: 4,
      patient: 'Mrs DURMI SHAH',
      age: '33 yrs',
      gender: 'Female',
      patientType: 'NORMAL',
      mobileNo: '900987778',
      uhid: '0000010802',
      referringUnit: 'DIRECT',
      latestPlanningTreatmentName: 'SELF OOCYTE FRESH SELF SEMEN OPU IVF/ICSI',
      planningNo: 'PICACFW/DS/523/1',
      latestLMPDate: '15/Sep/2022',
      latestOCPLDDate: '17/Sep/2022',
      status: 'Active',
      comments: '',
      auditLog: 'View'
    },
    {
      id: 5,
      srNo: 5,
      patient: 'Mrs NITU RAUT',
      age: '40 yrs',
      gender: 'Female',
      patientType: 'NORMAL',
      mobileNo: '9897867565',
      uhid: '0000010734',
      referringUnit: 'DIRECT',
      latestPlanningTreatmentName: 'SELF OOCYTE FRESH SELF SEMEN OPU IVF/ICSI',
      planningNo: 'PICACFW/NR/423/1',
      latestLMPDate: '09/Apr/2023',
      latestOCPLDDate: '11/Apr/2023',
      status: 'Active',
      comments: '',
      auditLog: 'View'
    },
    {
      id: 6,
      srNo: 6,
      patient: 'Mrs TEST W',
      age: '40 yrs',
      gender: 'Female',
      patientType: 'NORMAL',
      mobileNo: '8877889889',
      uhid: '0000010170',
      referringUnit: 'DIRECT',
      latestPlanningTreatmentName: 'SELF OOCYTE FRESH SELF SEMEN OPU IVF/ICSI',
      planningNo: 'PICACFW/TW/423/1',
      latestLMPDate: '15/Mar/2023',
      latestOCPLDDate: '18/Mar/2023',
      status: 'Active',
      comments: '',
      auditLog: 'View'
    },
    {
      id: 7,
      srNo: 7,
      patient: 'Mrs POONAM PATIL',
      age: '40 yrs',
      gender: 'Female',
      patientType: 'NORMAL',
      mobileNo: '9004353546',
      uhid: '0000010149',
      referringUnit: 'DIRECT',
      latestPlanningTreatmentName: 'SELF OOCYTE FRESH SELF SEMEN OPU IVF/ICSI',
      planningNo: 'PICACFW/PP/423/1',
      latestLMPDate: '01/Mar/2023',
      latestOCPLDDate: '04/Mar/2023',
      status: 'Active',
      comments: '',
      auditLog: 'View'
    },
    {
      id: 8,
      srNo: 8,
      patient: 'Mrs TEST WIFE',
      age: '36 yrs',
      gender: 'Female',
      patientType: 'NORMAL',
      mobileNo: '9677647364738377',
      uhid: '0000010043',
      referringUnit: 'DIRECT',
      latestPlanningTreatmentName: 'SELF OOCYTE FRESH SELF SEMEN OPU IVF/ICSI',
      planningNo: 'PICACFW/TW/323/1',
      latestLMPDate: '01/Mar/2023',
      latestOCPLDDate: '04/Mar/2023',
      status: 'Active',
      comments: '',
      auditLog: 'View'
    },
    {
      id: 9,
      srNo: 9,
      patient: 'Mrs SWATI DEMO',
      age: '39 yrs',
      gender: 'Female',
      patientType: 'NORMAL',
      mobileNo: '8765432345',
      uhid: '0000008078',
      referringUnit: 'DIRECT',
      latestPlanningTreatmentName: 'PLANNED RELATIONS',
      planningNo: 'PICACFW/SD/1222/1',
      latestLMPDate: '13/Dec/2022',
      latestOCPLDDate: '14/Dec/2022',
      status: 'Active',
      comments: '',
      auditLog: 'View'
    }
  ]);

  const filteredData = evaluationData.filter(patient => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.patient.toLowerCase().includes(searchLower) ||
      patient.uhid.toLowerCase().includes(searchLower) ||
      patient.mobileNo.includes(searchTerm) ||
      patient.planningNo.toLowerCase().includes(searchLower)
    );
  });

  const handleSelectPatient = (id) => {
    setSelectedPatients(prev => 
      prev.includes(id) 
        ? prev.filter(patientId => patientId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedPatients.length === filteredData.length) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(filteredData.map(patient => patient.id));
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setSortBy('planningNo');
    setSelectedPatients([]);
  };

  const exportToExcel = () => {
    const exportData = filteredData.map(patient => ({
      'Sr. No.': patient.srNo,
      'Patient': patient.patient,
      'Age': patient.age,
      'Gender': patient.gender,
      'Patient Type': patient.patientType,
      'Mobile No': patient.mobileNo,
      'UHID': patient.uhid,
      'Referring Unit': patient.referringUnit,
      'Latest Planning Treatment Name': patient.latestPlanningTreatmentName,
      'Planning No.': patient.planningNo,
      'Latest LMP Date': patient.latestLMPDate,
      'Latest OCPLD Date': patient.latestOCPLDDate,
      'Status': patient.status
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Day2 Evaluation');
    
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

    XLSX.writeFile(wb, `day2_evaluation_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF('l', 'mm', 'a4'); // landscape orientation
    
    // Add title
    doc.setFontSize(16);
    doc.text('Day 2 Evaluation List', 14, 15);
    
    // Add date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);
    
    // Prepare table data
    const tableData = filteredData.map(patient => [
      patient.srNo,
      patient.patient,
      patient.age,
      patient.gender,
      patient.patientType,
      patient.mobileNo,
      patient.uhid,
      patient.referringUnit,
      patient.planningNo,
      patient.latestLMPDate,
      patient.latestOCPLDDate,
      patient.status
    ]);

    // Add table
    doc.autoTable({
      head: [['Sr.', 'Patient', 'Age', 'Gender', 'Type', 'Mobile', 'UHID', 'Unit', 'Planning No.', 'LMP Date', 'OCPLD Date', 'Status']],
      body: tableData,
      startY: 30,
      styles: {
        fontSize: 8,
        cellPadding: 1,
      },
      headStyles: {
        fillColor: [13, 110, 253],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [248, 249, 250]
      }
    });

    doc.save(`day2_evaluation_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="day2-evaluation fade-in">
      {/* Header */}
      <div className="evaluation-header bg-white rounded-3 p-4 mb-4 shadow-sm">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <h2 className="page-title mb-0 d-flex align-items-center">
            <FileText size={28} className="me-2 text-primary" />
            Day 2 Evaluation List
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
            <button className="btn btn-success">
              <Plus size={16} className="me-2" />
              Add Patient
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="row g-3 align-items-end">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Search By: *</label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <Search size={16} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter UHID or Mobile No or Patient Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Sort By:</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="planningNo">Planning No</option>
              <option value="patient">Patient Name</option>
              <option value="uhid">UHID</option>
              <option value="age">Age</option>
            </select>
          </div>
          <div className="col-md-3">
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-danger"
                onClick={handleReset}
              >
                <RotateCcw size={16} className="me-1" />
                Reset
              </button>
              <button className="btn btn-primary">
                <Search size={16} className="me-1" />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-3">
          <small className="text-muted">
            Showing Records 1 to {filteredData.length} of {evaluationData.length}
          </small>
        </div>
      </div>

      {/* Table */}
      <div className="evaluation-table-container bg-white rounded-3 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-primary">
              <tr>
                <th className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedPatients.length === filteredData.length && filteredData.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Sr. No.</th>
                <th>Patient</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Patient Type</th>
                <th>Mobile No</th>
                <th>UHID</th>
                <th>Referring Unit</th>
                <th>Latest Planning Treatment Name</th>
                <th>Planning No.</th>
                <th>Latest LMP Date</th>
                <th>Latest OCPLD Date</th>
                <th>Status</th>
                <th>Comments</th>
                <th>Audit Log</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="16" className="text-center py-5">
                    <FileText size={48} className="text-muted mb-3" />
                    <h5>No evaluation records found</h5>
                    <p className="text-muted">Try adjusting your search criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredData.map((patient) => (
                  <tr key={patient.id} className={selectedPatients.includes(patient.id) ? 'table-active' : ''}>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedPatients.includes(patient.id)}
                        onChange={() => handleSelectPatient(patient.id)}
                      />
                    </td>
                    <td className="fw-semibold">{patient.srNo}</td>
                    <td>
                      <div className="text-primary fw-semibold" style={{ minWidth: '200px' }}>
                        {patient.patient}
                      </div>
                    </td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>
                      <span className="badge bg-info text-dark">{patient.patientType}</span>
                    </td>
                    <td>{patient.mobileNo}</td>
                    <td className="fw-semibold text-primary">{patient.uhid}</td>
                    <td>{patient.referringUnit}</td>
                    <td style={{ minWidth: '250px' }}>{patient.latestPlanningTreatmentName}</td>
                    <td className="fw-semibold">{patient.planningNo}</td>
                    <td>{patient.latestLMPDate}</td>
                    <td>{patient.latestOCPLDDate}</td>
                    <td>
                      <span className="badge bg-success">{patient.status}</span>
                    </td>
                    <td>{patient.comments || '-'}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary">
                        <Eye size={14} className="me-1" />
                        {patient.auditLog}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center">
        <small className="text-muted">
          Copyright © 2023 By ACSSEL INFOTECH PVT LTD
        </small>
      </div>
    </div>
  );
};