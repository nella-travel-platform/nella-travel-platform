type Props = {
  pickupLocation: string;
  pickupDate?: string;
  returnDate?: string;
  category?: string;
};

const locations: Record<string, string> = {
  "cancun-airport": "Cancun Airport",
  "hotel-zone": "Cancun Hotel Zone",
  "downtown-cancun": "Downtown Cancun",
  "playa-del-carmen": "Playa del Carmen",
};

export default function VehicleSearchSummary(props: Props) {
  return (
    <section className="vehicle-summary">
      <div><span>Pickup location</span><strong>{locations[props.pickupLocation] ?? "Cancun Airport"}</strong></div>
      <div><span>Pickup</span><strong>{props.pickupDate || "Select date"}</strong></div>
      <div><span>Return</span><strong>{props.returnDate || "Select date"}</strong></div>
      <div><span>Category</span><strong>{props.category || "Any category"}</strong></div>
      <a href="/#search">Modify search</a>
    </section>
  );
}
