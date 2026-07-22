const reviews = [
  {
    quote:
      "The process was very easy, the vehicle was delivered on time and our deposit was returned immediately.",
    name: "Family traveler",
    location: "Mexico City",
  },
  {
    quote:
      "Excellent communication from before our arrival. The vehicle was clean, comfortable and in very good condition.",
    name: "Cancún visitor",
    location: "Guanajuato",
  },
  {
    quote:
      "No hidden fees, no complicated paperwork and very attentive service throughout the trip.",
    name: "Repeat customer",
    location: "Monterrey",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="home-section reviews-section">
      <div className="home-container">
        <div className="centered-heading">
          <span className="eyebrow">Customer trust</span>
          <h2>Service travelers recommend to other families.</h2>
          <p>
            Selected themes are based on the public feedback already received by
            Cancún Vacation Rental – Live the Dream.
          </p>
        </div>

        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.quote}>
              <div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote>“{review.quote}”</blockquote>
              <p><strong>{review.name}</strong><span>{review.location}</span></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
