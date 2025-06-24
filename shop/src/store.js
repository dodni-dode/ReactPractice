import { configureStore, createSlice } from "@reduxjs/toolkit";
import userCartInfo from "./store/userCartInfo";
import userInfo from "./store/userInfo";

export const { plusCount, minusCount, addItem, removeItem } = userCartInfo.actions;
export const { changeName, changeAge } = userInfo.actions;

const initialState = {
  userWatchedIds: []  // number[]만 저장
}

const watchedSlice = createSlice({
  name: 'watched',
  initialState,
  reducers: {
    addWatchedId(state, action) {
      const id = action.payload
      state.userWatchedIds = state.userWatchedIds.filter(i => i !== id).concat(id)
    },
    removeWatchedId(state, action) {
      state.userWatchedIds = state.userWatchedIds.filter(i => i !== action.payload)
    }
  }
})
export const { addWatchedId, removeWatchedId } = watchedSlice.actions

export default configureStore({
  reducer: {
    userCartInfo: userCartInfo.reducer,
    userInfo: userInfo.reducer,
    watchedSlice: watchedSlice.reducer
  }
});