import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AdminProvider, { AdminContext } from "./context/AdminContext";

import AdminLogin from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Hotels from "./pages/Hotels/Hotels";
import AddHotel from "./pages/AddHotel/AddHotel";
import Rooms from "./pages/Rooms/Rooms";
import Bookings from "./pages/Bookings/Bookings";
import Users from "./pages/Users/Users";
import Reviews from "./pages/Reviews/Reviews";

import Sidebar from "./components/Sidebar/Sidebar";
import AdminNavbar from "./components/Navbar/Navbar";

import "./index.css";

function AdminApp() {
  const { admin, authLoading } = useContext(AdminContext);

  if (authLoading) return <div className="loading-screen">Loading...</div>;

  if (!admin) return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );

  return (
    <>
      <AdminNavbar />
      <div className="admin-layout">
        <Sidebar />
        <main className="admin-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/add-hotel" element={<AddHotel />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <AdminApp />
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;