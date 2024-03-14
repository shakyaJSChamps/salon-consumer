// authSlice.js

import Session from "@/service/session";
import { createSlice } from "@reduxjs/toolkit";

// Load user data from localStorage
const initialUser = Session.getObject('profile') || null;
const initialIsLoggedIn = Session.get('isLoggedIn') || false;


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: initialUser,
        isLoggedIn: initialIsLoggedIn,
        location: null
    },
    reducers: {
        loginUser: (state, action) => {
            console.log("loginUser action payload:", action.payload.data);
            const { authToken, profile } = action.payload.data;
            state.user = profile;
            state.isLoggedIn = true;
            Session.set('authToken', authToken);
            Session.setObject('profile', profile);
            Session.set('isLoggedIn', true);
        },
        logoutUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            Session.remove('authToken');
            Session.remove('profile');
            Session.remove('isLoggedIn');
        },
        userLocations: (state, action) => {
            console.log("location reducer", action.payload)
            state.location = action.payload;
        },
    },
});

export const { loginUser, logoutUser, userLocations } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectLocation = (state) => state.auth.location;

export default authSlice.reducer;