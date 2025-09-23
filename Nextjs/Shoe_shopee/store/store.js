// Importing configureStore from reduxjs toolkit to create a Redux store.
import { configureStore } from "@reduxjs/toolkit";

// Importing the cartSlice reducer.
import cartSlice from "./cartSlice";

// Importing the wishlistSlice reducer.
import wishlistSlice from './wishlist'

import productSlice from './productSlice'

// Using configureStore to create a Redux store. The store has two slices, 'cart' and 'wishlist'.
export default configureStore({
    reducer: {
        // 'cart' is the key and cartSlice is the value. This means the state for 'cart' will be managed by the cartSlice reducer.
        cart: cartSlice,
        // 'wishlist' is the key and wishlistSlice is the value. This means the state for 'wishlist' will be managed by the wishlistSlice reducer.
        wishlist: wishlistSlice,

        product: productSlice,
    },
});