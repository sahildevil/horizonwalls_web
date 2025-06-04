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
  const [adScript, setAdScript] = useState<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Load AdSense script
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
    setAdScript(script);

    return () => {
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [publisherId]);

  const loadAd = () => {
    if (window.adsbygoogle && window.adsbygoogle.loaded) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Error loading ad:', error);
      }
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
        // For interstitial ads, we'll use a custom fullscreen overlay
        // Since AdSense interstitials are more complex, we'll simulate with display ads
        loadAd();
        
        // Simulate ad completion after 5 seconds or user closes
        setTimeout(() => {
          resolve(true);
        }, 100); // Quick resolve for now, will be handled by overlay
        
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