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
    // Check if AdSense script is already loaded
    const checkAdSense = () => {
      if (window.adsbygoogle) {
        setIsAdLoaded(true);
        console.log('AdSense script already loaded');
        return;
      }

      // Load AdSense script if not already present
      const existingScript = document.querySelector(`script[src*="adsbygoogle.js"]`);
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        
        script.onload = () => {
          setIsAdLoaded(true);
          console.log('AdSense script loaded');
        };
        
        script.onerror = () => {
          console.error('Failed to load AdSense script');
        };
        
        document.head.appendChild(script);
      } else {
        // Script already exists, just set as loaded
        setIsAdLoaded(true);
      }
    };

    checkAdSense();
  }, [publisherId]);

  const loadAd = () => {
    if (window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log('Ad push called');
      } catch (error) {
        console.error('Error loading ad:', error);
      }
    } else {
      console.warn('AdSense not available');
    }
  };

  const showInterstitialAd = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!isAdLoaded || !window.adsbygoogle) {
        console.log('AdSense not loaded, skipping ad');
        resolve(true); // Allow download without ad
        return;
      }

      try {
        loadAd();
        // Simulate ad completion - in real scenario, this would be handled by the overlay
        setTimeout(() => {
          resolve(true);
        }, 100);
        
      } catch (error) {
        console.error('Error showing interstitial ad:', error);
        resolve(true); // Allow download on error
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