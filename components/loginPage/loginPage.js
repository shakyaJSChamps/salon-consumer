"use client";
import styles from "./loginPage.module.css";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "@/utils/schema.js";
import { doLogin } from "@/api/account.api";
import OtpVerify from "./otpVerify";
import Notify from "../../utils/notify";
import PhoneInputComponent from "./PhoneInputComponent";
import Link from "next/link";

const initialValues = {
  phoneNumber: "",
};
function LoginPage() {
  const [sendOtp, setSendOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
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
    } finally {
      setSubmitting(false); // Reset loading state regardless of success or failure
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
                <PhoneInputComponent setPhoneNumber={setPhoneNumber} className={styles.mobileField} style={{
        borderRadius: "20px",
        boxShadow: "none",
        outlineColor: "none",
        width: "470px",
        height: "6vh",
        fontSize: "20px",
      }}/>

                <ErrorMessage
                  component="div"
                  name="phoneNumber"
                  className={styles.error}
                />
                <p className={styles.agree}>
                  By continuing, you agree to Stylrax&apos;s{" "}
                  <Link href="/termsOfUse">Terms of Use</Link> and <Link href="/privacyPolicy">Privacy Policy</Link>.
                </p>
                <button type="submit" className={styles.btn} disabled={ submitting}>
                  {submitting ? 'Submitting...' : 'Request OTP'} 
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
