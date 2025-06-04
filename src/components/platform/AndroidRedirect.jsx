// src/components/platform/AndroidRedirect.tsx
"use client";

import { Button } from "@/components/ui/button";

export function AndroidRedirect() {
  const handleDownloadApp = () => {
    // Replace with your actual Play Store URL
    window.open('https://play.google.com/store/apps/details?id=com.yourapp.horizonwalls', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
            Horizon Walls
          </h1>
          <p className="text-gray-600">
            Get the best wallpaper experience
          </p>
        </div>

        <div className="mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Download Our Mobile App
          </h2>
          <p className="text-gray-600">
            For the best experience on Android, please download our mobile app from the Play Store.
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={handleDownloadApp}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg"
          >
            Download from Play Store
          </Button>
          
          <p className="text-sm text-gray-500">
            Don't have the Play Store? Visit our website on a desktop or iOS device.
          </p>
        </div>
      </div>
    </div>
  );
}