import { createSlice } from '@reduxjs/toolkit';

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
        addItem(state, action) {
            let existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.count = action.payload.count;
                alert(`이미 장바구니에 ${existingItem.name}이(가) 있습니다. 수량을 ${existingItem.count}개로 변경합니다.`);
            } else {
                alert(`${action.payload.name}이(가) 장바구니에 추가되었습니다.`);
                state.push(action.payload);
            }
        },
        removeItem(state, action) {
            let index = state.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
                alert('장바구니에서 상품이 제거되었습니다.');
            } else {
                alert('해당 상품이 장바구니에 없습니다.');
            }
        }
    }
});

export default userCartInfo;