import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DiskDoctor - Professional Data Recovery Services",
  description:
    "Professional data recovery from hard drives, SSDs, RAID systems, and all digital media. Trusted since 1991 with a 95% success rate.",
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
