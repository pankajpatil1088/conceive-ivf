import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Calendar } from "lucide-react";
import { PatientInsuranceForm } from "./PatientInsuranceForm";
import { PatientDocumentForm } from "./PatientDocumentForm";
//import { calculateAge, formatDate } from "../utils/exportUtils";

const API_URL = "https://687a64bcabb83744b7eca95c.mockapi.io/IVFApp/patientlist";

export const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  // Fetch patient by ID
  const fetchPatient = async () => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Failed to fetch patient");
      const data = await res.json();
      setPatient(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPatient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // 🔹 Update patient in API
  const updatePatient = async (updatedData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...patient, ...updatedData }),
      });
      if (!res.ok) throw new Error("Failed to update patient");
      const saved = await res.json();
      setPatient(saved);
      alert("Patient updated successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to update patient ❌");
    } finally {
      setLoading(false);
    }
  };

    const calculateAge = (dob) => {
        if (!dob) return "N/A";
        const birthDate = new Date(dob);
        if (isNaN(birthDate)) return "N/A";
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        const d = new Date(dateStr);
        if (isNaN(d)) return "N/A";
        return d.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

  if (!patient) return <div className="p-4">Loading...</div>;

  return (
    <div className="patient-detail container py-4">
      <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} className="me-2" /> Back to Patients
      </button>

      <h2 className="mb-3">
        <User className="me-2" size={24} />
        {patient.firstName} {patient.lastName} (ID: {patient.id})
      </h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "insurance" ? "active" : ""}`}
            onClick={() => setActiveTab("insurance")}
          >
            Insurance
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "documents" ? "active" : ""}`}
            onClick={() => setActiveTab("documents")}
          >
            Documents
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "relations" ? "active" : ""}`}
            onClick={() => setActiveTab("relations")}
          >
            Relation Mapping
          </button>
        </li>
      </ul>

      {/* Tab Content */}
    {activeTab === "overview" && (
        <div className="row g-3">
            {/* Personal Info */}
            <div className="col-md-6">
            <div className="card card-body shadow-sm">
                <h5 className="mb-3">Personal Information</h5>
                <p><strong>Name:</strong> {patient.firstName} {patient.middleName} {patient.lastName}</p>
                <p><strong>Date of Birth:</strong> {formatDate(patient.dateOfBirth)}</p>
                <p><strong>Age:</strong> {calculateAge(patient.dateOfBirth)}</p>
                <p><strong>Gender:</strong> {patient.gender || "N/A"}</p>
                <p><strong>Blood Group:</strong> {patient.bloodGroup || "N/A"}</p>
                <p><strong>Marital Status:</strong> {patient.maritalStatus || "N/A"}</p>
                <p><strong>Patient Type:</strong> {patient.patientType || "N/A"}</p>
                <p><strong>Status:</strong> {patient.status || "N/A"}</p>
            </div>
            </div>

            {/* Contact Info */}
            <div className="col-md-6">
            <div className="card card-body shadow-sm">
                <h5 className="mb-3">Contact Information</h5>
                <p><strong>Phone:</strong> {patient.phone || "N/A"}</p>
                <p><strong>Alt. Phone:</strong> {patient.altPhone || "N/A"}</p>
                <p><strong>Email:</strong> {patient.email || "N/A"}</p>
                <p><strong>Adhaar:</strong> {patient.adhaar || "N/A"}</p>
                <p><strong>PAN:</strong> {patient.pan || "N/A"}</p>
                <p><strong>Refering Unit:</strong> {patient.referingUnit || "N/A"}</p>
                <p><strong>Occupation:</strong> {patient.occupation || "N/A"}</p>
                <p><strong>Anniversary Date:</strong> {formatDate(patient.anniversaryDate)}</p>
            </div>
            </div>

            {/* Address */}
            <div className="col-md-12">
            <div className="card card-body shadow-sm">
                <h5 className="mb-3">Address</h5>
                <p>
                {patient.address || "N/A"}, {patient.city || ""}, {patient.district || ""}, 
                {patient.state || ""} - {patient.zipCode || ""}
                </p>
            </div>
            </div>
        </div>
        )}




      {activeTab === "insurance" && (
        <PatientInsuranceForm patientId={patient.id} />
        )}

      {activeTab === "documents" && (
        <PatientDocumentForm
            patientId={patient.id}
        />
        )}

      {activeTab === "relations" && (
        <div className="card card-body">
          <h5>Relation Mapping</h5>
          <p>(You can extend this with a form for family/guardian relationships.)</p>
        </div>
      )}

      {loading && <div className="mt-2 alert alert-info">Saving...</div>}
    </div>
  );
};
