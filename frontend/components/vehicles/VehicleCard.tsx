import type { Vehicle } from "../../lib/vehicle-catalog";
import VehicleImage from "./VehicleImage";

type Props = {
  vehicle: Vehicle;
  rentalDays: number;
  pickupLocation: string;
  returnLocation: string;
  pickupDate?: string;
  pickupTime?: string;
  returnDate?: string;
  returnTime?: string;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export default function VehicleCard({
  vehicle,
  rentalDays,
  pickupLocation,
  returnLocation,
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
}: Props) {
  const total = vehicle.dailyRate * rentalDays;
  const query = new URLSearchParams({
    pickupLocation,
    returnLocation,
    pickupDate: pickupDate ?? "",
    pickupTime: pickupTime ?? "",
    returnDate: returnDate ?? "",
    returnTime: returnTime ?? "",
    days: String(rentalDays),
  });

  return (
    <article className="vehicle-card">
      <div className="vehicle-visual">
        <VehicleImage
          vehicleName={vehicle.name}
          category={vehicle.categoryLabel}
          className="vehicle-photo"
        />
        <small>{vehicle.categoryLabel}</small>
      </div>

      <div className="vehicle-main">
        <div className="vehicle-title-row">
          <div>
            <span className="vehicle-category">{vehicle.categoryLabel}</span>
            <h2>{vehicle.name}</h2>
          </div>
          <span className="availability-badge">Available</span>
        </div>

        <div className="vehicle-specs">
          <span>👥 {vehicle.passengers} passengers</span>
          <span>🧳 {vehicle.bags} bags</span>
          <span>⚙️ {vehicle.transmission}</span>
        </div>

        <ul className="vehicle-features">
          {vehicle.features.map((feature) => (
            <li key={feature}>✓ {feature}</li>
          ))}
          <li>✓ True 24-hour rental days</li>
        </ul>

        <p className="deposit-note">
          Damage Deposit:{" "}
          <strong>{currency.format(vehicle.damageDeposit)}</strong>
        </p>
      </div>

      <div className="vehicle-price">
        <span>From</span>
        <strong>{currency.format(vehicle.dailyRate)}</strong>
        <small>per 24 hours</small>

        <div className="price-total">
          <span>{rentalDays} billable day{rentalDays === 1 ? "" : "s"}</span>
          <strong>{currency.format(total)}</strong>
        </div>

        <a
          className="primary-button vehicle-button"
          href={`/vehicles/${vehicle.id}?${query.toString()}`}
        >
          View vehicle
        </a>
      </div>
    </article>
  );
}
