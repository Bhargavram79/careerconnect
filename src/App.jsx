// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./auth/ProtectedRoute";

/* Simple fallback student dashboard if you don't yet have a separate file */
function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("career_user") || "null");
  return (
    <div className="container page-wrap">
      <h2>Student Dashboard</h2>
      <p className="muted">Welcome back{user ? `, ${user.name || user.email}` : ""}.</p>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState("user");
  const location = useLocation();

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("career_user") || "null");
      if (u && u.role) setRole(u.role);
    } catch (err) {}
  }, [location.pathname]);

  return (
    <div className="app-container">
      <Nav role={role} setRole={setRole} />

      <main className="main-content">
        <Routes>
          {/* Home / public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowed={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student"
            element={
              <ProtectedRoute allowed={["user"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
