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
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";
import PaymentSuccess from "./pages/PaymentSuccess";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div
          className="min-h-screen"
          style={{
            background: "var(--bg-page)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Navbar />
          <main
            className="container mx-auto px-4 py-8 max-w-7xl"
            style={{ flex: 1, width: "100%" }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/:id" element={<CareerDetail />} />
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
          <Footer />
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
