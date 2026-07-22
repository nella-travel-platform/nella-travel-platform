"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Vehicle } from "../../lib/vehicle-catalog";
import PaymentSection from "./PaymentSection";
import { getPartnerRentalPolicy } from "../../lib/partner-rental-policy";
import { formatRentalDateTime } from "../../lib/rental-time";
import {
  bookingExtras,
  calculateExtraTotal,
  getChargeLabel,
} from "../../lib/booking-options";

type Props = {
  vehicle: Vehicle;
  rentalDays: number;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  pickupLocation: string;
};

type PaymentTiming = "deposit-only" | "pay-full-now";
type PaymentMethod = "card" | "paypal" | "mercado-pago";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  licenseNumber: string;
  flightNumber: string;
  arrivalTime: string;
  hotel: string;
  childSeat: boolean;
  additionalDriver: boolean;
  insurance: boolean;
  specialRequests: string;
  termsAccepted: boolean;
  paymentTiming: PaymentTiming;
  paymentMethod: PaymentMethod;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const locations: Record<string, string> = {
  "cancun-airport": "Cancun Airport",
  "hotel-zone": "Cancun Hotel Zone",
  "downtown-cancun": "Downtown Cancun",
  "playa-del-carmen": "Playa del Carmen",
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "Mexico",
  licenseNumber: "",
  flightNumber: "",
  arrivalTime: "",
  hotel: "",
  childSeat: false,
  additionalDriver: false,
  insurance: false,
  specialRequests: "",
  termsAccepted: false,
  paymentTiming: "deposit-only",
  paymentMethod: "card",
};

