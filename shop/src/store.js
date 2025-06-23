import { configureStore, createSlice } from "@reduxjs/toolkit";

let userCartInfo = createSlice({
  name: 'userCartInfo',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 }
  ],
  reducers: {
    plusCount(state, action) {
      let index = state.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state[index].count++;
      }
    },
    minusCount(state, action) {
      let index = state.findIndex(item => item.id === action.payload);
      if (index !== -1 && state[index].count > 0) {
        state[index].count--;
      }
    },
  }
});

export const { plusCount, minusCount } = userCartInfo.actions;

export default configureStore({
  reducer: {
    userCartInfo: userCartInfo.reducer
  }
});