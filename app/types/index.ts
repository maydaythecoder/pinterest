/**
 * Pinterest Clone - Data Types
 * 
 * TypeScript interfaces for Firebase data structures
 * SECURITY: Ensures type safety for all data operations
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  followers: number;
  following: number;
  pins: number;
  boards: number;
  createdAt: Date;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  authorId: string;
  pins: string[];
  followers: number;
  isPrivate: boolean;
  createdAt: Date;
}

export interface Pin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  tags: string[];
  likes: number;
  saves: number;
  createdAt: Date;
  boardId: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  lastDoc: any;
  loadMore: () => void;
}

// Query options for filtering and pagination
export interface QueryOptions {
  limit?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  startAfter?: any;
  where?: {
    field: string;
    operator: '==' | '!=' | '<' | '<=' | '>' | '>=' | 'array-contains' | 'in' | 'not-in' | 'array-contains-any';
    value: any;
  }[];
}
