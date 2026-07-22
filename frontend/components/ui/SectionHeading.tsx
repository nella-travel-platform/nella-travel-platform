type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <header style={{ maxWidth: 760, marginBottom: "2rem" }}>
      {eyebrow ? <p style={{ color: "var(--ec-turquoise)", fontWeight: 800 }}>{eyebrow}</p> : null}
      <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.08, margin: 0 }}>{title}</h2>
      {description ? <p style={{ color: "var(--ec-muted)", lineHeight: 1.7 }}>{description}</p> : null}
    </header>
  );
}
