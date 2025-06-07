import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { AdSenseProvider } from "@/providers/AdSenseProvider";
import { PlatformGuard } from "@/components/platform/PlatformGuard";
import { ImageProtection } from "@/components/ImageProtection";
import { ThemeScript } from "@/components/ThemeScript";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

// Load the custom TAN-MON font
const tanMon = localFont({
  src: "../../public/fonts/TAN-MON.otf",
  variable: "--font-tan-mon",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Horizon Walls",
  description: "Discover and download high-quality wallpapers",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${tanMon.variable}`}
    >
      <head>
        <ThemeScript />
        {/* Additional favicon links for better browser support */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AdSenseProvider publisherId="ca-pub-6865729943999095">
          <ThemeProvider>
            <AuthProvider>
              <PlatformGuard>
                <ImageProtection />
                {children}
                <Analytics />
              </PlatformGuard>
            </AuthProvider>
          </ThemeProvider>
        </AdSenseProvider>
      </body>
    </html>
  );
}
