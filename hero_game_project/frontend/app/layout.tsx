import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // <-- Phải có dòng này

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hero Trainer Game",
  description: "IOTA Move Game Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* QUAN TRỌNG NHẤT: Phải bọc Providers quanh children */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}