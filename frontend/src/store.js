import {configureStore } from '@reduxjs/toolkit';
import {apiSlice} from './slices/apiSlice';
import authSliceReducer from './slices/authSlice';
import cartSliceReducer from './slices/cartSlice';
import bookPdfSliceReducer from './slices/readSlice';
import HoursSliceReducer from './slices/HoursSlice';
import startTimeSlice from './slices/startTimeSlice';

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        cart: cartSliceReducer,
        bookPdf: bookPdfSliceReducer,
        hours: HoursSliceReducer,
        startTime: startTimeSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;