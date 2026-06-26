import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nsedu.co"),
  title: {
    default: "North Star Academy — Find Your Direction",
    template: "%s",
  },
  description:
    "Practical courses in data analytics, languages, and professional skills in Baku. Education that turns knowledge into real results.",
  openGraph: {
    siteName: "North Star Academy",
    type: "website",
    locale: "en_US",
    images: [{ url: "/logo.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B1026] text-[#F5F3EE]">
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  );
}
