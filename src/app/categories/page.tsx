import { Header } from "@/components/layout/Header";
import { CategoryGrid } from "@/components/categories/CategoryGrid";
import { categoryService } from "@/lib/appwrite";

export default async function CategoriesPage() {
  let categories = [];

  try {
    categories = await categoryService.getCategories();
  } catch (error) {
    console.error("Error loading categories:", error);
  }

  return (
    <>
      <Header />
      <main className="container px-4 py-8 md:px-6">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Categories</h1>
        <CategoryGrid categories={categories} />
      </main>
    </>
  );
}
