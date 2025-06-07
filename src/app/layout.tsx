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
import { Analytics } from "@vercel/analytics/next";

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
