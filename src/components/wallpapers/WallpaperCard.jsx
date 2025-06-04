"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";

interface WallpaperCardProps {
  id: string;
  title: string;
  imageUrl: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export function WallpaperCard({
  id,
  title,
  imageUrl,
  isFavorite,
  onFavoriteToggle,
}: WallpaperCardProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  const protectionStyles = {
    WebkitUserSelect: "none" as const,
    WebkitTouchCallout: "none" as const,
    WebkitTapHighlightColor: "transparent",
    userSelect: "none" as const,
    MozUserSelect: "none" as const,
    msUserSelect: "none" as const,
  };

  return (
    <div className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
      <Link href={`/wallpaper/${id}`}>
        <div
          className="aspect-[9/16] relative"
          style={protectionStyles}
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 select-none pointer-events-none"
            draggable={false}
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
            style={protectionStyles}
          />

          {/* Protection overlay */}
          <div
            className="absolute inset-0 z-10 bg-transparent"
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
            style={protectionStyles}
          />
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onFavoriteToggle();
        }}
        className={`absolute top-2 right-2 z-20 rounded-full p-2 transition-colors ${
          isFavorite
            ? "bg-red-500 text-white"
            : "bg-white/80 text-gray-700 hover:bg-white"
        }`}
      >
        <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
      </button>

      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      </div>
    </div>
  );
}
