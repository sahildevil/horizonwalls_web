"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

const wallpaperImages = [
  {
    id: 1,
    src: '../../assets/wallpapers/wallpaper1.png', // Replace with your actual wallpaper images
    alt: 'Nature Wallpaper'
  },
  {
    id: 2,
    src: '../../assets/wallpapers/abstract-1.jpg',
    alt: 'Abstract Wallpaper'
  },
  {
    id: 3,
    src: '../../assets/wallpapers/wallpaper1.png',
    alt: 'Space Wallpaper'
  },
  {
    id: 4,
    src: '../../assets/wallpapers/wallpaper1.png',
    alt: 'Cars Wallpaper'
  },
  {
    id: 5,
    src: '/wallpapers/anime-1.jpg',
    alt: 'Anime Wallpaper'
  },
  {
    id: 6,
    src: '/wallpapers/landscape-1.jpg',
    alt: 'Landscape Wallpaper'
  },
  {
    id: 7,
    src: '/wallpapers/tech-1.jpg',
    alt: 'Tech Wallpaper'
  }
];

export function PhoneCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wallpaperImages.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-80 overflow-hidden">
      <div className="flex items-center justify-center h-full">
        {/* Phone frames with wallpapers */}
        <div className="flex space-x-4 animate-phone-carousel">
          {[...Array(7)].map((_, index) => {
            const imageIndex = (currentIndex + index) % wallpaperImages.length;
            const wallpaper = wallpaperImages[imageIndex];
            
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
                    <div className="w-full h-full relative">
                      <Image
                        src={wallpaper.src}
                        alt={wallpaper.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 96px) 100vw, 96px"
                      />
                      {/* Gradient overlay for better visibility */}
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