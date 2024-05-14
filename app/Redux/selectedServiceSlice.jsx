import Session from "@/service/session";
import { createSlice } from "@reduxjs/toolkit";

export const selectedServices= createSlice({
    name:'ServicesInfo',
    initialState:{
        selectedService:null,
        selectedSalonId:null
    },
reducers: {
    storeSelectedService:(state,action)=>{
        Session.setObject('selectedService',action.payload)
        console.log("seeeeee:::>",action.payload);
    },
    storeSelectedSalonId:(state,action)=>{
        Session.set('selectedSalonId',action.payload)
        console.log("selectedSalonId::>",action.payload)
    }
}
})
export const {storeSelectedService,storeSelectedSalonId}=selectedServices.actions;
export default selectedServices.reducer;