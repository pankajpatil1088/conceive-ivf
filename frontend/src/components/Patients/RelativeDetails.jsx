import React, { useEffect, useState } from "react";
import { Save, X, Edit, Plus } from "lucide-react";
import { toast } from "react-toastify";

const API_URL = "https://6891f52d447ff4f11fbe8346.mockapi.io/patientRelations";

export default function RelativeDetails({ patientId }) {
  const [relatives, setRelatives] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // fetch existing relatives
  const fetchRelatives = async () => {
    try {
      const res = await fetch(`${API_URL}?patientId=${patientId}`);
      const data = await res.json();
      setRelatives(data);
    } catch (err) {
      console.error("Error fetching relatives", err);
    }
  };

  useEffect(() => {
    fetchRelatives();
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (formData.id) {
        // update existing
        await fetch(`${API_URL}/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        toast.success("Relative updated");
      } else {
        // add new
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, patientId }),
        });
        toast.success("Relative added");
      }
      setFormData({});
      setIsEditing(false);
      fetchRelatives();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save relative");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Relative Details</h5>
        {!isEditing ? (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              setFormData({});
              setIsEditing(true);
            }}
          >
            <Plus size={16} className="me-1" /> Add Relative
          </button>
        ) : null}
      </div>

      <div className="card-body">
        {isEditing ? (
          <div className="row">
            <div className="col-md-6 mb-2">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={formData.firstName || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={formData.lastName || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">Relation</label>
              <input
                type="text"
                name="relation"
                className="form-control"
                value={formData.relation || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label">Age</label>
              <input
                type="number"
                name="age"
                className="form-control"
                value={formData.age || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mt-3">
              <button
                className="btn btn-success me-2"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : <><Save size={14} className="me-1" /> Save</>}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({});
                }}
              >
                <X size={14} className="me-1" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            {relatives.length === 0 ? (
              <p className="text-muted">No relatives added yet.</p>
            ) : (
              relatives.map((rel) => (
                <div
                  key={rel.id}
                  className="d-flex justify-content-between align-items-center border p-2 mb-2 rounded"
                >
                  <div>
                    <strong>{rel.firstName} {rel.lastName}</strong> ({rel.relation})<br />
                    Age: {rel.age} | Phone: {rel.phone}
                  </div>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      setFormData(rel);
                      setIsEditing(true);
                    }}
                  >
                    <Edit size={14} className="me-1" /> Edit
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
