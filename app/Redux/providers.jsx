"use client"
import { store } from "./store";

const { Provider } = require("react-redux");


//this file connect redux toolkit and next  js 

export function Providers({ children }) {
    return <Provider store={store}>
        {children}
    </Provider>

}