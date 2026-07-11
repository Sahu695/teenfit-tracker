import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teenfit Tracker",
  description: "Train smart. Track everything. Stay private.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
