import { useContext, useEffect } from "react";
import { FaTrash, FaUser } from "react-icons/fa";
import { AdminContext } from "../../context/AdminContext";
import API from "../../services/api";
import "./Users.css";

function Users() {
  const { users, fetchUsers } = useContext(AdminContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user? All their data will be removed."))
      return;

    try {
      await API.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const getRoleBadge = (role) => {
    if (role === "admin")
      return <span className="badge badge-danger">Admin</span>;

    if (role === "hotelOwner")
      return <span className="badge badge-warning">Hotel Owner</span>;

    return <span className="badge badge-primary">User</span>;
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Users</h1>

          <p className="page-subtitle">{users.length} registered users</p>
        </div>
      </div>

      <div className="card users-card">
        {users.length === 0 ? (
          <p className="users-empty">No users yet.</p>
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
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">{u.name?.charAt(0)}</div>

                      <span className="user-name">{u.name}</span>
                    </div>
                  </td>

                  <td className="user-email">{u.email}</td>

                  <td className="user-phone">{u.phone}</td>

                  <td>{getRoleBadge(u.role)}</td>

                  <td className="user-date">
                    {new Date(u.createdAt).toLocaleDateString("en-IN", {
                      dateStyle: "medium",
                    })}
                  </td>

                  <td>
                    {u.role !== "admin" && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteUser(u._id)}
                      >
                        <FaTrash />
                        Delete
                      </button>
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
