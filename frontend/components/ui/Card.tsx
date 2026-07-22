import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, style, ...props }: Props) {
  return (
    <div {...props} className={`ec-card ${props.className ?? ""}`} style={{ padding: "1.5rem", ...style }}>
      {children}
    </div>
  );
}
