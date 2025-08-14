import React, { useState,useEffect } from 'react';
import { Calendar, Clock, User, Search, Plus, Edit, Trash2, Phone, Mail, Download, FileText, Eye, UserCheck,CheckCircle } from 'lucide-react';
import { AddAppointmentModal } from './AddAppointmentModal';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export const AppointmentList = ({ onAddToPatients }) => {
const [editingAppointment, setEditingAppointment] = useState(null);

  const [appointments, setAppointments] = useState([]);

     const appointmentAPI = 'https://687a64bcabb83744b7eca95c.mockapi.io/IVFApp/appointmentList';

  const getAppointmentData = async () => {
    try {
      const res = await fetch(appointmentAPI);
      const data = await res.json();
      console.log(data);
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointment data:', error);
    }
  };
  
  useEffect(() => {
    getAppointmentData();
  }, []);


  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAppointments, setSelectedAppointments] = useState([]);

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesDate = !filterDate || appointment.date === filterDate;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      confirmed: 'bg-success',
      pending: 'bg-warning',
      cancelled: 'bg-danger',
      completed: 'bg-info'
    };
    
    return `badge ${statusClasses[status] || 'bg-secondary'}`;
  };

const handleAddAppointment = (savedAppointment) => {
  if (editingAppointment) {
    setAppointments(prev =>
      prev.map(apt => apt.id === savedAppointment.id ? savedAppointment : apt)
    );
    setEditingAppointment(null);
  } else {
    const appointment = {
      ...savedAppointment,
      id: savedAppointment.id || appointments.length + 1,
      status: 'pending',
      isPatient: false
    };
    setAppointments([...appointments, appointment]);
  }
  setShowAddModal(false);
};


  const handleDeleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        const res = await fetch(`${appointmentAPI}/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setAppointments(appointments.filter(apt => apt.id !== id));
        } else {
          alert('Failed to delete appointment.');
        }
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('An error occurred while deleting the appointment.');
      }
    }
  };

  // When "Add Patient" is clicked, mark the appointment as a patient and call the parent handler to add to patients list
  const handleAddToPatients = (appointmentId) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment && !appointment.isPatient) {
      // Mark as patient in local state
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId ? { ...apt, isPatient: true } : apt
      ));

      // Call parent handler to add to patients list
      if (onAddToPatients) {
        onAddToPatients({
          id: Date.now(),
          name: appointment.patientName,
          email: appointment.patientEmail,
          phone: appointment.patientPhone,
          registrationDate: new Date().toISOString().split('T')[0],
          status: 'Active',
          lastVisit: appointment.date,
          treatmentType: appointment.type,
          doctor: appointment.doctor
        });
      }
    }
  };

  const handleSelectAppointment = (id) => {
    setSelectedAppointments(prev => 
      prev.includes(id) 
        ? prev.filter(aptId => aptId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedAppointments.length === filteredAppointments.length) {
      setSelectedAppointments([]);
    } else {
      setSelectedAppointments(filteredAppointments.map(apt => apt.id));
    }
  };

  const exportToExcel = () => {
    const exportData = filteredAppointments.map(appointment => ({
      'Patient Name': appointment.patientName,
      'Email': appointment.patientEmail,
      'Phone': appointment.patientPhone,
      'Date': appointment.date,
      'Time': appointment.time,
      'Type': appointment.type,
      'Doctor': appointment.doctor,
      'Status': appointment.status,
      'Patient Status': appointment.isPatient ? 'Registered' : 'Not Registered',
      'Notes': appointment.notes
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Appointments');
    
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

    XLSX.writeFile(wb, `appointments_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Appointments Report', 14, 22);
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32);
    
    // Prepare table data
    const tableData = filteredAppointments.map(appointment => [
      appointment.patientName,
      appointment.date,
      appointment.time,
      appointment.type,
      appointment.doctor,
      appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1),
      appointment.isPatient ? 'Yes' : 'No'
    ]);

    // Add table
    doc.autoTable({
      head: [['Patient Name', 'Date', 'Time', 'Type', 'Doctor', 'Status', 'Patient']],
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
        0: { cellWidth: 30 },
        1: { cellWidth: 22 },
        2: { cellWidth: 18 },
        3: { cellWidth: 22 },
        4: { cellWidth: 22 },
        5: { cellWidth: 20 },
        6: { cellWidth: 16 }
      }
    });

    // Add summary
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total Appointments: ${filteredAppointments.length}`, 14, finalY);
    
    // Count by status
    const statusCounts = filteredAppointments.reduce((acc, apt) => {
      acc[apt.status] = (acc[apt.status] || 0) + 1;
      return acc;
    }, {});
    
    let yPos = finalY + 10;
    Object.entries(statusCounts).forEach(([status, count]) => {
      doc.text(`${status.charAt(0).toUpperCase() + status.slice(1)}: ${count}`, 14, yPos);
      yPos += 7;
    });

    doc.save(`appointments_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="appointments-list fade-in">


   

      
      {/* Header */}
      <div className="appointments-header">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <h2 className="page-title mb-0">
            <Calendar size={28} className="me-2" />
            Appointments Management
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
              Add New Appointment
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="appointments-filters">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="search-box">
                <div className="input-group">
                  <span className="input-group-text">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search patients, doctors, or appointment type..."
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
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                  setFilterDate('');
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
              <div className="stat-number">{filteredAppointments.length}</div>
              <div className="stat-label">Total</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <div className="stat-number text-success">
                {filteredAppointments.filter(apt => apt.status === 'confirmed').length}
              </div>
              <div className="stat-label">Confirmed</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <div className="stat-number text-warning">
                {filteredAppointments.filter(apt => apt.status === 'pending').length}
              </div>
              <div className="stat-label">Pending</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <div className="stat-number text-info">
                {filteredAppointments.filter(apt => apt.isPatient).length}
              </div>
              <div className="stat-label">Patients</div>
            </div>
          </div>
        </div>
      </div>



      {/* Appointments Table */}
      <div className="appointments-table-container">
        <div className="table-responsive">
          <table className="table table-hover appointments-table">
            <thead>
              <tr>
                {/* <th>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedAppointments.length === filteredAppointments.length && filteredAppointments.length > 0}
                    onChange={handleSelectAll}
                  />
                </th> */}
                <th>Patient Name</th>
                <th>Contact</th>
                <th>Date & Time</th>
                <th>Type</th>
                <th>Doctor</th>
                <th>Status</th>
                <th>Patient Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-5">
                    <Calendar size={48} className="text-muted mb-3" />
                    <h5>No appointments found</h5>
                    <p className="text-muted">Try adjusting your search criteria or add a new appointment.</p>
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className={selectedAppointments.includes(appointment.id) ? 'table-active' : ''}>
                    {/* <td>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedAppointments.includes(appointment.id)}
                        onChange={() => handleSelectAppointment(appointment.id)}
                      />
                    </td> */}
                    <td>
                      <div className="patient-info">
                        <div className="patient-name">{appointment.patientName}</div>
                        {appointment.notes && (
                          <small className="text-muted text-truncate d-block" style={{ maxWidth: '200px' }}>
                            {appointment.notes}
                          </small>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div className="d-flex align-items-center mb-1">
                          <Phone size={14} className="me-1 text-muted" />
                          <small>{appointment.patientPhone}</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <Mail size={14} className="me-1 text-muted" />
                          <small className="text-truncate" style={{ maxWidth: '150px' }}>
                            {appointment.patientEmail}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="datetime-info">
                        <div className="d-flex align-items-center mb-1">
                          <Calendar size={14} className="me-1 text-muted" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Clock size={14} className="me-1 text-muted" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="type-badge">{appointment.type}</span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <User size={16} className="me-1 text-muted" />
                        {appointment.doctor}
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadge(appointment.status)}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      {appointment.isPatient ? (
                        <span className="badge bg-success">
                          <UserCheck size={14} className="me-1" />
                          Registered
                        </span>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleAddToPatients(appointment.id)}
                          title="Add to Patients List"
                        >
                          <UserCheck size={14} className="me-1" />
                          Add Patient
                        </button>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-sm btn-outline-info me-1" title="View Details">
                          <Eye size={14} />
                        </button>
                       <button
  className="btn btn-sm btn-outline-primary me-1"
  title="Edit"
  onClick={() => {
    setEditingAppointment(appointment);
    setShowAddModal(true);
  }}
>
  <Edit size={14} />
</button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteAppointment(appointment.id)}
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
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
       <AddAppointmentModal
  onClose={() => {
    setShowAddModal(false);
    setEditingAppointment(null);
  }}
  onSave={handleAddAppointment}
  defaultValues={editingAppointment}
/>
      )}
    </div>
  );
};