export interface PaginatedResponse<T> {
  total: number;      // total items in backend
  skip: number;       // how many items skipped
  limit: number;      // items per page
  posts?: T[];        // array of items (Post, Product, etc.)
}