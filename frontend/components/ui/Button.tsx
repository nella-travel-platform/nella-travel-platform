import type { ButtonHTMLAttributes, ReactNode, CSSProperties } from "react";

type Variant = "primary" | "secondary" | "outline";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
};

const styles: Record<Variant, CSSProperties> = {
  primary: { background: "var(--ec-sunset)", color: "white", border: "1px solid var(--ec-sunset)" },
  secondary: { background: "var(--ec-ocean)", color: "white", border: "1px solid var(--ec-ocean)" },
  outline: { background: "transparent", color: "var(--ec-ocean)", border: "1px solid var(--ec-ocean)" },
};

export function Button({ children, variant = "primary", fullWidth = false, style, ...props }: Props) {
  return (
    <button
      {...props}
      style={{
        minHeight: 44,
        width: fullWidth ? "100%" : undefined,
        padding: "0.75rem 1.125rem",
        borderRadius: "var(--ec-radius-pill)",
        fontWeight: 700,
        cursor: props.disabled ? "not-allowed" : "pointer",
        ...styles[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
