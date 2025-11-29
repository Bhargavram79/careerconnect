import React from "react";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <div className="container section">
        <h2>About CareerConnect</h2>

        <p>
          CareerConnect is a web platform designed to help students make clear,
          confident career decisions. It combines curated career content,
          one-to-one counseling, and simple tools to plan the next steps after
          school or college.
        </p>

        <p>
          Students can explore different career paths, understand the skills and
          qualifications required, and see what a real day-to-day job looks
          like. When they need personal guidance, they can book sessions with
          experienced counselors and mentors directly through the platform.
        </p>

        <p>
          For administrators and counselors, CareerConnect offers an easy way to
          manage resources, keep track of student sessions, and understand which
          careers students are most interested in. This helps institutions offer
          better guidance, targeted workshops, and data-driven support to their
          students.
        </p>

        <p>
          The goal of CareerConnect is simple: reduce confusion, provide
          reliable information, and connect every student with the right
          guidance at the right time.
        </p>
      </div>

      <Footer />
    </>
  );
}