export default function BookingWizard({
  vehicle,
  rentalDays,
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  pickupLocation,
}: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialState);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const selectedExtras = useMemo(
    () =>
      bookingExtras.filter((extra) => Boolean(form[extra.id])),
    [form.childSeat, form.additionalDriver, form.insurance],
  );

  const extrasTotal = useMemo(
    () =>
      selectedExtras.reduce(
        (sum, extra) => sum + calculateExtraTotal(extra, rentalDays),
        0,
      ),
    [selectedExtras, rentalDays],
  );

  const rentalSubtotal = vehicle.dailyRate * rentalDays;
  const estimatedTotal = rentalSubtotal + extrasTotal;
  const reservationDeposit = vehicle.dailyRate;
  const amountDueNow =
    form.paymentTiming === "pay-full-now"
      ? estimatedTotal
      : reservationDeposit;
  const remainingBalance = Math.max(estimatedTotal - amountDueNow, 0);
  const latePolicy = getPartnerRentalPolicy("partner-demo-1");

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function canContinue() {
    if (step === 1) {
      return Boolean(
        form.firstName &&
          form.lastName &&
          form.email &&
          form.phone &&
          form.licenseNumber,
      );
    }
    if (step === 2) return true;
    if (step === 3) return form.termsAccepted;
    return true;
  }

  function generateReservationNumber() {
    const date = (pickupDate || new Date().toISOString().slice(0, 10)).replaceAll("-", "");
    const random = Math.floor(1000 + Math.random() * 9000);
    return `EC-${date}-${random}`;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canContinue()) return;

    if (step < 3) {
      setStep((current) => current + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setConfirmation(generateReservationNumber());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (confirmation) {
    return (
      <section className="booking-confirmation">
        <div className="confirmation-icon">✓</div>
        <span className="eyebrow">Reservation created</span>
        <h2>Thank you, {form.firstName}.</h2>
        <p>
          Your reservation request has been prepared. Payment processing and
          database submission will be connected in the backend sprint.
        </p>

        <div className="confirmation-number">
          <span>Reservation number</span>
          <strong>{confirmation}</strong>
        </div>

        <div className="confirmation-grid">
          <div>
            <span>Vehicle</span>
            <strong>{vehicle.name}</strong>
          </div>
          <div>
            <span>Trip dates</span>
            <strong>
              {formatRentalDateTime(pickupDate, pickupTime)} –{" "}
              {formatRentalDateTime(returnDate, returnTime)}
            </strong>
          </div>
          <div>
            <span>Amount due now</span>
            <strong>{currency.format(amountDueNow)}</strong>
          </div>
          <div>
            <span>Remaining balance</span>
            <strong>{currency.format(remainingBalance)}</strong>
          </div>
        </div>

        <a className="primary-button booking-link-button" href="/">
          Return to homepage
        </a>
      </section>
    );
  }

  return (
    <div className="booking-layout">
      <section className="booking-main-card">
        <div className="booking-steps" aria-label="Booking progress">
          {["Driver", "Trip details", "Review"].map((label, index) => {
            const number = index + 1;
            return (
              <div
                key={label}
                className={number === step ? "active" : number < step ? "complete" : ""}
              >
                <span>{number < step ? "✓" : number}</span>
                <strong>{label}</strong>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="booking-step-panel">
              <span className="eyebrow">Step 1 of 3</span>
              <h2>Driver and contact information</h2>

              <div className="booking-form-grid">
                <label>
                  First name
                  <input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required />
                </label>
                <label>
                  Last name
                  <input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required />
                </label>
                <label>
                  Email
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                </label>
                <label>
                  Phone / WhatsApp
                  <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                </label>
                <label>
                  Country
                  <input value={form.country} onChange={(e) => update("country", e.target.value)} />
                </label>
                <label>
                  Driver license number
                  <input value={form.licenseNumber} onChange={(e) => update("licenseNumber", e.target.value)} required />
                </label>
              </div>

              <label className="file-field">
                Driver license image
                <input type="file" accept="image/*,.pdf" />
                <small>File upload is visual only until storage is connected.</small>
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="booking-step-panel">
              <span className="eyebrow">Step 2 of 3</span>
              <h2>Arrival details and extras</h2>

              <div className="booking-form-grid">
                <label>
                  Flight number
                  <input value={form.flightNumber} onChange={(e) => update("flightNumber", e.target.value)} placeholder="Example: AA123" />
                </label>
                <label>
                  Arrival time
                  <input type="time" value={form.arrivalTime} onChange={(e) => update("arrivalTime", e.target.value)} />
                </label>
                <label className="booking-span-two">
                  Hotel or accommodation
                  <input value={form.hotel} onChange={(e) => update("hotel", e.target.value)} placeholder="Hotel name or address" />
                </label>
              </div>

              <label className="file-field">
                Flight itinerary
                <input type="file" accept="image/*,.pdf" />
                <small>Recommended for airport delivery coordination.</small>
              </label>

              <div className="extras-grid">
                {bookingExtras.map((extra) => (
                  <label className="extra-option" key={extra.id}>
                    <input
                      type="checkbox"
                      checked={Boolean(form[extra.id])}
                      onChange={(event) => update(extra.id, event.target.checked)}
                    />
                    <span>
                      <strong>{extra.name}</strong>
                      <small>{extra.description}</small>
                      <em className={extra.chargeMode === "included" ? "included-label" : ""}>
                        {getChargeLabel(extra)}
                      </em>
                    </span>
                  </label>
                ))}
              </div>

              <label>
                Special requests
                <textarea
                  rows={4}
                  value={form.specialRequests}
                  onChange={(e) => update("specialRequests", e.target.value)}
                  placeholder="Tell us about arrival changes, accessibility needs or other requests."
                />
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="booking-step-panel">
              <span className="eyebrow">Step 3 of 3</span>
              <h2>Review your reservation</h2>

              <div className="review-details-grid">
                <div>
                  <span>Primary driver</span>
                  <strong>{form.firstName} {form.lastName}</strong>
                  <small>{form.email}</small>
                  <small>{form.phone}</small>
                </div>
                <div>
                  <span>Pickup location</span>
                  <strong>{locations[pickupLocation] ?? "Cancun Airport"}</strong>
                  <small>{formatRentalDateTime(pickupDate, pickupTime)}</small>
                </div>
                <div>
                  <span>Return</span>
                  <strong>{formatRentalDateTime(returnDate, returnTime)}</strong>
                  <small>
                    {rentalDays} billable 24-hour day{rentalDays === 1 ? "" : "s"}
                  </small>
                </div>
                <div>
                  <span>Arrival</span>
                  <strong>{form.flightNumber || "Not provided"}</strong>
                  <small>{form.arrivalTime || "Time not provided"}</small>
                </div>
              </div>

              <div className="payment-choice">
                <span className="eyebrow">Payment preference</span>
                <h3>When would you like to pay the remaining balance?</h3>

                <label className={form.paymentTiming === "deposit-only" ? "selected" : ""}>
                  <input
                    type="radio"
                    name="paymentTiming"
                    value="deposit-only"
                    checked={form.paymentTiming === "deposit-only"}
                    onChange={() => update("paymentTiming", "deposit-only")}
                  />
                  <span>
                    <strong>Pay reservation deposit now</strong>
                    <small>
                      Pay {currency.format(reservationDeposit)} now and
                      {` ${currency.format(estimatedTotal - reservationDeposit)} `}
                      at pickup.
                    </small>
                  </span>
                </label>

                <label className={form.paymentTiming === "pay-full-now" ? "selected" : ""}>
                  <input
                    type="radio"
                    name="paymentTiming"
                    value="pay-full-now"
                    checked={form.paymentTiming === "pay-full-now"}
                    onChange={() => update("paymentTiming", "pay-full-now")}
                  />
                  <span>
                    <strong>Pay rental balance now</strong>
                    <small>
                      Pay the full rental amount of {currency.format(estimatedTotal)} now.
                      The refundable damage deposit remains due at pickup.
                    </small>
                  </span>
                </label>
              </div>

              <PaymentSection
                paymentTiming={form.paymentTiming}
                paymentMethod={form.paymentMethod}
                amountDueNow={amountDueNow}
                onPaymentMethodChange={(method) =>
                  update("paymentMethod", method)
                }
              />

              <div className="late-policy-box">
                <span className="eyebrow">Partner late-return policy</span>
                <h3>{latePolicy.partnerName}</h3>
                <ul>
                  <li>
                    Less than {latePolicy.gracePeriodHours} hours late: no charge
                  </li>
                  <li>
                    {latePolicy.halfDayChargeStartHours} to less than{" "}
                    {latePolicy.fullDayChargeStartHours} hours late:{" "}
                    {latePolicy.halfDayRatePercent}% of one rental day
                  </li>
                  <li>
                    {latePolicy.fullDayChargeStartHours} to less than 24 hours late:{" "}
                    {latePolicy.fullDayRatePercent}% of one rental day
                  </li>
                </ul>
              </div>

              <label className="terms-box">
                <input
                  type="checkbox"
                  checked={form.termsAccepted}
                  onChange={(e) => update("termsAccepted", e.target.checked)}
                />
                <span>
                  I confirm the information is accurate and understand the
                  reservation, remaining-balance and refundable-deposit terms.
                </span>
              </label>
            </div>
          )}

          <div className="booking-actions">
            {step > 1 && (
              <button className="secondary-booking-button" type="button" onClick={() => setStep((current) => current - 1)}>
                Back
              </button>
            )}
            <button className="primary-button booking-next-button" type="submit" disabled={!canContinue()}>
              {step < 3 ? "Continue" : "Create reservation"}
            </button>
          </div>
        </form>
      </section>

      <aside className="booking-price-card">
        <span className="eyebrow">Your reservation</span>
        <div className="booking-vehicle">
          <span>{vehicle.image}</span>
          <div>
            <strong>{vehicle.name}</strong>
            <small>{vehicle.categoryLabel}</small>
          </div>
        </div>

        <dl>
          <div>
            <dt>24-hour rate × {rentalDays}</dt>
            <dd>{currency.format(rentalSubtotal)}</dd>
          </div>
          {selectedExtras.map((extra) => (
            <div key={extra.id}>
              <dt>
                {extra.name}
                <small className="summary-charge-mode">
                  {extra.chargeMode === "included"
                    ? "Included"
                    : extra.chargeMode === "trip"
                      ? "One-time"
                      : "Daily"}
                </small>
              </dt>
              <dd>{currency.format(calculateExtraTotal(extra, rentalDays))}</dd>
            </div>
          ))}
          <div>
            <dt>Estimated total</dt>
            <dd>{currency.format(estimatedTotal)}</dd>
          </div>
          <div className="deposit-row">
            <dt>Amount due now</dt>
            <dd>{currency.format(amountDueNow)}</dd>
          </div>
          <div>
            <dt>Remaining balance at pickup</dt>
            <dd>{currency.format(remainingBalance)}</dd>
          </div>
          <div>
            <dt>Refundable damage deposit</dt>
            <dd>{currency.format(vehicle.damageDeposit)}</dd>
          </div>
        </dl>

        <p>
          The refundable damage deposit is separate from the rental total and
          remains due at pickup. The selected return time is the due time; late
          returns may result in a half-day or full-day charge.
        </p>
      </aside>
    </div>
  );
}
