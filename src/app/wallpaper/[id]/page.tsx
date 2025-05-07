import { wallpaperService } from "@/lib/appwrite";
import { Header } from "@/components/layout/Header";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import { DownloadButton } from "./DownloadButton";

export default async function WallpaperPage({
  params,
}: {
  params: { id: string };
}) {
  let wallpaper;

  try {
    wallpaper = await wallpaperService.getWallpaperById(params.id);
  } catch (error) {
    console.error("Error loading wallpaper:", error);
  }

  if (!wallpaper) {
    return (
      <>
        <Header />
        <main className="container px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-center py-12">
            <h1 className="mb-4 text-2xl font-bold">Wallpaper not found</h1>
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
            <Image
              src={wallpaper.imageUrl}
              alt={wallpaper.title || "Wallpaper"}
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
              <DownloadButton
                imageUrl={wallpaper.imageUrl}
                fileName={`${wallpaper.title}.jpg`}
              />
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
