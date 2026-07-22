import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import VehicleCard from "../../components/vehicles/VehicleCard";
import VehicleSearchSummary from "../../components/vehicles/VehicleSearchSummary";
import { calculateRentalDays, categoryOptions, vehicles } from "../../lib/vehicle-catalog";

type Props = {
  searchParams: {
    pickupLocation?: string;
    pickupDate?: string;
    returnDate?: string;
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
  const rentalDays = calculateRentalDays(searchParams.pickupDate, searchParams.returnDate);

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.available &&
    (!category || vehicle.category === category) &&
    (!transmission || vehicle.transmission.toLowerCase() === transmission) &&
    (!minimumPassengers || vehicle.passengers >= minimumPassengers)
  );

  const categoryLabel = categoryOptions.find((option) => option.value === category)?.label ?? "All categories";

  return (
    <main className="vehicles-page">
      <Navbar />
      <section className="vehicle-results-hero">
        <div className="home-container">
          <span className="eyebrow hero-eyebrow">Vehicle search</span>
          <h1>Available rentals for your Cancún trip.</h1>
          <p>Compare simple vehicle categories, transparent daily pricing and refundable damage deposits.</p>
        </div>
      </section>

      <div className="home-container vehicle-results-layout">
        <VehicleSearchSummary pickupLocation={pickupLocation} pickupDate={searchParams.pickupDate} returnDate={searchParams.returnDate} category={categoryLabel} />

        <div className="vehicle-content-grid">
          <aside className="vehicle-filters">
            <h2>Filter results</h2>
            <form action="/vehicles" method="get">
              <input type="hidden" name="pickupLocation" value={pickupLocation} />
              <input type="hidden" name="pickupDate" value={searchParams.pickupDate ?? ""} />
              <input type="hidden" name="returnDate" value={searchParams.returnDate ?? ""} />

              <label>Category
                <select name="category" defaultValue={category}>
                  {categoryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>

              <label>Transmission
                <select name="transmission" defaultValue={transmission}>
                  <option value="">Any transmission</option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </label>

              <label>Minimum passengers
                <select name="passengers" defaultValue={searchParams.passengers ?? ""}>
                  <option value="">Any capacity</option>
                  <option value="4">4 passengers</option>
                  <option value="5">5 passengers</option>
                  <option value="7">7 passengers</option>
                  <option value="8">8 passengers</option>
                  <option value="10">10+ passengers</option>
                </select>
              </label>

              <button className="primary-button full-width" type="submit">Apply filters</button>
            </form>
          </aside>

          <section className="vehicle-results">
            <div className="results-heading">
              <div><span>{filteredVehicles.length} result{filteredVehicles.length === 1 ? "" : "s"}</span><h2>Choose your vehicle category</h2></div>
              <span>{rentalDays} rental day{rentalDays === 1 ? "" : "s"}</span>
            </div>

            {filteredVehicles.length ? (
              <div className="vehicle-list">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} rentalDays={rentalDays} pickupLocation={pickupLocation} pickupDate={searchParams.pickupDate} returnDate={searchParams.returnDate} />
                ))}
              </div>
            ) : (
              <div className="empty-results"><h2>No vehicles match these filters.</h2><p>Try another category, transmission or passenger capacity.</p><a href="/vehicles">Clear filters</a></div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
