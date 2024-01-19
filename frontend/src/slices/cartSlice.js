import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart") ? JSON.parse(
    localStorage.getItem("cart")
): {cartItems: []};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToBasket: (state, action) =>{
            const book = action.payload;
            const existsBook = state.cartItems.find((x) =>x.book_id === book.book_id);

            if(existsBook){
                state.cartItems = state.cartItems.map((x) => x.book_id === existsBook.book_id ? book : x);

            }
            else{
                state.cartItems = [...state.cartItems, book];
            }

            localStorage.setItem("cart", JSON.stringify(state));

        },
        removeFromBasket: (state, action) =>{
            state.cartItems = state.cartItems.filter((x) => x.book_id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state));
        },
        clearFromBasket: (state, action) =>{
           state.cartItems = [];
            localStorage.removeItem("cart");
        }

    }
});

export const { addToBasket, removeFromBasket,clearFromBasket } = cartSlice.actions;

export default cartSlice.reducer;