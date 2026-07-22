import { notFound } from "next/navigation";
import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/layout/Navbar";
import { vehicles } from "../../../lib/vehicle-catalog";
import {
  calculateRentalDuration,
  formatRentalDateTime,
} from "../../../lib/rental-time";

type Props = {
  params: { id: string };
  searchParams: {
    pickupLocation?: string;
    pickupDate?: string;
    pickupTime?: string;
    returnDate?: string;
    returnTime?: string;
    days?: string;
  };
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export default function VehicleDetailPage({ params, searchParams }: Props) {
  const vehicle = vehicles.find((item) => item.id === params.id);
  if (!vehicle) notFound();

  const duration = calculateRentalDuration(
    searchParams.pickupDate,
    searchParams.pickupTime,
    searchParams.returnDate,
    searchParams.returnTime,
  );

  const rentalDays = Number(searchParams.days) || duration.billableDays;
  const rentalTotal = vehicle.dailyRate * rentalDays;
  const reservationDeposit = vehicle.dailyRate;
  const remainingBalance = Math.max(rentalTotal - reservationDeposit, 0);

  const bookingQuery = new URLSearchParams({
    vehicle: vehicle.id,
    days: String(rentalDays),
    pickupLocation: searchParams.pickupLocation ?? "cancun-airport",
    pickupDate: searchParams.pickupDate ?? "",
    pickupTime: searchParams.pickupTime ?? "",
    returnDate: searchParams.returnDate ?? "",
    returnTime: searchParams.returnTime ?? "",
  });

  return (
    <main className="vehicle-detail-page">
      <Navbar />

      <section className="vehicle-detail-hero">
        <div className="home-container vehicle-detail-grid">
          <div className="vehicle-detail-visual">
            <span>{vehicle.image}</span>
            <small>Representative vehicle image</small>
          </div>

          <div className="vehicle-detail-copy">
            <span className="eyebrow hero-eyebrow">{vehicle.categoryLabel}</span>
            <h1>{vehicle.name}</h1>
            <p>
              Clear pricing based on complete 24-hour rental periods, with local
              support and airport coordination.
            </p>

            <div className="vehicle-specs vehicle-detail-specs">
              <span>👥 {vehicle.passengers} passengers</span>
              <span>🧳 {vehicle.bags} bags</span>
              <span>⚙️ {vehicle.transmission}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="home-container detail-content-grid">
        <section className="detail-information">
          <div className="detail-panel">
            <span className="eyebrow">Included</span>
            <h2>What comes with your rental</h2>
            <ul className="detail-feature-list">
              {vehicle.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
              <li>✓ True 24-hour rental-day pricing</li>
              <li>✓ Local customer support</li>
              <li>✓ Clear pickup and return instructions</li>
            </ul>
          </div>

          <div className="detail-panel">
            <span className="eyebrow">24-hour rental policy</span>
            <h2>Your pickup time sets the daily return time</h2>
            <p>
              For example, a pickup at 3:00 PM is billed through 3:00 PM the
              following day as one rental day. Returning after the scheduled
              time may result in a half-day or full-day late charge, depending
              on how many hours late the vehicle is returned.
            </p>
          </div>

          <div className="detail-panel">
            <span className="eyebrow">Booking terms</span>
            <h2>Simple, transparent deposits</h2>
            <p>
              One 24-hour rental day reserves the vehicle. A refundable damage
              deposit of <strong>{currency.format(vehicle.damageDeposit)}</strong>{" "}
              is due at pickup.
            </p>
          </div>
        </section>

        <aside className="booking-summary-card">
          <span className="eyebrow">Booking summary</span>
          <h2>
            {rentalDays} rental day{rentalDays === 1 ? "" : "s"}
          </h2>

          <div className="summary-trip-dates">
            <div>
              <span>Pickup</span>
              <strong>
                {formatRentalDateTime(
                  searchParams.pickupDate,
                  searchParams.pickupTime,
                )}
              </strong>
            </div>
            <div>
              <span>Return due</span>
              <strong>
                {formatRentalDateTime(
                  searchParams.returnDate,
                  searchParams.returnTime,
                )}
              </strong>
            </div>
          </div>

          <dl>
            <div>
              <dt>Rate per 24 hours</dt>
              <dd>{currency.format(vehicle.dailyRate)}</dd>
            </div>
            <div>
              <dt>Estimated rental total</dt>
              <dd>{currency.format(rentalTotal)}</dd>
            </div>
            <div>
              <dt>Pay now to reserve</dt>
              <dd>{currency.format(reservationDeposit)}</dd>
            </div>
            <div>
              <dt>Remaining rental balance</dt>
              <dd>{currency.format(remainingBalance)}</dd>
            </div>
            <div>
              <dt>Refundable damage deposit</dt>
              <dd>{currency.format(vehicle.damageDeposit)}</dd>
            </div>
          </dl>

          <a
            className="primary-button vehicle-button"
            href={`/booking?${bookingQuery.toString()}`}
          >
            Continue to booking
          </a>

          <p>
            The selected return time is the due time. A late return may be
            charged as a half day or full day according to the final late-return
            policy.
          </p>
        </aside>
      </div>

      <Footer />
    </main>
  );
}
