"use client";
import { appointmentDetails, getInvoice } from "@/api/account.api";
import React, { useEffect, useState } from "react";
import styles from "./AppointmentDetailPage.module.css";
import Notify from "@/utils/notify";
import Session from "@/service/session";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { format ,parse} from 'date-fns';
import { enUS, enGB } from 'date-fns/locale';
function AppointmentDetailPage({ appointmentId }) {
  const [details, setDetails] = useState(null);
  const router = useRouter();
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
  const formatDate = (dateString) => {
    const formats = [
      'yyyy-MM-dd',
      'dd-MM-yyyy',
      'MM-dd-yyyy',
      'yyyy/MM/dd',
      'dd/MM/yyyy',
      'MM/dd/yyyy',
      'dd-MMM-yyyy',
      'MMM dd, yyyy'
    ];
  
    let parsedDate;
    let isValidDate = false;
  
    for (let fmt of formats) {
      try {
        parsedDate = parse(dateString, fmt, new Date(), { locale: enUS });
        if (!isNaN(parsedDate)) {
          isValidDate = true;
          break;
        }
      } catch (error) {
        continue;
      }
    }
  
    if (!isValidDate) {
      return 'Invalid Date Format';
    }
  
    return format(parsedDate, 'dd-MMM-yyyy', { locale: enGB });
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
  const gst = details?.paymentStatus?.cgst + details?.paymentStatus?.cgst;
  return (
    <div className={styles.mainDiv}>
      <div elevation={2} className={styles.paper}>

        <div className={styles.details}>

          <div className={styles.title}>
          <IoIosArrowBack className={styles.backIcon} onClick={()=>router.push('/appointment')}/>

            <h3>Appointment Details</h3>
          </div>
          <div className={styles.appointmentDetails}>
            <p>
              <span>Appointment Id</span> <span>{details?.appointmentId}</span>
            </p>
            <p>
              <span>Status</span> <span>{details?.status}</span>
            </p>
            {details?.status === 'CANCELLED' &&
             <p>
             <span>Cancel Reason</span> <span>{details?.cancelReason}</span>
           </p>
            }
            <p>
              <span>Service Type</span> <span>{data}</span>
            </p>

            <p>
              <span> Booking Date</span>{" "}
              <span>{formatDate(details?.date)}</span>
            </p>
            <p>
              <span>Booking Time</span> <span>{details?.startTime}</span>
            </p>
            <p>
              <span>Booking For</span> <span>{details?.serviceType}</span>
            </p>

            <p>
              <span>Salon Name</span> <span>{details?.salon?.name}</span>
            </p>

            <p className={styles.salonAddress}>
              <span>Salon Address</span> <span>{details?.salon?.address}</span>
            </p>
            {details?.status === "COMPLETED" && (
              <div>
          <p>
          <span>Service Date</span> <span>{formatDate(details?.serviceDate)}</span>
        </p><br/>
         <p>
         <span>Service Start Time</span> <span>{details?.serviceStartTime}</span>
       </p><br/>
        <p>
        <span>Service End Time</span> <span>{details?.serviceEndTime}</span>
      </p>
      </div>
        )}        
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
            <div className={styles.serviceDetails}>
              <div className={styles.serviceItem}>
                <span>GST</span>

                <span>₹{gst}</span>
              </div>
            </div>
          </div>
          <hr />
          <p>
            <strong>Total</strong> ₹{total + gst}
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
            <p>
              <span>Payment Status</span>{" "}
              <span>{details?.paymentStatus.paymentStatus}</span>
            </p>
          </div>
        </div>
        <div className={styles.title}></div>
        <div className={styles.paymentSummary}></div>
      </div>
    </div>
  );
}

export default AppointmentDetailPage;
