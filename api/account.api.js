import HTTP from '@/service/http';
import { methods } from '../constants/page'
import { __endpoint_doLogin, __endpoint_verifyUser, __endpoint_getSaloonList, __endpoint_getDoorBuddyList, __endpoint_getDetailPageData, __endpoint_favoriteSalon, __endpoint_getSalonReviews, __endpoint_getService, __endpoint_getSalonStaff, __endpoint_appointment, __endpoint_getAddress, __endpoint_address, __endpoint_UserProfile, __endpoint_favoriteSalonList, __endpoint_getNotification, __endpoint_fileUploaders,__endpoint_searchText, __endpoint_searchService, __endpoint_homePage, __endpoint_signatureServices, __endpoint_getBanner } from '@/constants/endpoints'

export const doLogin = (payload) =>
  HTTP.Request(methods.POST, __endpoint_doLogin, payload);
export const verifyUser = (payload) =>
  HTTP.Request(methods.POST, __endpoint_verifyUser, payload);
export const getFavouriteSalonList = () =>
  HTTP.Request(methods.GET, `${__endpoint_favoriteSalonList}?favorite=true`);

export const getSalonLists = (page, size) => {
  const endpointUrl = __endpoint_getSaloonList(page, size);
  return HTTP.Request(methods.GET, endpointUrl);
};

export const favoriteSalon = (salonId, isFavorite) => {
  const endpointUrl = __endpoint_favoriteSalon(salonId);
  const payload = { favourite: isFavorite };

  return HTTP.Request(methods.PUT, endpointUrl, payload);
};

export const getSalonStaff = (salonid) =>
  HTTP.Request(methods.GET, `${__endpoint_getSalonStaff(salonid)}`);

export const getSalonReviews = (salonid) =>
  HTTP.Request(methods.GET, `${__endpoint_getSalonReviews(salonid)}`);
export const postSalonReviews = (payload,salonid) =>
  HTTP.Request(methods.POST, `${__endpoint_getSalonReviews(salonid)}`,payload);

export const getDoorBuddyList = (payload) =>
  HTTP.Request(methods.GET, __endpoint_getDoorBuddyList, payload);

export const getDetailPageData = (salonid) =>
  HTTP.Request(methods.GET, `${__endpoint_getDetailPageData}/${salonid}`);

export const getSalonService = (salonid) =>
  HTTP.Request(methods.GET, `${__endpoint_getService(salonid)}`);

export const appointment = (payload) =>
  HTTP.Request(methods.POST, __endpoint_appointment, payload);
export const getAppointment = (status) =>
  HTTP.Request(methods.GET, `${__endpoint_appointment}?status=${status}`);
export const deleteAppointment = (payload,id) =>
  HTTP.Request(methods.PUT, `${__endpoint_appointment}/${id}`,payload);
export const rescheduleAppointment = (payload,id) =>
  HTTP.Request(methods.PUT, `${__endpoint_appointment}/${id}`,payload);
export const appointmentDetails = (id) =>
  HTTP.Request(methods.GET, `${__endpoint_appointment}/${id}`);

export const getAddress=()=>
  HTTP.Request(methods.GET,__endpoint_address);
export const addAddress = (payload) =>
  HTTP.Request(methods.POST, __endpoint_address, payload);
export const deleteAddress = (id) =>
  HTTP.Request(methods.DELETE, `${__endpoint_address}/${id}`);
export const UpdateAddress = (payload,id) =>
  HTTP.Request(methods.PUT, `${__endpoint_address}/${id}`,payload);
export const setDefaultAddress = (id) =>
  HTTP.Request(methods.PATCH, `${__endpoint_address}/${id}/default`);
export const getUserProfile = () =>
  HTTP.Request(methods.GET, __endpoint_UserProfile);
export const UpdateUserProfile = (payload) =>
  HTTP.Request(methods.POST, __endpoint_UserProfile, payload);
//notifications api
export const getUserNotifications = () =>
  HTTP.Request(methods.GET, __endpoint_getNotification);
export const signatureServices = () =>
  HTTP.Request(methods.GET, __endpoint_signatureServices);
export const getBanners = () =>
  HTTP.Request(methods.GET, __endpoint_getBanner);
export const fileUploaders = (payload) =>
  HTTP.Request(methods.GET, __endpoint_fileUploaders, payload);

//export const searchService = (requestUrl) =>
 // HTTP.Request(methods.GET, `${__endpoint_searchService}${requestUrl}`);

 export const searchService = (query) =>
     HTTP.Request(methods.GET, `${__endpoint_searchService}?search=${query}`);

export const searchText = (query,page,size) =>
  HTTP.Request(methods.GET, `${__endpoint_searchText}?page=${page}&size=${size}&search=${query}`);
export const homePage = () =>
  HTTP.Request(methods.GET, __endpoint_homePage);