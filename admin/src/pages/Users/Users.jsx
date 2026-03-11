import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import API from "../../services/api";

function Users() {
  const { users, fetchUsers } = useContext(AdminContext);

  useEffect(() => { fetchUsers(); }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user? All their data will be removed.")) return;
    try {
      await API.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const getRoleBadge = (role) => {
    if (role === "admin") return <span className="badge badge-danger">Admin</span>;
    if (role === "hotelOwner") return <span className="badge badge-warning">Hotel Owner</span>;
    return <span className="badge badge-primary">User</span>;
  };

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Users</h1><p className="page-subtitle">{users.length} registered users</p></div>
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        {users.length === 0 ? (
          <p style={{ color: "var(--text-muted)", padding: "2rem 0", textAlign: "center" }}>No users yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>
                        {u.name?.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 600 }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{u.email}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{u.phone}</td>
                  <td>{getRoleBadge(u.role)}</td>
                  <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    {new Date(u.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                  </td>
                  <td>
                    {u.role !== "admin" && (
                      <button className="btn btn-sm btn-danger" onClick={() => deleteUser(u._id)}>Delete</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Users;