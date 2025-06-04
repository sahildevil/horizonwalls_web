"use client";

import { useState, useCallback, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { WallpaperGrid } from "@/components/wallpapers/WallpaperGrid";
import { wallpaperService } from "@/lib/appwrite";

export function SearchInterface() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await wallpaperService.getWallpapers(
          20,
          null,
          null,
          query
        );
        setSearchResults(response.documents);
      } catch (err: any) {
        setError(err.message || "Search failed");
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  return (
    <div className="space-y-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search wallpapers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-500" />
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">Error: {error}</p>
        </div>
      )}

      {searchQuery && !loading && searchResults.length === 0 && !error && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No wallpapers found for "{searchQuery}"
          </p>
        </div>
      )}

      {searchResults.length > 0 && (
        <WallpaperGrid
          initialWallpapers={searchResults}
          searchQuery={searchQuery}
        />
      )}

      {!searchQuery && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Enter a search term to find wallpapers
          </p>
        </div>
      )}
    </div>
  );
}

// Debounce utility function
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
