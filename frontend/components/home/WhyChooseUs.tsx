const benefits = [
  {
    title: "Clear pricing",
    text: "Customers see the rental price, reservation deposit and refundable damage deposit before booking.",
  },
  {
    title: "Local assistance",
    text: "Support is available before arrival, during pickup and throughout the rental.",
  },
  {
    title: "Flexible airport coordination",
    text: "Flight delays and schedule changes can be coordinated directly with the local service team.",
  },
  {
    title: "Fast deposit return",
    text: "Eligible cash and transfer deposits can be returned immediately after the vehicle inspection.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="home-section home-section-muted">
      <div className="home-container why-layout">
        <div className="why-copy">
          <span className="eyebrow">Why travelers choose us</span>
          <h2>Built around the concerns real customers mention most.</h2>
          <p>
            Our service model is based on customer feedback about trust,
            communication, punctuality, vehicle condition and transparent deposits.
          </p>

          <div className="stat-row">
            <div><strong>100%</strong><span>clear booking terms</span></div>
            <div><strong>5</strong><span>simple vehicle categories</span></div>
            <div><strong>EN / ES</strong><span>bilingual experience</span></div>
          </div>
        </div>

        <div className="benefit-list">
          {benefits.map((benefit, index) => (
            <article key={benefit.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
