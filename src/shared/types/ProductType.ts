import type { CategoryType } from './CategoryType';

export interface ProductType {
  id: number
  name: string
  price: number
  image: string
  brand: string
  description: string
  storeId: number
  batch: string
  validity: string
  category?: CategoryType;
}
