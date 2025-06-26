import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import userService from "../../services/UserService";
import assignmentService from "../../services/ProjectAssignmentService";

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      userService.getUserById(id),
      assignmentService.listMyProjects(id) 
    ])
      .then(([userRes, assignRes]) => {
        setUser(userRes.data);
        setAssignments(assignRes.data);
      })
      .catch(() => setError("Failed to fetch user details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container mt-4"><div className="alert alert-info">Loading...</div></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger">{error}</div></div>;
  if (!user) return null;

  return (
    <div className="container mt-4" style={{ maxWidth: 700 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 style={{ color: "var(--primary-color)", fontWeight: 700 }}>{user.fullName}</h2>
        <Link to="/manager/users" className="btn btn-outline-secondary">Back to Users</Link>
      </div>
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="mb-2"><strong>Username:</strong> {user.username}</div>
          <div className="mb-2"><strong>Email:</strong> {user.email}</div>
          <div className="mb-2"><strong>Position:</strong> {user.position}</div>
          <div className="mb-2"><strong>Roles:</strong> {user.roles?.join(", ")}</div>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header bg-white" style={{ fontWeight: 600, color: "var(--primary-color)" }}>
          Assigned Projects
        </div>
        <div className="card-body p-0">
          <table className="table mb-0">
            <thead>
              <tr>
                <th>Project</th>
                <th>Assigned Date</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length === 0 && (
                <tr><td colSpan={2} className="text-center">No projects assigned.</td></tr>
              )}
              {assignments.map(a => (
                <tr key={a.assignmentId}>
                  <td>{a.projectName}</td>
                  <td>{a.assignedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
