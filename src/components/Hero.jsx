import React from "react";

export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-body">
        <h1 className="hero-title">Find the right career path. Get expert mentorship.</h1>
        <p className="hero-sub">CareerConnect helps students explore careers, schedule counseling, and connect with industry experts — all in one place.</p>
        <div className="hero-cta">
          <button className="btn primary">Explore Careers</button>
          <button className="btn ghost">Book a Session</button>
        </div>
      </div>
      <div className="hero-visual" aria-hidden>
        <div className="visual-card">
          <h4>Top Trend</h4>
          <p>Data Science · Cloud · Frontend</p>
        </div>
      </div>
    </section>
  );
}
