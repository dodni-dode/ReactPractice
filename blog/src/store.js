import { configureStore, createSlice } from "@reduxjs/toolkit";
import userCartInfo from "./store/userCartInfo";
import userInfo from "./store/userInfo";

export const { plusCount, minusCount, addItem, removeItem } = userCartInfo.actions;
export const { changeName, changeAge } = userInfo.actions;

let userWatched = createSlice({
  name: "userWatched",
  initialState: [],
  reducers: {
    addWatched(state, action) {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
    removeWatched(state, action) {
      return state.filter(item => item !== action.payload);
    }
  }
});

export const { addWatched, removeWatched } = userWatched.actions;

export default configureStore({
  reducer: {
    userCartInfo: userCartInfo.reducer,
    userInfo: userInfo.reducer,
    userWatched: userWatched.reducer
  }
});