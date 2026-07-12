import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "./components/session-provider";

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
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}