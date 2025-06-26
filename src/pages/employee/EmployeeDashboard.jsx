import { useEffect, useState } from "react";
import assignmentService from "../../services/ProjectAssignmentService";

export default function EmployeeDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    assignmentService.listMyProjects()
      .then(res => setAssignments(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{ color: "var(--primary-color)", fontWeight: 700 }}>Welcome!</h2>
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm h-100" style={{ borderLeft: "6px solid var(--primary-color)" }}>
            <div className="card-body d-flex align-items-center">
              <span style={{ fontSize: 36, color: "var(--primary-color)", marginRight: 18 }}>📁</span>
              <div>
                <h5 className="card-title mb-1">Assigned Projects</h5>
                <h2 style={{ fontWeight: 800, color: "var(--primary-color)" }}>{assignments.length}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header bg-white" style={{ fontWeight: 600, color: "var(--primary-color)" }}>
          Recent Assignments
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="alert alert-info m-3">Loading...</div>
          ) : (
            <table className="table mb-0">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Assigned Date</th>
                </tr>
              </thead>
              <tbody>
                {assignments.length === 0 && (
                  <tr><td colSpan={2} className="text-center">No assignments yet.</td></tr>
                )}
                {assignments.slice(-5).reverse().map(a => (
                  <tr key={a.assignmentId}>
                    <td>{a.projectName}</td>
                    <td>{a.assignedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
