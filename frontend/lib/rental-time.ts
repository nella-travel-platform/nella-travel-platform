export type RentalDuration = {
  billableDays: number;
  exactHours: number;
  pickupDateTime: Date | null;
  returnDateTime: Date | null;
};

export function buildLocalDateTime(date?: string, time?: string) {
  if (!date) return null;
  const safeTime = time || "12:00";
  const value = new Date(`${date}T${safeTime}:00`);
  return Number.isNaN(value.getTime()) ? null : value;
}

export function calculateRentalDuration(
  pickupDate?: string,
  pickupTime?: string,
  returnDate?: string,
  returnTime?: string,
): RentalDuration {
  const pickupDateTime = buildLocalDateTime(pickupDate, pickupTime);
  const returnDateTime = buildLocalDateTime(returnDate, returnTime);

  if (!pickupDateTime || !returnDateTime) {
    return {
      billableDays: 1,
      exactHours: 24,
      pickupDateTime,
      returnDateTime,
    };
  }

  const milliseconds = returnDateTime.getTime() - pickupDateTime.getTime();
  const exactHours = milliseconds / 3_600_000;

  if (!Number.isFinite(exactHours) || exactHours <= 0) {
    return {
      billableDays: 1,
      exactHours: 24,
      pickupDateTime,
      returnDateTime,
    };
  }

  return {
    billableDays: Math.max(1, Math.ceil(exactHours / 24)),
    exactHours,
    pickupDateTime,
    returnDateTime,
  };
}

export function formatRentalDateTime(date?: string, time?: string) {
  const value = buildLocalDateTime(date, time);
  if (!value) return "Pending";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
}
