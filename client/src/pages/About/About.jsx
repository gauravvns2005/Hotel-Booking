import { useEffect } from "react";
import {
  FaHotel,
  FaUsers,
  FaGlobe,
  FaShieldAlt,
  FaHeadset,
  FaCheckCircle,
  FaAward,
  FaHeart,
  FaStar,
  FaArrowRight,
  FaBuilding,
  FaLock,
  FaCreditCard,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { number: "500+", label: "Hotels", icon: FaBuilding },
    { number: "50K+", label: "Happy Guests", icon: FaUsers },
    { number: "25+", label: "Cities", icon: FaGlobe },
    { number: "98%", label: "Satisfaction Rate", icon: FaStar },
  ];

  const values = [
    {
      icon: FaShieldAlt,
      title: "Trust & Security",
      description: "Your safety is our priority. We ensure secure payments and verified properties.",
    },
    {
      icon: FaHeadset,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you with any query.",
    },
    {
      icon: FaHeart,
      title: "Customer First",
      description: "We put our customers at the heart of everything we do.",
    },
    {
      icon: FaAward,
      title: "Quality Assurance",
      description: "Every hotel on our platform meets strict quality standards.",
    },
  ];

  const features = [
    {
      icon: FaLock,
      title: "Secure Payments",
      description: "128-bit SSL encryption for all transactions",
    },
    {
      icon: FaCreditCard,
      title: "Best Price Guarantee",
      description: "Find a lower price? We'll match it",
    },
    {
      icon: FaClock,
      title: "Instant Confirmation",
      description: "Get immediate booking confirmation",
    },
    {
      icon: FaCheckCircle,
      title: "Free Cancellation",
      description: "Cancel up to 24 hours before check-in",
    },
  ];

  const milestones = [
    { year: "2020", event: "Company Founded", description: "StayEase was founded with a vision to revolutionize hotel booking" },
    { year: "2021", event: "First 100 Hotels", description: "Reached 100+ hotel partners across major cities" },
    { year: "2022", event: "50K Happy Customers", description: "Served over 50,000 satisfied guests" },
    { year: "2023", event: "Expansion", description: "Expanded to 25+ cities nationwide" },
    { year: "2024", event: "Industry Recognition", description: "Awarded 'Best Travel Platform'", },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">About StayEase</h1>
          <p className="about-hero-subtitle">
            We're on a mission to make hotel booking simple, secure, and seamless for everyone
          </p>
        </div>
      </div>

      {/* Company Overview */}
      <div className="about-section">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Who We Are</h2>
              <p>
                StayEase is India's fastest-growing hotel booking platform, connecting travelers 
                with the best accommodations across the country. Founded in 2020, we've helped 
                over 50,000 customers find their perfect stay.
              </p>
              <p>
                Our platform offers a curated selection of hotels, from budget-friendly options 
                to luxury resorts, ensuring every traveler finds exactly what they're looking for.
              </p>
              <div className="about-features-list">
                <div className="about-feature">
                  <FaCheckCircle />
                  <span>Verified hotels only</span>
                </div>
                <div className="about-feature">
                  <FaCheckCircle />
                  <span>Best price guaranteed</span>
                </div>
                <div className="about-feature">
                  <FaCheckCircle />
                  <span>Secure payment gateway</span>
                </div>
                <div className="about-feature">
                  <FaCheckCircle />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
            <div className="about-stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <stat.icon className="stat-icon" />
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="about-section about-values">
        <div className="about-container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <value.icon className="value-icon" />
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Journey */}
      <div className="about-section">
        <div className="about-container">
          <div className="section-header">
            <h2>Our Journey</h2>
            <p>From humble beginnings to industry leader</p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.event}</h3>
                  <p>{milestone.description}</p>
                </div>
                {index < milestones.length - 1 && <div className="timeline-line"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="about-section about-why">
        <div className="about-container">
          <div className="section-header">
            <h2>Why Choose StayEase?</h2>
            <p>What makes us different from the rest</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <feature.icon className="feature-icon" />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="about-section">
        <div className="about-container">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
            <p>Real experiences from real travelers</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="testimonial-text">
                "Amazing platform! Found a great hotel at an unbelievable price. 
                The booking process was smooth and hassle-free."
              </p>
              <div className="testimonial-author">
                <strong>Rahul Sharma</strong>
                <span>Mumbai</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="testimonial-text">
                "Best hotel booking experience ever! The customer support team 
                was extremely helpful when I needed to modify my booking."
              </p>
              <div className="testimonial-author">
                <strong>Priya Patel</strong>
                <span>Delhi</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="testimonial-text">
                "I love how easy it is to compare hotels and find the best deals. 
                StayEase is now my go-to platform for all my travels."
              </p>
              <div className="testimonial-author">
                <strong>Amit Kumar</strong>
                <span>Bangalore</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="about-section about-contact">
        <div className="about-container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>Have questions? We'd love to hear from you</p>
              <div className="contact-details">
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <div>
                    <strong>Visit Us</strong>
                    <span>123 Business Park, Mumbai, India</span>
                  </div>
                </div>
                <div className="contact-item">
                  <FaPhone />
                  <div>
                    <strong>Call Us</strong>
                    <span>+91 98765 43210</span>
                  </div>
                </div>
                <div className="contact-item">
                  <FaEnvelope />
                  <div>
                    <strong>Email Us</strong>
                    <span>support@stayease.com</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-cta">
              <div className="cta-card">
                <h3>Ready to start your journey?</h3>
                <p>Join thousands of happy travelers who book with StayEase</p>
                <Link to="/hotels" className="cta-button">
                  Explore Hotels
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;