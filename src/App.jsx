// src/App.jsx
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import ProtectedRoute from "./auth/ProtectedRoute";
import Bookings from "./pages/Bookings";


// Lazy load heavy pages for perceived performance
const Careers = lazy(() => import("./pages/Careers"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

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
        <Suspense fallback={<div style={{padding:40}}>Loading...</div>}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Explore Careers (lazy loaded) */}
            <Route path="/careers" element={<Careers />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/bookings" element={<Bookings />} />


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

            {/* 404 fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
