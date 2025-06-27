// Redux slice: userCartInfo 정의함
// 상태: 장바구니 항목 배열 [{ id, name, count }] 보관함
// 기능:
//   plusCount   : 상품 수량 +1 증가시킴
//   minusCount  : 상품 수량 -1 감소(0 미만 방지)함
//   addItem     : 새 상품 추가 또는 수량 수정함
//   removeItem  : 상품 제거함

import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: 0, name: 'White and Black', count: 2 },
  { id: 2, name: 'Grey Yordan', count: 1 },
]

const userCartInfo = createSlice({
  name: 'userCartInfo',
  initialState,
  reducers: {
    // payload: id
    plusCount(state, { payload: id }) {
      const item = state.find(i => i.id === id)
      if (item) item.count += 1
    },

    // payload: id
    minusCount(state, { payload: id }) {
      const item = state.find(i => i.id === id)
      if (item && item.count > 0) item.count -= 1
    },

    /* payload: { id, name, count }
       이미 존재 시 수량 업데이트, 없으면 추가함 */
    addItem(state, { payload }) {
      const item = state.find(i => i.id === payload.id)
      if (item) {
        item.count = payload.count
        alert(`이미 장바구니에 ${item.name}이(가) 있음. 수량을 ${item.count}개로 변경함.`)
      } else {
        state.push(payload)
        alert(`${payload.name}이(가) 장바구니에 추가되었음.`)
      }
    },

    // payload: id
    removeItem(state, { payload: id }) {
      const idx = state.findIndex(i => i.id === id)
      if (idx !== -1) {
        state.splice(idx, 1)
        alert('장바구니에서 상품이 제거되었음.')
      } else {
        alert('해당 상품이 장바구니에 없었음.')
      }
    },
  },
})

export default userCartInfo
export const { plusCount, minusCount, addItem, removeItem } = userCartInfo.actions
