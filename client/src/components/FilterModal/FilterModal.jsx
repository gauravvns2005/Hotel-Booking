import { FaSlidersH } from "react-icons/fa";
import Modal from "../Modal/Modal";
import FilterSidebar from "../FilterSidebar/FilterSidebar";
import "./FilterModal.css";

function FilterModal({
  isOpen,
  onClose,
  city,
  minPrice,
  maxPrice,
  rating,
  sortBy,
  selectedAmenities,
  onApply,
  onClear,
  totalHotels
}) {
  const activeCount = [
    city,
    minPrice,
    maxPrice,
    rating,
    selectedAmenities?.length > 0 ? true : false
  ].filter(Boolean).length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Filter Hotels"
      subtitle="Refine your search with custom price ranges, guest ratings, and amenities"
      icon={FaSlidersH}
      badge={activeCount > 0 ? `${activeCount} Active` : undefined}
      size="md"
    >
      <div className="filter-modal-content">
        <FilterSidebar
          isModal={true}
          city={city}
          minPrice={minPrice}
          maxPrice={maxPrice}
          rating={rating}
          sortBy={sortBy}
          selectedAmenities={selectedAmenities}
          onApply={(filters) => {
            onApply(filters);
            onClose();
          }}
          onClear={onClear}
          totalHotels={totalHotels}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
}

export default FilterModal;
