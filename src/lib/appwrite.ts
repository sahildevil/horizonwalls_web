import { Account, Avatars, Client, Databases, Query, Storage } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database constants
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
export const WALLPAPERS_COLLECTION_ID = process.env.NEXT_PUBLIC_WALLPAPERS_COLLECTION_ID!;
export const CATEGORIES_COLLECTION_ID = process.env.NEXT_PUBLIC_CATEGORIES_COLLECTION_ID!;

// Services
export const wallpaperService = {
  getWallpapers: async (limit = 20, cursor = null, categoryId = null, searchQuery = null) => {
    try {
      let queries = [
        Query.orderDesc('$createdAt'),
        Query.limit(limit)
      ];

      if (cursor) {
        queries.push(Query.cursorAfter(cursor));
      }

      if (categoryId) {
        queries.push(Query.equal('categoryId', categoryId));
      }

      if (searchQuery) {
        queries.push(Query.search('title', searchQuery));
      }

      const response = await databases.listDocuments(
        DATABASE_ID,
        WALLPAPERS_COLLECTION_ID,
        queries
      );

      return response;
    } catch (error) {
      console.error('Error fetching wallpapers:', error);
      throw error;
    }
  },
  
  getWallpaperById: async (id) => {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        WALLPAPERS_COLLECTION_ID,
        id
      );
      return response;
    } catch (error) {
      console.error(`Error fetching wallpaper ${id}:`, error);
      throw error;
    }
  },
};

export const categoryService = {
  getCategories: async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        CATEGORIES_COLLECTION_ID,
        [Query.limit(100)]
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
};