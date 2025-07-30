import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderCountState {
  undeliverdCount: number;
}

const initialState: OrderCountState = {
  undeliverdCount: 0,
};

const orderCountSlice = createSlice({
  name: "orderCount",
  initialState,
  reducers: {
    setUndeliverdCount: (state, action: PayloadAction<number>) => {
      state.undeliverdCount = action.payload;
    },
  },
});

export const { setUndeliverdCount } = orderCountSlice.actions;
export default orderCountSlice.reducer;
