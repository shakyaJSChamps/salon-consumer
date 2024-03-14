"use client"
import { TextField } from '@mui/material'
import styles from './loginPage.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link';
import OtpInput from 'react-otp-input';
import { useFormik } from 'formik';
// import * as yup  from "yup"
import { redirect, useRouter } from 'next/navigation';
import { LoginSchema } from '@/utils/schema.js'
import { doLogin, verifyUser } from '@/api/account.api';
import notify from '@/utils/notify';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/app/Redux/Authslice';
import Session from '@/service/session';

const initialValues = {
  phoneNumber: "",
  otp: "",
}
function LoginPage() {
  const [sendOtp, setSendOtp] = useState(false);
  // const [otp, setOtp] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      if (!sendOtp) {
        try {

          console.log(values);
          const { phoneNumber } = values;
          const data = {
            "countryCode": "91",
            "phoneNumber": phoneNumber,
            "deviceType": 1,
            "deviceToken": "fasfsadfsdf"
          }
          const res = await doLogin(data);
          console.log("response ::>", res.data.statusCode);
          if (res.data.statusCode == "200") {
            setSendOtp(true);   //for navigate to otp page
          }

        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const { phoneNumber, otp } = values;
          const verifyData = {
            "countryCode": "91",
            "phoneNumber": phoneNumber,
            "otp":otp
        }
          const response=await verifyUser(verifyData)
          console.log("response----",response.data.statusCode)
          const token = response.data.data.authToken;
          const userInfo=response.data.data.profile;
           // Dispatch login action to store token and userInfo in Redux store
          //  dispatch(loginUser({ token, userInfo }));
           // Set token in Session
           Session.set('token', token);
           Session.set('userInfo', userInfo);
          
          // console.log("profile----",userInfo)
          // console.log("token----",token);
          if(response.data.statusCode=="200"){
            router.push('/');
          }else{
            notify.error(response.data.message);
          }
          
        } catch (error) {
          notify.error(error.message);
        }
      }
    }
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
