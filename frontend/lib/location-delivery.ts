export type ServiceLocation = {
  value: string;
  label: string;
  distanceKmFromCancun: number;
  deliveryFee: number | null;
};

export const serviceLocations: ServiceLocation[] = [
  { value: "cancun-airport", label: "Cancun Airport", distanceKmFromCancun: 18, deliveryFee: 0 },
  { value: "hotel-zone", label: "Cancun Hotel Zone", distanceKmFromCancun: 12, deliveryFee: 0 },
  { value: "downtown-cancun", label: "Downtown Cancun", distanceKmFromCancun: 0, deliveryFee: 0 },
  { value: "puerto-morelos", label: "Puerto Morelos", distanceKmFromCancun: 38, deliveryFee: 500 },
  { value: "playa-del-carmen", label: "Playa del Carmen", distanceKmFromCancun: 68, deliveryFee: 900 },
  { value: "tulum", label: "Tulum", distanceKmFromCancun: 130, deliveryFee: 1800 },
  { value: "outside-service-area", label: "Another location — quote required", distanceKmFromCancun: 0, deliveryFee: null },
];

export function getServiceLocation(value?: string) {
  return (
    serviceLocations.find((location) => location.value === value) ??
    serviceLocations[0]
  );
}

export function calculateDeliveryFees(
  pickupLocation?: string,
  returnLocation?: string,
) {
  const pickup = getServiceLocation(pickupLocation);
  const returned = getServiceLocation(returnLocation);

  const requiresQuote =
    pickup.deliveryFee === null || returned.deliveryFee === null;

  return {
    pickup,
    returned,
    pickupFee: pickup.deliveryFee ?? 0,
    returnFee: returned.deliveryFee ?? 0,
    totalFee: (pickup.deliveryFee ?? 0) + (returned.deliveryFee ?? 0),
    requiresQuote,
  };
}
