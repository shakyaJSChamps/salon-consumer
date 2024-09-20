import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/components/loginPage/loginPage.module.css'
import { ErrorMessage, Form, Formik } from 'formik';
import PhoneInputComponent from '../loginPage/PhoneInputComponent';
import Link from 'next/link';
import { LoginSchema } from '@/utils/schema';
import Notify from '@/utils/notify'
import { doLogin } from '@/api/account.api';
import OtpVerifyPopup from './OtpVerifyPopup';
function LoginFormPopup(props) {
    const [sendOtp, setSendOtp] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);

    const initialValues = {
        phoneNumber: "",
    };
    const onSubmit = async (values) => {
        try {
            setSubmitting(true);
            const { phoneNumber } = values;
            const data = {
                countryCode: "91",
                phoneNumber: phoneNumber,
                deviceType: 1,
                deviceToken: "fasfsadfsdf",
            };
            await doLogin(data);
            setPhoneNumber(phoneNumber);
            // Notify.success(res.data.message)
            setSendOtp(true);
            setTimer(30);
            setIsTimerActive(true);
        } catch (error) {
            Notify.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
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
                                    <PhoneInputComponent
                                        setPhoneNumber={setPhoneNumber}
                                        className={styles.mobileField}
                                        style={{
                                            borderRadius: "20px",
                                            boxShadow: "none",
                                            outlineColor: "none",
                                            width: "470px",
                                            height: "6vh",
                                            fontSize: "20px",
                                        }}
                                    />

                                    <ErrorMessage
                                        component="div"
                                        name="phoneNumber"
                                        className={styles.error}
                                    />
                                    <p className={styles.agree}>
                                        By continuing, you agree to Stylrax&apos;s{" "}
                                        <Link href="/termsOfUse">Terms of Use</Link> and{" "}
                                        <Link href="/privacyPolicy">Privacy Policy</Link>.
                                    </p>
                                    <button
                                        type="submit"
                                        className={styles.btn}
                                        disabled={submitting}
                                    >
                                        {submitting ? "Submitting..." : "Request OTP"}
                                    </button>
                                </Form>
                            </Formik>
                        ) : (
                            <OtpVerifyPopup
                                phoneNumber={phoneNumber}
                                setActiveStep={props.setActiveStep}
                                timer={timer}
                                setTimer={setTimer}
                                isTimerActive={isTimerActive}
                                setIsTimerActive={setIsTimerActive}
                                onHide={props.onHide}
                            />
                        )}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default LoginFormPopup
