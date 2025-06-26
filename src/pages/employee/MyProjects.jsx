import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import assignmentService from "../../services/ProjectAssignmentService";

export default function MyProjects() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    assignmentService.listMyProjects()
      .then(res => setAssignments(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 style={{ color: "var(--primary-color)", fontWeight: 700 }}>My Projects</h2>
      </div>
      {loading ? (
        <div className="alert alert-info">Loading...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Project</th>
                <th>Assigned Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center">No projects assigned.</td>
                </tr>
              )}
              {assignments.map(a => (
                <tr key={a.assignmentId}>
                  <td>{a.projectName}</td>
                  <td>{a.assignedDate}</td>
                  <td>
                    <Link to={`/employee/projects/${a.projectId}`} className="btn btn-sm btn-outline-primary">Detail</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
