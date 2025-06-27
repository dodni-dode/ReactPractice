import { configureStore, createSlice } from "@reduxjs/toolkit"
import userCartInfo from "./store/userCartInfo"
import userInfo from "./store/userInfo"
import shoesSlice from "./store/shoesSlice"
import userWatched from "./store/userWatched"

// 각 슬라이스에서 액션 생성자 추출
export const { plusCount, minusCount, addItem, removeItem } = userCartInfo.actions
export const { changeName, changeAge } = userInfo.actions
export const { reduxSetShoes, resetShoes } = shoesSlice.actions
export const { addWatchedId } = userWatched.actions

// 루트 스토어 구성
export default configureStore({
  reducer: {
    userCartInfo: userCartInfo.reducer,
    userInfo: userInfo.reducer,
    userWatched: userWatched.reducer,
    shoes: shoesSlice.reducer,
  }
})
