import { createSlice } from '@reduxjs/toolkit';

// 신발 데이터 추가(중복 제거) 및 초기화
const shoesSlice = createSlice({
  name: 'shoes',
  initialState: [],
  reducers: {
    reduxSetShoes(state, action) {
      const ids = new Set(state.map(shoe => shoe.id));  // 기존 id 수집
      action.payload.forEach(shoe => {
        if (!ids.has(shoe.id)) {
          state.push(shoe);
          ids.add(shoe.id);
        }
      });
    },

    resetShoes(state) {
      state.length = 0;
    },
  },
});

export default shoesSlice;
