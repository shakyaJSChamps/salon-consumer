import { endpoint } from '@/constants/page';

/* user Login */
export const __endpoint_doLogin = endpoint + "account/otp/login";
export const __endpoint_verifyUser = endpoint + "account/otp/verify";
//list api
export const __endpoint_favoriteSalonList = endpoint + "consumer/salons";
export const __endpoint_getSaloonList = (page, size) => {
    return `${endpoint}consumer/salons?page=${page}&size=${size}`;
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


// export const __endpoint_putServiceType = endpoint + "admin/services/categories";
// export const __endpoint_getSaloon = endpoint + "admin/salon ";
// export const __endpoint_getUser = endpoint + "admin/users";


// Static Page APIs
export const __endpoint_staticPageUrl = endpoint + "file/doc/";

// Notifications page API
export const __endpoint_getNotification = endpoint + "users/notifications";
export const __endpoint_fileUploaders = endpoint + "file/presignedUrl";