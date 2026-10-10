import { useState, useEffect } from "react";
import {
  FaSearch,
  FaStar,
  FaSlidersH,
  FaRedo,
  FaCheck,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaTimes,
  FaSortAmountDown,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaUtensils,
  FaSpa,
  FaDumbbell
} from "react-icons/fa";
import "./FilterSidebar.css";

const PRICE_PRESETS = [
  { label: "All", min: "", max: "" },
  { label: "< ₹2.5k", min: "", max: "2500" },
  { label: "₹2.5k - ₹5k", min: "2500", max: "5000" },
  { label: "₹5k - ₹10k", min: "5000", max: "10000" },
  { label: "₹10k+", min: "10000", max: "" }
];

const RATING_OPTIONS = [
  { value: "", label: "Any Rating" },
  { value: "3", label: "3.0+" },
  { value: "4", label: "4.0+" },
  { value: "4.5", label: "4.5+" }
];

const AMENITY_TAGS = [
  { name: "Free WiFi", icon: FaWifi },
  { name: "Swimming Pool", icon: FaSwimmingPool },
  { name: "Parking", icon: FaParking },
  { name: "Restaurant", icon: FaUtensils },
  { name: "Spa", icon: FaSpa },
  { name: "Fitness Center", icon: FaDumbbell }
];

function FilterSidebar({
  city: initialCity = "",
  minPrice: initialMinPrice = "",
  maxPrice: initialMaxPrice = "",
  rating: initialRating = "",
  sortBy: initialSortBy = "price",
  selectedAmenities: initialAmenities = [],
  onApply,
  onClear,
  apply, // backwards compatibility
  isModal = false,
  totalHotels = null,
  onClose
}) {
  const [city, setCity] = useState(initialCity);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [rating, setRating] = useState(initialRating);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [selectedAmenities, setSelectedAmenities] = useState(initialAmenities);

  // Sync with prop changes
  useEffect(() => {
    setCity(initialCity);
    setMinPrice(initialMinPrice);
    setMaxPrice(initialMaxPrice);
    setRating(initialRating);
    setSortBy(initialSortBy);
    setSelectedAmenities(initialAmenities || []);
  }, [initialCity, initialMinPrice, initialMaxPrice, initialRating, initialSortBy, initialAmenities]);

  const handleApply = () => {
    const filters = {
      city: city.trim(),
      minPrice,
      maxPrice,
      rating,
      sortBy,
      selectedAmenities
    };

    if (onApply) {
      onApply(filters);
    } else if (apply) {
      apply({ minPrice, maxPrice, rating });
    }

    if (onClose) onClose();
  };

  const handleClear = () => {
    setCity("");
    setMinPrice("");
    setMaxPrice("");
    setRating("");
    setSortBy("price");
    setSelectedAmenities([]);

    if (onClear) {
      onClear();
    } else if (apply) {
      apply({ minPrice: "", maxPrice: "", rating: "" });
    }
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const activeCount = [
    city,
    minPrice,
    maxPrice,
    rating,
    selectedAmenities.length > 0 ? true : false
  ].filter(Boolean).length;

  return (
    <div className={`filter-panel ${isModal ? "filter-panel-modal" : "filter-panel-sidebar"}`}>
      {/* HEADER FOR SIDEBAR */}
      {!isModal && (
        <div className="filter-panel-header">
          <div className="filter-panel-title-wrap">
            <span className="filter-badge-icon">
              <FaSlidersH />
            </span>
            <h3 className="filter-panel-title">Filters</h3>
            {activeCount > 0 && (
              <span className="active-filter-badge">{activeCount} active</span>
            )}
          </div>
          {activeCount > 0 && (
            <button className="reset-link-btn" onClick={handleClear}>
              <FaRedo /> Reset
            </button>
          )}
        </div>
      )}

      {/* FILTER BODY */}
      <div className="filter-panel-body">
        {/* SECTION 1: LOCATION SEARCH */}
        <div className="filter-card-section">
          <label className="section-label">
            <FaMapMarkerAlt className="label-icon text-blue" />
            Destination / City
          </label>
          <div className="search-input-wrap">
            <FaSearch className="input-icon-left" />
            <input
              type="text"
              className="clean-input"
              placeholder="e.g. Goa, Mumbai, Delhi, Manali..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
            />
            {city && (
              <button
                className="input-clear-icon"
                onClick={() => setCity("")}
                title="Clear"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {/* SECTION 2: PRICE RANGE */}
        <div className="filter-card-section">
          <div className="section-header-row">
            <label className="section-label">
              <FaRupeeSign className="label-icon text-emerald" />
              Price Range (per night)
            </label>
          </div>

          <div className="price-inputs-grid">
            <div className="price-field-group">
              <span className="price-field-label">Min</span>
              <div className="price-input-box">
                <span className="currency-symbol">₹</span>
                <input
                  type="number"
                  className="clean-input price-input"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="price-separator">—</div>

            <div className="price-field-group">
              <span className="price-field-label">Max</span>
              <div className="price-input-box">
                <span className="currency-symbol">₹</span>
                <input
                  type="number"
                  className="clean-input price-input"
                  placeholder="25,000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Quick Price Presets */}
          <div className="preset-chips-wrap">
            {PRICE_PRESETS.map((preset, idx) => {
              const isSelected =
                minPrice === preset.min && maxPrice === preset.max;
              return (
                <button
                  key={idx}
                  type="button"
                  className={`preset-chip ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    setMinPrice(preset.min);
                    setMaxPrice(preset.max);
                  }}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: RATING */}
        <div className="filter-card-section">
          <label className="section-label">
            <FaStar className="label-icon text-amber" />
            Guest Rating
          </label>

          <div className="rating-chips-grid">
            {RATING_OPTIONS.map((opt) => {
              const isSelected = rating === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`rating-chip ${isSelected ? "selected" : ""}`}
                  onClick={() => setRating(opt.value)}
                >
                  {opt.value && <FaStar className="star-icon" />}
                  <span>{opt.label}</span>
                  {isSelected && <FaCheck className="check-indicator" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: SORT BY */}
        <div className="filter-card-section">
          <label className="section-label">
            <FaSortAmountDown className="label-icon text-indigo" />
            Sort Properties By
          </label>
          <div className="select-wrap">
            <select
              className="clean-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="-rating">Highest Guest Rating</option>
              <option value="name">Hotel Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* SECTION 5: POPULAR AMENITIES */}
        <div className="filter-card-section">
          <label className="section-label">
            <FaCheck className="label-icon text-teal" />
            Popular Amenities
          </label>
          <div className="amenities-chips-wrap">
            {AMENITY_TAGS.map((tag) => {
              const isSelected = selectedAmenities.includes(tag.name);
              const TagIcon = tag.icon;
              return (
                <button
                  key={tag.name}
                  type="button"
                  className={`amenity-chip ${isSelected ? "selected" : ""}`}
                  onClick={() => toggleAmenity(tag.name)}
                >
                  <TagIcon className="amenity-icon" />
                  <span>{tag.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="filter-panel-actions">
        <button
          type="button"
          className="clean-btn btn-secondary-modern"
          onClick={handleClear}
        >
          <FaRedo className="action-btn-icon" />
          Clear
        </button>

        <button
          type="button"
          className="clean-btn btn-primary-modern"
          onClick={handleApply}
        >
          <FaSlidersH className="action-btn-icon" />
          {totalHotels !== null && totalHotels > 0
            ? `Show ${totalHotels} Hotels`
            : "Apply Filters"}
        </button>
      </div>
    </div>
  );
}

export default FilterSidebar;