import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paracord Store",
  description: "Custom paracord builder and shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
