type Props = {
  vehicleName: string;
  category?: string;
  className?: string;
};

const AVANZA_IMAGE =
  "https://commons.wikimedia.org/wiki/Special:FilePath/2022%20Toyota%20Avanza%201.5%20G%20Toyota%20Safety%20Sense%20W101RE%20%2820220403%29.jpg?width=1200";

const DEFAULT_IMAGE =
  "https://commons.wikimedia.org/wiki/Special:FilePath/2022%20Toyota%20Avanza%201.5%20G%20Toyota%20Safety%20Sense%20W101RE%20%2820220403%29.jpg?width=1200";

export function getVehicleImage(vehicleName: string) {
  const normalized = vehicleName.toLowerCase();

  if (normalized.includes("avanza")) return AVANZA_IMAGE;

  return DEFAULT_IMAGE;
}

export default function VehicleImage({
  vehicleName,
  category,
  className,
}: Props) {
  return (
    <img
      className={className}
      src={getVehicleImage(vehicleName)}
      alt={`${vehicleName}${category ? ` — ${category}` : ""}`}
      loading="lazy"
    />
  );
}
