import { describe, expect, it } from 'vitest';
import { calculateBill } from '../features/basket/bill';

describe('calculateBill', () => {
  it('returns zero totals for an empty basket', () => {
    expect(calculateBill([])).toMatchObject({ subtotalPence: 0, savingsPence: 0, totalPence: 0, lines: [] });
  });

  it('applies buy-one-get-one-free to cheese pairs', () => {
    const bill = calculateBill([{ productId: 'cheese', quantity: 3 }]);
    expect(bill.subtotalPence).toBe(270);
    expect(bill.savingsPence).toBe(90);
    expect(bill.totalPence).toBe(180);
  });

  it('discounts one bread by half for each soup, up to bread quantity', () => {
    const bill = calculateBill([{ productId: 'soup', quantity: 1 }, { productId: 'bread', quantity: 3 }]);
    expect(bill.subtotalPence).toBe(390);
    expect(bill.savingsPence).toBe(55);
    expect(bill.totalPence).toBe(335);
  });

  it('applies one-third off butter per unit', () => {
    const bill = calculateBill([{ productId: 'butter', quantity: 2 }]);
    expect(bill.subtotalPence).toBe(240);
    expect(bill.savingsPence).toBe(80);
    expect(bill.totalPence).toBe(160);
  });

  it('matches the sample basket totals', () => {
    const bill = calculateBill([
      { productId: 'soup', quantity: 1 },
      { productId: 'bread', quantity: 3 },
      { productId: 'butter', quantity: 1 },
    ]);
    expect(bill.subtotalPence).toBe(510);
    expect(bill.savingsPence).toBe(95);
    expect(bill.totalPence).toBe(415);
  });

  it('does not discount bread if there is no soup', () => {
    const bill = calculateBill([{ productId: 'bread', quantity: 2 }]);
    expect(bill.savingsPence).toBe(0);
    expect(bill.totalPence).toBe(220);
  });
});
