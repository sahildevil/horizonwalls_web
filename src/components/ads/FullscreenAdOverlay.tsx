// src/components/ads/FullscreenAdOverlay.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdSense } from '@/providers/AdSenseProvider';

interface FullscreenAdOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAdComplete: () => void;
  adUnitId: string;
}

export function FullscreenAdOverlay({ 
  isOpen, 
  onClose, 
  onAdComplete, 
  adUnitId 
}: FullscreenAdOverlayProps) {
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const { isAdLoaded: adSenseReady } = useAdSense();
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setCanClose(false);
      setAdLoaded(false);
      return;
    }

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanClose(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Load ad when AdSense is ready
    if (adSenseReady && window.adsbygoogle) {
      const loadAd = () => {
        try {
          // Clear any existing ad content
          if (adRef.current) {
            const existingAd = adRef.current.querySelector('.adsbygoogle');
            if (existingAd && !existingAd.getAttribute('data-adsbygoogle-status')) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
              setAdLoaded(true);
              console.log('Ad loaded in overlay');
            }
          }
        } catch (error) {
          console.error('Error loading ad in overlay:', error);
        }
      };

      // Small delay to ensure DOM is ready
      setTimeout(loadAd, 100);
    }

    return () => clearInterval(timer);
  }, [isOpen, adSenseReady]);

  const handleClose = () => {
    if (canClose) {
      onAdComplete();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="relative w-full max-w-4xl h-full max-h-[90vh] bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
        {/* Header with close button */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          {!canClose && (
            <div className="flex items-center gap-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              <Clock size={16} />
              <span>{countdown}s</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            disabled={!canClose}
            className={`text-white bg-black bg-opacity-50 hover:bg-opacity-70 ${
              !canClose ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <X size={20} />
          </Button>
        </div>

        {/* Ad Container */}
        <div className="w-full h-full flex items-center justify-center p-8" ref={adRef}>
          <div className="w-full max-w-2xl">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Support Horizon Walls
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ads help us provide free wallpapers. Your download will start after {countdown > 0 ? countdown : 'the ad'}.
              </p>
            </div>
            
            {/* AdSense Ad - Only render when AdSense is ready */}
            {adSenseReady && (
              <div className="flex justify-center">
                <ins 
                  className="adsbygoogle"
                  style={{
                    display: 'block',
                    width: '100%',
                    maxWidth: '300px',
                    height: '600px'
                  }}
                  data-ad-client="ca-pub-6865729943999095"
                  data-ad-slot="9137420112"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
              </div>
            )}

            {/* Fallback content */}
            {(!adSenseReady || !adLoaded) && (
              <div className="mt-8 text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    Thank You for Supporting Us!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {!adSenseReady ? 'Loading ad...' : 
                     `Ads help us keep providing high-quality wallpapers for free. 
                      Your download will start in ${countdown} seconds.`}
                  </p>
                  <div className="w-full h-32 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold">Advertisement Space</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Thanks for supporting Horizon Walls! 
            {canClose ? ' You can now close this ad and download will start.' : ` Please wait ${countdown} more seconds.`}
          </p>
        </div>
      </div>
    </div>
  );
}