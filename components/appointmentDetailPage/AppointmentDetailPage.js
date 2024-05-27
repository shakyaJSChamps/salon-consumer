"use client"
import { appointmentDetails } from '@/api/account.api';
import React, { useEffect, useState } from 'react';
import styles from './AppointmentDetailPage.module.css';
import { Paper } from '@mui/material';

function AppointmentDetailPage({ appointmentId }) {
    const [details, setDetails] = useState(null);

    const fetchAppointmentDetails = async () => {
        try {
            const response = await appointmentDetails(appointmentId);
            setDetails(response?.data?.data);
        } catch (error) {
            console.log("error::>", error);
        }
    };

    useEffect(() => {
        fetchAppointmentDetails();
    }, []);

    const total = details?.services?.reduce((sum, service) => sum + (service.servicePrice || 0), 0);

    return (
        <div className={styles.mainDiv}>
            <Paper elevation={2} className={styles.paper}>
                <div className={styles.details}>
                    <div className={styles.title}>
                        <h3>Appointment Details</h3>
                    </div>
                    <div className={styles.appointmentDetails}>
                        <p><span>Appointment Id:</span> <span>{details?.appointmentId}</span></p>
                        <p><span>Status:</span> <span>{details?.status}</span></p>
                        <p><span>Appointment Date:</span> <span>{details?.date}</span></p>
                        <p><span>Appointment Time:</span> <span>{details?.startTime}</span></p>
                        <p><span>Customer Identity:</span> <span>{details?.serviceType}</span></p>
                        <p><span>Services:</span> <span>{details?.services?.map((item) => item.serviceName).join(', ')}</span></p>
                        <p><span>Verification Code:</span> <span>{details?.verificationCode}</span></p>
                    </div>
                </div>
                <div className={styles.details}>
                    <div className={styles.title}>
                        <h3>Salon Details</h3>
                    </div>
                    <div className={styles.userDetails}>
                        <p><span>Name:</span> <span>{details?.salon?.name}</span></p>
                        <p><span>Address:</span> <span>{details?.salon?.address}</span></p>
                    </div>
                </div>
                <div className={styles.details}>
                    <div className={styles.title}>
                        <h3>Payment Details</h3>
                    </div>
                    <div className={styles.paymentDetails}>
                        {details?.services?.map((item, index) => (
                            <p key={index}><span>{item.serviceName}:</span> <span>{item.servicePrice}</span></p>
                        ))}
                        <hr />
                        <p><strong>Grand Total:</strong> {total}</p>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

export default AppointmentDetailPage;
