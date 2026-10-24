export type ProductId = 'bread' | 'milk' | 'cheese' | 'soup' | 'butter';

export interface Product {
  id: ProductId;
  name: string;
  pricePence: number;
  description: string;
  emoji: string;
}

export interface BasketItem {
  productId: ProductId;
  quantity: number;
}

export interface BasketLine extends BasketItem {
  product: Product;
  unitPricePence: number;
  subtotalPence: number;
  discountPence: number;
  totalPence: number;
  discountLabel?: string;
}

export interface Bill {
  lines: BasketLine[];
  subtotalPence: number;
  savingsPence: number;
  totalPence: number;
}
