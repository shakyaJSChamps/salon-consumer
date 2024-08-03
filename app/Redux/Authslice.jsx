import { appointment } from "@/api/account.api";
import Session from "@/service/session";
import { createSlice } from "@reduxjs/toolkit";

// Load user data from localStorage
const initialUser = Session.getObject("profile") || null;
const initialIsLoggedIn = Session.get("isLoggedIn") || false;
const initialToken = Session.get("authToken") || null;
const initialCity = Session.get("city") || "";
const initialSalonList = Session.getObject("salonList") || [];
const initialSalonService = Session.getObject("salonService") || null;
const initialBannerCity = Session.getObject("selectedBannerCity") || null;
const initialBannerSalons = Session.getObject("selectedBannerSalons") || [];

const initialState = {
  user: initialUser,
  authToken: initialToken,
  isLoggedIn: initialIsLoggedIn,
  city: initialCity,
  state: "",
  country: "",
  filteredSalon: null,
  salonList: initialSalonList,
  salonService: initialSalonService,
  selectedBannerCity: initialBannerCity,
  selectedBannerSalons: initialBannerSalons,
  appointmentId:null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { authToken, userInfo } = action.payload;
      state.user = userInfo?.profile;
      state.authToken = authToken;
      state.isLoggedIn = true;
      Session.set("authToken", authToken);
      Session.setObject("profile", userInfo?.profile);
      Session.set("isLoggedIn", true);
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      Session.remove("authToken");
      Session.remove("profile");
      Session.remove("isLoggedIn");
      Session.remove("city");
      Session.remove("state");
      Session.remove("country");
      Session.remove("filteredSalon");
      Session.remove("salonList");
      Session.remove("salonService");
      Session.remove("selectedBannerCity")
      Session.remove("selectedBannerSalons")
      Session.remove("appointmentId");
    },
    setUserLocation: (state, action) => {
      const { city, state: region, country } = action.payload;
      state.city = city || "";
      state.state = region || "";
      state.country = country || "";
      Session.set("city", city);
      Session.set("state", region);
      Session.set("country", country);
    },
    setFilteredSalon: (state, action) => {
      state.filteredSalon = action.payload;
      Session.setObject("filteredSalon", action.payload);
    },
    setSalonList: (state, action) => {

      state.salonList = action.payload;
      Session.setObject("salonList", action.payload);
    },
     setSalonService: (state, action) => {
      state.salonService = action.payload;
      Session.setObject("salonService", action.payload);

    },

    setSelectedBannerCity:(state,action) =>{
      Session.set("selectedBannerCity",action.payload)
    },
    setSelectedBannerSalons:(state,action) =>{
      Session.setObject("selectedBannerSalons",action.payload)
    },
    updateUserProfile: (state, action) => {
      const updatedProfile = action.payload;
      state.user = { ...state.user, ...updatedProfile };
      Session.setObject("profile", state.user);
    },
    setAppointmentId: (state, action) => { 
      state.appointmentId = action.payload;
      Session.set("appointmentId", action.payload);

    },
  },
});

export const {
  loginUser,
  logoutUser,
  setUserLocation,
  setFilteredSalon,
  setSalonList,
setSalonService,
setSelectedBannerCity,
setSelectedBannerSalons,
updateUserProfile,
setAppointmentId,
} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectCity = (state) => state.auth.city;
export const selectState = (state) => state.auth.state;
export const selectCountry = (state) => state.auth.country;
export const selectFilteredSalon = (state) => state.auth.filteredSalon;
export const selectSalonList = (state) => state.auth.salonList;
export const selectSalonService = (state) => state.auth.salonService;

export default authSlice.reducer;
