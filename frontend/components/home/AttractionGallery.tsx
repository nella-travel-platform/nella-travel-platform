const attractions = [
  {
    name: "Xcaret",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Xcaret%20parque%20tem%C3%A1tico.jpg?width=420",
  },
  {
    name: "Chichén Itzá",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Chichen%20Itza%203.jpg?width=420",
  },
  {
    name: "Bacalar",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bacalar%20Lagoon.jpg?width=420",
  },
  {
    name: "Xel-Há",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Xel-Ha%20-%20panoramio.jpg?width=420",
  },
  {
    name: "Cenotes",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Cenote%20Dzitnup%2C%20Yucatan%202010.jpg?width=420",
  },
];

export default function AttractionGallery() {
  return (
    <section className="hero-attraction-gallery" aria-label="Cancún attractions">
      <div className="hero-attraction-heading">
        <strong>Discover more of Cancún</strong>
        <span>Parks, culture, lagoons and natural wonders</span>
      </div>

      <div className="hero-attraction-track">
        {attractions.map((attraction) => (
          <figure className="hero-attraction-card" key={attraction.name}>
            <img src={attraction.image} alt={attraction.name} loading="lazy" />
            <figcaption>{attraction.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
