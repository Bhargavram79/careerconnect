import React from "react";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <div className="container section">
      <h2>Contact</h2>

      <p><strong>Email:</strong>{" "}
        <a
          href="mailto:2400031554@kluniversity.in?subject=CareerConnect%20Support%20Request"
        >
          2400031554@kluniversity.in
        </a>
      </p>

      <p><strong>Phone:</strong>{" "}
        <a href="tel:+917382570450">+91 73825 70450</a>
      </p>

      <p>If you face any issue or need help, clicking the email link will open your default mail client with a support subject.</p>

      <Footer />
    </div>
  );
}
