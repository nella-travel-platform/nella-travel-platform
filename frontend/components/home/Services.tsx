const services = [
  {
    icon: "🚗",
    title: "Car rentals",
    description:
      "Five simple vehicle categories, transparent daily pricing and airport delivery.",
    label: "Search vehicles",
    href: "#search",
  },
  {
    icon: "✈️",
    title: "Airport transfers",
    description:
      "Reliable arrival and departure transportation for individuals and groups.",
    label: "Coming next",
    href: "#",
  },
  {
    icon: "🎟️",
    title: "Tours & parks",
    description:
      "Discover Cancún, Isla Mujeres, Chichén Itzá and the Riviera Maya.",
    label: "Coming next",
    href: "#",
  },
  {
    icon: "🏝️",
    title: "Vacation rentals",
    description:
      "Comfortable stays for couples, families and larger travel groups.",
    label: "Coming soon",
    href: "#",
  },
];

export default function Services() {
  return (
    <section id="services" className="home-section">
      <div className="home-container">
        <div className="section-heading-row">
          <div>
            <span className="eyebrow">One trusted platform</span>
            <h2>Plan more of your vacation in one place.</h2>
          </div>
          <p>
            We are launching with car rentals first, then expanding into the
            other services travelers request most.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service, index) => (
            <article className="service-tile" key={service.title}>
              <div className="service-icon" aria-hidden="true">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a
                className={index === 0 ? "text-link active" : "text-link muted"}
                href={service.href}
              >
                {service.label} →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
