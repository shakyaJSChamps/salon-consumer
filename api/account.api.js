import HTTP from '@/service/http';
import { methods } from '../constants/page'
import { __endpoint_doLogin, __endpoint_verifyUser, __endpoint_getSaloonList, __endpoint_getDoorBuddyList, __endpoint_getDetailPageData, __endpoint_favoriteSalon, __endpoint_getSalonReviews, __endpoint_getService, __endpoint_getSalonStaff } from '@/constants/endpoints'




export const doLogin = (payload) =>
  HTTP.Request(methods.POST, __endpoint_doLogin, payload);
export const verifyUser = (payload) =>
  HTTP.Request(methods.POST, __endpoint_verifyUser, payload);

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

export const getDoorBuddyList = (payload) =>
  HTTP.Request(methods.GET, __endpoint_getDoorBuddyList, payload);

export const getDetailPageData = (salonid) =>
  HTTP.Request(methods.GET, `${__endpoint_getDetailPageData}/${salonid}`);

export const getSalonService = (salonid) =>
  HTTP.Request(methods.GET, `${__endpoint_getService(salonid)}`);