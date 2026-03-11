import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import "./Sidebar.css";

const navItems = [
  { to: "/", label: "Dashboard", icon: "📊", exact: true },
  { to: "/hotels", label: "Hotels", icon: "🏨" },
  { to: "/add-hotel", label: "Add Hotel", icon: "➕" },
  { to: "/rooms", label: "Rooms", icon: "🛏️" },
  { to: "/bookings", label: "Bookings", icon: "📋" },
  { to: "/users", label: "Users", icon: "👥" },
  { to: "/reviews", label: "Reviews", icon: "⭐" },
];

function Sidebar() {
  const { adminLogout } = useContext(AdminContext);

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map(({ to, label, icon, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <span className="sidebar-icon">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button className="sidebar-logout" onClick={adminLogout}>
        🚪 Logout
      </button>
    </aside>
  );
}

export default Sidebar;