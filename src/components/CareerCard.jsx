// src/components/CareerCard.jsx
import React, { useState } from "react";
import BookingModal from "./BookingModal";

export default function CareerCard({ path }) {
  const [open, setOpen] = useState(false);
  const [bookingFor, setBookingFor] = useState(null);

  const { title, domain, summary, topics } = path;

  return (
    <>
      <article className="card" style={{ cursor: "default" }}>
        <h3>{title}</h3>
        <p className="muted">{domain || "General"}</p>
        <p style={{ marginTop: 10 }}>{summary && summary.substring(0, 160)}</p>

        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button className="btn ghost" onClick={() => setOpen(true)} aria-haspopup="dialog">View</button>
          <button className="btn primary" onClick={() => setBookingFor(path)}>Book a session</button>
        </div>
      </article>

      {open && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${title} details`} onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>{title}</h3>
            <p className="muted">{domain}</p>
            <p style={{ marginTop: 12 }}>{summary}</p>

            {topics && topics.length > 0 && (
              <>
                <h4 style={{ marginTop: 14 }}>Core Topics</h4>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {topics.map((t) => <span key={t} style={{ padding: "6px 10px", background:"#f1fbf9", borderRadius:8, fontWeight:700 }}>{t}</span>)}
                </div>
              </>
            )}

            <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
              <button className="btn ghost" onClick={() => setOpen(false)}>Close</button>
              <button className="btn primary" onClick={() => { setOpen(false); setBookingFor(path); }}>Book Session</button>
            </div>
          </div>
        </div>
      )}

      {bookingFor && (
        <BookingModal path={bookingFor} onClose={() => setBookingFor(null)} />
      )}
    </>
  );
}
