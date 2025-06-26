import { useEffect, useState } from "react";
import projectService from "../../services/ProjectService";
import userService from "../../services/UserService";
import { Link } from "react-router-dom";
import { FaClipboardList, FaUsers, FaPlusCircle, FaClipboardCheck } from "react-icons/fa";

export default function ManagerDashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    projectService.getAllProjects().then(res => {
      setProjectCount(res.data.length);
      setRecentProjects(res.data.slice(-5).reverse());
    });
    userService.getAllUsers().then(res => setUserCount(res.data.length));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{ color: "var(--primary-color)", fontWeight: 700 }}>Welcome, Manager!</h2>
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm h-100" style={{ borderLeft: "6px solid var(--primary-color)" }}>
            <div className="card-body d-flex align-items-center">
              <FaClipboardList size={36} style={{ color: "var(--primary-color)", marginRight: 18 }} />
              <div>
                <h5 className="card-title mb-1">Total Projects</h5>
                <h2 style={{ fontWeight: 800, color: "var(--primary-color)" }}>{projectCount}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm h-100" style={{ borderLeft: "6px solid #5fa8e6" }}>
            <div className="card-body d-flex align-items-center">
              <FaUsers size={36} style={{ color: "#5fa8e6", marginRight: 18 }} />
              <div>
                <h5 className="card-title mb-1">Total Users</h5>
                <h2 style={{ fontWeight: 800, color: "#5fa8e6" }}>{userCount}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-8">
          <div className="card h-100">
            <div className="card-header bg-white" style={{ fontWeight: 600, color: "var(--primary-color)" }}>
              Recent Projects
            </div>
            <div className="card-body p-0">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Start</th>
                    <th>End</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.length === 0 && (
                    <tr><td colSpan={4} className="text-center">No projects found.</td></tr>
                  )}
                  {recentProjects.map(p => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.status}</td>
                      <td>{p.startDate}</td>
                      <td>{p.endDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header bg-white" style={{ fontWeight: 600, color: "var(--primary-color)" }}>
              Quick Actions
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <Link to="/manager/projects/new" className="btn btn-primary d-flex align-items-center gap-2">
                <FaPlusCircle /> New Project
              </Link>
              <Link to="/manager/users" className="btn btn-outline-primary d-flex align-items-center gap-2">
                <FaUsers /> Manage Users
              </Link>
              <Link to="/manager/assignments" className="btn btn-outline-primary d-flex align-items-center gap-2">
                <FaClipboardCheck /> Assign Employees
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
