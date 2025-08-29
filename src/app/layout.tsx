import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GTA AI - Free Magical GTA Art Image Generator",
  description: "Transform photos to authentic GTA art with our AI-powered GTA image generator. Create stunning GTA-style characters and scenes instantly.",
  keywords: "GTA AI, image generator, AI art, GTA style, photo transformation, artificial intelligence",
  authors: [{ name: "GTA AI Team" }],
  creator: "GTA AI",
  publisher: "GTA AI",
  openGraph: {
    title: "GTA AI - Free Magical GTA Art Image Generator",
    description: "Transform photos to authentic GTA art with our AI-powered GTA image generator. Create stunning GTA-style characters and scenes instantly.",
    url: process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : "https://imageai.pages.dev"),
    siteName: "GTA AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GTA AI - Transform your photos into GTA-style art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GTA AI - Free Magical GTA Art Image Generator",
    description: "Transform photos to authentic GTA art with our AI-powered GTA image generator.",
    creator: "@gtaai_official",
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/favicon.ico" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#e91e63" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}