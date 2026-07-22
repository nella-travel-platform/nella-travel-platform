export type ChargeMode = "daily" | "trip" | "included";

export type BookingExtraDefinition = {
  id: "childSeat" | "additionalDriver" | "insurance";
  name: string;
  description: string;
  chargeMode: ChargeMode;
  amount: number;
};

export const bookingExtras: BookingExtraDefinition[] = [
  {
    id: "childSeat",
    name: "Child seat",
    description: "Child safety seat installed before pickup.",
    chargeMode: "daily",
    amount: 150,
  },
  {
    id: "additionalDriver",
    name: "Additional driver",
    description: "Add one authorized driver to the rental agreement.",
    chargeMode: "trip",
    amount: 600,
  },
  {
    id: "insurance",
    name: "Additional coverage",
    description: "Optional enhanced insurance coverage for the trip.",
    chargeMode: "included",
    amount: 0,
  },
];

export function calculateExtraTotal(
  extra: BookingExtraDefinition,
  rentalDays: number,
) {
  if (extra.chargeMode === "included") return 0;
  if (extra.chargeMode === "trip") return extra.amount;
  return extra.amount * rentalDays;
}

export function getChargeLabel(extra: BookingExtraDefinition) {
  if (extra.chargeMode === "included") return "Included · No charge";
  if (extra.chargeMode === "trip") return `MX$${extra.amount} one-time`;
  return `MX$${extra.amount} per day`;
}
