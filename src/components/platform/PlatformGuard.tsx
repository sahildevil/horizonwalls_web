// src/components/platform/PlatformGuard.tsx
"use client";

import { usePlatformDetection } from "@/hooks/usePlatformDetection";
import { AndroidRedirect } from "./AndroidRedirect";

interface PlatformGuardProps {
  children: React.ReactNode;
}

export function PlatformGuard({ children }: PlatformGuardProps) {
  const { platform, isLoading } = usePlatformDetection();

  // Show loading state while detecting platform
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-500 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect Android users to download app
  if (platform === 'android') {
    return <AndroidRedirect />;
  }

  // Allow iOS and desktop users to access the app
  return <>{children}</>;
}