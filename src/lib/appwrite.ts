import { Account, Avatars, Client, Databases, Query, Storage } from 'appwrite';

// Create a client instance with retry logic
const createClient = () => {
  const client = new Client();
  
  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
    
  return client;
};

const client = createClient();

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database constants with fallbacks to prevent undefined errors
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID || "67c1554d00000d1e7cb7";
export const WALLPAPERS_COLLECTION_ID = process.env.NEXT_PUBLIC_WALLPAPERS_COLLECTION_ID || "67c1589e0023462338f0";
export const CATEGORIES_COLLECTION_ID = process.env.NEXT_PUBLIC_CATEGORIES_COLLECTION_ID || "";

// Helper function to handle fetch retries
const fetchWithRetry = async (fn: () => Promise<any>, maxRetries = 3) => {
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (error: any) {
      attempt++;
      console.log(`Fetch attempt ${attempt}/${maxRetries} failed:`, error?.message);
      
      // If this was the last attempt, throw the error
      if (attempt >= maxRetries) {
        throw error;
      }
      
      // If it's an authentication error, try to refresh the session
      if (error?.code === 401) {
        try {
          console.log("Attempting to refresh authentication...");
          // Try to get the current session, which will help refresh tokens
          await account.get();
        } catch (authError) {
          console.error("Auth refresh failed:", authError);
        }
      }
      
      // Wait before retrying with exponential backoff
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  
  throw new Error("Max retries exceeded");
};

// Services
export const wallpaperService = {
  // Clear method using pure offset-based pagination - most reliable with Appwrite
  getWallpapers: async (pageSize = 20, pageOffset = 0, categoryId: string | null = null,
  searchQuery: string | null = null) => {
    return fetchWithRetry(async () => {
      try {
        console.log('Fetching wallpapers - page offset:', pageOffset, 'page size:', pageSize);
        
        const offset = typeof pageOffset === 'string' ? parseInt(pageOffset) : pageOffset;
        
        let queries = [
          Query.orderDesc('$createdAt'),
          Query.limit(pageSize)
        ];

        // Add offset for pagination if needed
        if (offset > 0) {
          queries.push(Query.offset(offset));
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
        
        console.log(`Fetched ${response.documents.length} wallpapers`);
        
        return {
          documents: response.documents,
          total: response.total,
          nextOffset: response.documents.length === pageSize ? offset + pageSize : null
        };
      } catch (error) {
        console.error('Error fetching wallpapers:', error);
        throw error;
      }
    });
  },
  
  getWallpaperById: async (id) => {
    return fetchWithRetry(async () => {
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
    });
  }
};

export const categoryService = {
  getCategories: async () => {
    return fetchWithRetry(async () => {
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
    });
  }
};