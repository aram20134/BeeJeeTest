export type PageInfo = {
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export type User = {
  id: number
  name: string
  isAdmin: boolean
}