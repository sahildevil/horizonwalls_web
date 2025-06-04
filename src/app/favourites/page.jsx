'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { WallpaperCard } from '@/components/wallpapers/WallpaperCard';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FavoritesPage() {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  
  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        try {
          const parsedFavorites = JSON.parse(savedFavorites);
          setFavorites(parsedFavorites);
        } catch (err) {
          console.error('Error parsing favorites:', err);
        }
      }
    };
    
    loadFavorites();
  }, []);
  
  const handleFavoriteToggle = (wallpaperId: string) => {
    const newFavorites = favorites.filter(f => f.id !== wallpaperId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };
  
  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="container px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-center py-12">
            <h1 className="mb-4 text-2xl font-bold">Login Required</h1>
            <p className="mb-4 text-center text-gray-600">
              Please login to view your favorites
            </p>
            <Link href="/login">
              <Button>Login</Button>
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
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Your Favorites</h1>
        
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="mb-4 text-center text-gray-600">
              You haven't added any wallpapers to your favorites yet
            </p>
            <Link href="/">
              <Button>Browse Wallpapers</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {favorites.map((favorite) => (
              <WallpaperCard
                key={favorite.id}
                id={favorite.id}
                title={favorite.title}
                imageUrl={favorite.imageUrl}
                isFavorite={true}
                onFavoriteToggle={() => handleFavoriteToggle(favorite.id)}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}