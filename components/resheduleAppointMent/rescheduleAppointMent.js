import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import styles from './reschedule.module.css';
import { rescheduleAppointment } from '@/api/account.api';
import Notify from '@/utils/notify';
import { styled } from '@mui/system';

const CustomTimePicker = styled(TimePicker)({
    '& .MuiInputBase-root': {
        border: '2px solid grey',
        boxShadow: '2px 3px 7px #a1acb0',

        width: '100%',
        '&:focus': {
            borderColor: 'transparent', // Remove border on focus
            boxShadow: 'none', // Remove box shadow on focus
        },
        '& .MuiOutlinedInput-root': {
    '&:focus, &:focus-within': {
      boxShadow: '2px 3px 7px #a1acb0',

    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent', // Remove border on hover
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none', // Remove the border
  },
    },
    '& .MuiOutlinedInput-root': {
        '&:focus': {
            borderColor: 'transparent', // Remove border on focus
            boxShadow: 'none', // Remove box shadow on focus
        },
    },
    '& .MuiInputBase-input': {
        border: 'none',
        width: '340px',
        outline: 'none',
        borderRadius:'13px',
        height:'6px',
        
    },
    
});

const RescheduleAppointment = ({ handelShowAppointMent, selectedAppointment, appointment }) => {
    const today = new Date().toISOString().split('T')[0];
    const tenDaysAhead = new Date();
    tenDaysAhead.setDate(tenDaysAhead.getDate() + 10);
    const maxDate = tenDaysAhead.toISOString().split('T')[0];

    const initialValues = {
        bookingDate: '',
        timeSlot: null, // Initialize timeSlot as null
    };
    const customTimePickerStyle = {
        root: {
            border: 'none', // Remove border
            fontSize:'20px',
            width:'100%'
        },
    };
    
    const validationSchema = Yup.object().shape({
        bookingDate: Yup.date().required('Booking date is required'),
        timeSlot: Yup.string().required('Time slot is required'),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            // Ensure correct time format handling with AM/PM
            const formattedTime = dayjs(values.timeSlot, 'hh:mm A').format('hh:mm A'); // Preserve AM/PM for API
            const data = {
                type: 'reschedule',
                date: values.bookingDate,
                startTime: formattedTime,
            };
            const AppointmentReschedule = await rescheduleAppointment(data, selectedAppointment.id);
            console.log('Appointment rescheduled:', AppointmentReschedule);
            Notify.success('Appointment rescheduled successfully.');
            setSubmitting(false);
            handelShowAppointMent();
            appointment();
        } catch (error) {
            Notify.error(error.message);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={styles.container}>
                <div className={styles.schedule}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form>
                                <div className={styles.form}>
                                    <div className={styles.reschedule}>
                                        <h4>Booking date</h4>
                                        <Field
                                            type="date"
                                            name="bookingDate"
                                            className={styles.booking_date}
                                            min={today}
                                            max={maxDate}
                                        />
                                        <ErrorMessage name="bookingDate" component="div" className="error" />
                                    </div>

                                    <div className={styles.rescheduleTime}>
                                        <h4>Select time slot</h4>
                                        <Field name="timeSlot" className={styles.timeSlot}>
                                            {({ field }) => (
                                                <CustomTimePicker
                                                    {...field}
                                                    value={field.value || null}
                                                    onChange={(value) => setFieldValue('timeSlot', value)}
                                                    renderInput={(params) => (
                                                        <input
                                                            type="text"
                                                            {...params}
                                                            className={`${styles.timeSlot} timePickerInput`}
                                                        />
                                                    )}
                                                    disabled={isSubmitting}
                                                    ampm={true}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name="timeSlot" component="div" className="error" />
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
        </LocalizationProvider>
    );
};

export default RescheduleAppointment;
