import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BasketItem, ProductId } from '../../types';

interface BasketState {
  items: BasketItem[];
}

const initialState: BasketState = { items: [] };

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket(state, action: PayloadAction<ProductId>) {
      const existingItem = state.items.find((item) => item.productId === action.payload);
      if (existingItem) existingItem.quantity += 1;
      else state.items.push({ productId: action.payload, quantity: 1 });
    },
    increaseQuantity(state, action: PayloadAction<ProductId>) {
      const item = state.items.find((entry) => entry.productId === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, action: PayloadAction<ProductId>) {
      const item = state.items.find((entry) => entry.productId === action.payload);
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0) {
        state.items = state.items.filter((entry) => entry.productId !== action.payload);
      }
    },
    removeFromBasket(state, action: PayloadAction<ProductId>) {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
    clearBasket(state) {
      state.items = [];
    },
  },
});

export const { addToBasket, increaseQuantity, decreaseQuantity, removeFromBasket, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
