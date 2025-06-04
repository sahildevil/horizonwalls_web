import { Header } from "@/components/layout/Header";
import { WallpaperGrid } from "@/components/wallpapers/WallpaperGrid";
import { wallpaperService } from "@/lib/appwrite";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ name?: string }>;
}) {
  // Await params and searchParams
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const categoryId = resolvedParams.id;
  const categoryName = resolvedSearchParams.name
    ? decodeURIComponent(resolvedSearchParams.name)
    : "Category";

  let initialWallpapers = [];

  try {
    const response = await wallpaperService.getWallpapers(20, 0, categoryId);
    initialWallpapers = response.documents;
  } catch (error) {
    console.error("Error loading category wallpapers:", error);
  }

  return (
    <>
      <Header />
      <main className="container px-4 py-8 md:px-6">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/categories"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft size={20} />
            Back to Categories
          </Link>
        </div>
        <h1 className="mb-8 text-3xl font-bold tracking-tight">
          {categoryName}
        </h1>
        <WallpaperGrid
          initialWallpapers={initialWallpapers}
          categoryId={categoryId}
        />
      </main>
    </>
  );
}
