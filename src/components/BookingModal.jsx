// src/components/BookingModal.jsx
import React, { useState } from "react";
import { API } from "../config";

export default function BookingModal({ path, onClose }) {
  const user = JSON.parse(localStorage.getItem("career_user") || "null");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    if (!name || !email || !date || !time) {
      setMsg("Please fill required fields.");
      return;
    }

    const payload = {
      resourceId: path.id || path.title,
      resourceTitle: path.title,
      userId: user?.id || null,
      name,
      email,
      phone,
      date,
      time,
      status: "scheduled",
      createdAt: new Date().toISOString()
    };

    setLoading(true);
    try {
      const res = await fetch(`${API}/bookings`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to create booking");
      const json = await res.json();
      setMsg("Booking confirmed! You can view your bookings from the header.");
      // small delay then close
      setTimeout(()=> {
        setLoading(false);
        onClose();
      }, 1100);
    } catch (err) {
      setLoading(false);
      setMsg("Failed to create booking. Try again.");
    }
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3 style={{marginTop:0}}>Book session — {path.title}</h3>
        <p className="muted">{path.domain}</p>

        <form onSubmit={handleSubmit} style={{marginTop:12}}>
          <label style={{display:'block', marginBottom:6}}>Name</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} required />

          <label style={{display:'block', marginBottom:6, marginTop:10}}>Email</label>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />

          <label style={{display:'block', marginBottom:6, marginTop:10}}>Phone</label>
          <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} />

          <div style={{display:'flex', gap:10, marginTop:10}}>
            <div style={{flex:1}}>
              <label style={{display:'block', marginBottom:6}}>Date</label>
              <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} required />
            </div>
            <div style={{width:120}}>
              <label style={{display:'block', marginBottom:6}}>Time</label>
              <input className="input" type="time" value={time} onChange={e=>setTime(e.target.value)} required />
            </div>
          </div>

          {msg && <div style={{marginTop:10, color: msg.startsWith("Booking") ? "green" : "#8b2d2d"}}>{msg}</div>}

          <div style={{display:'flex', gap:8, marginTop:16}}>
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn primary" disabled={loading}>{loading ? "Saving..." : "Confirm Booking"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
