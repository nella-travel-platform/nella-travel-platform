"use client";

import { useState } from "react";
import {
  calculateLateCharge,
  defaultPartnerRentalPolicy,
  type PartnerRentalPolicy,
} from "../../lib/partner-rental-policy";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export default function RentalPolicyEditor() {
  const [policy, setPolicy] = useState<PartnerRentalPolicy>(
    defaultPartnerRentalPolicy,
  );
  const [previewHours, setPreviewHours] = useState(3);
  const [dailyRate, setDailyRate] = useState(1250);
  const [saved, setSaved] = useState(false);

  const preview = calculateLateCharge(previewHours, dailyRate, policy);

  function update(
    field: keyof PartnerRentalPolicy,
    value: string | number,
  ) {
    setSaved(false);
    setPolicy((current) => ({ ...current, [field]: value }));
  }

  function savePolicy() {
    setSaved(true);
  }

  return (
    <div className="partner-policy-layout">
      <section className="policy-editor-card">
        <span className="eyebrow">Configurable per partner</span>
        <h2>{policy.partnerName}</h2>

        <div className="policy-form-grid">
          <label>
            Partner name
            <input
              value={policy.partnerName}
              onChange={(event) => update("partnerName", event.target.value)}
            />
          </label>

          <label>
            Grace period (hours)
            <input
              type="number"
              min="0"
              step="0.5"
              value={policy.gracePeriodHours}
              onChange={(event) =>
                update("gracePeriodHours", Number(event.target.value))
              }
            />
          </label>

          <label>
            Half-day charge starts at (hours late)
            <input
              type="number"
              min="0"
              step="0.5"
              value={policy.halfDayChargeStartHours}
              onChange={(event) =>
                update(
                  "halfDayChargeStartHours",
                  Number(event.target.value),
                )
              }
            />
          </label>

          <label>
            Full-day charge starts at (hours late)
            <input
              type="number"
              min="0"
              step="0.5"
              value={policy.fullDayChargeStartHours}
              onChange={(event) =>
                update(
                  "fullDayChargeStartHours",
                  Number(event.target.value),
                )
              }
            />
          </label>

          <label>
            Half-day charge (% of daily rate)
            <input
              type="number"
              min="0"
              max="100"
              value={policy.halfDayRatePercent}
              onChange={(event) =>
                update("halfDayRatePercent", Number(event.target.value))
              }
            />
          </label>

          <label>
            Full-day charge (% of daily rate)
            <input
              type="number"
              min="0"
              max="200"
              value={policy.fullDayRatePercent}
              onChange={(event) =>
                update("fullDayRatePercent", Number(event.target.value))
              }
            />
          </label>
        </div>

        <div className="policy-rule-preview">
          <h3>Current rule</h3>
          <ol>
            <li>
              Less than <strong>{policy.gracePeriodHours} hours late</strong>:
              no charge.
            </li>
            <li>
              From <strong>{policy.halfDayChargeStartHours} hours</strong> to
              less than <strong>{policy.fullDayChargeStartHours} hours</strong>:
              charge {policy.halfDayRatePercent}% of one day.
            </li>
            <li>
              From <strong>{policy.fullDayChargeStartHours} hours</strong> to
              less than 24 hours: charge {policy.fullDayRatePercent}% of one day.
            </li>
          </ol>
        </div>

        <button className="primary-button policy-save-button" onClick={savePolicy}>
          Save partner policy
        </button>

        {saved && (
          <p className="policy-saved-message">
            Policy saved in this prototype. Database persistence will be added
            in the partner API sprint.
          </p>
        )}
      </section>

      <aside className="policy-test-card">
        <span className="eyebrow">Test the rule</span>
        <h2>Late-charge preview</h2>

        <label>
          Daily rental rate
          <input
            type="number"
            min="0"
            value={dailyRate}
            onChange={(event) => setDailyRate(Number(event.target.value))}
          />
        </label>

        <label>
          Hours returned late
          <input
            type="number"
            min="0"
            step="0.5"
            value={previewHours}
            onChange={(event) => setPreviewHours(Number(event.target.value))}
          />
        </label>

        <div className={`late-result ${preview.tier}`}>
          <span>{preview.tier.replace("-", " ")}</span>
          <strong>{currency.format(preview.chargeAmount)}</strong>
          <p>{preview.description}</p>
        </div>
      </aside>
    </div>
  );
}
