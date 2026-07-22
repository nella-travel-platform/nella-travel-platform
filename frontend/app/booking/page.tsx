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
  };
};

export default function BookingPage({ searchParams }: Props) {
  const vehicle = vehicles.find((item) => item.id === searchParams.vehicle);

  return (
    <main className="booking-page">
      <Navbar />
      <section className="booking-hero">
        <div className="home-container">
          <span className="eyebrow hero-eyebrow">Secure reservation</span>
          <h1>Complete your booking.</h1>
          <p>
            Review your trip, enter the driver information and reserve the vehicle
            with one day&apos;s rent.
          </p>
        </div>
      </section>

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
          />
        ) : (
          <section className="booking-empty">
            <h2>No vehicle selected</h2>
            <p>Please return to the vehicle search and select a vehicle first.</p>
            <a className="primary-button booking-link-button" href="/vehicles">
              Search vehicles
            </a>
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
}
