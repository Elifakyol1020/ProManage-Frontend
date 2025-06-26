import { useEffect, useState } from "react";
import assignmentService from "../../services/ProjectAssignmentService";
import { useAuthContext } from "../../context/AuthContext";
import { FaFolder } from "react-icons/fa";

export default function EmployeeDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    assignmentService.listMyProjects()
      .then(res => setAssignments(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{ color: "var(--primary-color)", fontWeight: 700 }}>Welcome {user.sub}!</h2>
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm h-100" style={{ borderLeft: "6px solid var(--primary-color)" }}>
            <div className="card-body d-flex align-items-center">
              <FaFolder style={{ fontSize: 36, color: "var(--primary-color)", marginRight: 18 }}/>
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
        <div className="card-body">
          {loading ? (
            <div className="alert alert-info m-3">Loading...</div>
          ) : assignments.length === 0 ? (
            <div className="alert alert-secondary m-3 text-center">No assignments yet.</div>
          ) : (
            <div className="row g-3">
              {assignments.slice(-5).reverse().map(a => (
                <div className="col-md-6 col-lg-4" key={a.assignmentId}>
                  <div className="card h-100 shadow-sm" style={{ borderLeft: "4px solid var(--primary-color)" }}>
                    <div className="card-body">
                      <h5 className="card-title" style={{ color: "var(--primary-color)", fontWeight: 700 }}>{a.projectName}</h5>
                      <div className="mb-2" style={{ color: "#444" }}>
                        {a.projectDescription || <span className="text-muted">No description</span>}
                      </div>
                      <div className="small text-muted">Assigned: {a.assignedDate}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
