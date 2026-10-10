import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FaSearch,
  FaHotel,
  FaStar,
  FaSlidersH,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaSortAmountDown,
  FaRedo,
  FaColumns,
  FaCheck
} from "react-icons/fa";
import API from "../../services/api";
import HotelCard from "../../components/HotelCard/HotelCard";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import FilterModal from "../../components/FilterModal/FilterModal";
import HotelQuickViewModal from "../../components/HotelQuickViewModal/HotelQuickViewModal";
import "./Hotels.css";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Data states
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalHotels, setTotalHotels] = useState(0);

  // Filter states
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Modal & layout states
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [quickViewHotel, setQuickViewHotel] = useState(null);
  const [showDesktopSidebar, setShowDesktopSidebar] = useState(true);

  // Fetch hotels from backend
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

      let list = res.data.hotels || [];

      // Client-side amenity filter if selected
      if (selectedAmenities.length > 0) {
        list = list.filter((h) =>
          selectedAmenities.every((amenity) =>
            h.amenities?.some((a) =>
              a.toLowerCase().includes(amenity.toLowerCase())
            )
          )
        );
      }

      // Client-side sorting fallback
      if (sortBy === "price") {
        list.sort((a, b) => (a.pricePerNight || 0) - (b.pricePerNight || 0));
      } else if (sortBy === "-price") {
        list.sort((a, b) => (b.pricePerNight || 0) - (a.pricePerNight || 0));
      } else if (sortBy === "-rating") {
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      } else if (sortBy === "name") {
        list.sort((a, b) => a.name.localeCompare(b.name));
      }

      setHotels(list);
      setTotalPages(res.data.totalPages || 1);
      setTotalHotels(res.data.totalHotels || list.length);
    } catch {
      setHotels([]);
      setTotalHotels(0);
    }

    setLoading(false);
  };

  // Re-fetch on pagination or sort changes
  useEffect(() => {
    fetchHotels();
  }, [page, sortBy]);

  // Handle URL param sync if changed externally
  useEffect(() => {
    const urlCity = searchParams.get("city");
    if (urlCity !== null && urlCity !== city) {
      setCity(urlCity);
      setPage(1);
      setTimeout(fetchHotels, 50);
    }
  }, [searchParams]);

  const handleApplyFilters = (filters) => {
    if (filters) {
      if (filters.city !== undefined) setCity(filters.city);
      if (filters.minPrice !== undefined) setMinPrice(filters.minPrice);
      if (filters.maxPrice !== undefined) setMaxPrice(filters.maxPrice);
      if (filters.rating !== undefined) setMinRating(filters.rating);
      if (filters.sortBy !== undefined) setSortBy(filters.sortBy);
      if (filters.selectedAmenities !== undefined)
        setSelectedAmenities(filters.selectedAmenities);
    }
    setPage(1);
    setTimeout(fetchHotels, 20);
  };

  const clearFilters = () => {
    setCity("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    setSortBy("price");
    setSelectedAmenities([]);
    setPage(1);
    setSearchParams({});

    setTimeout(fetchHotels, 30);
  };

  // Quick Preset Handlers
  const handleQuickPreset = (type, value) => {
    setPage(1);
    if (type === "rating") {
      setMinRating((prev) => (prev === value ? "" : value));
    } else if (type === "budget") {
      if (minPrice === "" && maxPrice === "3000") {
        setMinPrice("");
        setMaxPrice("");
      } else {
        setMinPrice("");
        setMaxPrice("3000");
      }
    } else if (type === "mid") {
      if (minPrice === "3000" && maxPrice === "6000") {
        setMinPrice("");
        setMaxPrice("");
      } else {
        setMinPrice("3000");
        setMaxPrice("6000");
      }
    } else if (type === "luxury") {
      if (minPrice === "6000" && maxPrice === "") {
        setMinPrice("");
        setMaxPrice("");
      } else {
        setMinPrice("6000");
        setMaxPrice("");
      }
    }
    setTimeout(fetchHotels, 30);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (city) count++;
    if (minPrice) count++;
    if (maxPrice) count++;
    if (minRating) count++;
    if (selectedAmenities.length > 0) count += selectedAmenities.length;
    return count;
  }, [city, minPrice, maxPrice, minRating, selectedAmenities]);

  return (
    <div className="hotels-page">
      {/* ================= HERO SECTION ================= */}
      <section className="hotels-hero">
        <div className="hotels-hero-overlay"></div>
        <div className="hotels-hero-content container">
          <span className="hero-pill-badge">
            <FaHotel /> Premium Escapes Across India
          </span>
          <h1 className="hotels-hero-title">Find Your Perfect Stay</h1>
          <p className="hotels-hero-subtitle">
            Explore verified hotels, boutique resorts, and luxury stays with
            best-rate guarantee
          </p>
        </div>
      </section>

      <div className="container hotels-main-container">
        {/* ================= TOP ACTION & TOOLBAR BAR ================= */}
        <div className="hotels-toolbar-panel">
          {/* Header left */}
          <div className="toolbar-left">
            <div className="section-title-wrap">
              <h2 className="toolbar-heading">All Properties</h2>
              <span className="count-pill">
                {loading ? "Searching..." : `${totalHotels} Stays`}
              </span>
            </div>
            {city && (
              <p className="toolbar-location-sub">
                Showing results for <strong>&ldquo;{city}&rdquo;</strong>
              </p>
            )}
          </div>

          {/* Quick presets & action buttons */}
          <div className="toolbar-right">
            {/* Quick Filter Chips */}
            <div className="quick-filter-chips">
              <button
                type="button"
                className={`quick-chip ${minRating === "4" ? "active" : ""}`}
                onClick={() => handleQuickPreset("rating", "4")}
              >
                <FaStar className="chip-icon-amber" /> 4+ Stars
              </button>

              <button
                type="button"
                className={`quick-chip ${
                  minPrice === "" && maxPrice === "3000" ? "active" : ""
                }`}
                onClick={() => handleQuickPreset("budget")}
              >
                Under ₹3,000
              </button>

              <button
                type="button"
                className={`quick-chip ${
                  minPrice === "3000" && maxPrice === "6000" ? "active" : ""
                }`}
                onClick={() => handleQuickPreset("mid")}
              >
                ₹3k - ₹6k
              </button>

              <button
                type="button"
                className={`quick-chip ${
                  minPrice === "6000" && maxPrice === "" ? "active" : ""
                }`}
                onClick={() => handleQuickPreset("luxury")}
              >
                ₹6,000+ Luxury
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="sort-dropdown-wrap">
              <FaSortAmountDown className="sort-icon-svg" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-dropdown-select"
                aria-label="Sort by"
              >
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-rating">Rating: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* ALL FILTERS MODAL BUTTON */}
            <button
              type="button"
              className={`all-filters-btn ${
                activeFiltersCount > 0 ? "has-filters" : ""
              }`}
              onClick={() => setFilterModalOpen(true)}
              aria-label="Open filter modal"
            >
              <FaSlidersH />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="filter-count-badge">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Desktop Sidebar Toggle */}
            <button
              type="button"
              className="desktop-sidebar-toggle-btn"
              onClick={() => setShowDesktopSidebar((prev) => !prev)}
              title={showDesktopSidebar ? "Hide sidebar" : "Show sidebar"}
            >
              <FaColumns />
            </button>
          </div>
        </div>

        {/* ================= ACTIVE FILTERS TAGS BAR ================= */}
        {activeFiltersCount > 0 && (
          <div className="active-filters-bar">
            <span className="active-filters-label">Active:</span>

            {city && (
              <span className="filter-tag">
                City: {city}
                <button onClick={() => { setCity(""); setTimeout(fetchHotels, 20); }}>
                  <FaTimes />
                </button>
              </span>
            )}

            {minPrice && (
              <span className="filter-tag">
                Min: ₹{Number(minPrice).toLocaleString()}
                <button onClick={() => { setMinPrice(""); setTimeout(fetchHotels, 20); }}>
                  <FaTimes />
                </button>
              </span>
            )}

            {maxPrice && (
              <span className="filter-tag">
                Max: ₹{Number(maxPrice).toLocaleString()}
                <button onClick={() => { setMaxPrice(""); setTimeout(fetchHotels, 20); }}>
                  <FaTimes />
                </button>
              </span>
            )}

            {minRating && (
              <span className="filter-tag">
                ★ {minRating}+ Stars
                <button onClick={() => { setMinRating(""); setTimeout(fetchHotels, 20); }}>
                  <FaTimes />
                </button>
              </span>
            )}

            {selectedAmenities.map((amenity) => (
              <span key={amenity} className="filter-tag">
                {amenity}
                <button
                  onClick={() => {
                    setSelectedAmenities((prev) =>
                      prev.filter((a) => a !== amenity)
                    );
                    setTimeout(fetchHotels, 20);
                  }}
                >
                  <FaTimes />
                </button>
              </span>
            ))}

            <button className="clear-all-tags-btn" onClick={clearFilters}>
              <FaRedo /> Reset All
            </button>
          </div>
        )}

        {/* ================= MAIN LAYOUT ================= */}
        <div
          className={`hotels-main-layout ${
            !showDesktopSidebar ? "no-sidebar" : ""
          }`}
        >
          {/* Desktop Filter Sidebar */}
          {showDesktopSidebar && (
            <aside className="hotels-desktop-sidebar">
              <FilterSidebar
                city={city}
                minPrice={minPrice}
                maxPrice={maxPrice}
                rating={minRating}
                sortBy={sortBy}
                selectedAmenities={selectedAmenities}
                onApply={handleApplyFilters}
                onClear={clearFilters}
                totalHotels={totalHotels}
              />
            </aside>
          )}

          {/* Results Grid Area */}
          <main className="hotels-content-area">
            {loading ? (
              <div className="loading-state-clean">
                <div className="modern-spinner"></div>
                <h3>Finding properties for you</h3>
                <p>Gathering the best verified stays and pricing...</p>
              </div>
            ) : hotels.length === 0 ? (
              <div className="empty-results-box">
                <div className="empty-icon-wrap">
                  <FaHotel />
                </div>
                <h3>No hotels match your filters</h3>
                <p>
                  Try expanding your search criteria or resetting applied filters.
                </p>
                <button
                  type="button"
                  className="clean-btn btn-primary-modern"
                  onClick={clearFilters}
                >
                  <FaRedo /> Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="hotels-results-grid">
                  {hotels.map((hotel) => (
                    <HotelCard
                      key={hotel._id}
                      hotel={hotel}
                      onQuickView={(h) => setQuickViewHotel(h)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="modern-pagination">
                    <button
                      className="pagination-btn nav-btn"
                      disabled={page === 1}
                      onClick={() => {
                        setPage((p) => Math.max(1, p - 1));
                        window.scrollTo({ top: 380, behavior: "smooth" });
                      }}
                    >
                      <FaArrowLeft /> Prev
                    </button>

                    <div className="pagination-numbers">
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
                              className={`pagination-number ${
                                pageNum === page ? "active" : ""
                              }`}
                              onClick={() => {
                                setPage(pageNum);
                                window.scrollTo({
                                  top: 380,
                                  behavior: "smooth"
                                });
                              }}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (
                          pageNum === page - 2 ||
                          pageNum === page + 2
                        ) {
                          return (
                            <span key={pageNum} className="pagination-ellipsis">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <button
                      className="pagination-btn nav-btn"
                      disabled={page === totalPages}
                      onClick={() => {
                        setPage((p) => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 380, behavior: "smooth" });
                      }}
                    >
                      Next <FaArrowRight />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* ================= FILTER MODAL ================= */}
      <FilterModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        city={city}
        minPrice={minPrice}
        maxPrice={maxPrice}
        rating={minRating}
        sortBy={sortBy}
        selectedAmenities={selectedAmenities}
        onApply={handleApplyFilters}
        onClear={clearFilters}
        totalHotels={totalHotels}
      />

      {/* ================= HOTEL QUICK VIEW MODAL ================= */}
      <HotelQuickViewModal
        isOpen={Boolean(quickViewHotel)}
        onClose={() => setQuickViewHotel(null)}
        hotel={quickViewHotel}
      />
    </div>
  );
}

export default Hotels;