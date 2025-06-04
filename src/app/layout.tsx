// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { PlatformGuard } from '@/components/platform/PlatformGuard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Horizon Walls',
  description: 'Discover and download high-quality wallpapers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <PlatformGuard>
              {children}
            </PlatformGuard>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}