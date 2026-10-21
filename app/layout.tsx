import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const golos = localFont({
  src: "./fonts/GolosTextVF.ttf",
  variable: "--font-golos",
});

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Dreamwell | Find Your Dream Home",
    template: "%s | Dreamwell",
  },
  description:
    "Discover your dream home with Dreamwell. Explore houses, apartments, and properties for sale or rent in your ideal location.",
  applicationName: "Dreamwell",
  keywords: ["Dreamwell", "real estate", "properties", "houses for sale", "apartments for rent", "property listings"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.className} ${golos.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
