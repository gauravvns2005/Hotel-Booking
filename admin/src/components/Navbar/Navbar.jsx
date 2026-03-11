import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHotel, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { AdminContext } from "../../context/AdminContext";
import "./Navbar.css";

function AdminNavbar() {
  const { admin, adminLogout } = useContext(AdminContext);

  return (
    <header className="admin-navbar">
      <div className="admin-navbar-inner">
        <Link to="/" className="admin-nav-logo">
          <FaHotel />
          StayEase
          <span>Admin</span>
        </Link>

        {admin && (
          <div className="admin-nav-right">
            <div className="admin-user">
              <FaUserCircle className="admin-user-icon" />

              <span className="admin-name">{admin.name}</span>
            </div>

            <button className="admin-logout-btn" onClick={adminLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default AdminNavbar;
