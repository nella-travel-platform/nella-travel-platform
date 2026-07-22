import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import VehicleCard from "../../components/vehicles/VehicleCard";
import VehicleSearchSummary from "../../components/vehicles/VehicleSearchSummary";
import { categoryOptions, vehicles } from "../../lib/vehicle-catalog";
import { getPartnerRentalPolicy } from "../../lib/partner-rental-policy";
import { calculateRequestedRentalBilling } from "../../lib/requested-rental-billing";

type Props = {
  searchParams: {
    pickupLocation?: string;
    returnLocation?: string;
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
  const returnLocation = searchParams.returnLocation ?? pickupLocation;
  const category = searchParams.category ?? "";
  const requestedTransmission = searchParams.transmission ?? "";
  const minimumPassengers = Number(searchParams.passengers ?? "0");
  const availableTransmissions = Array.from(
    new Set(
      vehicles
        .filter((vehicle) => vehicle.available)
        .map((vehicle) => vehicle.transmission.toLowerCase()),
    ),
  );
  const transmission = availableTransmissions.includes(requestedTransmission)
    ? requestedTransmission
    : "";

  const partnerPolicy = getPartnerRentalPolicy("partner-demo-1");
  const billing = calculateRequestedRentalBilling(
    searchParams.pickupDate,
    searchParams.pickupTime,
    searchParams.returnDate,
    searchParams.returnTime,
    partnerPolicy,
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

      <div className="home-container vehicle-results-layout">
        <VehicleSearchSummary
          pickupLocation={pickupLocation}
          returnLocation={returnLocation}
          pickupDate={searchParams.pickupDate}
          pickupTime={searchParams.pickupTime}
          returnDate={searchParams.returnDate}
          returnTime={searchParams.returnTime}
          category={categoryLabel}
          categoryValue={category}
        />

        <div className={`rental-clock-notice billing-${billing.tier}`}>
          <strong>24-hour pricing advantage</strong>
          <span>{billing.explanation}</span>
        </div>

        <div className="vehicle-content-grid">
          <aside className="vehicle-filters">
            <h2>Filter results</h2>

            <form action="/vehicles" method="get">
              <input type="hidden" name="pickupLocation" value={pickupLocation} />
              <input type="hidden" name="returnLocation" value={returnLocation} />
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
                  {availableTransmissions.map((item) => (
                    <option key={item} value={item}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </option>
                  ))}
                </select>
              </label>

              {!category && (
                <label>
                  Minimum passenger capacity
                  <select
                    name="passengers"
                    defaultValue={searchParams.passengers ?? ""}
                  >
                    <option value="">Any capacity</option>
                    <option value="4">At least 4 passengers</option>
                    <option value="5">At least 5 passengers</option>
                    <option value="7">At least 7 passengers</option>
                    <option value="8">At least 8 passengers</option>
                    <option value="10">At least 10 passengers</option>
                  </select>
                  <small>
                    Used only when searching across all vehicle categories.
                  </small>
                </label>
              )}

              <button className="primary-button full-width" type="submit">
                Apply filters
              </button>
            </form>
          </aside>

          <section className="vehicle-results">
            <div className="results-heading">
              <div>
                <span>{filteredVehicles.length} result{filteredVehicles.length === 1 ? "" : "s"}</span>
                <h2>Choose your vehicle category</h2>
              </div>
              <span>
                {billing.billableDays} billable rental day
                {billing.billableDays === 1 ? "" : "s"}
              </span>
            </div>

            <div className="vehicle-list">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  rentalDays={billing.billableDays}
                  pickupLocation={pickupLocation}
                  returnLocation={returnLocation}
                  pickupDate={searchParams.pickupDate}
                  pickupTime={searchParams.pickupTime}
                  returnDate={searchParams.returnDate}
                  returnTime={searchParams.returnTime}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
