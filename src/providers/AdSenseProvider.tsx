// src/providers/AdSenseProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from 'react';

type AdSenseContextType = {
  isAdLoaded: boolean;
  showInterstitialAd: () => Promise<boolean>;
  loadAd: () => void;
};

const AdSenseContext = createContext<AdSenseContextType | null>(null);

export function AdSenseProvider({ 
  children,
  publisherId 
}: { 
  children: React.ReactNode;
  publisherId: string;
}) {
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  useEffect(() => {
    const loadAdSenseScript = () => {
      // Check if script already exists
      const existingScript = document.querySelector(`script[src*="adsbygoogle.js"]`);
      if (existingScript) {
        setIsAdLoaded(true);
        return;
      }

      // Create and load AdSense script
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        setIsAdLoaded(true);
        console.log('AdSense script loaded successfully');
        // Initialize adsbygoogle array
        (window.adsbygoogle = window.adsbygoogle || []);
      };
      
      script.onerror = () => {
        console.error('Failed to load AdSense script');
        setIsAdLoaded(false);
      };
      
      // Append to head instead of body
      document.head.appendChild(script);
    };

    // Load script after component mounts
    loadAdSenseScript();
  }, [publisherId]);

  const loadAd = () => {
    if (!isAdLoaded || !window.adsbygoogle) {
      console.warn('AdSense not ready yet');
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log('Ad push called successfully');
    } catch (error) {
      console.error('Error loading ad:', error);
    }
  };

  const showInterstitialAd = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!isAdLoaded || !window.adsbygoogle) {
        console.log('AdSense not loaded, skipping ad');
        resolve(true);
        return;
      }

      try {
        loadAd();
        setTimeout(() => {
          resolve(true);
        }, 100);
      } catch (error) {
        console.error('Error showing interstitial ad:', error);
        resolve(true);
      }
    });
  };

  return (
    <AdSenseContext.Provider value={{ isAdLoaded, showInterstitialAd, loadAd }}>
      {children}
    </AdSenseContext.Provider>
  );
}

export const useAdSense = () => {
  const context = useContext(AdSenseContext);
  if (!context) {
    throw new Error('useAdSense must be used within AdSenseProvider');
  }
  return context;
};

// Extend window object for TypeScript
declare global {
  interface Window {
    adsbygoogle: any;
  }
}