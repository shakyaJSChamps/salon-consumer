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
        authToken: initialToken,
        isLoggedIn: initialIsLoggedIn,
        location: null,
        authToken: initialAuthToken,
        location: null

    },
    reducers: {
        loginUser: (state, action) => {
            console.log("loginUser action payload:", action.payload);
            const { authToken, userInfo } = action.payload;
            state.user = userInfo?.profile;
            state.authToken = authToken;
            state.isLoggedIn = true;
            state.authToken = authToken;
            console.log("user authToken::>",authToken);
            Session.set('isLoggedIn', true);
            Session.set('authToken', authToken);
            Session.setObject('profile', userInfo?.profile);
        },
        logoutUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.authToken=null;
            Session.remove('authToken');
            Session.remove('profile');
            Session.remove('isLoggedIn');
        },
        userLocations: (state, action) => {
            //  console.log("location reducer", action.payload)
            state.location = action.payload;
        },
    },
});

export const { loginUser, logoutUser, userLocations } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectLocation = (state) => state.auth.location;

export default authSlice.reducer;
