import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    post: [],
    activePost: []
}
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.post = action.payload
        },
        addActivePost: (state, action) => {
            state.activePost = action.payload
        }
    }
})


export const { addPost, addActivePost } = postSlice.actions;

export default postSlice.reducer