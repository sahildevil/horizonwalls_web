import { Header } from "@/components/layout/Header";
import { SearchInterface } from "@/components/search/SearchInterface";

export default function SearchPage() {
  return (
    <>
      <Header />
      <main className="container px-4 py-8 md:px-6">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">
          Search Wallpapers
        </h1>
        <SearchInterface />
      </main>
    </>
  );
}
