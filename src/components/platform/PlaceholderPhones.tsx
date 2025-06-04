"use client";

import { useEffect, useState } from 'react';

const gradientWallpapers = [
  'bg-gradient-to-br from-purple-600 via-blue-600 to-blue-700',
  'bg-gradient-to-br from-orange-500 via-red-500 to-pink-500',
  'bg-gradient-to-br from-green-400 via-blue-500 to-purple-600',
  'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500',
  'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
  'bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600',
  'bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600'
];

export function PlaceholderPhones() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gradientWallpapers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-80 overflow-hidden">
      <div className="flex items-center justify-center h-full">
        <div className="flex space-x-4">
          {[...Array(7)].map((_, index) => {
            const gradientIndex = (currentIndex + index) % gradientWallpapers.length;
            const gradient = gradientWallpapers[gradientIndex];
            
            return (
              <div
                key={index}
                className={`relative flex-shrink-0 transition-all duration-1000 ease-in-out ${
                  index === 3 ? 'scale-110 z-10' : 'scale-90 opacity-80'
                }`}
                style={{
                  transform: `translateX(${(index - 3) * 120}px) scale(${
                    index === 3 ? 1.1 : 0.9
                  })`,
                }}
              >
                {/* Phone frame */}
                <div className="relative w-24 h-48 bg-gray-900 rounded-[12px] p-1 shadow-2xl">
                  {/* Screen */}
                  <div className="w-full h-full bg-black rounded-[8px] overflow-hidden relative">
                    {/* Notch */}
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-900 rounded-full z-10"></div>
                    
                    {/* Wallpaper */}
                    <div className={`w-full h-full ${gradient} relative`}>
                      {/* Pattern overlay */}
                      <div className="absolute inset-0 opacity-30">
                        <svg width="100%" height="100%" viewBox="0 0 100 100">
                          <defs>
                            <pattern id={`pattern-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                              <circle cx="10" cy="10" r="1" fill="white" opacity="0.3"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
                        </svg>
                      </div>
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}