"use client";

import { serviceLocations } from "../../lib/location-delivery";
import AttractionGallery from "./AttractionGallery";

type InitialSearch = {
  pickupLocation?: string;
  returnLocation?: string;
  pickupDate?: string;
  pickupTime?: string;
  returnDate?: string;
  returnTime?: string;
  category?: string;
};

type Props = {
  initialSearch?: InitialSearch;
};

const categories = [
  { value: "small", label: "Small · 3–4 passengers" },
  { value: "medium", label: "Medium · 4–5 passengers" },
  { value: "large", label: "Large · 5–7 passengers" },
  { value: "extra-large", label: "Extra Large · 7–9 passengers" },
  { value: "super-large", label: "Super Large · 10+ passengers" },
];

export default function Hero({ initialSearch = {} }: Props) {
  return (
    <section className="hero-section">
      <div className="home-container hero-content">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">Cancún, Mexico</span>
          <h1>Your Cancún trip starts here.</h1>
          <p>
            Reserve a local vehicle with clear pricing, flexible locations and true 24-hour rental days.
          </p>
          <div className="hero-trust">
            <span>✓ True 24-hour rental days</span>
            <span>✓ No hidden fees</span>
            <span>✓ Airport delivery</span>
          </div>

          <AttractionGallery />
        </div>

        <form id="search" className="search-card" action="/vehicles" method="get">
          <div className="search-card-heading">
            <span className="eyebrow">Find a vehicle</span>
            <h2>Search available rentals</h2>
          </div>

          <div className="form-grid">
            <label>
              Pickup location
              <select
                name="pickupLocation"
                defaultValue={initialSearch.pickupLocation ?? "cancun-airport"}
              >
                {serviceLocations.map((location) => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Return location
              <select
                name="returnLocation"
                defaultValue={
                  initialSearch.returnLocation ??
                  initialSearch.pickupLocation ??
                  "cancun-airport"
                }
              >
                {serviceLocations.map((location) => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Pickup date
              <input
                name="pickupDate"
                type="date"
                defaultValue={initialSearch.pickupDate}
                required
              />
            </label>

            <label>
              Pickup time
              <input
                name="pickupTime"
                type="time"
                defaultValue={initialSearch.pickupTime}
                required
              />
            </label>

            <label>
              Return date
              <input
                name="returnDate"
                type="date"
                defaultValue={initialSearch.returnDate}
                required
              />
            </label>

            <label>
              Return time
              <input
                name="returnTime"
                type="time"
                defaultValue={initialSearch.returnTime}
                required
              />
            </label>
          </div>

          <label>
            Vehicle category
            <select
              name="category"
              defaultValue={initialSearch.category ?? ""}
            >
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
            Every 24 hours counts as one rental day. Delivery outside Cancún may
            add a distance-based pickup or return fee.
          </p>
        </form>
      </div>
    </section>
  );
}
