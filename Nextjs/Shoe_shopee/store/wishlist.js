const { createSlice } = require("@reduxjs/toolkit");

const wishlist = createSlice({
    name: 'wishlist',
    initialState: [],
    reducers: {
        addToWishlist: (state, action) => {
            state.push(action.payload)
        },
        removeFromWish: (state, action) => {
            return state.filter(st => st._id === action.payload._id)
        }
    }
})


export const { addToWishlist, removeFromWish } = wishlist.actions;
export default wishlist.reducer;