export type PaginatedResource<T> = {
  items: T[]
  page: number
  size: number
  total: number
}
