const categories = [
  { value: "small", label: "Small · 3–4 passengers" },
  { value: "medium", label: "Medium · 4–5 passengers" },
  { value: "large", label: "Large · 5–7 passengers" },
  { value: "extra-large", label: "Extra Large · 7–9 passengers" },
  { value: "super-large", label: "Super Large · 10+ passengers" },
];

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="home-container hero-content">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">Cancún, Mexico</span>
          <h1>Everything you need for an unforgettable Cancún vacation.</h1>
          <p>
            Book local car rentals, airport transfers, tours and vacation
            experiences through one trusted platform.
          </p>

          <div className="hero-trust">
            <span>✓ True 24-hour rental days</span>
            <span>✓ No hidden fees</span>
            <span>✓ Airport delivery</span>
          </div>
        </div>

        <form id="search" className="search-card" action="/vehicles" method="get">
          <div className="search-card-heading">
            <span className="eyebrow">Find a vehicle</span>
            <h2>Search available rentals</h2>
          </div>

          <label>
            Pickup location
            <select name="pickupLocation" defaultValue="cancun-airport">
              <option value="cancun-airport">Cancun Airport</option>
              <option value="hotel-zone">Cancun Hotel Zone</option>
              <option value="downtown-cancun">Downtown Cancun</option>
              <option value="playa-del-carmen">Playa del Carmen</option>
            </select>
          </label>

          <div className="form-grid">
            <label>
              Pickup date
              <input name="pickupDate" type="date" required />
            </label>
            <label>
              Pickup time
              <input name="pickupTime" type="time" required />
            </label>
            <label>
              Return date
              <input name="returnDate" type="date" required />
            </label>
            <label>
              Return time
              <input name="returnTime" type="time" required />
            </label>
          </div>

          <label>
            Vehicle category
            <select name="category" defaultValue="">
              <option value="">Any category</option>
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <button className="primary-button full-width" type="submit">
            Search vehicles
          </button>

          <p className="form-note">
            Every 24 hours counts as one rental day. Returning after the selected
            time may result in a half-day or full-day late charge.
          </p>
        </form>
      </div>
    </section>
  );
}
