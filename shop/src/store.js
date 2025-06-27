import { configureStore, createSlice } from "@reduxjs/toolkit"
import userCartInfo from "./store/userCartInfo"
import userInfo from "./store/userInfo"

export const { plusCount, minusCount, addItem, removeItem } = userCartInfo.actions
export const { changeName, changeAge } = userInfo.actions

// 사용자 조회 이력 관리 슬라이스 정의
const userWatched = createSlice({
  name: "watched",
  initialState: {
    // 로컬스토리지에서 기존 조회 이력 불러오고, 없으면 빈 배열로 초기화
    ids: JSON.parse(localStorage.getItem("watched")) || []
  },
  reducers: {
    // 조회한 ID 추가 리듀서
    addWatchedId(state, action) {
      const id = action.payload
      // 기존에 있던 ID 제거하여 중복 방지
      state.ids = state.ids.filter(i => i !== id)
      // 최신 순으로 ID 추가
      state.ids.push(id)
      // 로컬스토리지에 업데이트된 이력 저장
      localStorage.setItem("watched", JSON.stringify(state.ids))
    }
  }
})

const Shoes = createSlice({
  name: "shoes",
  initialState: [],
  reducers: {
    // 상품 목록을 설정하는 리듀서
    setShoes(state, action) {
      return action.payload
    }
  }
})

export const { addWatchedId } = userWatched.actions

// 루트 스토어 구성
export default configureStore({
  reducer: {
    userCartInfo: userCartInfo.reducer,   // 장바구니 수량·아이템 관리
    userInfo: userInfo.reducer,           // 사용자 프로필 정보 관리
    userWatched: userWatched.reducer      // 조회 이력 관리
  }
})
