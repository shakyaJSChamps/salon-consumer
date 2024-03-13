import { authSlice } from "./Authslice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({

    reducer: { auth: authSlice.reducer, }
})