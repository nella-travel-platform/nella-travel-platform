"use client";

import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Container } from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { ServiceCard } from "../../components/ui/ServiceCard";
import { TrustBadge } from "../../components/ui/TrustBadge";

const services = [
  {
    icon: "🚗",
    title: "Rent a Car",
    description:
      "Transparent pricing, airport delivery, insurance included, and no hidden fees.",
    actionLabel: "Explore vehicles",
    badge: "Available first",
  },
  {
    icon: "🎟️",
    title: "Tours & Parks",
    description:
      "Internal bookings and tracked vendor links with flexible visitor pricing.",
    actionLabel: "Explore tours",
  },
  {
    icon: "✈️",
    title: "Airport Transfers",
    description:
      "Arrival and departure transportation with configurable service areas.",
    actionLabel: "View transfers",
  },
];

export default function DesignSystemPage() {
  return (
    <main>
      <section
        className="ec-section"
        style={{
          background: "var(--ec-ocean-dark)",
          color: "white",
        }}
      >
        <Container>
          <p style={{ fontWeight: 800 }}>
            Experience Cancun Design System
          </p>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              maxWidth: 900,
              lineHeight: 1,
              marginTop: "1rem",
              marginBottom: "2rem",
            }}
          >
            Build trust before asking customers to book.
          </h1>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <Button>Reserve now</Button>

            <Button
              variant="outline"
              style={{
                color: "white",
                borderColor: "white",
              }}
            >
              WhatsApp us
            </Button>
          </div>
        </Container>
      </section>

      <section className="ec-section">
        <Container>
          <SectionHeading
            eyebrow="Trust foundation"
            title="Clear, reassuring signals"
            description="The strongest repeated themes in your customer reviews become visible proof."
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <TrustBadge icon="✓" label="No hidden fees" />
            <TrustBadge icon="✈️" label="Airport delivery" />
            <TrustBadge icon="🛡️" label="Insurance included" />
            <TrustBadge icon="💳" label="Fast deposit refunds" />
          </div>
        </Container>
      </section>

      <section
        className="ec-section"
        style={{ background: "var(--ec-sand)" }}
      >
        <Container>
          <SectionHeading
            eyebrow="Universal catalog"
            title="One design system for every service"
            description="Capabilities determine what appears, so car-only fields never appear on tour pages."
          />

          <div className="ec-grid ec-grid-3">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="ec-section">
        <Container>
          <div className="ec-grid ec-grid-3">
            <Card>
              <h3>Primary action</h3>
              <Button fullWidth>Reserve now</Button>
            </Card>

            <Card>
              <h3>Secondary action</h3>
              <Button variant="secondary" fullWidth>
                View details
              </Button>
            </Card>

            <Card>
              <h3>Outline action</h3>
              <Button variant="outline" fullWidth>
                Learn more
              </Button>
            </Card>
          </div>
        </Container>
      </section>
    </main>
  );
}