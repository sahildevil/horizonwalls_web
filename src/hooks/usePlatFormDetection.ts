// src/hooks/usePlatformDetection.ts
"use client";

import { useState, useEffect } from 'react';

type Platform = 'android' | 'ios' | 'desktop' | 'unknown';

export function usePlatformDetection() {
  const [platform, setPlatform] = useState<Platform>('unknown');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectPlatform = (): Platform => {
      if (typeof window === 'undefined') return 'unknown';
      
      const userAgent = window.navigator.userAgent.toLowerCase();
      
      // Check for Android
      if (userAgent.includes('android')) {
        return 'android';
      }
      
      // Check for iOS (iPhone, iPad, iPod)
      if (/iphone|ipad|ipod/.test(userAgent)) {
        return 'ios';
      }
      
      // Everything else is considered desktop/web
      //return 'android'; //desktop for later use
      return 'android';
    };

    setPlatform(detectPlatform());
    setIsLoading(false);
  }, []);

  return { platform, isLoading };
}