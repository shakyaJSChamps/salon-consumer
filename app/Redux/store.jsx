import { authSlice } from "./Authslice";
import selectedServiceSlice from "./selectedServiceSlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({

    reducer: {
        auth: authSlice.reducer,
        selectedService: selectedServiceSlice}

})