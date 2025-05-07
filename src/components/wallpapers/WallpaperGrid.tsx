'use client';

import { useEffect, useState } from 'react';
import { WallpaperCard } from './WallpaperCard';
import { wallpaperService } from '@/lib/appwrite';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';

type WallpaperGridProps = {
  initialWallpapers?: any[];
  categoryId?: string | null;
  searchQuery?: string | null;
};

export function WallpaperGrid({
  initialWallpapers = [],
  categoryId = null,
  searchQuery = null,
}: WallpaperGridProps) {
  const [wallpapers, setWallpapers] = useState<any[]>(initialWallpapers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  const { ref, inView } = useInView();
  
  useEffect(() => {
    // Load saved favorites from localStorage
    const loadFavorites = () => {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        try {
          const parsedFavorites = JSON.parse(savedFavorites);
          setFavorites(new Set(parsedFavorites.map((f: any) => f.id)));
        } catch (err) {
          console.error('Error parsing favorites:', err);
        }
      }
    };
    
    loadFavorites();
  }, []);

  useEffect(() => {
    const fetchWallpapers = async () => {
      if (loading || !hasMore) return;
      
      setLoading(true);
      try {
        const response = await wallpaperService.getWallpapers(
          20,
          nextCursor,
          categoryId,
          searchQuery
        );
        
        const newWallpapers = response.documents;
        
        if (newWallpapers.length === 0) {
          setHasMore(false);
        } else {
          // Check for duplicates before adding
          const existingIds = new Set(wallpapers.map(w => w.$id));
          const uniqueWallpapers = newWallpapers.filter(w => !existingIds.has(w.$id));
          
          if (uniqueWallpapers.length === 0) {
            setHasMore(false);
          } else {
            setWallpapers(prev => [...prev, ...uniqueWallpapers]);
            setNextCursor(response.documents[response.documents.length - 1].$id);
          }
        }
      } catch (err) {
        setError('Failed to load wallpapers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (inView && hasMore) {
      fetchWallpapers();
    }
  }, [inView, loading, hasMore, nextCursor, categoryId, searchQuery, wallpapers]);
  
  const handleFavoriteToggle = (wallpaperId: string, wallpaperData: any) => {
    const newFavorites = new Set(favorites);
    
    if (newFavorites.has(wallpaperId)) {
      newFavorites.delete(wallpaperId);
    } else {
      newFavorites.add(wallpaperId);
    }
    
    setFavorites(newFavorites);
    
    // Save to localStorage
    const favoritesToSave = wallpapers
      .filter(w => newFavorites.has(w.$id))
      .map(w => ({
        id: w.$id,
        title: w.title,
        imageUrl: w.imageUrl
      }));
    
    localStorage.setItem('favorites', JSON.stringify(favoritesToSave));
  };
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="mb-4 text-lg text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {wallpapers.map((wallpaper, index) => (
          <WallpaperCard
            key={`${wallpaper.$id || 'wallpaper'}-${index}`}
            id={wallpaper.$id}
            title={wallpaper.title}
            imageUrl={wallpaper.imageUrl}
            isFavorite={favorites.has(wallpaper.$id)}
            onFavoriteToggle={() => handleFavoriteToggle(wallpaper.$id, wallpaper)}
          />
        ))}
      </div>
      
      {hasMore && (
        <div ref={ref} className="flex justify-center py-8">
          {loading && (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-500" />
          )}
        </div>
      )}
      
      {!hasMore && wallpapers.length > 0 && (
        <p className="py-8 text-center text-gray-500">No more wallpapers to load</p>
      )}
      
      {wallpapers.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-gray-500">No wallpapers found</p>
        </div>
      )}
    </div>
  );
}