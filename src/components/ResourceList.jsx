import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ResourceList({ limit = 6 }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    axios.get("http://localhost:4000/resources")
      .then(res => { if (mounted) setItems(res.data.slice(0, limit)); })
      .catch(err => { console.error(err); setItems([]); })
      .finally(() => mounted && setLoading(false));
    return () => mounted = false;
  }, [limit]);

  if (loading) return <p className="muted">Loading resources…</p>;
  if (!items.length) return <p className="muted">No resources available.</p>;

  return (
    <div className="cards-grid">
      {items.map(r => (
        <article className="card resource-card" key={r.id}>
          <h3>{r.title}</h3>
          <p className="meta">{r.category}</p>
          <p>{r.content}</p>
        </article>
      ))}
    </div>
  );
}
