import { notFound } from "next/navigation";
import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/layout/Navbar";
import { calculateRentalDays, vehicles } from "../../../lib/vehicle-catalog";

type Props = {
  params: { id: string };
  searchParams: { pickupLocation?: string; pickupDate?: string; returnDate?: string; days?: string; };
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency", currency: "MXN", maximumFractionDigits: 0,
});

export default function VehicleDetailPage({ params, searchParams }: Props) {
  const vehicle = vehicles.find((item) => item.id === params.id);
  if (!vehicle) notFound();

  const rentalDays = Number(searchParams.days) || calculateRentalDays(searchParams.pickupDate, searchParams.returnDate);
  const rentalTotal = vehicle.dailyRate * rentalDays;
  const reservationDeposit = vehicle.dailyRate;
  const remainingBalance = Math.max(rentalTotal - reservationDeposit, 0);

  return (
    <main className="vehicle-detail-page">
      <Navbar />
      <section className="vehicle-detail-hero">
        <div className="home-container vehicle-detail-grid">
          <div className="vehicle-detail-visual"><span>{vehicle.image}</span><small>Representative vehicle image</small></div>
          <div className="vehicle-detail-copy">
            <span className="eyebrow hero-eyebrow">{vehicle.categoryLabel}</span>
            <h1>{vehicle.name}</h1>
            <p>A practical option for exploring Cancún and the Riviera Maya with clear pricing, local support and airport coordination.</p>
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
            <span className="eyebrow">Included</span><h2>What comes with your rental</h2>
            <ul className="detail-feature-list">
              {vehicle.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
              <li>✓ Local customer support</li><li>✓ Clear pickup and return instructions</li>
            </ul>
          </div>

          <div className="detail-panel">
            <span className="eyebrow">Booking terms</span><h2>Simple, transparent deposits</h2>
            <p>One day&apos;s rent reserves the vehicle. A refundable damage deposit of <strong>{currency.format(vehicle.damageDeposit)}</strong> is due at pickup and returned according to the selected payment method and vehicle inspection.</p>
          </div>

          <div className="detail-panel">
            <span className="eyebrow">Required documents</span><h2>Prepare before pickup</h2>
            <ul className="detail-feature-list">
              <li>✓ Valid driver&apos;s license</li>
              <li>✓ Flight itinerary when airport delivery is requested</li>
              <li>✓ Reservation confirmation</li>
            </ul>
          </div>
        </section>

        <aside className="booking-summary-card">
          <span className="eyebrow">Booking summary</span>
          <h2>{rentalDays} rental day{rentalDays === 1 ? "" : "s"}</h2>
          <dl>
            <div><dt>Daily rate</dt><dd>{currency.format(vehicle.dailyRate)}</dd></div>
            <div><dt>Estimated rental total</dt><dd>{currency.format(rentalTotal)}</dd></div>
            <div><dt>Pay now to reserve</dt><dd>{currency.format(reservationDeposit)}</dd></div>
            <div><dt>Remaining rental balance</dt><dd>{currency.format(remainingBalance)}</dd></div>
            <div><dt>Refundable damage deposit</dt><dd>{currency.format(vehicle.damageDeposit)}</dd></div>
          </dl>
          <a className="primary-button vehicle-button" href={`/booking?vehicle=${vehicle.id}&days=${rentalDays}&pickupDate=${searchParams.pickupDate ?? ""}&returnDate=${searchParams.returnDate ?? ""}`}>Continue to booking</a>
          <p>No charge is processed yet. Payment integration will be connected in a later sprint.</p>
        </aside>
      </div>
      <Footer />
    </main>
  );
}
