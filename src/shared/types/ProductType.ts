import type { CategoryType } from './CategoryType';

export interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  category?: CategoryType;
}
