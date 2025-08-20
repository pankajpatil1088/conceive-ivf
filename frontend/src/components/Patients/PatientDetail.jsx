import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Save, X, Edit } from "lucide-react";
import { toast } from "react-toastify";
import { PatientInsuranceForm } from "./PatientInsuranceForm";
import { PatientDocumentForm } from "./PatientDocumentForm";
import { formatDate, calculateAge } from "../../utils/exportUtils";
import RelationMapping  from "./RelationMapping"; 
import RelativeDetails from "./RelativeDetails";

const API_URL =
  "https://687a64bcabb83744b7eca95c.mockapi.io/IVFApp/patientlist";

export const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSubTab, setActiveSubTab] = useState("patient");

  // fetch patient
  const fetchPatient = async () => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      const data = await res.json();
      setPatient(data);
      setFormData(data);
    } catch (err) {
      console.error("Error fetching patient", err);
      toast.error("Failed to load patient details");
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update patient");
      const updated = await res.json();
      setPatient(updated);
      setFormData(updated);
      setIsEditing(false);
      toast.success("Patient updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update patient");
    } finally {
      setLoading(false);
    }
  };

  if (!patient) return <div className="p-4">Loading...</div>;

  return (
    <div className="container py-2">
      {/* Back */}
      <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} className="me-2" /> Back
      </button>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>
          <User size={20} className="me-2" />
          {patient.firstName} {patient.lastName} (ID: {patient.id})
        </h3>
      </div>
     

      {/* Tabs */}
      <ul className="nav nav-tabs mt-3 mb-3">
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

      {/* ---------------- Overview ---------------- */}
      {activeTab === "overview" && (
        <div>
          {/* Sub-tabs inside Overview */}
          <ul className="nav nav-pills mb-3 card-header d-flex">
            <li className="nav-item">
              <button
                className={`nav-link ${activeSubTab === "patient" ? "active" : ""}`}
                onClick={() => setActiveSubTab("patient")}
              >
                Patient Details
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeSubTab === "relatives" ? "active" : ""}`}
                onClick={() => setActiveSubTab("relatives")}
              >
                Relative Details
              </button>
            </li>
          </ul>

          {/* ---------------- Patient Details Section ---------------- */}
          {activeSubTab === "patient" && (
            <div className="card shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Patient Details</h5>
                {!isEditing ? (
                  <button className="btn btn-sm btn-primary" onClick={() => setIsEditing(true)}>
                    <Edit size={16} className="me-1" /> Edit
                  </button>
                ) : (
                  <div>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={handleUpdate}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : <><Save size={14} className="me-1" /> Update</>}
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => {
                        setFormData(patient);
                        setIsEditing(false);
                        toast.info("Changes cancelled");
                      }}
                    >
                      <X size={14} className="me-1" /> Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="card-body">
                <div className="row">
                  {/* Left Column */}
                  <div className="col-md-6">
                    <DetailField label="First Name" field="firstName" {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="Middle Name" field="middleName" {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="Last Name" field="lastName" {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="Gender" field="gender" type="select" options={["Male","Female","Other"]} {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="Marital Status" field="maritalStatus" type="select" options={["Single","Married","Divorced"]} {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="Date of Birth" field="dateOfBirth" type="date" {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="Anniversary Date" field="anniversarydate" type="date" {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="Aadhaar Number" field="adhaarNumber" {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="PAN Number" field="panNumber" {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="Occupation" field="occupation" {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="Phone" field="phone" {...{ isEditing, formData, patient, handleChange }} />                    
                  </div>

                  {/* Right Column */}
                  <div className="col-md-6">
                    <DetailField label="Alternate Phone" field="altphone" {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="Email" field="email" {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="Address" field="address" {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="City" field="city" {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="District" field="district" {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="State" field="state" {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="Zip Code" field="zipCode" {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="Blood Group" field="bloodGroup" type="select" options={["A+","A-","B+","B-","O+","O-","AB+","AB-"]} {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="Patient Status" field="status" type="select" options={["Active","Inactive"]} {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="Referring Unit" field="referingunit" {...{ isEditing, formData, patient, handleChange }} />
                    <DetailField label="Patient Type" field="patientType" {...{ isEditing, formData, patient, handleChange }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- Relative Details Section ---------------- */}
          {activeSubTab === "relatives" && (
            <div className="card card-body">
              <RelativeDetails patientId={patient.id} />
            </div>
          )}
        </div>
      )}


      {/* ---------------- Insurance Tab ---------------- */}
      {activeTab === "insurance" && (
        <PatientInsuranceForm patientId={patient.id} />
      )}

      {/* ---------------- Documents Tab ---------------- */}
      {activeTab === "documents" && (
        <PatientDocumentForm patientId={patient.id} />
      )}

       {activeTab === "relations" && (
        <div className="card card-body">
          <h5>Relation Mapping</h5>
          <p>(You can extend this with a form for family/guardian relationships.)</p>
          <RelationMapping patient={patient}/>
          
        </div>
      )}

    </div>
  );
};

/* ---------------- InfoCard ---------------- */
const InfoCard = ({ title, children }) => (
  <div className="card mb-3 shadow-sm">
    <div className="card-header fw-bold">{title}</div>
    <div className="card-body">{children}</div>
  </div>
);

/* ---------------- Field ---------------- */
/* ---------------- Field ---------------- */
/* ---------------- Field ---------------- */
const DetailField = ({
  label,
  field,
  type = "text",
  options = [],
  isEditing,
  formData,
  patient,
  handleChange,
}) => (
  <div className="mb-3">
    <label className="form-label fw-semibold">{label}</label>
    {isEditing ? (
      type === "select" ? (
        <select
          className="form-select"
          name={field}
          value={formData[field] || ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="form-control"
          name={field}
          value={formData[field] || ""}
          onChange={handleChange}
        />
      )
    ) : (
      // ✅ Box type display when not editing
      <div className="form-control bg-light border">
        {type === "date"
          ? formatDate(patient[field])
          : patient[field] || "-"}
      </div>
    )}
  </div>
);

