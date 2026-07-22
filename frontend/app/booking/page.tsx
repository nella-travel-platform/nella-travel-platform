import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import BookingWizard from "../../components/booking/BookingWizard";
import { vehicles } from "../../lib/vehicle-catalog";

type Props = {
  searchParams: {
    vehicle?: string;
    days?: string;
    pickupDate?: string;
    pickupTime?: string;
    returnDate?: string;
    returnTime?: string;
    pickupLocation?: string;
    returnLocation?: string;
  };
};

export default function BookingPage({ searchParams }: Props) {
  const vehicle = vehicles.find((item) => item.id === searchParams.vehicle);

  return (
    <main className="booking-page">
      <Navbar />
      <div className="home-container booking-shell">
        {vehicle ? (
          <BookingWizard
            vehicle={vehicle}
            rentalDays={Math.max(Number(searchParams.days ?? "1"), 1)}
            pickupDate={searchParams.pickupDate ?? ""}
            pickupTime={searchParams.pickupTime ?? ""}
            returnDate={searchParams.returnDate ?? ""}
            returnTime={searchParams.returnTime ?? ""}
            pickupLocation={searchParams.pickupLocation ?? "cancun-airport"}
            returnLocation={
              searchParams.returnLocation ??
              searchParams.pickupLocation ??
              "cancun-airport"
            }
          />
        ) : (
          <section className="booking-empty">
            <h2>No vehicle selected</h2>
            <a href="/vehicles">Search vehicles</a>
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
}
