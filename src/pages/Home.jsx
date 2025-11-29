import React from "react";
import Hero from "../components/Hero";
import ResourceList from "../components/ResourceList";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="container features">
        <div className="feature">
          <h3>Structured Career Guides</h3>
          <p>Practical step-by-step guides for popular career paths with required skills and next steps.</p>
        </div>
        <div className="feature">
          <h3>One-on-One Counseling</h3>
          <p>Book sessions with certified counselors and industry mentors.</p>
        </div>
        <div className="feature">
          <h3>Tools & Assessments</h3>
          <p>Short assessments to match your interests, skills and ideal career paths.</p>
        </div>
      </section>

      <section className="container section">
        <h2>Popular Career Paths</h2>
        <ResourceList />
      </section>

      <section className="container counselors">
        <h2>Meet Our Counselors</h2>
        <div className="cards-grid">
          <div className="card counselor">
            <h3>Dr. Rao</h3>
            <p className="meta">Engineering, AI</p>
            <p>10+ years mentoring students into top technical roles.</p>
          </div>
          <div className="card counselor">
            <h3>Ms. Kapoor</h3>
            <p className="meta">Product, Design</p>
            <p>Product strategist with deep experience in UX and roadmaps.</p>
          </div>
          <div className="card counselor">
            <h3>Mr. Singh</h3>
            <p className="meta">Cloud, DevOps</p>
            <p>Infrastructure & reliability expert helping cloud careers.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
