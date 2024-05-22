import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IoStarSharp } from "react-icons/io5";
import styles from './rating.module.css';
import { ratingValidationSchema } from '@/utils/schema';
import { postSalonReviews } from '@/api/account.api';

const Ratings = ({ handelShowAppointMent,selectedAppointment }) => {
    console.log("selectedAppoint:::>",selectedAppointment)
    const salonId=selectedAppointment?.salon?.id;
    const initialValues={
        appointmentId:selectedAppointment.id,
        rating: 0,
        review: ''
    }
      const handleSubmit=async(values)=>{
        try {
            const res=await postSalonReviews(values,salonId);
            console.log("res:::",res)
            handelShowAppointMent();
        } catch (error) {
            console.log("error::>",error);
        }
      }

    return (
        <div className={styles.container}>
            <Formik
                initialValues={initialValues}
                validationSchema={ratingValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className={styles.ratingContainer}>
                            <h4>Rating</h4>
                            <div className={styles.stars}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div
                                        key={star}
                                        className={styles.starIcons}
                                        onClick={() => setFieldValue('rating', star)}
                                        style={{
                                            color: values.rating >= star ? '#ffc107' : '#e4e5e9',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <IoStarSharp />
                                    </div>
                                ))}
                            </div>
                            <ErrorMessage name="rating" component="div" className={styles.error} />
                            <h6>Choose a star to rate</h6>
                            <h5>Your review</h5>
                            <Field
                                as="textarea"
                                name="review"
                                placeholder="Enter your review here"
                            />
                            <ErrorMessage name="review" component="div" className={styles.error} />
                            <button type="submit">Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Ratings;
