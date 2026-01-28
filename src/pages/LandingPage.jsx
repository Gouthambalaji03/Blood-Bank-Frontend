import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-nav-container">
          <div className="landing-logo">
            <i className="fa-solid fa-droplet"></i>
            <span>Blood<span className="logo-highlight">Bank</span></span>
          </div>
          <div className="landing-nav-links">
            <Link to="/login" className="nav-link-landing">Login</Link>
            <Link to="/register" className="nav-btn-primary">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fa-solid fa-heart-pulse"></i>
              <span>Save Lives Today</span>
            </div>
            <h1 className="hero-title">
              Every Drop of <span className="text-highlight">Blood</span> Counts
            </h1>
            <p className="hero-subtitle">
              Connect with donors, hospitals, and organizations. Together, we can ensure
              safe blood supply for everyone in need. Join our mission to save lives.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="hero-btn-primary">
                <i className="fa-solid fa-user-plus"></i>
                Get Started
              </Link>
              <Link to="/login" className="hero-btn-secondary">
                <i className="fa-solid fa-right-to-bracket"></i>
                Sign In
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Active Donors</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Lives Saved</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Hospitals</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="blood-drop-animation">
                <i className="fa-solid fa-droplet"></i>
              </div>
              <div className="hero-card-content">
                <h3>Blood Types Available</h3>
                <div className="blood-types-grid">
                  <span className="blood-type">A+</span>
                  <span className="blood-type">A-</span>
                  <span className="blood-type">B+</span>
                  <span className="blood-type">B-</span>
                  <span className="blood-type">O+</span>
                  <span className="blood-type">O-</span>
                  <span className="blood-type">AB+</span>
                  <span className="blood-type">AB-</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Us?</h2>
            <p className="section-subtitle">We provide a seamless platform for blood donation management</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fa-solid fa-hospital"></i>
              </div>
              <h3>Hospital Network</h3>
              <p>Connect with verified hospitals and healthcare facilities across the region.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fa-solid fa-hand-holding-heart"></i>
              </div>
              <h3>Donor Management</h3>
              <p>Track donations, manage donor records, and schedule appointments easily.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3>Real-time Analytics</h3>
              <p>Monitor blood inventory levels with comprehensive analytics dashboard.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3>Secure & Safe</h3>
              <p>Your data is protected with industry-standard security measures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>Join thousands of donors and healthcare providers in our mission to save lives.</p>
            <Link to="/register" className="cta-button">
              <i className="fa-solid fa-rocket"></i>
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <i className="fa-solid fa-droplet"></i>
              <span>Blood<span className="logo-highlight">Bank</span></span>
            </div>
            <p className="footer-text">Connecting donors with those in need. Every drop saves a life.</p>
          </div>
          <div className="footer-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 BloodBank. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
