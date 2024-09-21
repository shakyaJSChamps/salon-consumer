import HTTP from "@/service/http";
import { methods } from "../constants/page";
import {
  __endpoint_doLogin,
  __endpoint_verifyUser,
  __endpoint_getSaloonList,
  __endpoint_getDoorBuddyList,
  __endpoint_getDetailPageData,
  __endpoint_favoriteSalon,
  __endpoint_getSalonReviews,
  __endpoint_getService,
  __endpoint_getSalonStaff,
  __endpoint_appointment,
  __endpoint_address,
  __endpoint_UserProfile,
  __endpoint_favoriteSalonList,
  __endpoint_getNotification,
  __endpoint_fileUploaders,
  __endpoint_searchText,
  __endpoint_searchService,
  __endpoint_homePage,
  __endpoint_signatureServices,
  __endpoint_getBanner,
  __endpoint_serviceDetails,
  __endpoint_paymentGateway,
  __endpoint_resendOtp,
  __endpoint_otpSend,
  __endpoint_otpVerify,
  __endpoint_invoice,
  __endpoint_signatureVerify,
} from "@/constants/endpoints";

export const doLogin = (payload) =>
  HTTP.Request(methods.POST, __endpoint_doLogin, payload);
export const verifyUser = (payload) =>
  HTTP.Request(methods.POST, __endpoint_verifyUser, payload);
export const resend = (payload) =>
  HTTP.Request(methods.POST, __endpoint_resendOtp, payload);

export const otpSend = (payload) =>
  HTTP.Request(methods.POST, __endpoint_otpSend, payload);
export const otpVerify = (payload) =>
  HTTP.Request(methods.POST, __endpoint_otpVerify, payload);

export const getFavouriteSalonList = () =>
  HTTP.Request(methods.GET, `${__endpoint_favoriteSalonList}?favorite=true`);

export const getSalonLists = (requestUrl) => {
  const endpointUrl = __endpoint_getSaloonList(requestUrl);
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
export const postSalonReviews = (payload, salonid) =>
  HTTP.Request(methods.POST, `${__endpoint_getSalonReviews(salonid)}`, payload);

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
export const deleteAppointment = (payload, id) =>
  HTTP.Request(methods.PUT, `${__endpoint_appointment}/${id}`, payload);
export const rescheduleAppointment = (payload, id) =>
  HTTP.Request(methods.PUT, `${__endpoint_appointment}/${id}`, payload);
export const appointmentDetails = (id) =>
  HTTP.Request(methods.GET, `${__endpoint_appointment}/${id}`);

export const getAddress = () => HTTP.Request(methods.GET, __endpoint_address);
export const addAddress = (payload) =>
  HTTP.Request(methods.POST, __endpoint_address, payload);
export const deleteAddress = (id) =>
  HTTP.Request(methods.DELETE, `${__endpoint_address}/${id}`);
export const UpdateAddress = (payload, id) =>
  HTTP.Request(methods.PUT, `${__endpoint_address}/${id}`, payload);
export const setDefaultAddress = (id) =>
  HTTP.Request(methods.PATCH, `${__endpoint_address}/${id}/default`);
export const getUserProfile = () =>
  HTTP.Request(methods.GET, __endpoint_UserProfile);
export const UpdateUserProfile = (payload) =>
  HTTP.Request(methods.POST, __endpoint_UserProfile, payload);

//notifications api
export const getUserNotifications = () =>
  HTTP.Request(methods.GET, __endpoint_getNotification);
export const signatureServices = (requestUrl) =>
  HTTP.Request(methods.GET, `${__endpoint_signatureServices}?${requestUrl}`);
export const getBanners = (reqUrl) => HTTP.Request(methods.GET, `${__endpoint_getBanner}?${reqUrl}`);
export const fileUploaders = (payload) =>
  HTTP.Request(methods.GET, __endpoint_fileUploaders, payload);

export const searchService = (query, requestUrl) =>
  HTTP.Request(
    methods.GET,
    `${__endpoint_searchService}?search=${query}&${requestUrl}`
  );

export const searchText = (query, requestUrl) =>
  HTTP.Request(
    methods.GET,
    `${__endpoint_searchText}?search=${query}&${requestUrl}`
  );

export const homePage = (requestUrl) => {
  return HTTP.Request(methods.GET, `${__endpoint_homePage}?${requestUrl}`);
};

export const serviceDetails = (id) =>
  HTTP.Request(methods.GET, `${__endpoint_serviceDetails}/${id}/salons`);

export const payments = (payload, id) =>
  HTTP.Request(
    methods.POST,
    `${__endpoint_paymentGateway}/${id}/order`,
    payload
  );

export const getDetails = (id) =>
  HTTP.Request(methods.GET, `${__endpoint_paymentGateway}/${id}/order`);

export const getInvoice = (id) =>
  HTTP.Request(methods.GET, `${__endpoint_invoice}/${id}/invoice`);

export const verifySignature = (payload, id) =>
  HTTP.Request(
    methods.POST,
    `${__endpoint_signatureVerify}/${id}/order/verify`,
    payload
  );
