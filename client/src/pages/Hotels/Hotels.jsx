import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../../services/api";
import HotelCard from "../../components/HotelCard/HotelCard";
import "./Hotels.css";

function Hotels() {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [city, setCity] = useState(searchParams.get("city") || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (city) params.set("city", city);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (minRating) params.set("rating", minRating);
      params.set("page", page);
      params.set("limit", 9);

      const res = await API.get(`/hotels/search?${params}`);
      setHotels(res.data.hotels || []);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      setHotels([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHotels();
  }, [page]);

  const handleFilter = () => {
    setPage(1);
    fetchHotels();
  };

  const clearFilters = () => {
    setCity("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    setPage(1);
    setTimeout(fetchHotels, 50);
  };

  return (
    <div className="hotels-page page-wrapper">
      <div className="container">
        <div className="hotels-header">
          <div>
            <h1 className="section-heading">All Hotels</h1>
            <p className="section-subheading" style={{ marginBottom: 0 }}>
              {hotels.length} hotels found
            </p>
          </div>
        </div>

        <div className="hotels-layout">
          {/* Sidebar Filters */}
          <aside className="filter-sidebar">
            <div className="filter-card">
              <h3 className="filter-title">🔍 Filter Hotels</h3>

              <div className="form-group">
                <label>City</label>
                <input
                  className="form-control"
                  placeholder="e.g. Mumbai"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Min Price (₹/night)</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Max Price (₹/night)</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="100000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Min Rating</label>
                <select
                  className="form-control"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                >
                  <option value="">Any Rating</option>
                  <option value="1">⭐ 1+</option>
                  <option value="2">⭐⭐ 2+</option>
                  <option value="3">⭐⭐⭐ 3+</option>
                  <option value="4">⭐⭐⭐⭐ 4+</option>
                  <option value="4.5">⭐⭐⭐⭐⭐ 4.5+</option>
                </select>
              </div>

              <button className="btn btn-primary" style={{ width: "100%", marginBottom: "0.75rem" }} onClick={handleFilter}>
                Apply Filters
              </button>
              <button className="btn btn-secondary" style={{ width: "100%" }} onClick={clearFilters}>
                Clear All
              </button>
            </div>
          </aside>

          {/* Hotels Grid */}
          <div className="hotels-grid-area">
            {loading ? (
              <div className="loading-screen">Loading hotels...</div>
            ) : hotels.length === 0 ? (
              <div className="no-results">
                <span style={{ fontSize: "3rem" }}>🏨</span>
                <h3>No hotels found</h3>
                <p>Try adjusting your filters</p>
                <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              <>
                <div className="hotels-results-grid">
                  {hotels.map((hotel) => (
                    <HotelCard key={hotel._id} hotel={hotel} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="btn btn-sm btn-secondary"
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      ← Prev
                    </button>
                    <span className="page-info">Page {page} of {totalPages}</span>
                    <button
                      className="btn btn-sm btn-secondary"
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotels;