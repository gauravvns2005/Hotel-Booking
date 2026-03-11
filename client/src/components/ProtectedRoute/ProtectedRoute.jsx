import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function ProtectedRoute({ children }) {
  const { token, loading } = useContext(AppContext);

  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
