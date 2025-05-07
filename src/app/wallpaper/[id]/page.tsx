import { wallpaperService } from '@/lib/appwrite';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Download, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function WallpaperPage({ params }: { params: { id: string } }) {
  let wallpaper;
  
  try {
    wallpaper = await wallpaperService.getWallpaperById(params.id);
  } catch (error) {
    console.error('Error loading wallpaper:', error);
  }
  
  if (!wallpaper) {
    return (
      <>
        <Header />
        <main className="container px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-center py-12">
            <h1 className="mb-4 text-2xl font-bold">Wallpaper not found</h1>
            <Link href="/">
              <Button>Back to home</Button>
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
            <Image
              src={wallpaper.imageUrl}
              alt={wallpaper.title || 'Wallpaper'}
              fill
              className="object-cover"
              priority
            />
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
              <a href={wallpaper.imageUrl} download target="_blank" rel="noopener noreferrer">
                <Button className="flex items-center gap-2">
                  <Download size={18} />
                  Download
                </Button>
              </a>
              
              <FavoriteButton id={wallpaper.$id} data={wallpaper} />
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

'use client';

function FavoriteButton({ id, data }: { id: string; data: any }) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        setIsFavorite(parsedFavorites.some((f: any) => f.id === id));
      } catch (err) {
        console.error('Error parsing favorites:', err);
      }
    }
  }, [id]);
  
  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem('favorites');
    let favorites = [];
    
    if (savedFavorites) {
      try {
        favorites = JSON.parse(savedFavorites);
      } catch (err) {
        console.error('Error parsing favorites:', err);
      }
    }
    
    if (isFavorite) {
      favorites = favorites.filter((f: any) => f.id !== id);
    } else {
      favorites.push({
        id,
        title: data.title,
        imageUrl: data.imageUrl
      });
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };
  
  return (
    <Button variant="outline" onClick={toggleFavorite} className="flex items-center gap-2">
      <Heart size={18} fill={isFavorite ? '#ff4757' : 'none'} />
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </Button>
  );
}