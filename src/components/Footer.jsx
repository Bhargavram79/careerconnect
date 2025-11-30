// src/components/Footer.jsx
import React from "react";

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h3 style={{margin:'0 0 6px 0'}}>CareerConnect</h3>
          <p style={{margin:0,color:'#cfe6dd'}}>Connecting students with mentors and practical resources.</p>
        </div>

        <div>
          <h4>Product</h4>
          <ul style={{listStyle:'none',padding:0,margin:0}}>
            <li>Explore Careers</li>
            <li>Book Sessions</li>
            <li>Resource Library</li>
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul style={{listStyle:'none',padding:0,margin:0}}>
            <li>About</li>
            <li>Contact</li>
            <li>Privacy</li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <p style={{margin:0}}>2400031554@kluniversity.in</p>
          <p style={{margin:0}}>+91 73825 70450</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <small>© {new Date().getFullYear()} CareerConnect — Built for FEDF-PS24</small>
        </div>
      </div>
    </footer>
  );
}
