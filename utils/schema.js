import * as yup  from "yup"
  
    export const LoginSchema = yup.object().shape({
    phoneNumber: yup.string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Please enter valid mobile number").required("Mobile number is required"),
    // otp: yup.string().length(4, 'OTP must be exactly 4 digits').required('OTP is required'),
  });
    export const OtpVerifySchema = yup.object().shape({
    otp: yup.string().length(4, 'OTP must be exactly 4 digits').required('OTP is required'),
  });
  export const addAddressSchema=yup.object().shape({
    streetAddress: yup.string().required('Street Address is required'),
    houseNo: yup.string().required('House No is required'),
    landmark: yup.string().required('Landmark is required'),
    pincode: yup.string().required('Pincode is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required')
})
 