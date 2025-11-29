import React from "react";

export default function Footer() {
  // keep markup simple and safe to avoid render errors
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h3>CareerConnect</h3>
          <p>Connecting students with career mentors and practical resources.</p>
        </div>

        <div>
          <h4>Product</h4>
          <ul>
            <li>Explore Careers</li>
            <li>Book Sessions</li>
            <li>Resource Library</li>
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li>About</li>
            <li>Contact</li>
            <li>Privacy</li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <p>
            <a
              href="mailto:2400031554@kluniversity.in?subject=CareerConnect%20Support%20Request"
              className="footer-link"
            >
              2400031554@kluniversity.in
            </a>
          </p>
          <p>
            <a href="tel:+917382570450" className="footer-link">+91 73825 70450</a>
          </p>
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
