import Session from "@/service/session";
import { createSlice } from "@reduxjs/toolkit";

export const selectedServices= createSlice({
    name:'ServicesInfo',
    initialState:{
        selectedService:null
    },
reducers: {
    storeSelectedService:(state,action)=>{
        Session.setObject('selectedService',action.payload)
        console.log("seeeeee:::>",action.payload);
    }
}
})
export const {storeSelectedService}=selectedServices.actions;
export default selectedServices.reducer;