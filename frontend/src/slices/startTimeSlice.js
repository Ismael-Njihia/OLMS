import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("startTime")
? JSON.parse(localStorage.getItem("startTime"))
: null;

const startTime = createSlice({
    name: "startTime",
    initialState,
    reducers:{
        setStartTime: (state, action) => {
            state = action.payload;
            localStorage.setItem("startTime", JSON.stringify(action.payload));
            return state;
        },
        removeStartTime: (state, action) => {
            state = null;
            localStorage.removeItem("startTime");
            return state;
        },
    }
});

export const { setStartTime, removeStartTime } = startTime.actions;
export default startTime.reducer;