import { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Restore user from token on app start
  useEffect(() => {
    const restoreUser = async () => {
      if (token) {
        try {
          const res = await API.get("/auth/profile");
          setUser(res.data);
        } catch {
          localStorage.removeItem("token");
          setToken("");
        }
      }
      setLoading(false);
    };
    restoreUser();
  }, []);

  // Fetch hotels
  const fetchHotels = async () => {
    try {
      const res = await API.get("/hotels");
      setHotels(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Login
  const loginUser = async (data) => {
    const res = await API.post("/auth/login", data);
    setUser(res.data);
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    return res.data;
  };

  // Register
  const registerUser = async (data) => {
    const res = await API.post("/auth/register", data);
    setUser(res.data);
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    return res.data;
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        hotels,
        loading,
        setHotels,
        loginUser,
        registerUser,
        logout,
        fetchHotels,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;