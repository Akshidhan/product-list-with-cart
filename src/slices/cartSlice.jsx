import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
    },
    reducers: {
        addProduct: (state, action) => {
            const found = state.products.find(product => product.id === action.payload.id);
            if (found) {
                found.quantity++;
                return;
            } else {
                state.products.push({ ...action.payload, quantity: 1 });
            }
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload.id);
        },
        increaesQuantity: (state, action) => {
            const found = state.products.find(product => product.id === action.payload.id);
            if (found) {
                found.quantity++;
            }
        },
        decreaseQuantity: (state, action) => {
            const found = state.products.find(product => product.id === action.payload.id);
            if (found.quantity > 1) {
                found.quantity--;
            } else {
                state.products = state.products.filter(product => product.id !== action.payload.id);
            }
        },
        clearCart: (state) => {
            state.products = [];
        }
    },
});

export const { addProduct, removeProduct, increaesQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;