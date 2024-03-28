import { endpoint } from '@/constants/page';

/* user Login */
export const __endpoint_doLogin = endpoint + "account/otp/login";
export const __endpoint_verifyUser = endpoint + "account/otp/verify";
export const __endpoint_getSaloonList = endpoint + "consumer/salons";
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
// export const __endpoint_putServiceType = endpoint + "admin/services/categories";
// export const __endpoint_getSaloon = endpoint + "admin/salon ";
// export const __endpoint_getUser = endpoint + "admin/users";