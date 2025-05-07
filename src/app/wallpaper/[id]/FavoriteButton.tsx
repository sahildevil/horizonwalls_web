"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FavoriteButton({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        setIsFavorite(parsedFavorites.some((f: any) => f.id === id));
      } catch (err) {
        console.error("Error parsing favorites:", err);
      }
    }
  }, [id]);

  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem("favorites");
    let favorites = [];

    if (savedFavorites) {
      try {
        favorites = JSON.parse(savedFavorites);
      } catch (err) {
        console.error("Error parsing favorites:", err);
      }
    }

    if (isFavorite) {
      favorites = favorites.filter((f: any) => f.id !== id);
    } else {
      favorites.push({
        id,
        title: data.title,
        imageUrl: data.imageUrl,
      });
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Button
      variant="outline"
      onClick={toggleFavorite}
      className="flex items-center gap-2"
    >
      <Heart size={18} fill={isFavorite ? "#ff4757" : "none"} />
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  );
}
