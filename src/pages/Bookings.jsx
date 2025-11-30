// src/pages/Bookings.jsx
import React, { useEffect, useState } from "react";
import { API } from "../config";

export default function Bookings() {
  const user = JSON.parse(localStorage.getItem("career_user") || "null");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let canceled = false;
    async function load() {
      setLoading(true);
      try {
        if (!user || !user.email) {
          setBookings([]);
          setError("You must be signed in to view bookings.");
          setLoading(false);
          return;
        }

        // If user has ID, use userId; otherwise filter by email
        const query = user.id ? `?userId=${user.id}` : `?email=${encodeURIComponent(user.email)}`;
        const res = await fetch(`${API}/bookings${user.id ? `?userId=${user.id}` : `?email=${encodeURIComponent(user.email)}`}`);
        if (!res.ok) throw new Error("Failed");
        const json = await res.json();
        if (!canceled) {
          setBookings(Array.isArray(json) ? json : []);
        }
      } catch (err) {
        if (!canceled) setError("Failed to load bookings (API?).");
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    load();
    return () => (canceled = true);
  }, []);

  return (
    <div className="container page-wrap">
      <h2>My Bookings</h2>
      <p className="muted">View and manage your scheduled counseling sessions.</p>

      {loading && <div style={{padding:16}}>Loading...</div>}
      {error && <div style={{color:'#8b2d2d', marginTop:12}}>{error}</div>}

      {!loading && bookings.length === 0 && <div style={{marginTop:14}}>No bookings found.</div>}

      <div style={{marginTop:18, display:'grid', gap:12}}>
        {bookings.map(b => (
          <div key={b.id || `${b.resourceId}-${b.createdAt}`} className="card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <strong>{b.resourceTitle || b.resourceId}</strong>
                <div className="muted">{b.date} {b.time}</div>
                <div style={{marginTop:8}}>{b.name} · {b.email} · {b.phone}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontWeight:700, color: b.status === 'scheduled' ? 'var(--primary)' : '#666'}}>{b.status}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
