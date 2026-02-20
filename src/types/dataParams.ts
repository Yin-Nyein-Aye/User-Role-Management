export interface GetDataParams {
  endpoint: string;
  page?: number;
  limit?: number;
  filters?: Record<string, any>; // filter key-values
  sortBy?: string | null;
  order?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  total: number;      // total items in backend
  skip: number;       // how many items skipped
  limit: number;      // items per page
  posts?: T[];        // array of items (Post, Product, etc.)
}

export interface Post {
  id: number;
  title: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}
