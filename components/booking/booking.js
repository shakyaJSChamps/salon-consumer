"use client"
import styles from './booking.module.css'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import haircut from '@/assets/images/haircolorMen.svg'
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Session from '@/service/session';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { appointment } from '@/api/account.api';

function Booking() {
  const servicesDetails = Session.getObject("selectedService");
  const router = useRouter();
  const [totalCount, setTotalCount] = useState(1); // Initial count
  const serviceIds = servicesDetails?.map((item) => item.id);
  console.log("servicekjkjkj:::>",servicesDetails);
  console.log("serviceIds::>", serviceIds);
  const salonId = Session.get('selectedSalonId')
  console.log("SalonId", salonId);
  // Formik initial values
  const initialValues = {
    salonId: parseInt(salonId),
    date: '',
    startTime: '',
    serviceType: '',
    addressId:38,
    duration: '',
    serviceIds: serviceIds
  };

  // Formik validation schema
  const validationSchema = Yup.object().shape({
    date: Yup.date().required('Date is required'),
    startTime: Yup.string().required('Time is required'),
    serviceType: Yup.string().required('Type is required')
  });

  // Function to handle incrementing count
  function handleIncrement() {
    setTotalCount(prevCount => prevCount * 2); // Double the total count
  }

  // Function to handle decrementing count
  function handleDecrement() {
    if (totalCount > 1) {
      setTotalCount(prevCount => prevCount / 2); // Halve the total count
    }
  }

  // Function to handle booking
  async function handleSubmit(values) {
    console.log("values::>", values)
    try {
      const res = await appointment(values)
      console.log("resAppointment::>", res)
      router.push('salon/payment');
    } catch (error) {
      console.log("error::>", error)
    }
    
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={styles.counter}>
                <div className={styles.countSection}>
                  <div className=''>
                    <h3>Grooming Essentials</h3>
                  </div>
                  <div className={styles.count}>
                    <RemoveIcon className={styles.countIcon} style={{ fontSize: "12px" }} onClick={handleDecrement} />
                    <span>{totalCount}</span>
                    <AddIcon className={styles.countIcon} style={{ fontSize: "12px" }} onClick={handleIncrement} />
                  </div>
                  <div className={styles.totalPrice}>
                    <p>₹{servicesDetails.reduce((total, service) => total + (service.servicePrice * totalCount), 0)}</p>
                  </div>
                </div>
              </div>

              {servicesDetails.map((service, index) => (
                <div key={index} className={styles.serviceType}>
                  <div className={styles.price}>
                    <div className={styles.serviceList}>
                      <ul>
                        <li>{service.serviceName} for {service.type} x{totalCount}</li>
                      </ul>
                    </div>
                    <div className={styles.price}>₹{service.servicePrice * totalCount}</div>
                  </div>
                </div>
              ))}

              <div className={styles.bookingDate}>
                <h3>Booking date</h3>
                <div className={styles.dateContainer}>
                  <Field type='date' name='date' />
                  <ErrorMessage name="date" component="div" className="error" />
                </div>
              </div>

              <div className={styles.dateContainer}>
                <h3>Select time slot</h3>
                <div className={styles.timeslot}>
                  <Field type='text' name='startTime' />
                  <ErrorMessage name="startTime" component="div" className="error" />
                  {/* Add your time slot selection UI here */}
                </div>
              </div>
              <div className={styles.dateContainer}>
                <h3>Duration</h3>
                <div className={styles.timeslot}>
                  <Field type='number' name='duration' />
                  <ErrorMessage name="duration" component="div" className="error" />
                  {/* Add your time slot selection UI here */}
                </div>
              </div>

              <div className={styles.address}>
                <h3>Service Type</h3>
                <div className={styles.inputContainer}>
                  <Field type='text' name='serviceType' placeholder='serviceType' />
                  <ErrorMessage name="serviceType" component="div" className="error" />
                </div>
              </div>

              <div className={styles.book}>
                <button type="submit">Book Now</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Booking;
