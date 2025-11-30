import React, { useState } from "react";
import { API } from "../config";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState(null);

  function validate() {
    const e = {};
    if (!email.trim()) e.email = "Email is required.";
    else if (!emailRegex.test(email.trim())) e.email = "Enter a valid email (example@domain.com).";
    if (!password.trim()) e.password = "Password cannot be empty.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleLogin(e) {
    e.preventDefault();
    setMsg(null);
    if (!validate()) return;
    setSending(true);
    try {
      const res = await fetch(`${API}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      const data = await res.json();
      if (!data || data.length === 0) {
        setMsg({ type: "error", text: "Invalid email or password." });
        setSending(false);
        return;
      }
      const user = data[0];
      localStorage.setItem("career_user", JSON.stringify(user));
      setMsg({ type: "success", text: "Login successful! Redirecting..." });
      setTimeout(()=> {
        if (user.role === "admin") navigate("/admin");
        else navigate("/");
      }, 900);
    } catch {
      setMsg({ type: "error", text: "Login failed. Try again later." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="example@domain.com" />
          {errors.email && <div style={{color:"#b02a2a", marginTop:6}}>{errors.email}</div>}

          <label style={{marginTop:12}}>Password</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" />
          {errors.password && <div style={{color:"#b02a2a", marginTop:6}}>{errors.password}</div>}

          <button className="btn primary" type="submit" disabled={sending} style={{width:"100%", marginTop:18}}>{sending ? "Signing in..." : "Sign In"}</button>

          {msg && <div style={{marginTop:12, color: msg.type === "success" ? "green" : "#b02a2a"}}>{msg.text}</div>}
        </form>
      </div>
    </div>
  );
}
