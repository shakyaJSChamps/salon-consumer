"use client";
import styles from "../userInformation.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Session from "@/service/session";
import {
  UpdateUserProfile,
  fileUploaders,
  getUserProfile,
  otpSend,
  otpVerify,
} from "@/api/account.api";
import Notify from "@/utils/notify";
import { AiOutlineEdit } from "react-icons/ai";
import PhoneInputComponent from "@/components/loginPage/PhoneInputComponent";
import { userProfileSchema } from "@/utils/schema";
import Images from "@/app/image";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import OTPInput from "react-otp-input";
import { loginUser, updateUserProfile } from "@/app/Redux/Authslice";
import { useDispatch } from "react-redux";

function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const [editModes, setEditModes] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [verified, setVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    try {
      const userDetails = await getUserProfile();
      setUserInfo(userDetails?.data?.data);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const renderInput = (props, index) => (
    <input
      {...props}
      key={index}
      autoFocus={index === 0}
      className={styles.inputOtp}
      pattern="[0-9]*"
      inputMode="numeric"
      onInput={(e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      }}
      onKeyDown={(e) => {
        // Allow backspace, tab, enter, and numbers
        if (
          !(
            e.key === "Backspace" ||
            e.key === "Tab" ||
            e.key === "Enter" ||
            /^\d$/.test(e.key)
          )
        ) {
          e.preventDefault();
        }
      }}
    />
  );

  const initialValues = {
    profileImageUrl: userInfo?.profileImageUrl || "",
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    gender: userInfo?.gender || "",
    address: userInfo?.address || "",
    phoneNumber: userInfo?.phoneNumber || "",
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      try {
        const imagePath = await handleOnFileSelect(file);
        setImagePreview(imagePath);
        setUserInfo((prevState) => ({
          ...prevState,
          profileImageUrl: imagePath,
        }));
      } catch (error) {
        Notify.error(error.message);
      }
    }
  };

  const handleKeyPress = (event) => {
    const regex = /^[A-Za-z ]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleSubmit = async (values) => {
    const updatedData = { ...values };
    try {
      const res = await UpdateUserProfile(updatedData);
      fetchUserDetails();
      dispatch(updateUserProfile(updatedData));
      Notify.success(res.data.message);
      setShowOTP(false);
      fetchUserDetails();
      const isProfileIncomplete = !values?.name || !values?.email;
      if (!isProfileIncomplete) {
        // const id = Session.get("selectedSalonId");
        // router.push(`/salonlist/${id}`);
      } else {
        router.push("/");
      }
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const handleOnFileSelect = async (file) => {
    try {
      const response = await fileUploaders({ fileName: file.name });
      const requestOptions = {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      };
      await fetch(response.data.data.url, requestOptions);
      let imagePath = response.data.data.path;
      return imagePath;
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const handleVerifyEmailClick = async (values) => {
    try {
      const verifyEmailData = {
        email: values.email,
      };
      const res = await otpSend(verifyEmailData);
      setShowOTP(true);
      Notify.success(res.message);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const handleOTPVerification = async (otp, values) => {
    try {
      const verifyOtpData = {
        email: values.email,
        otp: otp,
      };
      const otpRes = await otpVerify(verifyOtpData);
      Notify.success(otpRes.message);
      setShowOTP(false);
      setIsEmailVerified(true);
      setIsOTPVerified(true);
      setOtp("");
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <div className={styles.profileDetails}>
      {userInfo && (
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={userProfileSchema}
        >
          {({ values, touched, errors }) => (
            <Form className={styles.form}>
              <div className={styles.imageRow}>
                <div className={styles.userImageDiv}>
                  <Images
                    imageUrl={values.profileImageUrl}
                    alt="user profile"
                    width={100}
                    height={100}
                    className={styles.profileImage}
                  />
                  {editModes && (
                    <div
                      className={styles.editImageIcon}
                      onClick={() =>
                        document.getElementById("imageUpload").click()
                      }
                    >
                      <AiOutlineEdit />
                    </div>
                  )}
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className={styles.editImageInput}
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.name}>
                  <label className={styles.label}>Name</label>
                  <Field
                    type="text"
                    name="name"
                    onKeyPress={handleKeyPress}
                    className={`form-control ${
                      touched.name && errors.name ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className={styles.otherDetails}>
                <label className={styles.label}>Email</label>
                <Field
                  type="text"
                  name="email"
                  icon={isOTPVerified && <FaCheckCircle />}
                  iconClass="text-success"
                  disable={isOTPVerified}
                  className={`form-control ${
                    touched.email && errors.email ? "is-invalid" : ""
                  }`}
                />
                {isEmailVerified && (
                  <FaCheckCircle className={styles.verifiedIcon} />
                )}

                {values.email &&
                  !showOTP &&
                  !isEmailVerified &&
                  !verified &&
                  !userInfo?.verified && (
                    <div className="pt-3">
                      <button
                        type="button"
                        className={styles.verify__email_button}
                        onClick={() => handleVerifyEmailClick(values)}
                      >
                        Verify Email
                      </button>
                    </div>
                  )}

                {showOTP && (
                  <>
                    <label htmlFor="otp" className="fw-bold">
                      OTP
                    </label>
                    <div className="otp-box d-flex justify-content-center">
                      <OTPInput
                        value={otp}
                        onChange={(otpValue) => {
                          setOtp(otpValue);
                          if (otpValue.length === 4) {
                            handleOTPVerification(otpValue, values);
                          }
                        }}
                        numInputs={4}
                        renderSeparator={<span></span>}
                        renderInput={renderInput}
                      />
                    </div>
                  </>
                )}

                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className={styles.details}>
                <div className={styles.info}>
                  <label className={styles.label}>Gender</label>
                  <Field
                    as="select"
                    name="gender"
                    className={`form-control ${
                      touched.gender && errors.gender ? "is-invalid" : ""
                    } ${styles.gender}`}
                  >
                    <option value="" disabled hidden>
                      Select
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.infoNumber}>
                  <label className={styles.label}>Contact Number</label>
                  <PhoneInputComponent
                    type="text"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    style={{
                      boxShadow: "none",
                      outlineColor: "none",
                      width: "250px",
                      height: "6vh",
                      fontSize: "20px",
                      backgroundColor: "#e9ecef",
                    }}
                    disabled={true}
                  />
                </div>
              </div>
              <button className={styles.saves} type="submit">
                Save
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default UserProfile;
