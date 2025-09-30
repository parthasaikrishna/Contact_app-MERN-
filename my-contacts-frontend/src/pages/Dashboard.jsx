
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Dashboard = () => {
  const { token, setToken } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", contact: "" });
  const [msg, setMsg] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch contacts
  const getContacts = async () => {
    setMsg("");
    try {
      const res = await fetch("/api/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch contacts");
      setContacts(await res.json());
    } catch (err) {
      setMsg(err.message);
    }
  };

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, [token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add contact");
      setForm({ name: "", email: "", contact: "" });
      setMsg("Contact added!");
      getContacts();
    } catch (err) {
      setMsg(err.message);
    }
  };

  const handleDelete = async id => {
    setMsg("");
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete contact");
      setMsg("Contact deleted!");
      getContacts();
    } catch (err) {
      setMsg(err.message);
    }
  };

  const handleEdit = contact => {
    setEditingId(contact._id);
    setForm({ name: contact.name, email: contact.email, contact: contact.contact });
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch(`/api/contacts/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update contact");
      setEditingId(null);
      setForm({ name: "", email: "", contact: "" });
      setMsg("Contact updated!");
      getContacts();
    } catch (err) {
      setMsg(err.message);
    }
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #2f3b6cff, #382b44ff)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "30px",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Dashboard</h2>
      <button
        onClick={handleLogout}
        style={{
          background: "linear-gradient(135deg, #1e2336, #7e7389)",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          transition: "0.3s ease",
        }}
        onMouseOver={e => (e.target.style.background = "linear-gradient(135deg, #262a4e, #35177b)")}
        onMouseOut={e => (e.target.style.background = "linear-gradient(135deg, #1e2336, #7e7389)")}
      >
        Logout
      </button>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.4)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
          {editingId ? "Edit Contact" : "Add Contact"}
        </h3>
        <form
          onSubmit={editingId ? handleUpdate : handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #444",
              background: "#cbcbcbff",
              color: "#fff",
              boxShadow: "inset 0 2px 5px rgba(0,0,0,0.3)",
              transition: "0.3s",
            }}
            onFocus={e => (e.target.style.border = "1px solid #7e7389")}
            onBlur={e => (e.target.style.border = "1px solid #444")}
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #00000030",
              background: "#cbcbcbff",
              color: "#fefefeff",
              boxShadow: "inset 0 2px 5px rgba(0,0,0,0.3)",
              transition: "0.3s",
            }}
            onFocus={e => (e.target.style.border = "1px solid #7e7389")}
            onBlur={e => (e.target.style.border = "1px solid #444")}
          />
          <input
            name="contact"
            placeholder="Contact"
            value={form.contact}
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #444",
              background: "#cbcbcbff",
              color: "#fff",
              boxShadow: "inset 0 2px 5px rgba(0,0,0,0.3)",
              transition: "0.3s",
            }}
            onFocus={e => (e.target.style.border = "1px solid #7e7389")}
            onBlur={e => (e.target.style.border = "1px solid #444")}
          />
          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, #1e2336, #7e7389)",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              transition: "0.3s ease",
            }}
            onMouseOver={e => (e.target.style.background = "linear-gradient(135deg, #262a4e, #35177b)")}
            onMouseOut={e => (e.target.style.background = "linear-gradient(135deg, #1e2336, #7e7389)")}
          >
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ name: "", email: "", contact: "" });
              }}
              style={{
                background: "#444",
                color: "#fff",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "0.3s ease",
              }}
              onMouseOver={e => (e.target.style.background = "#666")}
              onMouseOut={e => (e.target.style.background = "#444")}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {msg && (
        <div style={{ marginTop: "15px", color: "#ffcc00", fontWeight: "bold" }}>{msg}</div>
      )}

      <h3 style={{ marginTop: "30px", textAlign: "center" }}>Contacts</h3>
      <ul style={{ listStyle: "none", padding: 0, maxWidth: "600px", width: "100%" }}>
        {contacts.map(c => (
          <li
            key={c._id}
            style={{
              background: "rgba(255,255,255,0.05)",
              marginBottom: "12px",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "0.3s",
            }}
            onMouseOver={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            onMouseOut={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
          >
            <span>
              <strong>{c.name}</strong> - {c.email} - {c.contact}
            </span>
            <div>
              <button
                onClick={() => handleEdit(c)}
                style={{
                  background: "linear-gradient(100deg, #97b04cff, #edff23d8)",
                  color: "#000",
                  border: "none",
                  padding: "6px 12px",
                  marginRight: "8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                  transition: "0.3s ease",
                }}
                onMouseOver={e => (e.target.style.background = "linear-gradient(100deg, #97b04cff, #edff23d8)")}
                onMouseOut={e => (e.target.style.background = "linear-gradient(135deg, #bbe63aff, #edff23d8)")}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(c._id)}
                style={{
                  background: "linear-gradient(135deg, #ffa2a2ff, #cc0000)",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                  transition: "0.3s ease",
                }}
                onMouseOver={e => (e.target.style.background = "linear-gradient(135deg, #ff6666, #e60000)")}
                onMouseOut={e => (e.target.style.background = "linear-gradient(135deg, #ff4444, #cc0000)")}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
