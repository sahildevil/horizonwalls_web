// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { AdSenseProvider } from "@/providers/AdSenseProvider";
import { PlatformGuard } from "@/components/platform/PlatformGuard";
import { ImageProtection } from "@/components/ImageProtection";
import { ThemeScript } from "@/components/theme-script";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        {/* AdSense Verification Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6865729943999095"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AdSenseProvider publisherId="ca-pub-6865729943999095">
          <ThemeProvider>
            <AuthProvider>
              <PlatformGuard>
                <ImageProtection />
                {children}
              </PlatformGuard>
            </AuthProvider>
          </ThemeProvider>
        </AdSenseProvider>
      </body>
    </html>
  );
}