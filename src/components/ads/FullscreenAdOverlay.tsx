// src/components/ads/FullscreenAdOverlay.tsx
"use client";

import { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [countdown, setCountdown] = useState(5); // 5 second countdown
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setCanClose(false);
      return;
    }

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

    return () => clearInterval(timer);
  }, [isOpen]);

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
        <div className="w-full h-full flex items-center justify-center p-8">
          {/* AdSense Display Ad */}
          <ins
            className="adsbygoogle"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              maxWidth: '728px',
              maxHeight: '90px'
            }}
            data-ad-client={`ca-pub-${adUnitId.split('-')[2]}`} // Extract from adUnitId
            data-ad-slot={adUnitId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          
          {/* Fallback content if ad doesn't load */}
          <div className="absolute inset-0 flex items-center justify-center text-center p-8">
            <div className="max-w-md">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                Support Our Free Wallpapers
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Ads help us keep providing high-quality wallpapers for free. 
                Your download will start in {countdown} seconds.
              </p>
              <div className="w-full h-32 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Advertisement Space</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Thanks for supporting Horizon Walls! 
            {canClose ? ' You can now close this ad.' : ` Please wait ${countdown} more seconds.`}
          </p>
        </div>
      </div>
    </div>
  );
}