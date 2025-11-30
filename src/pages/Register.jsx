import React, { useState } from "react";
import { API } from "../config";
import { useNavigate } from "react-router-dom";

const nameRegex = /^[A-Za-z\s\-]{2,50}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Name is required.";
    else if (!nameRegex.test(name.trim())) e.name = "Name must contain only letters, spaces or hyphens.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!emailRegex.test(email.trim())) e.email = "Enter a valid email address.";
    if (!password.trim()) e.password = "Password is required.";
    else if (password.trim().length < 6) e.password = "Password must be at least 6 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleRegister(e) {
    e.preventDefault();
    setMsg(null);
    if (!validate()) return;

    setSending(true);
    const payload = { name: name.trim(), email: email.trim().toLowerCase(), password, role: "user", createdAt: new Date().toISOString() };
    try {
      const res = await fetch(`${API}/users`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Registration failed");
      setMsg({ type: "success", text: "Account created successfully!" });
      setName(""); setEmail(""); setPassword("");
      setTimeout(()=> navigate("/login"), 900);
    } catch {
      setMsg({ type: "error", text: "Unable to register. Try again later." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <label>Name</label>
          <input className="input" type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your full name" />
          {errors.name && <div style={{color:"#b02a2a", marginTop:6}}>{errors.name}</div>}

          <label style={{marginTop:12}}>Email</label>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="example@domain.com" />
          {errors.email && <div style={{color:"#b02a2a", marginTop:6}}>{errors.email}</div>}

          <label style={{marginTop:12}}>Password</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter a strong password" />
          {errors.password && <div style={{color:"#b02a2a", marginTop:6}}>{errors.password}</div>}

          <button type="submit" className="btn primary" disabled={sending} style={{width:"100%", marginTop:18}}>{sending ? "Registering..." : "Register"}</button>

          {msg && <div style={{marginTop:12, color: msg.type === "success" ? "green" : "#b02a2a"}}>{msg.text}</div>}
        </form>
      </div>
    </div>
  );
}
