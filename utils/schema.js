import * as yup  from "yup"
  
    export const LoginSchema = yup.object().shape({
    phoneNumber: yup.string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Please enter valid mobile number").required("Mobile number is required"),
    // otp: yup.string().length(4, 'OTP must be exactly 4 digits').required('OTP is required'),
  });