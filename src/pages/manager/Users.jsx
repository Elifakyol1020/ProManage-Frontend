import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../../services/UserService";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    userService.getAllUsers()
      .then(res => setUsers(res.data))
      .catch(() => setError("Failed to fetch users."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 style={{ color: "var(--primary-color)", fontWeight: 700 }}>Users</h2>
        {/* İstersen buraya yeni kullanıcı ekleme butonu ekleyebilirsin */}
      </div>
      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Position</th>
                <th>Roles</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center">No users found.</td>
                </tr>
              )}
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.fullName}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.position}</td>
                  <td>{u.roles?.join(", ")}</td>
                  <td>
                    <Link to={`/manager/users/${u.id}`} className="btn btn-sm btn-outline-primary me-2">Detail</Link>
                    {/* <Link to={`/manager/users/${u.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link> */}
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
