import { useState, useContext, useEffect } from "react";
import API from "../../services/api";
import { AdminContext } from "../../context/AdminContext";

const AMENITY_OPTS = ["WiFi", "Pool", "Parking", "Gym", "Spa", "Restaurant", "AC", "Room Service", "Laundry", "Airport Transfer"];

function AddHotel() {
  const { fetchHotels } = useContext(AdminContext);
  const [form, setForm] = useState({
    name: "", description: "", city: "", state: "", address: "", pincode: "", pricePerNight: "",
  });
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleAmenity = (a) => {
    setAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  };

  const uploadImage = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = [];
      for (const file of files) {
        const fd = new FormData();
        fd.append("image", file);
        const res = await API.post("/upload", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        urls.push(res.data.imageUrl);
      }
      setImages(prev => [...prev, ...urls]);
    } catch (err) {
      setError("Image upload failed: " + (err.response?.data?.message || err.message));
    }
    setUploading(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!images.length) return setError("Please upload at least one image.");
    setLoading(true);
    try {
      await API.post("/hotels", { ...form, pricePerNight: Number(form.pricePerNight), amenities, images });
      setSuccess("Hotel added successfully!");
      setForm({ name: "", description: "", city: "", state: "", address: "", pincode: "", pricePerNight: "" });
      setAmenities([]);
      setImages([]);
      fetchHotels();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add hotel");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Add New Hotel</h1>
          <p className="page-subtitle">Fill in the details to list a new hotel</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem", alignItems: "start" }}>
        <form className="card" onSubmit={submit}>
          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
            <div className="form-group">
              <label>Hotel Name *</label>
              <input className="form-control" name="name" placeholder="Grand Palace Hotel" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>City *</label>
              <input className="form-control" name="city" placeholder="Mumbai" value={form.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>State *</label>
              <input className="form-control" name="state" placeholder="Maharashtra" value={form.state} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Pincode *</label>
              <input className="form-control" name="pincode" placeholder="400001" value={form.pincode} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Address *</label>
            <input className="form-control" name="address" placeholder="Full address" value={form.address} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea className="form-control" name="description" rows={3} placeholder="Describe the hotel..." value={form.description} onChange={handleChange} style={{ resize: "vertical" }} required />
          </div>

          <div className="form-group">
            <label>Price Per Night (₹) *</label>
            <input className="form-control" type="number" name="pricePerNight" placeholder="2500" value={form.pricePerNight} onChange={handleChange} required />
          </div>

          {/* Amenities */}
          <div className="form-group">
            <label>Amenities</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem" }}>
              {AMENITY_OPTS.map(a => (
                <button type="button" key={a} onClick={() => toggleAmenity(a)}
                  style={{
                    padding: "0.3rem 0.75rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                    border: "1.5px solid", transition: "all 0.2s",
                    background: amenities.includes(a) ? "rgba(99,102,241,0.15)" : "transparent",
                    borderColor: amenities.includes(a) ? "var(--primary)" : "var(--border)",
                    color: amenities.includes(a) ? "var(--primary-light)" : "var(--text-muted)",
                  }}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading || uploading} style={{ width: "100%", justifyContent: "center" }}>
            {loading ? "Adding Hotel..." : "Add Hotel"}
          </button>
        </form>

        {/* Image Upload */}
        <div>
          <div className="card">
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>Hotel Images</h3>

            <label style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
              padding: "1.5rem", border: "2px dashed var(--border)", borderRadius: "10px", cursor: "pointer",
              transition: "border-color 0.2s", textAlign: "center"
            }}>
              <span style={{ fontSize: "2rem" }}>📸</span>
              <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                {uploading ? "Uploading..." : "Click to upload images"}
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>JPG, PNG, WebP</span>
              <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={uploadImage} disabled={uploading} />
            </label>

            {images.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.5rem", marginTop: "1rem" }}>
                {images.map((url, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img src={url} alt={`img-${i}`} style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "8px" }} />
                    <button onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                      style={{
                        position: "absolute", top: "4px", right: "4px", background: "rgba(239,68,68,0.85)",
                        border: "none", color: "#fff", borderRadius: "50%", width: "20px", height: "20px",
                        fontSize: "0.7rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                      }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddHotel;