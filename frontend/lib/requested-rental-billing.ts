import type { PartnerRentalPolicy } from "./partner-rental-policy";
import { buildLocalDateTime } from "./rental-time";

export type RequestedRentalBilling = {
  exactHours: number;
  fullDays: number;
  extraHours: number;
  billableDays: number;
  tier: "full-days-only" | "grace" | "half-day" | "full-day";
  explanation: string;
};

function formatHours(hours: number) {
  return Number.isInteger(hours) ? String(hours) : hours.toFixed(1);
}

export function calculateRequestedRentalBilling(
  pickupDate: string | undefined,
  pickupTime: string | undefined,
  returnDate: string | undefined,
  returnTime: string | undefined,
  policy: PartnerRentalPolicy,
): RequestedRentalBilling {
  const pickup = buildLocalDateTime(pickupDate, pickupTime);
  const returned = buildLocalDateTime(returnDate, returnTime);

  if (!pickup || !returned || returned <= pickup) {
    return {
      exactHours: 24,
      fullDays: 1,
      extraHours: 0,
      billableDays: 1,
      tier: "full-days-only",
      explanation: "Minimum rental charge: 1 rental day.",
    };
  }

  const exactHours = (returned.getTime() - pickup.getTime()) / 3_600_000;
  const fullDays = Math.floor(exactHours / 24);
  const extraHours = exactHours - fullDays * 24;
  const minimumDays = Math.max(fullDays, 1);

  if (extraHours <= 0.001) {
    return {
      exactHours,
      fullDays: minimumDays,
      extraHours: 0,
      billableDays: minimumDays,
      tier: "full-days-only",
      explanation: `${minimumDays} complete 24-hour rental day${minimumDays === 1 ? "" : "s"}.`,
    };
  }

  if (extraHours <= policy.gracePeriodHours) {
    return {
      exactHours,
      fullDays: minimumDays,
      extraHours,
      billableDays: minimumDays,
      tier: "grace",
      explanation:
        `${minimumDays} complete rental days + ${formatHours(extraHours)} extra hours. ` +
        `The extra time is within this partner's ${policy.gracePeriodHours}-hour grace period, so there is no additional charge.`,
    };
  }

  if (extraHours < policy.fullDayChargeStartHours) {
    return {
      exactHours,
      fullDays: minimumDays,
      extraHours,
      billableDays: minimumDays + policy.halfDayRatePercent / 100,
      tier: "half-day",
      explanation:
        `${minimumDays} complete rental days + ${formatHours(extraHours)} extra hours. ` +
        `This exceeds the ${policy.gracePeriodHours}-hour grace period but is below ${policy.fullDayChargeStartHours} hours, ` +
        `so a ${policy.halfDayRatePercent}% day charge applies.`,
    };
  }

  return {
    exactHours,
    fullDays: minimumDays,
    extraHours,
    billableDays: minimumDays + policy.fullDayRatePercent / 100,
    tier: "full-day",
    explanation:
      `${minimumDays} complete rental days + ${formatHours(extraHours)} extra hours. ` +
      `Because the extra time is ${policy.fullDayChargeStartHours} hours or more, a full-day charge applies.`,
  };
}
