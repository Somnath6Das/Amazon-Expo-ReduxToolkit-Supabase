import { Product } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  product: Product;
  quantity: number;
}
interface CartState {
  items: CartItem[];
}
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (!existingItem) return;

      if (existingItem.quantity > quantity) {
        existingItem.quantity -= quantity;
      } else {
        state.items = state.items.filter(
          (item) => item.product.id !== product.id
        );
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
