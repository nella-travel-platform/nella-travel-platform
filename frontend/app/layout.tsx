import "./globals.css";
import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import ScrollToTop from "../components/shared/ScrollToTop";

export const metadata: Metadata = {
  title: "Experience Cancun",
  description:
    "Car rentals, airport transfers, tours and vacation experiences in Cancun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}><ScrollToTop /></Suspense>
        {children}
      </body>
    </html>
  );
}
