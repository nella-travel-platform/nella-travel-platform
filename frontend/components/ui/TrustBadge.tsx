type Props = { icon: string; label: string };

export function TrustBadge({ icon, label }: Props) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.625rem",
      minHeight: 44,
      padding: "0.625rem 0.9rem",
      borderRadius: "var(--ec-radius-pill)",
      background: "var(--ec-sand)",
      border: "1px solid var(--ec-border)",
      fontWeight: 700,
    }}>
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
