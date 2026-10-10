import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./Modal.css";

function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon: Icon,
  badge,
  children,
  footer,
  size = "md", // "sm", "md", "lg", "xl"
  showClose = true,
}) {
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    // Prevent body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={`modal-container modal-${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        {(title || showClose) && (
          <div className="modal-header">
            <div className="modal-header-text">
              <div className="modal-title-row">
                {Icon && <span className="modal-title-icon"><Icon /></span>}
                {title && <h2 className="modal-title">{title}</h2>}
                {badge && <span className="modal-title-badge">{badge}</span>}
              </div>
              {subtitle && <p className="modal-subtitle">{subtitle}</p>}
            </div>

            {showClose && (
              <button
                className="modal-close-btn"
                onClick={onClose}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            )}
          </div>
        )}

        {/* MODAL BODY */}
        <div className="modal-body">{children}</div>

        {/* MODAL FOOTER */}
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
