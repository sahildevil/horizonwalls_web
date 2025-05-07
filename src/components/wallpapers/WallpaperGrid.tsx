"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { WallpaperCard } from "./WallpaperCard";
import { wallpaperService } from "@/lib/appwrite";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

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
  const [offset, setOffset] = useState<number>(0); // Start from offset 0
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [fetchAttempt, setFetchAttempt] = useState(0);
  
  // Use ref to track seen IDs
  const existingIdsRef = useRef(new Set<string>());

  // Track if component has mounted
  const mounted = useRef(false);
  
  // Initialize existing IDs from initial wallpapers
  useEffect(() => {
    if (initialWallpapers.length > 0) {
      const ids = new Set(initialWallpapers.map(w => w.$id));
      existingIdsRef.current = ids;
      setOffset(initialWallpapers.length); // Start offset after initial wallpapers
    }
    mounted.current = true;
  }, [initialWallpapers]);

  // InView hook for infinite scroll detection
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '300px 0px', // Load sooner before user reaches the bottom
  });

  // Load favorites from localStorage
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
          const parsedFavorites = JSON.parse(savedFavorites);
          setFavorites(new Set(parsedFavorites.map((f: any) => f.id)));
        }
      } catch (err) {
        console.error("Error parsing favorites:", err);
      }
    };

    loadFavorites();
  }, []);

  // Fetch wallpapers with robust error handling
  const fetchWallpapers = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      console.log(`Fetching wallpapers with offset: ${offset}`);

      const response = await wallpaperService.getWallpapers(
        20,         // page size
        offset,     // offset
        categoryId, // category filter
        searchQuery // search query
      );
      
      const newWallpapers = response.documents;
      console.log(`Received ${newWallpapers.length} wallpapers from server`);

      // Check if we have any wallpapers to display
      if (newWallpapers.length === 0) {
        console.log("No more wallpapers to load");
        setHasMore(false);
      } else {
        // Filter out any duplicates using our tracking Set
        const currentIds = existingIdsRef.current;
        const uniqueWallpapers = newWallpapers.filter(w => !currentIds.has(w.$id));
        
        console.log(`After filtering, found ${uniqueWallpapers.length} unique wallpapers`);

        // If after filtering we have no new wallpapers, we're done
        if (uniqueWallpapers.length === 0) {
          console.log("All wallpapers already loaded (duplicates filtered)");
          setHasMore(false);
        } else {
          // Add new wallpapers to our display list
          setWallpapers(prev => [...prev, ...uniqueWallpapers]);
          
          // Update our nextOffset for future pagination
          if (response.nextOffset !== null) {
            setOffset(response.nextOffset);
          } else {
            setHasMore(false);
          }
          
          // Track the IDs we've seen
          uniqueWallpapers.forEach(w => {
            existingIdsRef.current.add(w.$id);
          });
        }
      }
    } catch (err: any) {
      console.error("Failed to fetch wallpapers:", err);
      setError(err?.message || "Failed to load wallpapers");
    } finally {
      setLoading(false);
    }
  }, [offset, categoryId, searchQuery, loading, hasMore]);

  // Watch for scroll events and fetch more
  useEffect(() => {
    if (inView && hasMore && !loading && mounted.current) {
      console.log("In view, fetching more wallpapers");
      fetchWallpapers();
    }
  }, [inView, fetchWallpapers, hasMore, loading]);

  // Add a dependency on fetchAttempt to refetch when retry is clicked
  useEffect(() => {
    if (fetchAttempt > 0) {
      fetchWallpapers();
    }
  }, [fetchAttempt, fetchWallpapers]);

  const handleFavoriteToggle = (wallpaperId: string, wallpaperData: any) => {
    const newFavorites = new Set(favorites);

    if (newFavorites.has(wallpaperId)) {
      newFavorites.delete(wallpaperId);
    } else {
      newFavorites.add(wallpaperId);
    }

    setFavorites(newFavorites);

    // Save to localStorage
    try {
      const favoritesToSave = wallpapers
        .filter((w) => newFavorites.has(w.$id))
        .map((w) => ({
          id: w.$id,
          title: w.title,
          imageUrl: w.imageUrl,
        }));

      localStorage.setItem("favorites", JSON.stringify(favoritesToSave));
    } catch (err) {
      console.error("Error saving favorites:", err);
    }
  };

  // Handle manual retry
  const handleRetry = () => {
    setError(null);
    setFetchAttempt((prev) => prev + 1);
  };
  
  // Handle manual "load more" button click
  const handleLoadMore = () => {
    fetchWallpapers();
  };

  if (wallpapers.length === 0 && error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="mb-4 text-lg text-red-500">{error}</p>
        <Button onClick={handleRetry} className="flex items-center gap-2">
          <RefreshCw size={16} />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {wallpapers.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {wallpapers.map((wallpaper, index) => (
            <WallpaperCard
              key={`${wallpaper.$id || "wallpaper"}-${index}`}
              id={wallpaper.$id}
              title={wallpaper.title}
              imageUrl={wallpaper.imageUrl}
              isFavorite={favorites.has(wallpaper.$id)}
              onFavoriteToggle={() =>
                handleFavoriteToggle(wallpaper.$id, wallpaper)
              }
            />
          ))}
        </div>
      )}

      {/* Error message for failed fetches during scroll */}
      {error && wallpapers.length > 0 && (
        <div className="flex flex-col items-center justify-center py-4">
          <p className="mb-2 text-red-500">{error}</p>
          <Button variant="outline" size="sm" onClick={handleRetry}>
            Try loading more
          </Button>
        </div>
      )}

      {/* Loading indicator and Load More button */}
      {(hasMore || loading) && (
        <div 
          ref={ref} 
          className="flex flex-col items-center justify-center py-8 gap-4"
        >
          {loading && (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-500" />
          )}
          
          {hasMore && !loading && (
            <Button variant="outline" onClick={handleLoadMore}>
              Load More
            </Button>
          )}
        </div>
      )}

      {/* End of list indicator */}
      {!hasMore && wallpapers.length > 0 && (
        <p className="py-8 text-center text-gray-500">
          No more wallpapers to load
        </p>
      )}

      {/* Empty state */}
      {wallpapers.length === 0 && !loading && !error && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-gray-500">No wallpapers found</p>
        </div>
      )}
    </div>
  );
}