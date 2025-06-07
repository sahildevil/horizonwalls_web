// src/components/platform/AndroidRedirect.tsx
"use client";

import { Button } from "@/components/ui/button";
import { PlaceholderPhones } from "./PlaceholderPhones";
import { Download, Star, Smartphone } from "lucide-react";
import Image from "next/image";

export function AndroidRedirect() {
  const handleDownloadApp = () => {
    // Replace with your actual Play Store URL
    window.open(
      "https://play.google.com/store/apps/details?id=com.sahil.horizonwalls",
      "_blank"
    );
  };

  const handleContinueWeb = () => {
    // Allow access to web version
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <defs>
            <pattern
              id="grid"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-4xl w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            {/* App Logo instead of HW text */}
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl p-0">
              <Image
                src="/applogo.png"
                alt="Horizon Walls"
                width={60}
                height={60}
                className="object-contain border-none rounded-full"
                priority
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-tan-mon">
            Horizon Walls
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            The ultimate app for all your{" "}
            <span className="italic text-orange-400">wallpaper</span> needs
          </p>
          <p className="text-gray-400">
            Explore the endless possibilities of AI-driven art and
            customization!
          </p>
        </div>

        {/* Action buttons */}
        <div className="mb-12 space-y-4 flex flex-col items-center">
          <Button
            onClick={handleDownloadApp}
            className="bg-white text-black hover:bg-gray-100 font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center justify-center gap-3"
          >
            {/* Play Store Logo */}
            <div className="w-6 h-6 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path
                  fill="#4285F4"
                  d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5Z"
                />
                <path
                  fill="#34A853"
                  d="M16.81,15.12L6.05,21.34C5.79,21.5 5.50,21.57 5.21,21.57C4.60,21.57 4.03,21.26 3.84,21.85L13.69,12L16.81,15.12Z"
                />
                <path
                  fill="#FBBC04"
                  d="M20.16,10.85C20.16,10.85 20.16,10.85 20.16,10.85L17.93,9.22L13.69,12L17.93,14.78L20.16,13.15C20.69,12.87 21,12.26 21,11.5C21,10.74 20.69,10.13 20.16,10.85Z"
                />
                <path
                  fill="#EA4335"
                  d="M13.69,12L3.84,2.15C4.03,1.74 4.60,1.43 5.21,1.43C5.50,1.43 5.79,1.50 6.05,1.66L16.81,8.88L13.69,12Z"
                />
              </svg>
            </div>
            <span>Get it on Play Store</span>
          </Button>

          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>Please Rate us 5/5</span>
            </div>
            <div className="flex items-center">
              <Smartphone className="w-4 h-4 text-blue-400 mr-1" />
              <span>10K+ Downloads</span>
            </div>
          </div>
        </div>

        {/* Phone carousel */}
        <div className="mb-12">
          <PlaceholderPhones />
        </div>

        {/* Footer options */}
        <div className="space-y-4">
          {/* <Button 
            onClick={handleContinueWeb}
            variant="ghost"
            className="text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 px-6 py-2 rounded-full transition-all duration-300"
          >
            Continue to Web Version
          </Button> */}

          <p className="text-xs text-gray-500 max-w-md mx-auto">
            For the best experience on android mobile devices, we recommend
            downloading our app. The web version is optimized for IOS users.
          </p>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-orange-500 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-purple-500 rounded-full opacity-10 animate-pulse delay-500"></div>
    </div>
  );
}
