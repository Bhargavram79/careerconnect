// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`http://localhost:4000/users?email=${encodeURIComponent(email)}`);
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setError("User not found.");
        return;
      }

      const user = data[0];

      if (user.password !== password) {
        setError("Incorrect password.");
        return;
      }

      // Save session to localStorage
      localStorage.setItem("career_user", JSON.stringify(user));

      // redirect based on role
      if (user.role === "admin") navigate("/admin");
      else navigate("/student");
    } catch (err) {
      console.error(err);
      setError("Login failed. Ensure mock server is running.");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign In</h2>
        <p style={styles.subtitle}>Access your CareerConnect dashboard</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleLogin}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="you@kluniversity.in"
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="password"
          />

          <button type="submit" style={styles.button}>Sign In</button>
        </form>

        <p style={styles.footerText}>
          Don’t have an account? <a style={styles.link} onClick={() => navigate("/register")}>Register</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#F6F5F2",
  },
  card: {
    width: "380px",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "14px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
  },
  title: { margin: 0, marginBottom: 6 },
  subtitle: { margin: 0, marginBottom: 20, color: "#6d6d6d" },
  label: { display: "block", marginBottom: 4, fontWeight: 600 },
  input: { width: "100%", padding: "12px", marginBottom: "14px", borderRadius: "10px", border: "1px solid #ddd", fontSize: "1rem" },
  button: { width: "100%", padding: "12px", background: "linear-gradient(135deg,#0DB3A6,#089f94)", border: "none", color: "#fff", borderRadius: "10px", cursor: "pointer", fontSize: "1rem", fontWeight: 700 },
  footerText: { textAlign: "center", marginTop: 12 },
  link: { color: "#0DB3A6", cursor: "pointer", fontWeight: 600 },
  errorBox: { background: "#ffdddd", padding: 10, borderRadius: 8, color: "#b30000", marginBottom: 12 },
};
