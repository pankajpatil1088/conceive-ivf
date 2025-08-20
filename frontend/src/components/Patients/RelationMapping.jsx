import React, { useState, useEffect } from "react";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";

const RELATIONS_API = "https://6891f52d447ff4f11fbe8346.mockapi.io/patientRelations";

export default function RelationMapping({ patient }) {
  const [relativeInput, setRelativeInput] = useState("");
  const [relationType, setRelationType] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRelations = async () => {
  try {
    const res = await fetch(`${RELATIONS_API}?patientId=${patient.id}`);
    const data = await res.json();
    console.log("Fetched relations:", data);
    setRows(Array.isArray(data) ? data : []);
  } catch (err) {
    toast.error("Failed to load relations");
    setRows([]); // fallback empty
  }
};

  useEffect(() => {
    if (patient?.id) fetchRelations();
  }, [patient]);

  const addRow = async () => {
    if (!relativeInput.trim() || !relationType) return;
    const newRel = { patientId: patient.id, text: relativeInput.trim(), relation: relationType };
    try {
      setLoading(true);
      const res = await fetch(RELATIONS_API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newRel)
      });
      const saved = await res.json();
      setRows(prev => [...prev, saved]);
      toast.success("Relation added");
      setRelativeInput("");
      setRelationType("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add relation");
    } finally {
      setLoading(false);
    }
  };

  const deleteRow = async (id) => {
    try {
      await fetch(`${RELATIONS_API}/${id}`, { method: "DELETE" });
      setRows(prev => prev.filter(r => r.id !== id));
      toast.success("Relation deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete relation");
    }
  };

  const resetForm = () => {
    setRelativeInput("");
    setRelationType("");
  };

  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt" });
    doc.setFontSize(14);
    doc.text("Patient Relation Mapping", 40, 40);
    doc.setFontSize(10);

    const info = [
      ["UHID No:", patient?.uhid || "-", "Patient Name:", (patient?.firstName || "") + " " + (patient?.lastName || "")],
      ["Gender:", patient?.gender || "-", "Age:", patient?.age || "-"],
      ["DOB:", patient?.dateOfBirth || "-", "Mobile:", patient?.phone || "-"],
      ["Blood Group:", patient?.bloodGroup || "-", "Email:", patient?.email || "-"],
    ];

    doc.autoTable({ startY: 60, head: [["Field","Value","Field","Value"]], body: info, styles: { fontSize: 9, cellPadding: 5 }, headStyles: { fillColor: [240,240,240] } });

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Sr. No.","Relative / UHID / Mobile","Relation"]],
      body: rows.map((r,i) => [i+1, r.text, r.relation]),
      styles: { fontSize: 9, cellPadding: 5 }, headStyles: { fillColor: [240,240,240] }
    });

    doc.save("relation_mapping.pdf");
  };

  return (
    <div className="card card-body shadow-sm">
      {/* Header */}
      <div className="border rounded mb-4">
        <div className="px-3 py-2 border-bottom fw-semibold">
          Patient Relation Mapping For : {patient?.firstName || ""} {patient?.lastName || ""}
        </div>
        <div className="px-3 py-3 small">
          <div className="row row-cols-1 row-cols-md-3 g-3">
            <div className="col"><div className="text-muted">UHID:</div><div>{patient?.uhid || "-"}</div></div>
            <div className="col"><div className="text-muted">Gender:</div><div>{patient?.gender || "-"}</div></div>
            <div className="col"><div className="text-muted">Age:</div><div>{patient?.age || "-"}</div></div>
            <div className="col"><div className="text-muted">DOB:</div><div>{patient?.dateOfBirth || "-"}</div></div>
            <div className="col"><div className="text-muted">Mobile:</div><div>{patient?.phone || "-"}</div></div>
            <div className="col"><div className="text-muted">Email:</div><div>{patient?.email || "-"}</div></div>
          </div>
        </div>
      </div>

      {/* Add Relation */}
      <div className="mb-3 fw-semibold">Add New Relation:</div>
      <div className="row g-2 align-items-end mb-4">
        <div className="col-md-6"><input type="text" className="form-control" placeholder="Relative Name/UHID/Mobile" value={relativeInput} onChange={e => setRelativeInput(e.target.value)} /></div>
        <div className="col-md-4"><select className="form-select" value={relationType} onChange={e => setRelationType(e.target.value)}><option value="">Select Relation</option><option>Family Head</option><option>Father</option><option>Mother</option><option>Spouse</option><option>Brother</option><option>Sister</option><option>Child</option><option>Other</option></select></div>
        <div className="col-md-1"><button className="btn btn-primary w-100" onClick={addRow} disabled={loading}><Plus size={14} className="me-1" />Add</button></div>
        <div className="col-md-1"><button className="btn btn-outline-secondary w-100" onClick={resetForm}><RotateCcw size={14} className="me-1" />Reset</button></div>
      </div>

      {/* Table */}
      <div className="fw-semibold mb-2">Relation Details:</div>
      <button className="btn btn-sm btn-info mb-2" onClick={downloadPDF}>Download PDF</button>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr><th>#</th><th>Relative / UHID / Mobile</th><th>Relation</th><th>Action</th></tr>
          </thead>
          <tbody>
          {(!rows || rows.length === 0) ? (
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
