import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ScorpionLabz",
  description: "ScorpionLabz - Innovative Technology Solutions",
  icons: {
    icon: "/assets/image/whiteScorp_full.png",
  },
  openGraph: {
    title: "ScorpionLabz",
    description: "ScorpionLabz - Innovative Technology Solutions",
    images: [
      {
        url: "/assets/image/whiteScorp_full.png",
        width: 1200,
        height: 630,
        alt: "ScorpionLabz Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScorpionLabz",
    description: "ScorpionLabz - Innovative Technology Solutions",
    images: ["/assets/image/whiteScorp_full.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
