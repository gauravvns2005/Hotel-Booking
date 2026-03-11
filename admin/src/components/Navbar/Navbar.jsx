import { useContext } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import "./Navbar.css";

function AdminNavbar() {
  const { admin, adminLogout } = useContext(AdminContext);

  return (
    <header className="admin-navbar">
      <div className="admin-navbar-inner">
        <Link to="/" className="admin-nav-logo">🏨 StayEase <span>Admin</span></Link>
        {admin && (
          <div className="admin-nav-right">
            <div className="admin-user">
              <div className="admin-avatar">{admin.name?.charAt(0)}</div>
              <span className="admin-name">{admin.name}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default AdminNavbar;