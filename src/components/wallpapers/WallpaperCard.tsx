'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

type WallpaperCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  className?: string;
};

export function WallpaperCard({
  id,
  title,
  imageUrl,
  isFavorite = false,
  onFavoriteToggle,
  className,
}: WallpaperCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className={cn(
      'group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800',
      className
    )}>
      <Link href={`/wallpaper/${id}`} className="block aspect-[9/16] w-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-500" />
          </div>
        )}
        <Image
          src={imageUrl}
          alt={title || 'Wallpaper'}
          fill
          className={cn(
            'object-cover transition-all duration-300 group-hover:scale-105',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={() => setIsLoading(false)}
        />
      </Link>
      
      {onFavoriteToggle && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onFavoriteToggle();
          }}
          className="absolute top-2 right-2 rounded-full bg-black/50 p-2 text-white transition-transform hover:scale-110"
        >
          <Heart size={20} fill={isFavorite ? '#ff4757' : 'none'} />
        </button>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <h3 className="text-sm font-medium text-white line-clamp-1">{title || 'Untitled Wallpaper'}</h3>
      </div>
    </div>
  );
}