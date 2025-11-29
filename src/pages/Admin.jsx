// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import AdminResourceTable from "../components/AdminResourceTable";
import Footer from "../components/Footer";

export default function Admin() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalResources: 0,
    totalCounselors: 0,
    totalSessions: 0
  });

  // fetch counts from mock-server
  useEffect(() => {
    async function loadStats() {
      try {
        const [usersRes, resourcesRes, counselorsRes, sessionsRes] = await Promise.all([
          fetch("http://localhost:4000/users").then(r => r.json()),
          fetch("http://localhost:4000/resources").then(r => r.json()),
          fetch("http://localhost:4000/counselors").then(r => r.json()),
          fetch("http://localhost:4000/sessions").then(r => r.json())
        ]);
        setStats({
          totalUsers: usersRes.length,
          totalResources: resourcesRes.length,
          totalCounselors: counselorsRes.length,
          totalSessions: sessionsRes.length
        });
      } catch (err) {
        console.error("Failed to load admin stats", err);
      }
    }
    loadStats();
  }, []);

  return (
    <>
      <div className="container">
        <div className="admin-hero">
          <div style={{flex:1}}>
            <div className="kicker">Admin Dashboard</div>
            <h1 style={{marginTop:6, marginBottom:4}}>Manage Platform — Resources & Counselors</h1>
            <p className="muted">Quickly view platform metrics and manage content. Changes reflect immediately in the mock API.</p>
          </div>
          <div style={{display:"flex",gap:12}}>
            <button className="btn primary" onClick={()=>window.scrollTo({top:400,behavior:"smooth"})}>Add Resource</button>
            <button className="btn ghost" onClick={()=>window.open("http://localhost:4000","_blank")}>Open Mock API</button>
          </div>
        </div>

        <div className="admin-stats" style={{marginTop:18}}>
          <div className="stat">
            <h3>{stats.totalUsers}</h3>
            <p>Registered Users</p>
          </div>
          <div className="stat">
            <h3>{stats.totalResources}</h3>
            <p>Resources</p>
          </div>
          <div className="stat">
            <h3>{stats.totalCounselors}</h3>
            <p>Counselors</p>
          </div>
          <div className="stat">
            <h3>{stats.totalSessions}</h3>
            <p>Bookings</p>
          </div>
        </div>

        <div className="resource-panel" style={{marginTop:22}}>
          <div className="resource-list">
            <h3 style={{marginTop:0}}>Resource Library</h3>
            <p className="muted">Manage career resources — create, edit, or delete items.</p>
            <AdminResourceTable />
          </div>

          <aside className="resource-actions">
            <h4 style={{marginTop:0}}>Quick actions</h4>
            <p className="muted">Use these buttons for common admin tasks.</p>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginTop:12}}>
              <button className="btn primary" onClick={()=>document.querySelector(".add-btn")?.click()}>Add new resource</button>
              <button className="btn ghost" onClick={()=>window.open("http://localhost:4000/resources","_blank")}>Open resources in API</button>
              <button className="btn ghost" onClick={()=>alert("Export feature will be added in next milestone.")}>Export CSV</button>
            </div>
            <div style={{marginTop:18}}>
              <h4>Guides</h4>
              <ul style={{paddingLeft:18,color:"var(--muted)"}}>
                <li>Use "Add" to create new resource entries.</li>
                <li>Edit text to keep content concise.</li>
                <li>Delete removes items from the mock API.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
}
