import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,

}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials: (state, action) =>{
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            //set user_type in local storage
            //user_type is in userInfo so spread on it
            localStorage.setItem('user_type', JSON.stringify({...action.payload}.user_type));
        },
        logout: (state, action)=>{
            state.userInfo = null;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('user_type');
        }
    }
})

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;