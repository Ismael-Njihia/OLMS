import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("hours")
     ? JSON.parse(localStorage.getItem("hours"))
        : null;

const hoursSlice = createSlice({
    name: "hours",
    initialState,
    reducers:{
        setHours: (state, action) => {
            state = action.payload;
            localStorage.setItem("hours", JSON.stringify(action.payload));
            return state;
        },
        removeHours: (state, action) => {
            state = null;
            localStorage.removeItem("hours");
            return state;
        },
    }
});

export const { setHours, removeHours } = hoursSlice.actions;

export default hoursSlice.reducer;