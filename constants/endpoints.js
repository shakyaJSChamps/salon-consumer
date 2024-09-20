import { endpoint } from '@/constants/page';

/* user Login */
export const __endpoint_doLogin = endpoint + "account/otp/login";
export const __endpoint_verifyUser = endpoint + "account/otp/verify";
//list api
 export const __endpoint_favoriteSalonList = endpoint + "consumer/salons";
export const __endpoint_getSaloonList = (requestUrl) => {
    return `${endpoint}consumer/salons?${requestUrl}`;
};

export const __endpoint_favoriteSalon = (salonId) => {
    return `${endpoint}consumer/salons/${salonId}/favourite`;
};

export const __endpoint_getDoorBuddyList = endpoint + "consumer/freelancers";
export const __endpoint_getDetailPageData = endpoint + "consumer/salons";
export const __endpoint_getService = (salonid) => {
    return `${endpoint}consumer/salons/${salonid}/services`;
};
export const __endpoint_getSalonStaff = (salonid) => {
    return `${endpoint}consumer/salons/${salonid}/employees`;
};
export const __endpoint_getSalonReviews = (salonid) => {
    return `${endpoint}consumer/salons/${salonid}/reviews`;
};
export const __endpoint_appointment=endpoint+"consumer/appointments"
export const __endpoint_address=endpoint+"users/addresses"
export const __endpoint_UserProfile=endpoint+"account/user/profile"

// Static Page APIs
export const __endpoint_staticPageUrl = endpoint + "file/doc/";

// Notifications page API
export const __endpoint_getNotification = endpoint + "users/notifications";
export const __endpoint_fileUploaders = endpoint + "file/presignedUrl";
export const __endpoint_searchService = endpoint + "consumer/salons/list";
export const __endpoint_signatureServices = endpoint + "services/categories";
export const __endpoint_getBanner = endpoint + "services/advertisement";

//export const searchService = (city) => `${endpoint}consumer/salons/list?search=${city}`;
export const __endpoint_searchText =  endpoint+"consumer/salons/search";

//home page
export const __endpoint_homePage =  endpoint+"consumer/salons/summary";
export const __endpoint_serviceDetails =  endpoint+"consumer/services";
export const __endpoint_paymentGateway =  endpoint+"consumer/appointments";
export const __endpoint_resendOtp =  endpoint+"b2b/account/otp/resend";
export const __endpoint_otpSend =  endpoint+"b2b/account/email/otp/send";
export const __endpoint_otpVerify =  endpoint+"b2b/account/email/otp/verify";


//invoice
export const __endpoint_invoice =  endpoint+"consumer/appointments";

//signature verify
export const __endpoint_signatureVerify =  endpoint+"consumer/appointments";
