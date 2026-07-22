"use client";

type Props = {
  paymentTiming: "deposit-only" | "pay-full-now";
  paymentMethod: "card" | "paypal" | "mercado-pago";
  amountDueNow: number;
  onPaymentMethodChange: (
    method: "card" | "paypal" | "mercado-pago",
  ) => void;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export default function PaymentSection({
  paymentTiming,
  paymentMethod,
  amountDueNow,
  onPaymentMethodChange,
}: Props) {
  return (
    <section className="payment-section">
      <span className="eyebrow">Payment</span>
      <h3>Choose how to pay {currency.format(amountDueNow)} now</h3>

      <div className="payment-method-grid">
        {[
          ["card", "Credit or debit card"],
          ["paypal", "PayPal"],
          ["mercado-pago", "Mercado Pago"],
        ].map(([value, label]) => (
          <label
            key={value}
            className={paymentMethod === value ? "selected" : ""}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={value}
              checked={paymentMethod === value}
              onChange={() =>
                onPaymentMethodChange(
                  value as "card" | "paypal" | "mercado-pago",
                )
              }
            />
            <span>
              <strong>{label}</strong>
              <small>
                {paymentTiming === "deposit-only"
                  ? "Reservation deposit only"
                  : "Complete rental balance"}
              </small>
            </span>
          </label>
        ))}
      </div>

      {paymentMethod === "card" && (
        <div className="mock-card-fields">
          <label>
            Cardholder name
            <input placeholder="Name on card" />
          </label>
          <label>
            Card number
            <input inputMode="numeric" placeholder="0000 0000 0000 0000" />
          </label>
          <label>
            Expiration
            <input placeholder="MM/YY" />
          </label>
          <label>
            Security code
            <input inputMode="numeric" placeholder="CVC" />
          </label>
        </div>
      )}

      <p className="payment-disclaimer">
        This screen prepares the payment experience. No real charge is submitted
        until the selected payment provider is connected.
      </p>
    </section>
  );
}
