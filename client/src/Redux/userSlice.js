import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    error: null,
    listings: [],
    listingToUpdate: {},
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
        },
        updateProfile: (state,action)=>{
            state.user = action.payload;
        },
        userListings: (state,action)=>{
            state.listings = action.payload;
        },
        listingToUpdate: (state,action)=>{
            state.listingToUpdate = action.payload;
        }
    }
})

export const {loginStart, loginSuccess, loginFailiure, signOut, updateProfile, userListings, listingToUpdate} = userSlice.actions;

export default userSlice.reducer;