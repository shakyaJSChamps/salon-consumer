import * as yup  from "yup"
  
    export const LoginSchema = yup.object().shape({
    phoneNumber: yup.string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Please enter valid mobile number").required("Mobile number is required"),
    // otp: yup.string().length(4, 'OTP must be exactly 4 digits').required('OTP is required'),
  });
    export const OtpVerifySchema = yup.object().shape({
    otp: yup.string().length(4, 'OTP must be exactly 4 digits').required('OTP is required'),
  });
  export const addAddressSchema = yup.object().shape({
    streetAddress: yup.string().required('Street Address is required'),
    houseNo: yup.string().required('House No is required'),
    pincode: yup.string()
        .required('Pincode is required')
        .matches(/^[0-9]+$/, 'Pincode must contain only numbers')
        .test('is-numeric', 'Pincode must contain only numbers', (value) => /^\d+$/.test(value) && value.length === 6),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required')
})
export const rescheduleValidationSchema = yup.object({
  bookingDate: yup.date().required('Booking date is required'),
  timeSlot: yup.string().required('Time slot is required'),
});

export const ratingValidationSchema = yup.object({
  rating: yup.number().min(1, 'Rating is required').required('Rating is required'),
  review: yup.string().required('Review is required'),
});
 
export const userProfileSchema = yup.object({
  name: yup.string()
  .matches(/^[A-Za-z ]*$/, 'Name can only contain letters')
  .required('Name is required'),  
  email: yup.string().required('Email is required'),
 // address: yup.string().required('Address is required'),

});