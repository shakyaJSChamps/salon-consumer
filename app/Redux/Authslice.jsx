import Session from "@/service/session";
import { createSlice } from "@reduxjs/toolkit";

// Load user data from localStorage
const initialUser = Session.getObject("profile") || null;
const initialIsLoggedIn = Session.get("isLoggedIn") || false;
const initialToken = Session.get("authToken") || null;
const initialCity = Session.get("city") || "";
const initialState = {
  user: initialUser,
  authToken: initialToken,
  isLoggedIn: initialIsLoggedIn,
  city: initialCity,
  state: "",
  country: "",
  filteredSalon: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log("loginUser action payload:", action.payload);
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
  },
});

export const { loginUser, logoutUser, setUserLocation ,setFilteredSalon} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectCity = (state) => state.auth.city;
export const selectState = (state) => state.auth.state;
export const selectCountry = (state) => state.auth.country;
export const selectFilteredSalon = (state) => state.auth.filteredSalon;

export default authSlice.reducer;
