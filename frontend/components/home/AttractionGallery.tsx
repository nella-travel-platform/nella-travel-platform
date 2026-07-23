const attractions = [
  {
    name: "Xcaret",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Xcaret%20parque%20tem%C3%A1tico.jpg?width=500",
  },
  {
    name: "Chichén Itzá",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Chichen%20Itza%203.jpg?width=500",
  },
  {
    name: "Bacalar",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bacalar%20Lagoon.jpg?width=500",
  },
  {
    name: "Xel-Há",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Xel-Ha%20-%20panoramio.jpg?width=500",
  },
  {
    name: "Cenotes",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Cenote%20Dzitnup%2C%20Yucatan%202010.jpg?width=500",
  },
];

export default function AttractionGallery() {
  return (
    <div className="hero-attraction-gallery" aria-label="Cancún area attractions">
      {attractions.map((attraction, index) => (
        <figure
          className={`hero-attraction-card hero-attraction-card-${index + 1}`}
          key={attraction.name}
        >
          <img src={attraction.image} alt={attraction.name} loading="lazy" />
          <figcaption>{attraction.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}
