import React, { useState } from "react";
import { Save, X, Download, Plus, RotateCcw, Trash2 } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const initialPatient = {
  uhid: "879878675412",
  name: "Mr PANKAJ BHANUDAS PATIL",
  gender: "Male",
  age: "37 yrs",
  dob: "10/Oct/1988",
  mobile: "8087937671",
  bloodGroup: "O POSITIVE",
  email: "pankajpatil1088@gmail.com",
};

export default function RelationMapping({ patient = initialPatient }) {
  const [relativeInput, setRelativeInput] = useState("");
  const [relationType, setRelationType] = useState("");
  const [rows, setRows] = useState([
    {
      id: 1,
      text: "PANKAJ BHANUDAS PATIL | 879878675412 | 8087937671",
      relation: "Family Head",
    },
  ]);

  const addRow = () => {
    if (!relativeInput || !relationType) return;
    setRows((r) => [
      ...r,
      { id: Date.now(), text: relativeInput.trim(), relation: relationType },
    ]);
    setRelativeInput("");
    setRelationType("");
  };

  const resetForm = () => {
    setRelativeInput("");
    setRelationType("");
  };

  const deleteRow = (id) => setRows((r) => r.filter((x) => x.id !== id));

  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt" });
    doc.setFontSize(14);
    doc.text("Patient Relation Mapping", 40, 40);
    doc.setFontSize(10);

    const info = [
      ["UHID No:", patient.uhid, "Patient Name:", patient.name],
      ["Gender:", patient.gender, "Age:", patient.age],
      ["Date of Birth:", patient.dob, "Mobile No:", patient.mobile],
      ["Blood Group:", patient.bloodGroup, "Email Id:", patient.email],
    ];
    doc.autoTable({
      startY: 60,
      head: [["Field", "Value", "Field", "Value"]],
      body: info,
      styles: { fontSize: 9, cellPadding: 5 },
      headStyles: { fillColor: [240, 240, 240] },
    });

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [
        ["Sr. No.", "Relative Patient Name / UHID / Mobile No.", "Relation"],
      ],
      body: rows.map((r, i) => [i + 1, r.text, r.relation]),
      styles: { fontSize: 9, cellPadding: 5 },
      headStyles: { fillColor: [240, 240, 240] },
    });

    doc.save("relation_mapping.pdf");
  };

  return (
    <div className="card card-body shadow-sm">
    
      {/* Section: Patient Basic Information */}
      <div className="border rounded mb-4">
        <div className="px-3 py-2 border-bottom fw-semibold">
          Patient Relation Mapping For : {patient.name}
        </div>

        <div className="px-3 py-3">
          <div className="fw-semibold mb-2 small">
            ▤ Patient Basic Information
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-3 small">
            <div className="col">
              <div className="text-muted">UHID No:</div>
              <div>{patient.uhid}</div>
            </div>
            <div className="col">
              <div className="text-muted">Patient Name:</div>
              <div>{patient.name}</div>
            </div>
            <div className="col">
              <div className="text-muted">Gender:</div>
              <div>{patient.gender}</div>
            </div>

            <div className="col">
              <div className="text-muted">Age:</div>
              <div>{patient.age}</div>
            </div>
            <div className="col">
              <div className="text-muted">Date of Birth:</div>
              <div>{patient.dob}</div>
            </div>
            <div className="col">
              <div className="text-muted">Mobile No:</div>
              <div>{patient.mobile}</div>
            </div>

            <div className="col">
              <div className="text-muted">Blood Group:</div>
              <div>{patient.bloodGroup}</div>
            </div>
            <div className="col">
              <div className="text-muted">Email Id:</div>
              <div>{patient.email}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Add New Patient Relation */}
      <div className="mb-3 fw-semibold">Add New Patient Relation:</div>
      <div className="row g-2 align-items-end mb-4">
        <div className="col-12 col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Relative Patient Name/Mobile/ UHID"
            value={relativeInput}
            onChange={(e) => setRelativeInput(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <select
            className="form-select"
            value={relationType}
            onChange={(e) => setRelationType(e.target.value)}
          >
            <option value="">Select Relation With</option>
            <option>Family Head</option>
            <option>Father</option>
            <option>Mother</option>
            <option>Spouse</option>
            <option>Brother</option>
            <option>Sister</option>
            <option>Child</option>
            <option>Other</option>
          </select>
        </div>
        <div className="col-6 col-md-1 d-grid">
          <button className="btn btn-primary" onClick={addRow}>
            <Plus size={14} className="me-1" />
            Add
          </button>
        </div>
        <div className="col-6 col-md-1 d-grid">
          <button className="btn btn-outline-secondary" onClick={resetForm}>
            <RotateCcw size={14} className="me-1" />
            Reset
          </button>
        </div>
      </div>

      {/* Section: Patient Relation Details */}
      <div className="fw-semibold mb-2">Patient Relation Details:</div>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: 80 }}>Sr. No.</th>
              <th>Relative Patient Name / UHID / Mobile No.</th>
              <th style={{ width: 180 }}>Relation</th>
              <th style={{ width: 110 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-muted">
                  No relations added
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={r.id}>
                  <td>{i + 1}</td>
                  <td>{r.text}</td>
                  <td>{r.relation}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteRow(r.id)}
                      title="Delete"
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
    </div>
  );
}
