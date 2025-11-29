// src/components/Nav.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Nav({ role, setRole }) {
  const loc = useLocation();
  const navigate = useNavigate();

  // small helper to mark active links
  const isActive = (path) => (loc.pathname === path ? "active" : "");

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <Link to="/" className="brand-link">
            <strong>CareerConnect</strong>
          </Link>
          <span className="tag">Guidance. Mentorship. Results.</span>
        </div>

        <nav className="primary-nav" aria-label="Main navigation">
          <Link to="/" className={isActive("/")}>Home</Link>
          <Link to="/about" className={isActive("/about")}>About</Link>
          <Link to="/contact" className={isActive("/contact")}>Contact</Link>

          {/* role toggle (keeps existing UI behavior) */}
          <button
            className={`role-btn ${role === "user" ? "active" : ""}`}
            onClick={() => setRole("user")}
            title="Student view"
          >
            Student
          </button>
          <button
            className={`role-btn ${role === "admin" ? "active" : ""}`}
            onClick={() => setRole("admin")}
            title="Admin view"
          >
            Admin
          </button>
        </nav>

        <div className="header-actions">
          <button className="btn primary" onClick={() => alert("Request Demo — feature coming soon")}>Request Demo</button>

          {/* SIGN IN navigates to /login */}
          <button className="btn ghost" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
