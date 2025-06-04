import { Header } from "@/components/layout/Header";
import { FavoritesGrid } from "@/components/favorites/FavoritesGrid";

export default function FavoritesPage() {
  return (
    <>
      <Header />
      <main className="container px-4 py-8 md:px-6">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">
          Favorite Wallpapers
        </h1>
        <FavoritesGrid />
      </main>
    </>
  );
}
