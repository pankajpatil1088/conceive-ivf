import React, { useState, useEffect } from 'react';
import { Eye, Trash2, Upload, FileText } from 'lucide-react';

const API_URL = "https://687a64bcabb83744b7eca95c.mockapi.io/IVFApp/patientlist";

export const PatientDocumentForm = ({ patientId }) => {
  const [formData, setFormData] = useState({
    date: '',
    documentType: '',
    file: null,
  });
  const [documents, setDocuments] = useState([]);

  // 🔹 Fetch documents when patientId changes
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch(`${API_URL}/${patientId}`);
        if (!res.ok) throw new Error("Failed to fetch documents");
        const data = await res.json();
        setDocuments(data.documents || []);
      } catch (err) {
        console.error(err);
      }
    };
    if (patientId) fetchDocuments();
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // 🔹 Save documents into API
  const saveDocuments = async (updatedDocs) => {
    try {
      const res = await fetch(`${API_URL}/${patientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documents: updatedDocs }),
      });
      if (!res.ok) throw new Error("Failed to save documents");
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch (err) {
      console.error(err);
      alert("Failed to save document");
    }
  };

  const handleUpload = () => {
    if (!formData.date || !formData.documentType || !formData.file) return;

    const newDoc = {
      id: Date.now(),
      fileName: formData.file.name,
      date: formData.date,
      documentType: formData.documentType,
      fileUrl: URL.createObjectURL(formData.file), // Mock preview
    };

    const updatedDocs = [...documents, newDoc];
    saveDocuments(updatedDocs);

    setFormData({ date: '', documentType: '', file: null });
  };

  const handleDelete = (id) => {
    const updatedDocs = documents.filter(doc => doc.id !== id);
    saveDocuments(updatedDocs);
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
              <th>Preview</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No documents uploaded</td>
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
                  <td>
                    {doc.fileUrl ? (
                      <a href={doc.fileUrl} target="_blank" rel="noreferrer">
                        <Eye size={16} />
                      </a>
                    ) : (
                      <FileText size={16} className="text-muted" />
                    )}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(doc.id)}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {documents.length > 0 && (
          <div className="text-danger mt-2">
            Showing Records 1 to {documents.length} of {documents.length}
          </div>
        )}
      </div>
    </div>
  );
};