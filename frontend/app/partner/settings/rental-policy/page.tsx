import Navbar from "../../../../components/layout/Navbar";
import Footer from "../../../../components/layout/Footer";
import RentalPolicyEditor from "../../../../components/partner/RentalPolicyEditor";

export default function RentalPolicySettingsPage() {
  return (
    <main>
      <Navbar />
      <section className="partner-policy-hero">
        <div className="home-container">
          <span className="eyebrow hero-eyebrow">Partner settings</span>
          <h1>Rental and late-return policy</h1>
          <p>
            Configure grace periods and half-day or full-day late charges for
            each partner.
          </p>
        </div>
      </section>

      <div className="home-container partner-policy-shell">
        <RentalPolicyEditor />
      </div>
      <Footer />
    </main>
  );
}
