export type PartnerRentalPolicy = {
  partnerId: string;
  partnerName: string;
  gracePeriodHours: number;
  halfDayChargeStartHours: number;
  fullDayChargeStartHours: number;
  halfDayRatePercent: number;
  fullDayRatePercent: number;
};

export const defaultPartnerRentalPolicy: PartnerRentalPolicy = {
  partnerId: "default",
  partnerName: "Experience Cancun Default",
  gracePeriodHours: 2,
  halfDayChargeStartHours: 2,
  fullDayChargeStartHours: 6,
  halfDayRatePercent: 50,
  fullDayRatePercent: 100,
};

export const partnerRentalPolicies: Record<string, PartnerRentalPolicy> = {
  default: defaultPartnerRentalPolicy,
  "partner-demo-1": {
    partnerId: "partner-demo-1",
    partnerName: "Demo Cancun Partner",
    gracePeriodHours: 2,
    halfDayChargeStartHours: 2,
    fullDayChargeStartHours: 6,
    halfDayRatePercent: 50,
    fullDayRatePercent: 100,
  },
};

export function getPartnerRentalPolicy(partnerId?: string) {
  if (!partnerId) return defaultPartnerRentalPolicy;
  return partnerRentalPolicies[partnerId] ?? defaultPartnerRentalPolicy;
}

export type LateChargeResult = {
  tier: "none" | "half-day" | "full-day";
  chargeAmount: number;
  description: string;
};

export function calculateLateCharge(
  hoursLate: number,
  dailyRate: number,
  policy: PartnerRentalPolicy,
): LateChargeResult {
  if (hoursLate < policy.gracePeriodHours) {
    return {
      tier: "none",
      chargeAmount: 0,
      description: `No charge within the ${policy.gracePeriodHours}-hour grace period.`,
    };
  }

  if (hoursLate < policy.fullDayChargeStartHours) {
    return {
      tier: "half-day",
      chargeAmount: dailyRate * (policy.halfDayRatePercent / 100),
      description: `${policy.halfDayRatePercent}% of the daily rate.`,
    };
  }

  return {
    tier: "full-day",
    chargeAmount: dailyRate * (policy.fullDayRatePercent / 100),
    description: `${policy.fullDayRatePercent}% of the daily rate.`,
  };
}
