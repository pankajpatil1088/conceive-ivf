import React, { useState } from 'react';
import { Eye, Trash2, Upload, FileText } from 'lucide-react';

export const PatientDocumentForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    documentType: '',
    file: null,
  });
  const [documents, setDocuments] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpload = () => {
    if (!formData.date || !formData.documentType || !formData.file) return;

    const newDoc = {
      id: Date.now(),
      fileName: formData.file.name,
      date: formData.date,
      documentType: formData.documentType,
      file: formData.file,
    };
    setDocuments(prev => [...prev, newDoc]);
    setFormData({ date: '', documentType: '', file: null });
  };

  const handleDelete = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <div className="card card-body shadow-sm mb-4">
      <div className="row align-items-end mb-3">
        <div className="col-md-3">
          <label className="form-label">Date <span className="text-danger">*</span></label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Document Type <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Select File <span className="text-danger">*</span></label>
          <input
            type="file"
            className="form-control"
            name="file"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-primary w-100 mt-2"
            onClick={handleUpload}
          >
            <Upload size={16} className="me-1" /> Upload
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Sr. No.</th>
              <th>File Name</th>
              <th>Date</th>
              <th>Document Type</th>
              <th>Reupload</th>
              <th>Preview</th>
              <th>Action</th>
              <th>Audit Log</th>
            </tr>
          </thead>
          <tbody>
            {documents.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No documents uploaded</td>
              </tr>
            ) : (
              documents.map((doc, index) => (
                <tr key={doc.id}>
                  <td>{index + 1}</td>
                  <td className="text-primary">{doc.fileName}</td>
                  <td>{new Date(doc.date).toLocaleDateString('en-GB', {
                    day: '2-digit', month: 'short', year: 'numeric'
                  })}</td>
                  <td>{doc.documentType}</td>
                  <td><button className="btn btn-sm btn-outline-primary">ReUpload</button></td>
                  <td><Eye className="text-muted" /></td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(doc.id)}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                  <td><button className="btn btn-sm btn-outline-secondary">View</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="text-danger mt-2">
          {documents.length > 0 && `Showing Records 1 to ${documents.length} of ${documents.length}`}
        </div>
      </div>
    </div>
  );
};
