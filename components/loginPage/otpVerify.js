import OTPInput from "react-otp-input";
import styles from "./loginPage.module.css";
import { ErrorMessage, Form, Formik } from "formik";
import { OtpVerifySchema } from "@/utils/schema";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { verifyUser } from "@/api/account.api";
import { loginUser } from "@/app/Redux/authSlice";
import { useState } from "react";
import { setCookie } from "nookies";

const initialValues = {
  otp: "",
};

function OtpVerify({ phoneNumber }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
      const { otp } = values;
      console.log("phoneNumber", phoneNumber);
      const verifyData = {
        countryCode: "91",
        phoneNumber: phoneNumber,
        otp: otp,
      };
      const response = await verifyUser(verifyData);
      console.log("response----", response);
      const authToken = response.data.data.authToken;
      setCookie(null, "token", authToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      const userInfo = {
        profile: response.data.data.profile,
        role: response.data.data.role,
      };
      dispatch(loginUser({ authToken, userInfo }));

      // Check if the profile is incomplete
      const profile = userInfo.profile;
      const isProfileIncomplete = !profile.name || !profile.email;

      if (isProfileIncomplete) {
        router.push("/profile");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e, index, props) => {
    if (e.key === "Backspace" && props.values.otp[index] === "") {
      if (index > 0) {
        const previousInput = document.querySelector(
          `input[name='otp-${index - 1}']`
        );
        if (previousInput) {
          previousInput.focus();
        }
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OtpVerifySchema}
      onSubmit={onSubmit}
    >
      {(props) => (
        <Form className={styles.form}>
          <OTPInput
            className={styles.otpInput}
            value={props.values.otp}
            onChange={(otp) =>
              props.handleChange({ target: { name: "otp", value: otp } })
            }
            numInputs={4}
            renderSeparator={
              <span
                style={{
                  fontSize: "30px",
                  color: "grey",
                }}
              >
                {"|"}
              </span>
            }
            renderInput={(inputProps, index) => (
              <input
                {...inputProps}
                name={`otp-${index}`}
                inputMode="numeric"
                autoFocus={index === 0}
                onKeyDown={(e) => {
                  handleKeyDown(e, index, props);
                  if (!/^\d$/.test(e.key) && e.key !== "Backspace") {
                    e.preventDefault();
                  }
                }}
                className={styles.otpBox}
              />
            )}
          />
          <hr />
          <ErrorMessage component="div" name="otp" className={styles.error} />
          <p className={styles.resend}>Resend Otp</p>
          <button type="submit" className={styles.btn} disabled={submitting}>
            {submitting ? "Submitting..." : "Next"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default OtpVerify;
