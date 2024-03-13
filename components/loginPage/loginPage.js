"use client"
import { TextField } from '@mui/material'
import styles from './loginPage.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link';
import OtpInput from 'react-otp-input';
import { useFormik } from 'formik';
import * as yup from "yup"
import { redirect, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/app/Redux/Authslice';


const phoneRegex = RegExp(
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
);

const signInSchema = yup.object().shape({
  phoneNumber: yup.string().matches(phoneRegex, "Please enter valid mobile number").required("Mobile number is required"),
  // otp: yup.string().length(4, 'OTP must be exactly 4 digits').required('OTP is required'),?
});
const initialValues = {
  phoneNumber: "",
  otp: "",
}
function LoginPage() {
  const [sendOtp, setSendOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const dispatch = useDispatch()
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      if (sendOtp) {
        // Verify OTP
        try {
          const response = await fetch('https://devapi.stylrax.com/account/otp/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              countryCode: '91',
              phoneNumber: values.phoneNumber,
              otp: values.otp,
            }),
          });
          if (response.ok) {
            // Handle successful OTP verification, e.g., redirect to dashboard
            console.log('OTP verified successfully');
            const data = await response.json();
            console.log("data in response", data)
            dispatch(loginUser(data));
            router.push("/"); // Redirect to the desired page
          } else {
            // Handle OTP verification failure
            console.error('OTP verification failed:', response.statusText);
          }
        } catch (error) {
          console.error('OTP verification failed:', error);
        }
      } else {
        // Request OTP
        try {
          const response = await fetch('https://devapi.stylrax.com/account/otp/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              countryCode: '91',
              phoneNumber: values.phoneNumber,
              deviceType: 1,
              deviceToken: 'fasfsadfsdf',
            }),
          });
          if (response.ok) {
            // Set sendOtp to true to show OTP input field
            setSendOtp(true);
          } else {
            // Handle login failure
            console.error('Login failed:', response.statusText);
          }
        } catch (error) {
          console.error('Login failed:', error);
        }
      }
    },
  });




  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <div className={styles.title}>
          <h3>Login</h3>
          <p>Get access to your Orders, <br />Wishlist and Recommendations</p>
        </div>
        <div className={styles.formDiv}>
          {!sendOtp ? (<form className={styles.form}
            onSubmit={handleSubmit}>
            <label>Mobile Number</label>
            <input
              type="text"
              name='phoneNumber'
              className={styles.input}
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p className={styles.error}>{errors.phoneNumber}</p>
            <p>By continuing, you agree to Stylrax&apos;s <span>Terms of Use</span> and <span>Privacy Policy</span>.</p>
            <button type="submit" className={styles.btn}>
              Request OTP
            </button>
          </form>) : (<>
            <form className={styles.form}
              onSubmit={handleSubmit}>
              <OtpInput
                value={values.otp}
                onChange={(otp) => handleChange({ target: { name: 'otp', value: otp } })}
                numInputs={4}
                renderSeparator={
                  <span
                    style={{
                      fontSize: "15px",
                      color: "grey"
                    }}
                  >
                    {"|"}
                  </span>
                }
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "30px",
                  height: "30px",
                  border: "none",
                  backgroundColor: "transparent",
                  outline: "none",
                }}
              />
              <hr />
              <p className={styles.error}>{errors.otp}</p>
              <p className={styles.resend}>Resend Otp</p>
              <button type="submit" className={styles.btn}>
                Next
              </button>
            </form>
          </>
          )}
        </div>
      </div>

    </div>
  )
}

export default LoginPage
