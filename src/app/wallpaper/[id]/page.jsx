"use client";

import { useState, useEffect } from "react";
import { wallpaperService } from "@/lib/appwrite";
import { Header } from "@/components/layout/Header";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import { DownloadButton } from "./DownloadButton";

export default function WallpaperPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [wallpaper, setWallpaper] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wallpaperId, setWallpaperId] = useState<string>("");

  useEffect(() => {
    const loadWallpaper = async () => {
      try {
        // Await params before using its properties
        const resolvedParams = await params;
        setWallpaperId(resolvedParams.id);

        const wallpaperData = await wallpaperService.getWallpaperById(
          resolvedParams.id
        );
        setWallpaper(wallpaperData);
      } catch (error) {
        console.error("Error loading wallpaper:", error);
        setError("Failed to load wallpaper");
      } finally {
        setLoading(false);
      }
    };

    loadWallpaper();
  }, [params]);

  // Handle image protection events
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

  if (loading) {
    return (
      <>
        <Header />
        <main className="container px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-500 mb-4" />
            <p className="text-gray-500">Loading wallpaper...</p>
          </div>
        </main>
      </>
    );
  }

  if (error || !wallpaper) {
    return (
      <>
        <Header />
        <main className="container px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-center py-12">
            <h1 className="mb-4 text-2xl font-bold">
              {error || "Wallpaper not found"}
            </h1>
            <Link href="/">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Back to home
              </button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg">
            <div
              className="relative w-full h-full select-none"
              style={protectionStyles}
              onContextMenu={handleContextMenu}
              onDragStart={handleDragStart}
            >
              <Image
                src={wallpaper.imageUrl}
                alt={wallpaper.title || "Wallpaper"}
                fill
                className="object-cover pointer-events-none select-none"
                priority
                draggable={false}
                onDragStart={handleDragStart}
                onContextMenu={handleContextMenu}
                style={protectionStyles}
              />
              {/* Invisible overlay to prevent interactions */}
              <div
                className="absolute inset-0 z-10 bg-transparent"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                style={protectionStyles}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{wallpaper.title}</h1>
              {wallpaper.categoryId && (
                <Link
                  href={`/categories/${wallpaper.categoryId}`}
                  className="mt-2 inline-block text-sm text-blue-600 hover:underline"
                >
                  View Category
                </Link>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <DownloadButton
                imageUrl={wallpaper.imageUrl}
                fileName={`${wallpaper.title}.jpg`}
              />
              <FavoriteButton id={wallpaper.$id} data={wallpaper} />
            </div>

            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                🛡️ This image is protected. Use the download button above to
                save this wallpaper.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">More Wallpapers</h2>
          {/* We'll implement related wallpapers in a future step */}
        </div>
      </main>
    </>
  );
}
