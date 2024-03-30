"use client"
import styles from './loginPage.module.css'
import { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { LoginSchema } from '@/utils/schema.js'
import { doLogin} from '@/api/account.api';
import OtpVerify from './otpVerify';

const initialValues = {
  phoneNumber: "",
}
function LoginPage() {
  const [sendOtp, setSendOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
    const onSubmit= async (values) => {
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
          setPhoneNumber(phoneNumber)
            setSendOtp(true);   //for navigate to otp page

        } catch (error) {
          console.log(error);
        }
      }
  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <div className={styles.title}>
          <h3>Login</h3>
          <p>Get access to your Orders, <br />Wishlist and Recommendations</p>
        </div>
        <div className={styles.formDiv}>
          {!sendOtp ? (
            <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={onSubmit}
            >
              <Form className={styles.form}>
            <label>Mobile Number</label>
            <Field
              type="text"
              name='phoneNumber'
              className={styles.input}
            />
            <ErrorMessage
                  component="div"
                  name="phoneNumber"
                  className={styles.error}
                />
            <p>By continuing, you agree to Stylrax&apos;s <span>Terms of Use</span> and <span>Privacy Policy</span>.</p>
            <button type="submit" className={styles.btn}>
              Request OTP
            </button>
          </Form>
          </Formik>) : (
              <OtpVerify phoneNumber={phoneNumber}/>
          )}
        </div>
      </div>

    </div>
  )
}

export default LoginPage
