import { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartBar,
  FaHotel,
  FaPlus,
  FaBed,
  FaClipboardList,
  FaUsers,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";
import { AdminContext } from "../../context/AdminContext";
import "./Sidebar.css";

const navItems = [
  { to: "/", label: "Dashboard", icon: <FaChartBar />, exact: true },
  { to: "/hotels", label: "Hotels", icon: <FaHotel /> },
  { to: "/add-hotel", label: "Add Hotel", icon: <FaPlus /> },
  { to: "/rooms", label: "Rooms", icon: <FaBed /> },
  { to: "/bookings", label: "Bookings", icon: <FaClipboardList /> },
  { to: "/users", label: "Users", icon: <FaUsers /> },
  { to: "/reviews", label: "Reviews", icon: <FaStar /> },
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
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">{icon}</span>

            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
