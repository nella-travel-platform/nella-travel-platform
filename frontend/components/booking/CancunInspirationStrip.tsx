const places = [
  {
    name: "Xcaret",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Xcaret%20parque%20tem%C3%A1tico.jpg?width=360",
  },
  {
    name: "Chichén Itzá",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Chichen%20Itza%203.jpg?width=360",
  },
  {
    name: "Bacalar",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bacalar%20Lagoon.jpg?width=360",
  },
  {
    name: "Cenotes",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Cenote%20Dzitnup%2C%20Yucatan%202010.jpg?width=360",
  },
];

export default function CancunInspirationStrip() {
  return (
    <aside className="booking-inspiration" aria-label="Cancún inspiration">
      <div>
        <strong>Your Cancún adventure is getting closer</strong>
        <span>Explore unforgettable places during your stay.</span>
      </div>
      <div className="booking-inspiration-track">
        {places.map((place) => (
          <figure key={place.name}>
            <img src={place.image} alt={place.name} loading="lazy" />
            <figcaption>{place.name}</figcaption>
          </figure>
        ))}
      </div>
    </aside>
  );
}
