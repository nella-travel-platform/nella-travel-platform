import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & { children: ReactNode };

export function Container({ children, ...props }: Props) {
  return <div {...props} className={`ec-container ${props.className ?? ""}`}>{children}</div>;
}
