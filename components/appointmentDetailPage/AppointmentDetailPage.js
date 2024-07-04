"use client";
import { appointmentDetails } from '@/api/account.api';
import React, { useEffect, useState } from 'react';
import styles from './AppointmentDetailPage.module.css';
import { Paper } from '@mui/material';
import { MdOutlineFileDownload } from "react-icons/md";
import { PiGreaterThanLight } from "react-icons/pi";

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
    },[]);

    const total = details?.services?.reduce((sum, service) => sum + (service.servicePrice || 0), 0);
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[d.getMonth()];
        const day = String(d.getDate()).padStart(2, '0');
        return `${day} ${month} ${year}`;
      };
    return (
        <div className={styles.mainDiv}>
            <div elevation={2} className={styles.paper}>
                <div className={styles.details}>
                    <div className={styles.title}>
                        <h3>Appointment Details</h3>
                    </div>
                    <div className={styles.appointmentDetails}>
                        <p><span>Date:</span> <span>{formatDate(details?.date)}</span></p>
                        <p><span>Time:</span> <span>{details?.startTime}</span></p>
                        <p><span>Appointment Number:</span> <span>{details?.appointmentId}</span></p>
                        <p><span>Address:</span> <span>{details?.salon?.address}</span></p>
                        <p><span>Total Payment:</span> <span>₹{total}</span></p>
                    </div>
                </div>
                <button className={styles.rateReviewButton}>Rate & Review</button>
                {/* <PiGreaterThanLight /> */}
                <div className={styles.downloadInvoice}>
                    {/* <div className={styles.downloadIcon}><MdOutlineFileDownload /></div> */}
                    <h3>Download Invoice</h3>
               {/* <div className={styles.icon}><PiGreaterThanLight /></div>      */}
                </div>
                <div className={styles.details}>
                    <div className={styles.title}>
                        <h3>Services</h3>
                    </div>
                    <div className={styles.serviceDetails}>
                        {details?.services?.map((item, index) => (
                            <div key={index} className={styles.serviceItem}>
                                <span>{item.serviceName}</span>
                                <span>{item.servicePrice}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.details}>
                    <div className={styles.title}>
                        <h3>Payment Method</h3>
                    </div>
                    <div className={styles.paymentMethod}>
                        <p>{details?.paymentMethod}</p>
                    </div>
                </div>
                <div className={styles.details}>
                    <div className={styles.title}>
                        <h3>Payment Summary</h3>
                    </div>
                    <div className={styles.paymentSummary}>
                        <p><span>Item Total</span> <span>₹{total}</span></p>
                        {/* <p><span>Taxes and Fee</span> <span>₹49</span></p> */}
                        <hr />
                        <p><strong>Grand Total:</strong> ₹{total}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppointmentDetailPage;
