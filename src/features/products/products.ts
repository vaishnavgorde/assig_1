import type { Product, ProductId } from '../../types';

export const products: Product[] = [
  { id: 'bread', name: 'Bread', pricePence: 110, description: 'Freshly baked loaf', emoji: '🍞' },
  { id: 'milk', name: 'Milk', pricePence: 50, description: 'Everyday dairy essential', emoji: '🥛' },
  { id: 'cheese', name: 'Cheese', pricePence: 90, description: 'Creamy cheddar', emoji: '🧀' },
  { id: 'soup', name: 'Soup', pricePence: 60, description: 'Warm and comforting', emoji: '🥣' },
  { id: 'butter', name: 'Butter', pricePence: 120, description: 'Rich and creamy', emoji: '🧈' },
];

export const productById: Record<ProductId, Product> = Object.fromEntries(
  products.map((product) => [product.id, product]),
) as Record<ProductId, Product>;
