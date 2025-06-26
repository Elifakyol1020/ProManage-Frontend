import { useEffect, useState } from "react";
import auditLogService from "../../services/AuditLogService";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    auditLogService.getAuditLogs()
      .then(res => setLogs(res.data))
      .catch(() => setError("Failed to fetch audit logs."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Audit Logs</h2>
      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Action</th>
                <th>Description</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center">No audit logs found.</td>
                </tr>
              )}
              {logs.map((log, idx) => (
                <tr key={log.id || idx}>
                  <td>{idx + 1}</td>
                  <td>{log.username}</td>
                  <td>{log.action}</td>
                  <td>{log.description}</td>
                  <td>{log.timestamp?.replace("T", " ").slice(0, 19)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
