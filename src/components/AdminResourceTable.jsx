// src/components/AdminResourceTable.jsx
import React, { useEffect, useState } from "react";

function ResourceRow({ r, onEdit, onDelete }) {
  return (
    <tr>
      <td style={{width:260}}><strong>{r.title}</strong><div style={{fontSize:12,color:"#6b7a90"}}>{r.category}</div></td>
      <td>{r.content?.slice(0,120)}{r.content && r.content.length>120 ? "…" : ""}</td>
      <td style={{width:160}}>
        <button onClick={() => onEdit(r)} style={{marginRight:8}} className="btn ghost">Edit</button>
        <button onClick={() => onDelete(r.id)} className="btn" style={{background:"#FF7A3D",color:"#fff",border:"none"}}>Delete</button>
      </td>
    </tr>
  );
}

export default function AdminResourceTable(){
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(true);
  const [modalOpen,setModalOpen] = useState(false);
  const [editing,setEditing] = useState(null);

  useEffect(()=>{ load(); }, []);

  async function load(){
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/resources");
      const data = await res.json();
      setItems(data);
    } catch(err){ console.error(err); setItems([]); }
    setLoading(false);
  }

  function openAdd(){
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(item){
    setEditing(item);
    setModalOpen(true);
  }

  async function handleDelete(id){
    if(!confirm("Delete this resource?")) return;
    try {
      await fetch(`http://localhost:4000/resources/${id}`, { method:"DELETE" });
      setItems(items.filter(i=>i.id!==id));
    } catch(err){ alert("Failed to delete"); console.error(err) }
  }

  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <strong>Resources</strong>
          <span className="muted">{items.length} items</span>
        </div>
        <div>
          <button className="btn primary add-btn" onClick={openAdd}>Add Resource</button>
          <button className="btn ghost" onClick={load} style={{marginLeft:8}}>Refresh</button>
        </div>
      </div>

      <div style={{overflowX:"auto"}}>
        <table className="table" style={{minWidth:920}}>
          <thead>
            <tr><th>Title</th><th>Description</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="3">Loading…</td></tr> :
              items.length? items.map(i=>(
                <ResourceRow key={i.id} r={i} onEdit={(it)=>openEdit(it)} onDelete={handleDelete} />
              )) : <tr><td colSpan="3">No resources found.</td></tr>
            }
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <ResourceModal
          initial={editing}
          onClose={()=>{ setModalOpen(false); setEditing(null); }}
          onSaved={(saved)=>{
            // If editing, replace; if new, append
            if(editing){
              setItems(items.map(it=>it.id===saved.id? saved: it));
            } else {
              setItems([ ...items, saved ]);
            }
            setModalOpen(false);
            setEditing(null);
          }}
        />
      )}
    </>
  );
}

/* Modal + form inside same file for simplicity */
function ResourceModal({ initial, onClose, onSaved }){
  const [title,setTitle] = useState(initial?.title || "");
  const [category,setCategory] = useState(initial?.category || "");
  const [content,setContent] = useState(initial?.content || "");
  const [saving,setSaving] = useState(false);

  async function handleSave(e){
    e.preventDefault();
    if(!title.trim()){ alert("Enter title"); return; }
    setSaving(true);
    try {
      if(initial){
        const res = await fetch(`http://localhost:4000/resources/${initial.id}`, {
          method: "PUT",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({ ...initial, title, category, content })
        });
        const data = await res.json();
        onSaved(data);
      } else {
        const res = await fetch("http://localhost:4000/resources", {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({ title, category, content })
        });
        const data = await res.json();
        onSaved(data);
      }
    } catch(err){ alert("Save failed"); console.error(err) }
    setSaving(false);
  }

  return (
    <div className="modal-backdrop">
      <div className="modal" role="dialog" aria-modal="true">
        <h3 style={{marginTop:0}}>{initial ? "Edit Resource" : "Add Resource"}</h3>
        <form onSubmit={handleSave}>
          <div className="form-row">
            <label>Title</label>
            <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Category</label>
            <input className="input" value={category} onChange={e=>setCategory(e.target.value)} placeholder="e.g. Technology" />
          </div>
          <div className="form-row">
            <label>Description</label>
            <textarea className="textarea" value={content} onChange={e=>setContent(e.target.value)} />
          </div>

          <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8}}>
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn primary" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
