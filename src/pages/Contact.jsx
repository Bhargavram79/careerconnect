import React, { useState } from "react";
import { API } from "../config";

const nameRegex = /^[A-Za-z\s\-]{2,60}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Name is required.";
    else if (!nameRegex.test(name.trim())) e.name = "Name must contain only letters, spaces or hyphens.";

    if (!email.trim()) e.email = "Email is required.";
    else if (!emailRegex.test(email.trim())) e.email = "Please enter a valid email address.";

    if (!message.trim() || message.trim().length < 8) e.message = "Message must be at least 8 characters.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function buildMailto(subject, body) {
    const to = "2400031554@kluniversity.in";
    const ms = encodeURIComponent(body);
    const sub = encodeURIComponent(subject);
    return `mailto:${to}?subject=${sub}&body=${ms}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatusMsg(null);

    if (!validate()) {
      setStatusMsg({ type: "error", text: "Please fix the highlighted errors." });
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      status: "new",
      createdAt: new Date().toISOString()
    };

    setSending(true);
    try {
      const res = await fetch(`${API}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API returned non-OK");

      await res.json();
      setStatusMsg({ type: "success", text: "Message sent. We will contact you soon." });
      setName(""); setEmail(""); setMessage(""); setErrors({});
      setSending(false);
      return;
    } catch (err) {
      setSending(false);
      setStatusMsg({ type: "error", text: "Failed to send via server — opening your mail client as fallback." });

      const subject = `CareerConnect Support Message from ${name.trim() || "Anonymous"}`;
      const bodyLines = [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        "",
        "Message:",
        message.trim(),
        "",
        `(Sent from CareerConnect web contact form at ${new Date().toLocaleString()})`
      ];
      const body = bodyLines.join("\n");
      window.location.href = buildMailto(subject, body);
    }
  }

  return (
    <div className="container page-wrap" id="contact" style={{ paddingBottom: 40 }}>
      <h2>Contact Support</h2>
      <p className="muted">Questions about booking, demo or using the platform? Send us a message and we'll get back within 24–48 hours.</p>

      <form onSubmit={handleSubmit} style={{ maxWidth: 720, marginTop: 18 }}>
        <label>Name</label>
        <input className="input" value={name} onChange={(e)=>setName(e.target.value)} disabled={sending} placeholder="Your full name (letters only)"/>
        {errors.name && <div style={{color:"#8b2d2d", marginTop:6}}>{errors.name}</div>}

        <label style={{marginTop:12}}>Email</label>
        <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} disabled={sending} placeholder="name@domain.com"/>
        {errors.email && <div style={{color:"#8b2d2d", marginTop:6}}>{errors.email}</div>}

        <label style={{marginTop:12}}>Message</label>
        <textarea className="textarea" value={message} onChange={(e)=>setMessage(e.target.value)} disabled={sending} placeholder="How can we help?"></textarea>
        {errors.message && <div style={{color:"#8b2d2d", marginTop:6}}>{errors.message}</div>}

        <div style={{marginTop:14, display:"flex", gap:10}}>
          <button type="submit" className="btn primary" disabled={sending}>{sending ? "Sending..." : "Send Message"}</button>
          <button type="button" className="btn ghost" onClick={()=>{ setName(""); setEmail(""); setMessage(""); setErrors({}); setStatusMsg(null); }} disabled={sending}>Reset</button>
        </div>

        {statusMsg && <div role="status" style={{ marginTop:12, color: statusMsg.type === "success" ? "green" : "#8b2d2d" }}>{statusMsg.text}</div>}

        <div style={{ marginTop: 18, color: "#556" }}>
          <small>Tip: If the form fails, your mail client will open automatically so the message still reaches <strong>2400031554@kluniversity.in</strong>. Admins can review messages under <code>/contacts</code> in the mock API.</small>
        </div>
      </form>
    </div>
  );
}
