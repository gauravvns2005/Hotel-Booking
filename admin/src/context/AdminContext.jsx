import { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || "");
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [stats, setStats] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Restore admin session on mount
  useEffect(() => {
    const restoreAdmin = async () => {
      if (adminToken) {
        try {
          const res = await API.get("/auth/profile");
          if (res.data.role === "admin") {
            setAdmin(res.data);
          } else {
            adminLogout();
          }
        } catch {
          adminLogout();
        }
      }
      setAuthLoading(false);
    };
    restoreAdmin();
  }, []);

  const adminLogin = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    if (res.data.role !== "admin") {
      throw new Error("You do not have admin access.");
    }
    setAdmin(res.data);
    setAdminToken(res.data.token);
    localStorage.setItem("adminToken", res.data.token);
    return res.data;
  };

  const adminLogout = () => {
    setAdmin(null);
    setAdminToken("");
    localStorage.removeItem("adminToken");
  };

  const fetchStats = async () => {
    const res = await API.get("/admin/stats");
    setStats(res.data);
  };

  const fetchUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  const fetchBookings = async () => {
    const res = await API.get("/admin/bookings");
    setBookings(res.data);
  };

  const fetchHotels = async () => {
    const res = await API.get("/hotels");
    setHotels(res.data);
  };

  const fetchRooms = async () => {
    const res = await API.get("/rooms");
    setRooms(res.data);
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        adminToken,
        authLoading,
        users,
        bookings,
        hotels,
        rooms,
        stats,
        adminLogin,
        adminLogout,
        fetchStats,
        fetchUsers,
        fetchBookings,
        fetchHotels,
        fetchRooms,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;