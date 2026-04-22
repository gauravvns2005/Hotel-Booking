import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaUser,
  FaCommentAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaHeadset,
  FaGlobe,
  FaShieldAlt,
} from "react-icons/fa";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: ["123 Business Park", "Andheri East", "Mumbai - 400093, India"],
    },
    {
      icon: FaPhone,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 98765 43211"],
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: ["support@stayease.com", "careers@stayease.com"],
    },
    {
      icon: FaClock,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 8PM", "Saturday - Sunday: 10AM - 6PM"],
    },
  ];

  const faqs = [
    {
      question: "How do I book a hotel?",
      answer: "Simply search for your desired destination, select a hotel, choose your dates, and complete the booking process. You'll receive instant confirmation via email.",
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking up to 24 hours before check-in for a full refund. Check your booking details for specific cancellation policies.",
    },
    {
      question: "How do I get a refund?",
      answer: "Refunds are automatically processed to your original payment method within 5-7 business days after cancellation confirmation.",
    },
    {
      question: "Is my payment secure?",
      answer: "Absolutely! We use 128-bit SSL encryption to protect your payment information and never store your card details.",
    },
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Get In Touch</h1>
          <p className="contact-hero-subtitle">
            Have questions? We're here to help. Reach out to us anytime.
          </p>
        </div>
      </div>

      <div className="contact-container">
        {/* Contact Info Cards */}
        <div className="contact-info-grid">
          {contactInfo.map((info, index) => (
            <div key={index} className="contact-info-card">
              <info.icon className="contact-info-icon" />
              <h3>{info.title}</h3>
              {info.details.map((detail, i) => (
                <p key={i}>{detail}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Main Contact Section */}
        <div className="contact-main-grid">
          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="contact-form-header">
              <h2>Send Us a Message</h2>
              <p>We'll get back to you within 24 hours</p>
            </div>

            {submitted && (
              <div className="success-message">
                <FaCheckCircle />
                <div>
                  <strong>Message Sent Successfully!</strong>
                  <p>We'll respond to your inquiry shortly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FaUser />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    <FaEnvelope />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  <FaCommentAlt />
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your query in detail..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div className="btn-spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="faq-section">
            <div className="faq-header">
              <h2>Frequently Asked Questions</h2>
              <p>Quick answers to common questions</p>
            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="support-cta">
              <FaHeadset />
              <div>
                <strong>Still have questions?</strong>
                <p>Our support team is ready to assist you</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <h2>Find Us Here</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.6433233611!2d72.74110163610264!3d19.082522317879685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Office Location Map"
            ></iframe>
          </div>
        </div>

        {/* Connect With Us */}
        <div className="connect-section">
          <div className="connect-content">
            <h2>Connect With Us</h2>
            <p>Follow us on social media for updates and exclusive offers</p>
            <div className="social-links">
              <a href="#" className="social-link">
                <FaFacebook />
              </a>
              <a href="#" className="social-link">
                <FaTwitter />
              </a>
              <a href="#" className="social-link">
                <FaInstagram />
              </a>
              <a href="#" className="social-link">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="trust-badges">
            <div className="trust-badge">
              <FaShieldAlt />
              <span>Secure Communication</span>
            </div>
            <div className="trust-badge">
              <FaGlobe />
              <span>24/7 Global Support</span>
            </div>
            <div className="trust-badge">
              <FaCheckCircle />
              <span>100% Response Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;