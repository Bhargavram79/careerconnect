import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();

    await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    navigate("/login");
  }

  return (
    <div style={{
      display: "flex", justifyContent: "center",
      alignItems: "center", minHeight: "100vh",
      background: "#F6F5F2"
    }}>
      <div style={{
        width: "380px", padding: "30px",
        background: "#fff", borderRadius: "16px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.1)"
      }}>
        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>
          <label>Name</label>
          <input
            name="name"
            style={inputStyle}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            style={inputStyle}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            style={inputStyle}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            style={{
              width: "100%", padding: "12px",
              background: "linear-gradient(90deg,#0DB3A6,#089f94)",
              border: "none", color: "white",
              borderRadius: "10px", cursor: "pointer",
              fontSize: "1rem", fontWeight: "700"
            }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "6px 0 12px 0",
  borderRadius: "10px",
  border: "1px solid #ddd"
};
