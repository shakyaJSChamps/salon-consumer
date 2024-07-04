import Session from "@/service/session";
import { createSlice } from "@reduxjs/toolkit";

export const selectedServices= createSlice({
    name:'ServicesInfo',
    initialState:{
        selectedService:null,
        selectedSalonId:null,
        type:null

    },
reducers: {
    storeSelectedService:(state,action)=>{
        state.selectedService = action.payload.services;
        state.selectedService.type = action.payload.type; 
        Session.setObject('selectedService',action.payload.services)
        Session.set('type', action.payload.type);
    },
    storeSelectedSalonId:(state,action)=>{
        Session.set('selectedSalonId',action.payload)
    }
}
})
export const {storeSelectedService,storeSelectedSalonId}=selectedServices.actions;
export default selectedServices.reducer;