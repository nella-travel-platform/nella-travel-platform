export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="home-container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark">EC</span>
            <span>
              <strong>Experience Cancun</strong>
              <small>by Nella Travel Technologies</small>
            </span>
          </div>
          <p>
            A bilingual marketplace for local travel services, launching first
            with trusted car rentals in Cancún.
          </p>
        </div>

        <div>
          <h3>Services</h3>
          <a href="#search">Car rentals</a>
          <a href="#services">Airport transfers</a>
          <a href="#services">Tours</a>
          <a href="#services">Vacation rentals</a>
        </div>

        <div>
          <h3>Customer care</h3>
          <a href="#why-us">How it works</a>
          <a href="#reviews">Reviews</a>
          <a href="mailto:hello@experiencecancun.example">Contact</a>
        </div>
      </div>

      <div className="home-container footer-bottom">
        <span>© 2026 Nella Travel Technologies</span>
        <span>English · Español</span>
      </div>
    </footer>
  );
}
