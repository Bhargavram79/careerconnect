// src/pages/Careers.jsx
import React, { useEffect, useState } from "react";
import CareerCard from "../components/CareerCard";
import { API } from "../config";

export default function Careers() {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Local fallback list (visible if mock API isn't running)
  const fallback = [
    { id: "frontend", title: "Frontend Developer", domain: "Technology", summary: "Build beautiful user interfaces using HTML, CSS, and JS. Learn React, accessibility and responsive design.", topics: ["HTML", "CSS", "JS", "React"] },
    { id: "datascience", title: "Data Scientist", domain: "Data", summary: "Work with data, build models and visualizations to derive insights.", topics: ["Python", "Pandas", "ML", "Statistics"] },
    { id: "product", title: "Product Manager", domain: "Product", summary: "Own product strategy and roadmap; coordinate across engineering and design.", topics: ["Roadmaps", "UX", "Stakeholder mgmt"] },
  ];

  useEffect(() => {
    let canceled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${API}/resources`);
        if (!res.ok) throw new Error("No API");
        const json = await res.json();
        if (!canceled) setPaths(Array.isArray(json) ? json : fallback);
      } catch (err) {
        // fallback when no mock API
        if (!canceled) {
          setPaths(fallback);
          setError("Using local fallback resources (mock API not available).");
        }
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    load();
    return () => (canceled = true);
  }, []);

  return (
    <div className="container page-wrap" id="careers" style={{ paddingTop: 22 }}>
      <h2>Popular Career Paths</h2>
      <p className="muted">Explore short guides for each career, required skills, and next steps.</p>

      {error && <div style={{ marginTop: 12, color: "#8b2d2d" }}>{error}</div>}

      {loading ? (
        <div style={{ padding: 28 }}>Loading career paths...</div>
      ) : (
        <div style={{ marginTop: 18 }} className="cards-grid">
          {paths.map((p) => (
            <CareerCard key={p.id || p.title} path={p} />
          ))}
        </div>
      )}
    </div>
  );
}
