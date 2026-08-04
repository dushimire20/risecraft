import { Fraunces, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Risecraft Rwanda Limited - Learn. Create. Earn.",
  description:
    "Practical training in fashion & design, branding, business English, corporate training and entrepreneurial skills in Kabuga-Kigali, Rwanda.",
  icon: "/Logo2.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body className="font-body antialiased bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
