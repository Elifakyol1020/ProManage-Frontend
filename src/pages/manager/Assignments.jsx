import { useEffect, useState } from "react";
import projectService from "../../services/ProjectService";
import userService from "../../services/UserService";
import assignmentService from "../../services/ProjectAssignmentService";

export default function Assignments() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    projectService.getAllProjects().then(res => setProjects(res.data));
    userService.getAllUsers().then(res => setEmployees(res.data));
  }, []);

  useEffect(() => {
    if (selectedProject) {
      assignmentService.listEmployeesByProject(selectedProject)
        .then(res => setAssignments(res.data));
    } else {
      setAssignments([]);
    }
  }, [selectedProject]);

  const handleAssign = (e) => {
    e.preventDefault();
    setMessage(""); 
    if (!selectedProject || !selectedEmployee) return;

    if(selectedProject === "") {
      setMessage("Please select a project to assign employees.");
      return;
    }
    if(selectedEmployee === "") {
      setMessage("Please select an employee to assign.");
      return;
    }
    assignmentService.assignEmployeeToProject(selectedProject,selectedEmployee)
      .then(() => {
        setMessage("Employee assigned successfully!");
        assignmentService.listEmployeesByProject(selectedProject)
          .then(res => setAssignments(res.data));
      })
      .catch(() => setMessage("Assignment failed!"));
  };

  const handleUnassign = (assignmentId) => {
    assignmentService.unassignEmployee(assignmentId)
      .then(() => {
        setMessage("Assignment removed!");
        assignmentService.listEmployeesByProject(selectedProject)
          .then(res => setAssignments(res.data));
      });
  };

  return (
    <div className="container mt-4">
      <h2>Project Assignments</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <div className="mb-3">
        <label className="form-label">Select Project</label>
        <select
          className="form-select"
          value={selectedProject || ""}
          onChange={e => setSelectedProject(e.target.value)}
        >
          <option value="">Select a project</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {selectedProject && (
        <>
          <form className="mb-4" onSubmit={handleAssign}>
            <div className="row g-2 align-items-end">
              <div className="col-md-6">
                <label className="form-label">Select Employee</label>
                <select
                  className="form-select"
                  value={selectedEmployee}
                  onChange={e => setSelectedEmployee(e.target.value)}
                  required
                >
                  <option value="">Select an employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.fullName} ({emp.username})
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <button type="submit" className="btn btn-primary w-100">
                  Assign Employee
                </button>
              </div>
            </div>
          </form>

          <h5>Assigned Employees</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Assigned Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center">No assignments yet.</td>
                </tr>
              )}
              {assignments.map(a => (
                <tr key={a.assignmentId}>
                  <td>{a.employeeName}</td>
                  <td>{a.assignedDate}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleUnassign(a.assignmentId)}
                    >
                      Unassign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
