import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state)=>{
            state.loading = true;
        },
        loginSuccess: (state, action)=>{
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },
        loginFailiure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state)=>{
            state.user = null;
        }
    }
})

export const {loginStart, loginSuccess, loginFailiure, signOut} = userSlice.actions;

export default userSlice.reducer;