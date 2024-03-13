// authSlice.js

import Session from "@/service/session";
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoggedIn: false,
    },
    reducers: {
        loginUser: (state, action) => {
            console.log("loginUser action payload:", action.payload.data);
            state.user = action.payload.data;
            state.isLoggedIn = true;
            Session.set('authToken', action.payload.data.authToken);
            Session.setObject('profile', action.payload.data.profile);
            Session.set('isLoggedIn', true);
        },
        logoutUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            Session.remove('authToken');
            Session.remove('profile');
        },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
