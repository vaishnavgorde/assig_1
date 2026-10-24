import { describe, expect, it } from 'vitest';
import reducer, { addToBasket, clearBasket, decreaseQuantity, increaseQuantity, removeFromBasket } from '../features/basket/basketSlice';

describe('basket reducer', () => {
  it('adds an item and increments an existing item', () => {
    let state = reducer(undefined, addToBasket('bread'));
    state = reducer(state, addToBasket('bread'));
    expect(state.items).toEqual([{ productId: 'bread', quantity: 2 }]);
  });

  it('removes an item when quantity is decreased to zero', () => {
    let state = reducer(undefined, addToBasket('milk'));
    state = reducer(state, decreaseQuantity('milk'));
    expect(state.items).toEqual([]);
  });

  it('increases quantity and removes selected item', () => {
    let state = reducer(undefined, addToBasket('soup'));
    state = reducer(state, increaseQuantity('soup'));
    expect(state.items[0].quantity).toBe(2);
    state = reducer(state, removeFromBasket('soup'));
    expect(state.items).toEqual([]);
  });

  it('clears all items', () => {
    let state = reducer(undefined, addToBasket('bread'));
    state = reducer(state, addToBasket('milk'));
    state = reducer(state, clearBasket());
    expect(state.items).toEqual([]);
  });
});
