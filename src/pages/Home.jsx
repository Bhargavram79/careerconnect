// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CareerCard from "../components/CareerCard";
import { API } from "../config";

export default function Home() {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallback = [
    { id: "frontend", title: "Frontend Developer", domain: "Technology", summary: "Build UIs with HTML/CSS/JS and modern frameworks like React.", topics: ["HTML", "CSS", "JS", "React"] },
    { id: "datascience", title: "Data Scientist", domain: "Data", summary: "Analyze data, build models and inform decisions.", topics: ["Python", "Pandas", "ML"] },
    { id: "product", title: "Product Manager", domain: "Product", summary: "Define product vision and coordinate delivery.", topics: ["Roadmaps", "UX", "Stakeholders"] },
    { id: "cloud", title: "Cloud Engineer", domain: "Cloud", summary: "Design and operate cloud infrastructure.", topics: ["AWS", "DevOps", "Kubernetes"] },
  ];

  useEffect(() => {
    let canceled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${API}/resources`);
        if (!res.ok) throw new Error("No API");
        const json = await res.json();
        if (!canceled) setPaths(Array.isArray(json) && json.length ? json : fallback);
      } catch (err) {
        if (!canceled) setPaths(fallback);
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    load();
    return () => (canceled = true);
  }, []);

  return (
    <>
      <section className="hero container" role="region" aria-label="Hero">
        <div className="hero-body">
          <div className="kicker">Career guidance for the next generation</div>
          <h1 className="hero-title">Find your path. Book expert mentorship. Build your future.</h1>
          <p className="hero-lead">
            CareerConnect helps students discover career options, learn required skills, and get personalised guidance through one-on-one sessions with verified counselors.
          </p>

          <div className="hero-ctas">
            <Link className="cta-primary" to="/careers">Explore Careers</Link>
            <a className="cta-ghost" href="#book" onClick={(e)=>{ e.preventDefault(); document.getElementById('careers')?.scrollIntoView({behavior:'smooth'})}}>Book a Session</a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden>
          <div className="visual-card">
            <h4 style={{margin:'0 0 8px 0'}}>Trending</h4>
            <p style={{margin:0,color:'#546175'}}>Data Science · Cloud · UI/UX · Product</p>
            <div style={{height:12}} />
            <div style={{display:'flex',gap:8,marginTop:14}}>
              <div style={{flex:1,background:'#f7fffd',padding:10,borderRadius:10}}>
                <strong style={{display:'block'}}>35% ↑</strong>
                <small style={{color:'#72808b'}}>Growth in data jobs</small>
              </div>
              <div style={{flex:1,background:'#fff6f0',padding:10,borderRadius:10}}>
                <strong style={{display:'block'}}>12k+</strong>
                <small style={{color:'#9b6a4a'}}>Resources</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container page-wrap" id="careers" style={{paddingTop:20}}>
        <h2>Popular Career Paths</h2>
        <p className="muted">Browse short guides and book one-on-one sessions with industry counselors.</p>

        {loading ? (
          <div style={{padding:28}}>Loading career paths...</div>
        ) : (
          <div className="cards-grid" style={{marginTop:18}}>
            {paths.map(p => <CareerCard key={p.id || p.title} path={p} />)}
          </div>
        )}

        <div style={{marginTop:28, display:'flex', gap:12, alignItems:'center'}}>
          <Link to="/careers" className="btn ghost">Explore More Paths</Link>
          <Link to="/bookings" className="btn primary">View My Bookings</Link>
        </div>
      </div>
    </>
  );
}
