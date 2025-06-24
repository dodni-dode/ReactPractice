import { createSlice } from '@reduxjs/toolkit';

let userInfo = createSlice({
    name: 'userInfo',
    initialState: {
        name: '홍길동',
        age: 20,
    },
    reducers: {
        changeName(state, action) {
            state.name = action.payload;
        },
        changeAge(state, action) {
            state.age += action.payload;
        }
    }
});

export default userInfo;