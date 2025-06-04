"use client";

import Link from "next/link";
import Image from "next/image";

type Category = {
  $id: string;
  name: string;
  imageUrl: string;
  description?: string;
};

type CategoryGridProps = {
  categories: Category[];
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-gray-500">No categories found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.$id}
          href={`/categories/${category.$id}?name=${encodeURIComponent(
            category.name
          )}`}
          className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg dark:bg-gray-800"
        >
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {category.name}
            </h3>
            {category.description && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {category.description}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
