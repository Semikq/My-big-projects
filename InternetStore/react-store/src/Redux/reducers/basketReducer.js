import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    actionCartAdd: (state, action) => {
      const { good, count, goodInfo } = action.payload;

      console.log(action.payload)
      const existingItemKey = Object.keys(state).find(
        (key) => state[key].good._id === good._id
      );
      if (existingItemKey) {
        state[existingItemKey].count += count;
      } else {
        const nextKey = Object.keys(state).length + 1;
        state[nextKey] = { good, count, goodInfo }
      }
    },
    actionCartDel: (state, action) => {
      const id = action.payload.id._id

      Object.keys(state).forEach((key) => {
        if (state[key].good._id === id) {
          delete state[key];
        }
      });
    },
    actionCartSet: (state, action) => {
      const { good, count } = action.payload;
      const productId = good._id;
    
      if (state[productId]) {
        if (count > 0) {
          state[productId].count = count;
        } else {
          delete state[productId];
        }
      }
    },
    actionCartClear: (state) => {
      return {};
    },
  },
});

export const { actionCartAdd, actionCartDel, actionCartSet, actionCartClear } = basketSlice.actions;
export default basketSlice.reducer;