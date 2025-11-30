// src/components/Nav.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Nav({ role, setRole }) {
  const navigate = useNavigate();

  const activeClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="brand-logo" aria-hidden>CC</div>
          <div>
            <div className="brand-link">CareerConnect</div>
            <div className="brand-tag">Guidance · Mentorship · Results</div>
          </div>
        </div>

        <nav className="primary-nav" aria-label="Main navigation">
          <NavLink to="/" className={activeClass}>Home</NavLink>
          <NavLink to="/careers" className={activeClass}>Explore</NavLink>
          <NavLink to="/about" className={activeClass}>About</NavLink>
          <NavLink to="/contact" className={activeClass}>Contact</NavLink>
        </nav>

        <div className="header-actions">
          <button className="btn ghost" onClick={() => navigate("/login")}>Sign In</button>
          <button className="btn primary" onClick={() => navigate("/register")}>Request Demo</button>
        </div>
      </div>
    </header>
  );
}
