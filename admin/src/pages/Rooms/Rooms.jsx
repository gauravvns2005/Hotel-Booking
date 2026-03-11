import { useState, useContext, useEffect } from "react";
import API from "../../services/api";
import { AdminContext } from "../../context/AdminContext";

const AMENITY_OPTS = ["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Sea View", "City View", "Bathtub", "Kitchen"];

function Rooms() {
  const { hotels, rooms, fetchHotels, fetchRooms } = useContext(AdminContext);
  const [form, setForm] = useState({ hotel: "", roomType: "", price: "", maxGuests: "", totalRooms: "" });
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchHotels();
    fetchRooms();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleAmenity = (a) => setAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  const uploadImage = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append("image", file);
        const res = await API.post("/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
        setImages(prev => [...prev, res.data.imageUrl]);
      }
    } catch (err) {
      setError("Image upload failed");
    }
    setUploading(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
    try {
      await API.post("/rooms", { ...form, price: Number(form.price), maxGuests: Number(form.maxGuests), totalRooms: Number(form.totalRooms), amenities, images });
      setSuccess("Room added successfully!");
      setForm({ hotel: "", roomType: "", price: "", maxGuests: "", totalRooms: "" });
      setAmenities([]); setImages([]);
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add room");
    }
    setLoading(false);
  };

  const deleteRoom = async (id) => {
    if (!window.confirm("Delete this room?")) return;
    try {
      await API.delete(`/rooms/${id}`);
      fetchRooms();
    } catch {}
  };

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Rooms</h1><p className="page-subtitle">Manage hotel rooms</p></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.5rem", alignItems: "start" }}>
        {/* Add Room Form */}
        <form className="card" onSubmit={submit}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Add New Room</h3>
          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}

          <div className="form-group">
            <label>Select Hotel *</label>
            <select className="form-control" name="hotel" value={form.hotel} onChange={handleChange} required>
              <option value="">-- Select Hotel --</option>
              {hotels.map(h => <option key={h._id} value={h._id}>{h.name} ({h.city})</option>)}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
            <div className="form-group">
              <label>Room Type *</label>
              <select className="form-control" name="roomType" value={form.roomType} onChange={handleChange} required>
                <option value="">-- Select --</option>
                {["Standard", "Deluxe", "Suite", "Presidential Suite", "Single", "Double", "Twin", "Family Room"].map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Price/Night (₹) *</label>
              <input className="form-control" type="number" name="price" placeholder="1500" value={form.price} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Max Guests *</label>
              <input className="form-control" type="number" name="maxGuests" placeholder="2" value={form.maxGuests} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Total Rooms *</label>
              <input className="form-control" type="number" name="totalRooms" placeholder="10" value={form.totalRooms} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Room Amenities</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {AMENITY_OPTS.map(a => (
                <button type="button" key={a} onClick={() => toggleAmenity(a)} style={{
                  padding: "0.25rem 0.65rem", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", border: "1.5px solid", transition: "all 0.2s",
                  background: amenities.includes(a) ? "rgba(99,102,241,0.15)" : "transparent",
                  borderColor: amenities.includes(a) ? "var(--primary)" : "var(--border)",
                  color: amenities.includes(a) ? "var(--primary-light)" : "var(--text-muted)",
                }}>{a}</button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Room Images</label>
            <label style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", padding: "1rem", border: "2px dashed var(--border)", borderRadius: "8px", cursor: "pointer" }}>
              <span style={{ fontSize: "1.5rem" }}>📷</span>
              <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{uploading ? "Uploading..." : "Upload room images"}</span>
              <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={uploadImage} disabled={uploading} />
            </label>
            {images.length > 0 && (
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                {images.map((url, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img src={url} alt={`r-${i}`} style={{ width: 60, height: 45, objectFit: "cover", borderRadius: "6px" }} />
                    <button type="button" onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))} style={{ position: "absolute", top: "1px", right: "1px", background: "rgba(239,68,68,0.85)", border: "none", color: "#fff", borderRadius: "50%", width: "16px", height: "16px", fontSize: "0.6rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading || uploading} style={{ width: "100%", justifyContent: "center" }}>
            {loading ? "Adding..." : "Add Room"}
          </button>
        </form>

        {/* Rooms List */}
        <div className="card" style={{ overflowX: "auto" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem" }}>All Rooms ({rooms.length})</h3>
          {rooms.length === 0 ? (
            <p style={{ color: "var(--text-muted)" }}>No rooms yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr><th>Hotel</th><th>Type</th><th>Price</th><th>Guests</th><th></th></tr>
              </thead>
              <tbody>
                {rooms.map(r => (
                  <tr key={r._id}>
                    <td style={{ fontSize: "0.82rem" }}>{r.hotel?.name}</td>
                    <td>{r.roomType}</td>
                    <td style={{ fontWeight: 600, color: "var(--primary-light)" }}>₹{r.price?.toLocaleString()}</td>
                    <td>{r.maxGuests}</td>
                    <td><button className="btn btn-sm btn-danger" onClick={() => deleteRoom(r._id)}>Del</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rooms;