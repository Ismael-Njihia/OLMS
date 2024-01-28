import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("bookPdf")
    ? JSON.parse(localStorage.getItem("bookPdf"))
    : null;

const bookPdfSlice = createSlice({
    name: "bookPdf",
    initialState,
    reducers: {
        setBookPdf: (state, action) => {
            // Use state directly instead of state.bookPdf
            state = action.payload;
            localStorage.setItem("bookPdf", JSON.stringify(action.payload));
            return state;
        },
        removeBookPdf: (state, action) => {
            state = null;
            localStorage.removeItem("bookPdf");
            return state;
        },
    },
});

export const { setBookPdf, removeBookPdf } = bookPdfSlice.actions;

export default bookPdfSlice.reducer;
