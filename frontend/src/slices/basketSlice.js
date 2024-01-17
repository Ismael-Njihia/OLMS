import {createSlice} from '@reduxjs/toolkit';

const initialState = localStorage.getItem('basket')
? JSON.parse(localStorage.getItem('basket')) : {
    basketItems: [],
}

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const item = action.payload;
            const itemExists = state.basketItems.find(i => i.id === item.id);
            if (itemExists) {
                state.basketItems = state.basketItems.map(i => i.id === item.id ? item : i);
            } else {
                state.basketItems.push(item);
            }
            localStorage.setItem('basket', JSON.stringify(state));
        },
        removeFromBasket: (state, action) => {
            const id = action.payload;
            state.basketItems = state.basketItems.filter(i => i.id !== id);
            localStorage.setItem('basket', JSON.stringify(state));
        },
        clearBasket: (state) => {
            state.basketItems = [];
            localStorage.setItem('basket', JSON.stringify(state));
        },
        setBasket: (state, action) => {
            state.basketItems = action.payload;
            localStorage.setItem('basket', JSON.stringify(state));
        }
    }

});

export const {addToBasket, removeFromBasket, clearBasket, setBasket} = basketSlice.actions;
export default basketSlice.reducer;