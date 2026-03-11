import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import "./ProtectedRoute.css";

function ProtectedRoute({ children }) {
  const { token, loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="protected-loading">
        <FaSpinner className="loading-icon" />

        <p>Loading...</p>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
