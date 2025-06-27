import { createSlice } from "@reduxjs/toolkit";


// 사용자 조회 이력 관리 슬라이스 정의
const userWatched = createSlice({
    name: "watched",
    initialState: {
        // 로컬스토리지에서 기존 조회 이력 불러오고, 없으면 빈 배열로 초기화
        ids: JSON.parse(localStorage.getItem("watched")) || []
    },
    reducers: {
        addWatchedId(state, action) {
            const id = action.payload
            state.ids = state.ids.filter(i => i !== id)
            state.ids.push(id)
            localStorage.setItem("watched", JSON.stringify(state.ids))
        }
    }
})

export default userWatched;