import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import projectService from "../../services/ProjectService";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    projectService.getAllProjects()
      .then(res => setProjects(res.data))
      .catch(() => setError("Failed to fetch projects."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 style={{ color: "var(--primary-color)", fontWeight: 700 }}>Projects</h2>
        <Link to="/manager/projects/new" className="btn btn-primary">+ New Project</Link>
      </div>
      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Start</th>
                <th>End</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center">No projects found.</td>
                </tr>
              )}
              {projects.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.status}</td>
                  <td>{p.startDate}</td>
                  <td>{p.endDate}</td>
                  <td>
                    <Link to={`/manager/projects/${p.id}`} className="btn btn-sm btn-outline-primary me-2">Detail</Link>
                    <Link to={`/manager/projects/${p.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
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
