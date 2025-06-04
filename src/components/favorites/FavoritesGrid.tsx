"use client";

import { useEffect, useState } from "react";
import { WallpaperCard } from "@/components/wallpapers/WallpaperCard";

type Favorite = {
  id: string;
  title: string;
  imageUrl: string;
  addedAt?: string;
};

export function FavoritesGrid() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(parsedFavorites);
        setFavoriteIds(new Set(parsedFavorites.map((f: Favorite) => f.id)));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const handleFavoriteToggle = (wallpaperId: string) => {
    const newFavorites = favorites.filter((f) => f.id !== wallpaperId);
    setFavorites(newFavorites);
    setFavoriteIds(new Set(newFavorites.map((f) => f.id)));

    try {
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-gray-500">No favorite wallpapers yet</p>
        <p className="text-sm text-gray-400 mt-2">
          Start adding wallpapers to your favorites to see them here!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {favorites.map((favorite) => (
        <WallpaperCard
          key={favorite.id}
          id={favorite.id}
          title={favorite.title}
          imageUrl={favorite.imageUrl}
          isFavorite={favoriteIds.has(favorite.id)}
          onFavoriteToggle={() => handleFavoriteToggle(favorite.id)}
        />
      ))}
    </div>
  );
}
