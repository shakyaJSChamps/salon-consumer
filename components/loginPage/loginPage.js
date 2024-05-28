"use client";
import styles from "./loginPage.module.css";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "@/utils/schema.js";
import { doLogin } from "@/api/account.api";
import OtpVerify from "./otpVerify";
import Notify from "../../utils/notify";
import PhoneInputComponent from "./PhoneInputComponent";

const initialValues = {
  phoneNumber: "",
};
function LoginPage() {
  const [sendOtp, setSendOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const onSubmit = async (values) => {
    try {
      console.log("Submitting form with values:", values);
      const { phoneNumber } = values;
      console.log("Values ::", values);
      const data = {
        countryCode: "91",
        phoneNumber: phoneNumber,
        deviceType: 1,
        deviceToken: "fasfsadfsdf",
      };
      const res = await doLogin(data);
      console.log("Response ::>", res);
      setPhoneNumber(phoneNumber);
      // Notify.success(res.data.message)
      setSendOtp(true);
      console.log("API response logged to console:", res.data.message);
    } catch (error) {
      // console.log(error);
      Notify.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <div className={styles.title}>
          <h3>Login</h3>
          <p>
            Get access to your Orders, <br />
            Wishlist and Recommendations
          </p>
        </div>
        <div className={styles.formDiv}>
          {!sendOtp ? (
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={onSubmit}
            >
              <Form className={styles.form}>
                <PhoneInputComponent setPhoneNumber={setPhoneNumber} />

                <ErrorMessage
                  component="div"
                  name="phoneNumber"
                  className={styles.error}
                />
                <p>
                  By continuing, you agree to Stylrax&apos;s{" "}
                  <span>Terms of Use</span> and <span>Privacy Policy</span>.
                </p>
                <button type="submit" className={styles.btn}>
                  Request OTP
                </button>
              </Form>
            </Formik>
          ) : (
            <OtpVerify phoneNumber={phoneNumber} />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
