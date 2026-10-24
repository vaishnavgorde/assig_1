import type { BasketItem, Bill, ProductId } from '../../types';
import { productById } from '../products/products';

/**
 * Pricing rules:
 * - Cheese: buy one, get one free (one free item per pair).
 * - Soup: each soup discounts one purchased bread by 50%.
 * - Butter: one-third off each unit; rounded to the nearest penny per unit.
 * Prices are stored as integer pence to avoid floating-point currency errors.
 */
export function calculateBill(items: BasketItem[]): Bill {
  const quantities: Partial<Record<ProductId, number>> = {};
  for (const item of items) {
    if (item.quantity > 0) quantities[item.productId] = item.quantity;
  }

  const breadQty = quantities.bread ?? 0;
  const soupQty = quantities.soup ?? 0;
  const butterQty = quantities.butter ?? 0;
  const breadDiscountUnits = Math.min(breadQty, soupQty);

  const lines = items
    .filter((item) => item.quantity > 0)
    .map((item) => {
      const product = productById[item.productId];
      const subtotalPence = product.pricePence * item.quantity;
      let discountPence = 0;
      let discountLabel: string | undefined;

      if (item.productId === 'cheese') {
        discountPence = Math.floor(item.quantity / 2) * product.pricePence;
        if (discountPence > 0) discountLabel = 'Buy one, get one free';
      } else if (item.productId === 'bread') {
        discountPence = breadDiscountUnits * Math.round(product.pricePence / 2);
        if (discountPence > 0) discountLabel = 'Half-price bread with soup';
      } else if (item.productId === 'butter') {
        // One-third off: £1.20 -> £0.80. Round the discount per unit to a penny.
        discountPence = butterQty * Math.round(product.pricePence / 3);
        if (discountPence > 0) discountLabel = 'One-third off butter';
      }

      return {
        ...item,
        product,
        unitPricePence: product.pricePence,
        subtotalPence,
        discountPence,
        totalPence: subtotalPence - discountPence,
        discountLabel,
      };
    });

  const subtotalPence = lines.reduce((sum, line) => sum + line.subtotalPence, 0);
  const savingsPence = lines.reduce((sum, line) => sum + line.discountPence, 0);

  return {
    lines,
    subtotalPence,
    savingsPence,
    totalPence: subtotalPence - savingsPence,
  };
}
