import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

// Set up axios defaults
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Axios interceptor to attach token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Axios interceptor for 401 responses
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  },
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingTwoFAUser, setPendingTwoFAUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (e) {
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      if (res.data.success) {
        // Check if 2FA is required
        if (res.data.requires2FA) {
          setPendingTwoFAUser({ email, userId: res.data.userId });
          return { success: true, requires2FA: true };
        }
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(user);
        toast.success(`Welcome back, ${user.name}! 🎉`);
        return { success: true, requires2FA: false };
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed";
      toast.error(msg);
      return { success: false };
    }
  };

  const verify2FA = async (code) => {
    try {
      const res = await axios.post("/auth/verify-2fa", {
        userId: pendingTwoFAUser.userId,
        token: code,
      });
      if (res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(user);
        setPendingTwoFAUser(null);
        toast.success(`Welcome back, ${user.name}! 🎉`);
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid verification code");
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post("/auth/register", { name, email, password });
      if (res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(user);
        toast.success(`Account created! Welcome, ${user.name}! 🧠`);
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed";
      toast.error(msg);
      return false;
    }
  };

  const setup2FA = async () => {
    try {
      const res = await axios.post("/auth/setup-2fa");
      return res.data;
    } catch (error) {
      toast.error("Failed to setup 2FA");
      return null;
    }
  };

  const enable2FA = async (token) => {
    try {
      const res = await axios.post("/auth/enable-2fa", { token });
      if (res.data.success) {
        const updatedUser = { ...user, twoFactorEnabled: true };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Two-factor authentication enabled! 🔐");
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid code");
      return false;
    }
  };

  const disable2FA = async (token) => {
    try {
      const res = await axios.post("/auth/disable-2fa", { token });
      if (res.data.success) {
        const updatedUser = { ...user, twoFactorEnabled: false };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Two-factor authentication disabled");
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to disable 2FA");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    toast.success("Logged out successfully");
  };

  const refreshUser = async () => {
    try {
      const res = await axios.get("/auth/me");
      if (res.data.success) {
        const updatedUser = res.data.user;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        pendingTwoFAUser,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        verify2FA,
        setup2FA,
        enable2FA,
        disable2FA,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
