import OTPInput from 'react-otp-input'
import styles from './loginPage.module.css'
import { ErrorMessage, Form, Formik } from 'formik'
import { OtpVerifySchema } from '@/utils/schema'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { verifyUser } from '@/api/account.api'
import { loginUser } from '@/app/Redux/Authslice'

const initialValues = {
    otp: "",
}

function OtpVerify({phoneNumber}) {
    const dispatch = useDispatch();
    const router = useRouter();
    const onSubmit = async (values) => {
        try {
            const {otp } = values;
            console.log("phoneNumber", phoneNumber);
            const verifyData = {
                "countryCode": "91",
                "phoneNumber": phoneNumber,
                "otp": otp
            }
            const response = await verifyUser(verifyData)
            console.log("response----", response)
            dispatch(loginUser(response.data));
            router.push('/');

        } catch (error) {
            // .error(error.message);
            console.log(error);
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
                        value={props.values.otp}
                        onChange={(otp) => props.handleChange({ target: { name: 'otp', value: otp } })}
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
                    <ErrorMessage
                        component="div"
                        name="otp"
                        className={styles.error}
                    />
                    <p className={styles.resend}>Resend Otp</p>
                    <button type="submit" className={styles.btn}>
                        Next
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default OtpVerify
