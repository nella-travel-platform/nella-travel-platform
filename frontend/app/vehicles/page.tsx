import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import VehicleCard from "../../components/vehicles/VehicleCard";
import VehicleSearchSummary from "../../components/vehicles/VehicleSearchSummary";
import { categoryOptions, vehicles } from "../../lib/vehicle-catalog";
import { calculateRentalDuration } from "../../lib/rental-time";

type Props = {
  searchParams: {
    pickupLocation?: string;
    pickupDate?: string;
    pickupTime?: string;
    returnDate?: string;
    returnTime?: string;
    category?: string;
    transmission?: string;
    passengers?: string;
  };
};

export default function VehiclesPage({ searchParams }: Props) {
  const pickupLocation = searchParams.pickupLocation ?? "cancun-airport";
  const category = searchParams.category ?? "";
  const transmission = searchParams.transmission ?? "";
  const minimumPassengers = Number(searchParams.passengers ?? "0");

  const duration = calculateRentalDuration(
    searchParams.pickupDate,
    searchParams.pickupTime,
    searchParams.returnDate,
    searchParams.returnTime,
  );

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.available &&
    (!category || vehicle.category === category) &&
    (!transmission || vehicle.transmission.toLowerCase() === transmission) &&
    (!minimumPassengers || vehicle.passengers >= minimumPassengers)
  );

  const categoryLabel =
    categoryOptions.find((option) => option.value === category)?.label ??
    "All categories";

  return (
    <main className="vehicles-page">
      <Navbar />

      <section className="vehicle-results-hero">
        <div className="home-container">
          <span className="eyebrow hero-eyebrow">Vehicle search</span>
          <h1>Available rentals for your Cancún trip.</h1>
          <p>
            Pricing is based on complete 24-hour rental periods rather than
            charging each calendar date as a separate day.
          </p>
        </div>
      </section>

      <div className="home-container vehicle-results-layout">
        <VehicleSearchSummary
          pickupLocation={pickupLocation}
          pickupDate={searchParams.pickupDate}
          pickupTime={searchParams.pickupTime}
          returnDate={searchParams.returnDate}
          returnTime={searchParams.returnTime}
          category={categoryLabel}
        />

        <div className="rental-clock-notice">
          <strong>24-hour pricing advantage</strong>
          <span>
            Your rental day runs from the selected pickup time until the same
            time the following day.
          </span>
        </div>

        <div className="vehicle-content-grid">
          <aside className="vehicle-filters">
            <h2>Filter results</h2>

            <form action="/vehicles" method="get">
              <input type="hidden" name="pickupLocation" value={pickupLocation} />
              <input type="hidden" name="pickupDate" value={searchParams.pickupDate ?? ""} />
              <input type="hidden" name="pickupTime" value={searchParams.pickupTime ?? ""} />
              <input type="hidden" name="returnDate" value={searchParams.returnDate ?? ""} />
              <input type="hidden" name="returnTime" value={searchParams.returnTime ?? ""} />

              <label>
                Category
                <select name="category" defaultValue={category}>
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Transmission
                <select name="transmission" defaultValue={transmission}>
                  <option value="">Any transmission</option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </label>

              <label>
                Minimum passengers
                <select
                  name="passengers"
                  defaultValue={searchParams.passengers ?? ""}
                >
                  <option value="">Any capacity</option>
                  <option value="4">4 passengers</option>
                  <option value="5">5 passengers</option>
                  <option value="7">7 passengers</option>
                  <option value="8">8 passengers</option>
                  <option value="10">10+ passengers</option>
                </select>
              </label>

              <button className="primary-button full-width" type="submit">
                Apply filters
              </button>
            </form>
          </aside>

          <section className="vehicle-results">
            <div className="results-heading">
              <div>
                <span>
                  {filteredVehicles.length} result
                  {filteredVehicles.length === 1 ? "" : "s"}
                </span>
                <h2>Choose your vehicle category</h2>
              </div>
              <span>
                {duration.billableDays} billable 24-hour day
                {duration.billableDays === 1 ? "" : "s"}
              </span>
            </div>

            {filteredVehicles.length ? (
              <div className="vehicle-list">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    rentalDays={duration.billableDays}
                    pickupLocation={pickupLocation}
                    pickupDate={searchParams.pickupDate}
                    pickupTime={searchParams.pickupTime}
                    returnDate={searchParams.returnDate}
                    returnTime={searchParams.returnTime}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-results">
                <h2>No vehicles match these filters.</h2>
                <p>Try another category, transmission or passenger capacity.</p>
                <a href="/vehicles">Clear filters</a>
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
