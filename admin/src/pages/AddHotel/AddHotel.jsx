import { useState, useContext } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";
import API from "../../services/api";
import { AdminContext } from "../../context/AdminContext";
import "./AddHotel.css";

const AMENITY_OPTS = [
  "WiFi",
  "Pool",
  "Parking",
  "Gym",
  "Spa",
  "Restaurant",
  "AC",
  "Room Service",
  "Laundry",
  "Airport Transfer",
];

function AddHotel() {
  const { fetchHotels } = useContext(AdminContext);

  const [form, setForm] = useState({
    name: "",
    description: "",
    city: "",
    state: "",
    address: "",
    pincode: "",
    pricePerNight: "",
  });

  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      const urls = [];

      for (const file of files) {
        const fd = new FormData();
        fd.append("image", file);

        const res = await API.post("/upload", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        urls.push(res.data.imageUrl);
      }

      setImages((prev) => [...prev, ...urls]);
    } catch (err) {
      setError("Image upload failed");
    }

    setUploading(false);
  };

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!images.length) return setError("Upload at least one image");

    setLoading(true);

    try {
      await API.post("/hotels", {
        ...form,
        pricePerNight: Number(form.pricePerNight),
        amenities,
        images,
      });

      setSuccess("Hotel added successfully");

      setForm({
        name: "",
        description: "",
        city: "",
        state: "",
        address: "",
        pincode: "",
        pricePerNight: "",
      });

      setAmenities([]);
      setImages([]);

      fetchHotels();
    } catch {
      setError("Failed to add hotel");
    }

    setLoading(false);
  };

  return (
    <div className="add-hotel-page">
      <div className="page-header">
        <h1 className="page-title">Add New Hotel</h1>

        <p className="page-subtitle">Fill details to list a new hotel</p>
      </div>

      <div className="add-hotel-layout">
        <form className="card add-hotel-form" onSubmit={submit}>
          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}

          <div className="form-grid">
            <div className="form-group">
              <label>Hotel Name</label>

              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>City</label>

              <input
                className="form-control"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>State</label>

              <input
                className="form-control"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Pincode</label>

              <input
                className="form-control"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>

            <input
              className="form-control"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              className="form-control textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price Per Night</label>

            <input
              className="form-control"
              type="number"
              name="pricePerNight"
              value={form.pricePerNight}
              onChange={handleChange}
              required
            />
          </div>

          {/* Amenities */}

          <div className="form-group">
            <label>Amenities</label>

            <div className="amenities-list">
              {AMENITY_OPTS.map((a) => (
                <button
                  type="button"
                  key={a}
                  className={`amenity-btn ${amenities.includes(a) ? "active" : ""}`}
                  onClick={() => toggleAmenity(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <button
            className="submit-btn"
            type="submit"
            disabled={loading || uploading}
          >
            {loading ? "Adding..." : "Add Hotel"}
          </button>
        </form>

        {/* IMAGE UPLOAD */}

        <div className="card image-upload-card">
          <h3 className="upload-title">Hotel Images</h3>

          <label className="upload-box">
            <FaCamera className="upload-icon" />

            <span>{uploading ? "Uploading..." : "Click to upload images"}</span>

            <input
              type="file"
              accept="image/*"
              multiple
              className="file-input"
              onChange={uploadImage}
            />
          </label>

          {images.length > 0 && (
            <div className="image-grid">
              {images.map((url, i) => (
                <div key={i} className="image-item">
                  <img src={url} alt="hotel" />

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
      </div>
    </div>
  );
}

export default AddHotel;
