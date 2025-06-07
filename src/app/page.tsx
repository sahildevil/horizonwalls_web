import { WallpaperGrid } from "@/components/wallpapers/WallpaperGrid";
import { wallpaperService } from "@/lib/appwrite";
import { Header } from "@/components/layout/Header";

export default async function Home() {
  let initialWallpapers = [];

  try {
    const response = await wallpaperService.getWallpapers(20, 0);
    initialWallpapers = response.documents;
  } catch (error) {
    console.error("Error loading initial wallpapers:", error);
  }

  return (
    <>
      <Header />
      <main className="container px-4 py-8 md:px-6">
        <h1 className="mb-8 text-3xl font-bold tracking-tight font-tan-mon">
          Latest Wallpapers
        </h1>
        <WallpaperGrid initialWallpapers={initialWallpapers} />
      </main>
    </>
  );
}