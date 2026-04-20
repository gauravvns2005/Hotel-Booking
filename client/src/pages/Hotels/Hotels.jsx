import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch, FaHotel, FaStar, FaSlidersH, FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
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
  const [totalHotels, setTotalHotels] = useState(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("price");

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
      params.set("sort", sortBy);

      const res = await API.get(`/hotels/search?${params}`);

      setHotels(res.data.hotels || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalHotels(res.data.totalHotels || 0);
    } catch {
      setHotels([]);
      setTotalHotels(0);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchHotels();
  }, [page, sortBy]);

  const handleFilter = () => {
    setPage(1);
    fetchHotels();
    setMobileFiltersOpen(false);
  };

  const clearFilters = () => {
    setCity("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    setSortBy("price");
    setPage(1);

    setTimeout(fetchHotels, 50);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (city) count++;
    if (minPrice) count++;
    if (maxPrice) count++;
    if (minRating) count++;
    return count;
  };

  return (
    <div className="hotels-page">
      {/* Hero Section */}
      <div className="hero-section-small">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Stay</h1>
          <p className="hero-subtitle">Discover amazing hotels at the best prices</p>
        </div>
      </div>

      <div className="container">
        {/* Header Section */}
        <div className="hotels-header">
          <div className="header-left">
            <h1 className="section-heading">All Hotels</h1>
            <p className="section-subheading">{totalHotels} properties found</p>
          </div>
          
          <div className="header-right">
            {/* <div className="sort-container">
              <label>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-rating">Rating: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div> */}
            
            <button 
              className="mobile-filter-toggle"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <FaSlidersH />
              Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
            </button>
          </div>
        </div>

        <div className="hotels-layout">
          {/* Desktop Filter Sidebar */}
          <aside className={`filter-sidebar ${mobileFiltersOpen ? 'mobile-open' : ''}`}>
            <div className="filter-header-mobile">
              <h3>Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="filter-card">
              <div className="filter-section">
                <h3 className="filter-title">
                  <FaSearch />
                  Search Location
                </h3>

                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Enter city name..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="filter-section">
                <h3 className="filter-title">Price Range</h3>
                
                <div className="price-range">
                  <div className="form-group">
                    <label>Min Price (₹)</label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Max Price (₹)</label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="filter-section">
                <h3 className="filter-title">Rating</h3>

                <div className="rating-filters">
                  {[1, 2, 3, 4].map((rating) => (
                    <button
                      key={rating}
                      className={`rating-filter-btn ${minRating === String(rating) ? 'active' : ''}`}
                      onClick={() => setMinRating(minRating === String(rating) ? "" : String(rating))}
                    >
                      <FaStar />
                      {rating}+ Stars
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-actions">
                <button className="apply-btn" onClick={handleFilter}>
                  Apply Filters
                </button>

                <button className="clear-btn" onClick={clearFilters}>
                  Clear All
                </button>
              </div>
            </div>
          </aside>

          {/* Mobile Overlay */}
          {mobileFiltersOpen && (
            <div className="mobile-overlay" onClick={() => setMobileFiltersOpen(false)}></div>
          )}

          {/* Hotels Grid Area */}
          <div className="hotels-grid-area">
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Finding the best hotels for you...</p>
              </div>
            ) : hotels.length === 0 ? (
              <div className="no-results">
                <FaHotel className="empty-icon" />
                <h3>No hotels found</h3>
                <p>We couldn't find any properties matching your criteria</p>
                {/* <button className="clear-btn primary" onClick={clearFilters}>
                  Clear All Filters
                </button> */}
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
                      className="page-btn"
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      <FaArrowLeft />
                      Previous
                    </button>

                    <div className="page-numbers">
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        if (
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          (pageNum >= page - 1 && pageNum <= page + 1)
                        ) {
                          return (
                            <button
                              key={pageNum}
                              className={`page-number ${pageNum === page ? 'active' : ''}`}
                              onClick={() => setPage(pageNum)}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (
                          pageNum === page - 2 ||
                          pageNum === page + 2
                        ) {
                          return <span key={pageNum} className="page-dots">...</span>;
                        }
                        return null;
                      })}
                    </div>

                    <button
                      className="page-btn"
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next
                      <FaArrowRight />
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