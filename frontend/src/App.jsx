import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TwoFactorSetup from "./pages/TwoFactorSetup.jsx";
import TwoFactorVerify from "./pages/TwoFactorVerify.jsx";
import Quiz from "./pages/Quiz.jsx";
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
          <Navbar />
          <main className="container mx-auto px-4 py-8 max-w-7xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/2fa/verify" element={<TwoFactorVerify />} />
              <Route
                path="/2fa/setup"
                element={
                  <PrivateRoute>
                    <TwoFactorSetup />
                  </PrivateRoute>
                }
              />
              <Route
                path="/quiz"
                element={
                  <PrivateRoute>
                    <Quiz />
                  </PrivateRoute>
                }
              />
              <Route
                path="/results"
                element={
                  <PrivateRoute>
                    <Results />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/payment/success"
                element={
                  <PrivateRoute>
                    <PaymentSuccess />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1a1a2e",
                color: "#e2e8f0",
                border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: "12px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              },
              success: {
                iconTheme: { primary: "#10B981", secondary: "#fff" },
              },
              error: {
                iconTheme: { primary: "#EF4444", secondary: "#fff" },
              },
            }}
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
