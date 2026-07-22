import { Button } from "./Button";
import { Card } from "./Card";

type Props = {
  icon: string;
  title: string;
  description: string;
  actionLabel: string;
  badge?: string;
};

export function ServiceCard({ icon, title, description, actionLabel, badge }: Props) {
  return (
    <Card style={{ display: "flex", flexDirection: "column", gap: "1rem", minHeight: 280 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: "2rem" }} aria-hidden="true">{icon}</span>
        {badge ? <span style={{ fontWeight: 800, fontSize: "0.75rem" }}>{badge}</span> : null}
      </div>
      <div style={{ flex: 1 }}>
        <h3>{title}</h3>
        <p style={{ color: "var(--ec-muted)", lineHeight: 1.65 }}>{description}</p>
      </div>
      <Button variant="secondary" fullWidth>{actionLabel}</Button>
    </Card>
  );
}
