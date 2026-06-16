import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
  const [pendingVerification, setPendingVerification] = useState(null);

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

  const completeAuth = (token, userPayload, successMessage) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userPayload));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userPayload);
    setPendingVerification(null);
    if (successMessage) toast.success(successMessage);
  };

  // Register a new account. The backend creates an unverified user and
  // emails a one-time verification code.
  const register = async (formData) => {
    try {
      const res = await axios.post("/auth/register", formData);
      if (res.data.success && res.data.requiresVerification) {
        setPendingVerification({
          userId: res.data.userId,
          email: formData.email,
          name: formData.name,
        });
        toast.success("Verification code sent to your email");
        return { success: true, requiresVerification: true };
      }
      return { success: false };
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return { success: false };
    }
  };

  // Verify the OTP sent at registration to activate the account and log in
  const verifyRegistrationOTP = async (otp) => {
    try {
      const res = await axios.post("/auth/verify-registration-otp", {
        userId: pendingVerification.userId,
        otp,
      });
      if (res.data.success) {
        completeAuth(
          res.data.token,
          res.data.user,
          `Welcome, ${res.data.user.name}`,
        );
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid verification code");
      return false;
    }
  };

  const resendOTP = async () => {
    try {
      await axios.post("/auth/resend-otp", {
        userId: pendingVerification.userId,
      });
      toast.success("A new code has been sent");
      return true;
    } catch (error) {
      toast.error("Failed to resend code");
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post("/auth/login", { email, password });

      if (res.data.success && res.data.requiresVerification) {
        setPendingVerification({ userId: res.data.userId, email });
        toast("Please verify your email to continue");
        return { success: true, requiresVerification: true };
      }

      if (res.data.success) {
        completeAuth(
          res.data.token,
          res.data.user,
          `Welcome back, ${res.data.user.name}`,
        );
        return { success: true, requiresVerification: false };
      }

      return { success: false };
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return { success: false };
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
      // Silently ignore; the next protected request will surface auth issues
    }
  };

  const updateProfile = async (academicLevel, currentStream) => {
    try {
      const res = await axios.put("/auth/profile", {
        academicLevel,
        currentStream,
      });
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        return true;
      }
    } catch (error) {
      toast.error("Failed to update profile");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        pendingVerification,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        verifyRegistrationOTP,
        resendOTP,
        refreshUser,
        updateProfile,
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
