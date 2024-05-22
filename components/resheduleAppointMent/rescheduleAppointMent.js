import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './reschedule.module.css';
import { appointment, rescheduleAppointment } from '@/api/account.api';
import { rescheduleValidationSchema } from '@/utils/schema';

const RescheduleAppointment = ({ handelShowAppointMent,selectedAppointment,appointment }) => {

    
    const initialValues = {
        bookingDate: '',
        timeSlot: '',
    };

    const onSubmit = async(values, { setSubmitting }) => {
        console.log('Form data', values);
        try {
           const data={
                type:"reschedule",
                date:values.bookingDate,
                startTime:values.timeSlot
            }
            const AppointmentReschedule=await rescheduleAppointment(data,selectedAppointment.id)
            console.log("appointmentresh::>",AppointmentReschedule)
            setSubmitting(false);
            handelShowAppointMent();
            appointment();
        } catch (error) {
            console.log(error)
        }
       
    };

    return (
        <div className={styles.container}>
            <div className={styles.schedule}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={rescheduleValidationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={styles.form}>
                            <div className={styles.reschedule}>
                                <h4>Booking date</h4>
                                <Field type="date" name="bookingDate" />
                                <ErrorMessage name="bookingDate" component="div" className={styles.error} />
                            </div>

                            <div className={styles.reschedule}>
                                <h4>Select time slot</h4>
                                <div className={styles.chooseTime}>
                                    <Field type="text" name="timeSlot" />
                                    <ErrorMessage name="timeSlot" component="div" className={styles.error} />
                                </div>
                            </div>
                            <button type="submit" disabled={isSubmitting} className={styles.btn}>
                                Reschedule
                            </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default RescheduleAppointment;
