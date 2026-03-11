import { useState, useContext, useEffect } from "react";
import { FaTrash, FaCamera, FaTimes } from "react-icons/fa";
import API from "../../services/api";
import { AdminContext } from "../../context/AdminContext";
import "./Rooms.css";

const AMENITY_OPTS = [
  "WiFi",
  "AC",
  "TV",
  "Mini Bar",
  "Balcony",
  "Sea View",
  "City View",
  "Bathtub",
  "Kitchen",
];

function Rooms() {
  const { hotels, rooms, fetchHotels, fetchRooms } = useContext(AdminContext);

  const [form, setForm] = useState({
    hotel: "",
    roomType: "",
    price: "",
    maxGuests: "",
    totalRooms: "",
  });

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleAmenity = (a) => {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    );
  };

  const uploadImage = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);

    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append("image", file);

        const res = await API.post("/upload", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setImages((prev) => [...prev, res.data.imageUrl]);
      }
    } catch {
      setError("Image upload failed");
    }

    setUploading(false);
  };

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await API.post("/rooms", {
        ...form,
        price: Number(form.price),
        maxGuests: Number(form.maxGuests),
        totalRooms: Number(form.totalRooms),
        amenities,
        images,
      });

      setSuccess("Room added successfully");

      setForm({
        hotel: "",
        roomType: "",
        price: "",
        maxGuests: "",
        totalRooms: "",
      });

      setAmenities([]);
      setImages([]);

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
        <div>
          <h1 className="page-title">Rooms</h1>

          <p className="page-subtitle">Manage hotel rooms</p>
        </div>
      </div>

      <div className="rooms-layout">
        {/* FORM */}

        <form className="card room-form" onSubmit={submit}>
          <h3 className="form-title">Add New Room</h3>

          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}

          <div className="form-group">
            <label>Select Hotel *</label>

            <select
              className="form-control"
              name="hotel"
              value={form.hotel}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Hotel --</option>

              {hotels.map((h) => (
                <option key={h._id} value={h._id}>
                  {h.name} ({h.city})
                </option>
              ))}
            </select>
          </div>

          <div className="room-grid">
            <div className="form-group">
              <label>Room Type</label>

              <select
                className="form-control"
                name="roomType"
                value={form.roomType}
                onChange={handleChange}
                required
              >
                <option value="">-- Select --</option>

                {[
                  "Standard",
                  "Deluxe",
                  "Suite",
                  "Presidential Suite",
                  "Single",
                  "Double",
                  "Twin",
                  "Family Room",
                ].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Price/Night</label>

              <input
                className="form-control"
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Max Guests</label>

              <input
                className="form-control"
                type="number"
                name="maxGuests"
                value={form.maxGuests}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Total Rooms</label>

              <input
                className="form-control"
                type="number"
                name="totalRooms"
                value={form.totalRooms}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Amenities */}

          <div className="form-group">
            <label>Room Amenities</label>

            <div className="amenities-list">
              {AMENITY_OPTS.map((a) => (
                <button
                  type="button"
                  key={a}
                  onClick={() => toggleAmenity(a)}
                  className={`amenity-btn ${amenities.includes(a) ? "active" : ""}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}

          <div className="form-group">
            <label>Room Images</label>

            <label className="upload-box">
              <FaCamera className="upload-icon" />

              <span>{uploading ? "Uploading..." : "Upload room images"}</span>

              <input
                type="file"
                accept="image/*"
                multiple
                className="file-input"
                onChange={uploadImage}
              />
            </label>

            {images.length > 0 && (
              <div className="image-preview">
                {images.map((url, i) => (
                  <div key={i} className="image-item">
                    <img src={url} alt="room" />

                    <button
                      type="button"
                      className="image-remove"
                      onClick={() =>
                        setImages((prev) => prev.filter((_, idx) => idx !== i))
                      }
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            className="btn btn-primary submit-btn"
            type="submit"
            disabled={loading || uploading}
          >
            {loading ? "Adding..." : "Add Room"}
          </button>
        </form>

        {/* ROOM LIST */}

        <div className="card room-table">
          <h3 className="form-title">All Rooms ({rooms.length})</h3>

          {rooms.length === 0 ? (
            <p className="rooms-empty">No rooms yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Hotel</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Guests</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {rooms.map((r) => (
                  <tr key={r._id}>
                    <td className="room-hotel">{r.hotel?.name}</td>

                    <td>{r.roomType}</td>

                    <td className="room-price">₹{r.price?.toLocaleString()}</td>

                    <td>{r.maxGuests}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteRoom(r._id)}
                      >
                        <FaTrash />
                        Del
                      </button>
                    </td>
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
