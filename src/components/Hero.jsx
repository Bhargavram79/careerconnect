// src/components/Hero.jsx
import React from "react";

export default function Hero() {
  return (
    <section className="hero container" role="region" aria-label="Hero">
      <div className="hero-body">
        <div className="kicker">Career guidance for the next generation</div>
        <h1 className="hero-title">Find your path. Book expert mentorship. Build your future.</h1>
        <p className="hero-lead">
          CareerConnect helps students discover career options, learn required skills,
          and get personalised guidance through one-on-one sessions with verified counselors.
        </p>

        <div className="hero-ctas">
          <a className="cta-primary" href="#careers" aria-label="Explore careers">Explore Careers</a>
          <a className="cta-ghost" href="#contact" aria-label="Contact support">Contact Support</a>
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
  );
}
