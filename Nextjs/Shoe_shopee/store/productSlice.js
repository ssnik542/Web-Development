import { createSlice } from "@reduxjs/toolkit";

const initialState = []
const Product = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        addProduct: (state, action) => {
            state.push(...action.payload)
        }
    }
})

export default Product.reducer

export const { addProduct } = Product.actions