import { formatRentalDateTime } from "../../lib/rental-time";
import { getServiceLocation } from "../../lib/location-delivery";

type Props = {
  pickupLocation: string;
  returnLocation: string;
  pickupDate?: string;
  pickupTime?: string;
  returnDate?: string;
  returnTime?: string;
  category?: string;
  categoryValue?: string;
};

export default function VehicleSearchSummary(props: Props) {
  const query = new URLSearchParams({
    pickupLocation: props.pickupLocation,
    returnLocation: props.returnLocation,
    pickupDate: props.pickupDate ?? "",
    pickupTime: props.pickupTime ?? "",
    returnDate: props.returnDate ?? "",
    returnTime: props.returnTime ?? "",
    category: props.categoryValue ?? "",
  });

  return (
    <section className="vehicle-summary">
      <div>
        <span>Pickup location</span>
        <strong>{getServiceLocation(props.pickupLocation).label}</strong>
      </div>
      <div>
        <span>Return location</span>
        <strong>{getServiceLocation(props.returnLocation).label}</strong>
      </div>
      <div>
        <span>Pickup</span>
        <strong>{formatRentalDateTime(props.pickupDate, props.pickupTime)}</strong>
      </div>
      <div>
        <span>Return</span>
        <strong>{formatRentalDateTime(props.returnDate, props.returnTime)}</strong>
      </div>
      <div>
        <span>Category</span>
        <strong>{props.category || "Any category"}</strong>
      </div>
      <a href={`/?${query.toString()}#search`}>Modify search</a>
    </section>
  );
}
