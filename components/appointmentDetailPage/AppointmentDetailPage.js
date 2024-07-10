"use client";
import { appointmentDetails, getInvoice } from "@/api/account.api";
import React, { useEffect, useState } from "react";
import styles from "./AppointmentDetailPage.module.css";
import Notify from "@/utils/notify";
import Session from "@/service/session";

function AppointmentDetailPage({ appointmentId }) {
  const [details, setDetails] = useState(null);
  const id = Session.get("appointmentId");

  const fetchAppointmentDetails = async () => {
    try {
      const response = await appointmentDetails(appointmentId);
      setDetails(response?.data?.data);
    } catch (error) {
      console.log("error::>", error);
    }
  };
  const data =
    details?.salon?.homeService === "true" ? "Home Service" : "Salon Service";
  useEffect(() => {
    fetchAppointmentDetails();
  }, []);

  const total = details?.services?.reduce(
    (sum, service) => sum + (service.servicePrice || 0),
    0
  );
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[d.getMonth()];
    const day = String(d.getDate()).padStart(2, "0");
    return `${day} ${month} ${year}`;
  };

  const handleDownloadInvoice = async () => {
    try {
        const res = await getInvoice(appointmentId);
        const invoicePath = res.data.data.invoicePath;

        // Initiate download
        const link = document.createElement("a");
        link.href = invoicePath;
        link.setAttribute("download", "");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
     
    } catch (error) {
      Notify.error(error.message);
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div elevation={2} className={styles.paper}>
        <div className={styles.details}>
          <div className={styles.title}>
            <h3>Appointment Details</h3>
          </div>
          <div className={styles.appointmentDetails}>
            <p>
              <span>Appointment Id</span> <span>{details?.appointmentId}</span>
            </p>
            <p>
              <span>Status</span> <span>{details?.status}</span>
            </p>
            <p>
              <span>Service Type</span> <span>{data}</span>
            </p>

            <p>
              <span> Appointment Date</span>{" "}
              <span>{formatDate(details?.date)}</span>
            </p>
            <p>
              <span>Appointment Time</span> <span>{details?.startTime}</span>
            </p>
            <p>
              <span>Appointment For</span> <span>{details?.serviceType}</span>
            </p>

            <p>
              <span>Salon Name</span> <span>{details?.salon?.name}</span>
            </p>

            <p>
              <span>Salon Address</span> <span>{details?.salon?.address}</span>
            </p>

            {/* <p><span>Total Payment</span> <span>₹{total}</span></p> */}
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.title}>
            <h3>User Details</h3>
          </div>
          <div className={styles.appointmentDetails}>
            <p>
              <span>Name</span> <span>{details?.userName}</span>
            </p>
          </div>
        </div>
        {details?.status === "COMPLETED" && (
          <div className={styles.downloadInvoice}>
            <h3 onClick={() => handleDownloadInvoice(data)}>
              Download Invoice
            </h3>
          </div>
        )}
        <div className={styles.details}>
          <div className={styles.title}>
            <h3>Payment Details</h3>
          </div>
          <div className={styles.serviceDetails}>
            {details?.services?.map((item, index) => (
              <div key={index} className={styles.serviceItem}>
                <span>{item.serviceName}</span>
                <span>₹{item.servicePrice}</span>
              </div>
            ))}
          </div>
          <hr />
          <p>
            <strong>Total</strong> ₹{total}
          </p>
        </div>
        <div className={styles.details}>
          <div className={styles.title}>
            <h3>Payment Method</h3>
          </div>
          <div className={styles.paymentMethod}>
            <p>
              <span>Payment Mode</span>{" "}
              <span>{details?.paymentStatus.paymentMode}</span>
            </p>
          </div>
        </div>
        {/* <div className={styles.details}> */}
        <div className={styles.title}>{/* <h3>Payment Summary</h3> */}</div>
        <div className={styles.paymentSummary}>
          {/* <p><span>Item Total</span> <span>₹{total}</span></p> */}
          {/* <p><span>Taxes and Fee</span> <span>₹49</span></p> */}
          {/* <hr /> */}
          {/* <p><strong>Grand Total</strong> ₹{total}</p> */}
        </div>
      </div>
    </div>
    // </div>
  );
}

export default AppointmentDetailPage;
