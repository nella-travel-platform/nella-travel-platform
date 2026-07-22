import type { Vehicle } from "../../lib/vehicle-catalog";

type Props = {
  vehicle: Vehicle;
  rentalDays: number;
  pickupLocation: string;
  pickupDate?: string;
  returnDate?: string;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency", currency: "MXN", maximumFractionDigits: 0,
});

export default function VehicleCard({ vehicle, rentalDays, pickupLocation, pickupDate, returnDate }: Props) {
  const total = vehicle.dailyRate * rentalDays;
  const query = new URLSearchParams({
    pickupLocation,
    pickupDate: pickupDate ?? "",
    returnDate: returnDate ?? "",
    days: String(rentalDays),
  });

  return (
    <article className="vehicle-card">
      <div className="vehicle-visual"><span>{vehicle.image}</span><small>{vehicle.categoryLabel}</small></div>
      <div className="vehicle-main">
        <div className="vehicle-title-row">
          <div><span className="vehicle-category">{vehicle.categoryLabel}</span><h2>{vehicle.name}</h2></div>
          <span className="availability-badge">Available</span>
        </div>
        <div className="vehicle-specs">
          <span>👥 {vehicle.passengers} passengers</span>
          <span>🧳 {vehicle.bags} bags</span>
          <span>⚙️ {vehicle.transmission}</span>
        </div>
        <ul className="vehicle-features">
          {vehicle.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
        </ul>
        <p className="deposit-note">Refundable damage deposit: <strong>{currency.format(vehicle.damageDeposit)}</strong></p>
      </div>
      <div className="vehicle-price">
        <span>From</span><strong>{currency.format(vehicle.dailyRate)}</strong><small>per day</small>
        <div className="price-total">
          <span>{rentalDays} day{rentalDays === 1 ? "" : "s"} estimated</span>
          <strong>{currency.format(total)}</strong>
        </div>
        <a className="primary-button vehicle-button" href={`/vehicles/${vehicle.id}?${query.toString()}`}>View vehicle</a>
        <small className="reservation-note">Reservation deposit: one day&apos;s rent</small>
      </div>
    </article>
  );
}
