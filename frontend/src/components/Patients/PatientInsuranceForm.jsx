import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

const API_URL = "https://687a64bcabb83744b7eca95c.mockapi.io/IVFApp/patientlist";

export const PatientInsuranceForm = ({ patientId }) => {
  const [formData, setFormData] = useState({
    provider: "",
    policyNumber: "",
    coverage: "",
    expiryDate: ""
  });
  const [insuranceList, setInsuranceList] = useState([]);

  // 🔹 Fetch insurance list for this patient
  useEffect(() => {
    const fetchInsurance = async () => {
      try {
        const res = await fetch(`${API_URL}/${patientId}`);
        if (!res.ok) throw new Error("Failed to fetch insurance");
        const data = await res.json();
        setInsuranceList(data.insurances || []);
      } catch (err) {
        console.error(err);
      }
    };
    if (patientId) fetchInsurance();
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 🔹 Save insurance list into API
  const saveInsurances = async (updatedList) => {
    try {
      const res = await fetch(`${API_URL}/${patientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ insurances: updatedList }),
      });
      if (!res.ok) throw new Error("Failed to save insurance");
      const data = await res.json();
      setInsuranceList(data.insurances || []);
    } catch (err) {
      console.error(err);
      alert("Failed to save insurance");
    }
  };

  const handleAddInsurance = () => {
    if (!formData.provider || !formData.policyNumber) return;

    const newInsurance = {
      id: Date.now(),
      ...formData
    };

    const updatedList = [...insuranceList, newInsurance];
    saveInsurances(updatedList);

    setFormData({
      provider: "",
      policyNumber: "",
      coverage: "",
      expiryDate: ""
    });
  };

  const handleDelete = (id) => {
    const updatedList = insuranceList.filter(ins => ins.id !== id);
    saveInsurances(updatedList);
  };

  return (
    <div className="card card-body shadow-sm mb-4">
      {/* Form in one row */}
      <div className="row align-items-end mb-3">
        <div className="col-md-3">
          <label className="form-label">Provider</label>
          <input
            type="text"
            className="form-control"
            name="provider"
            value={formData.provider}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Policy Number</label>
          <input
            type="text"
            className="form-control"
            name="policyNumber"
            value={formData.policyNumber}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Coverage</label>
          <input
            type="text"
            className="form-control"
            name="coverage"
            value={formData.coverage}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Expiry Date</label>
          <input
            type="date"
            className="form-control"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-1">
          <button className="btn btn-primary w-100 mt-2" onClick={handleAddInsurance}>
            Add
          </button>
        </div>
      </div>

      {/* Insurance Table */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Sr. No.</th>
              <th>Provider</th>
              <th>Policy Number</th>
              <th>Coverage</th>
              <th>Expiry Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {insuranceList.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No insurance added</td>
              </tr>
            ) : (
              insuranceList.map((ins, index) => (
                <tr key={ins.id}>
                  <td>{index + 1}</td>
                  <td>{ins.provider}</td>
                  <td>{ins.policyNumber}</td>
                  <td>{ins.coverage}</td>
                  <td>{ins.expiryDate}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(ins.id)}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {insuranceList.length > 0 && (
          <div className="text-danger mt-2">
            Showing Records 1 to {insuranceList.length} of {insuranceList.length}
          </div>
        )}
      </div>
    </div>
  );
};
