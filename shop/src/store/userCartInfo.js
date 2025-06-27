import { createSlice } from '@reduxjs/toolkit'

const userCartInfo = createSlice({
  name: 'userCartInfo',
  initialState: [],
  reducers: {
    plusCount(state, { payload: id }) {
      const item = state.find(i => i.id === id)
      if (item) item.count += 1
    },

    minusCount(state, { payload: id }) {
      const item = state.find(i => i.id === id)
      if (item && item.count > 0) item.count -= 1
    },

    // 존재 시 수량 갱신, 없으면 추가
    addItem(state, { payload }) {
      const { id, name, count } = payload;
      const item = state.find(i => i.id === id)
      if (item) {
        item.count = count
        alert(`이미 장바구니에 ${item.name} 있음. 수량 ${item.count}개로 변경함.`)
      } else {
        state.push(payload)
        alert(`${name} ${count}개 장바구니에 추가됨.`)
      }
    },

    removeItem(state, { payload: id }) {
      const idx = state.findIndex(i => i.id === id)
      if (idx !== -1) {
        state.splice(idx, 1)
        alert('상품 제거됨.')
      } else {
        alert('해당 상품 없음.')
      }
    },
  },
})

export default userCartInfo
